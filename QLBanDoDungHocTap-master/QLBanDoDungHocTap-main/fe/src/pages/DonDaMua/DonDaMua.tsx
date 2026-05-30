import { useEffect, useMemo, useState } from 'react';
import { useDangNhap } from '../../context/AuthContext';
import { dichVuApi } from '../../services/api';
import type { DonHangAPI } from '../../types';
import * as S from './styles';

const TRANG_THAI_CO_THE_HUY = ['cho_xac_nhan', 'dang_xu_ly'];

const statusLabels: Record<string, string> = {
  cho_xac_nhan: 'Chờ xác nhận',
  dang_xu_ly: 'Đang xử lý',
  dang_giao: 'Đang giao',
  da_giao: 'Đã giao',
  da_huy: 'Đã hủy',
};

const statusColors: Record<string, { color: string; background: string }> = {
  cho_xac_nhan: { color: '#92400e', background: '#fef3c7' },
  dang_xu_ly: { color: '#1d4ed8', background: '#dbeafe' },
  dang_giao: { color: '#7c3aed', background: '#ede9fe' },
  da_giao: { color: '#047857', background: '#d1fae5' },
  da_huy: { color: '#b91c1c', background: '#fee2e2' },
};

const formatCurrency = (value: number) => `${value.toLocaleString('vi-VN')}đ`;
const formatDate = (value?: string | null) => value ? new Date(value).toLocaleString('vi-VN') : '-';
const formatStatus = (value: string) => statusLabels[value] || value.replace(/_/g, ' ');
const coTheHuyDon = (trangThai: string) => TRANG_THAI_CO_THE_HUY.includes(trangThai);
const anhMacDinh = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=160&h=160&fit=crop';

export const DonDaMua = () => {
  const { daDangNhap } = useDangNhap();
  const [danhSachDonHang, setDanhSachDonHang] = useState<DonHangAPI[]>([]);
  const [dangTai, setDangTai] = useState(true);
  const [dangHuyId, setDangHuyId] = useState<number | null>(null);
  const [loi, setLoi] = useState('');
  const [thongBao, setThongBao] = useState('');

  const taiDonHang = async () => {
    if (!daDangNhap) {
      setLoi('Vui lòng đăng nhập để xem đơn đã mua.');
      setDangTai(false);
      return;
    }

    try {
      setDangTai(true);
      setLoi('');
      const data = await dichVuApi.layDonHangCuaToi();
      setDanhSachDonHang(data);
    } catch (error: any) {
      setLoi(error.message || 'Không thể tải danh sách đơn hàng');
    } finally {
      setDangTai(false);
    }
  };

  useEffect(() => {
    taiDonHang();
  }, [daDangNhap]);

  const tongTien = useMemo(
    () => danhSachDonHang.reduce((tong, don) => tong + don.tongThanhToan, 0),
    [danhSachDonHang]
  );

  const huyDonHang = async (don: DonHangAPI) => {
    if (!coTheHuyDon(don.trangThaiDH)) {
      setLoi('Đơn hàng này không còn ở trạng thái cho phép hủy.');
      return;
    }

    const dongY = window.confirm(`Bạn có chắc muốn hủy đơn ${don.maDonHang || `DH-${don.donHang_Id}`}?`);
    if (!dongY) return;

    try {
      setDangHuyId(don.donHang_Id);
      setLoi('');
      setThongBao('');
      await dichVuApi.huyDonHang(don.donHang_Id);
      setDanhSachDonHang(prev =>
        prev.map(item =>
          item.donHang_Id === don.donHang_Id ? { ...item, trangThaiDH: 'da_huy' } : item
        )
      );
      setThongBao('Hủy đơn hàng thành công.');
    } catch (error: any) {
      setLoi(error.message || 'Không thể hủy đơn hàng');
    } finally {
      setDangHuyId(null);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title>Đơn đã mua</S.Title>
          <S.Subtitle>{daDangNhap ? 'Đã đăng nhập' : 'Chưa đăng nhập'}</S.Subtitle>
        </div>
        <S.BackButton to="/gio-hang">Quay lại giỏ hàng</S.BackButton>
      </S.Header>

      {dangTai && <S.Loading>Đang tải...</S.Loading>}
      {loi && <S.Message $type="error">{loi}</S.Message>}
      {thongBao && <S.Message $type="success">{thongBao}</S.Message>}

      {!dangTai && !loi && (
        <>
          <S.SummaryGrid>
            <S.SummaryItem>
              <S.SummaryLabel>Tổng đơn</S.SummaryLabel>
              <S.SummaryValue>{danhSachDonHang.length}</S.SummaryValue>
            </S.SummaryItem>
            <S.SummaryItem>
              <S.SummaryLabel>Tổng đã chi</S.SummaryLabel>
              <S.SummaryValue $danger>{formatCurrency(tongTien)}</S.SummaryValue>
            </S.SummaryItem>
          </S.SummaryGrid>

          {danhSachDonHang.length === 0 ? (
            <S.EmptyState>Chưa có đơn hàng nào.</S.EmptyState>
          ) : (
            <S.OrderList>
              {danhSachDonHang.map(don => {
                const mauTrangThai = statusColors[don.trangThaiDH] || { color: '#374151', background: '#f3f4f6' };
                const dangHuyDonNay = dangHuyId === don.donHang_Id;

                return (
                  <S.OrderCard key={don.donHang_Id}>
                    <S.OrderHeader>
                      <div>
                        <S.OrderCode>{don.maDonHang || `DH-${don.donHang_Id}`}</S.OrderCode>
                        <S.OrderDate>{formatDate(don.ngayDat)}</S.OrderDate>
                      </div>
                      <S.StatusBadge $color={mauTrangThai.color} $background={mauTrangThai.background}>
                        {formatStatus(don.trangThaiDH)}
                      </S.StatusBadge>
                    </S.OrderHeader>

                    <S.OrderMeta>
                      <div><strong>Thanh toán:</strong> {don.phuongThucTT || '-'}</div>
                      <div><strong>Địa chỉ:</strong> {don.diaChiGiao || '-'}</div>
                      <div><strong>Tổng tiền:</strong> {formatCurrency(don.tongThanhToan)}</div>
                      {don.ghiChu && <div><strong>Ghi chú:</strong> {don.ghiChu}</div>}
                    </S.OrderMeta>

                    {don.chiTiet && don.chiTiet.length > 0 && (
                      <S.ProductList>
                        {don.chiTiet.map((item, index) => {
                          const thanhTien = item.thanhTien ?? item.soLuong * item.giaBan;
                          const tenSanPham = item.tenSanPham || `Sản phẩm ${item.sanPham_Id || item.sanPhamId || index + 1}`;

                          return (
                            <S.ProductRow key={item.chiTiet_Id || `${don.donHang_Id}-${item.sanPham_Id || item.sanPhamId}-${index}`}>
                              <S.ProductImage src={item.hinhAnh || anhMacDinh} alt={tenSanPham} />
                              <S.ProductInfo>
                                <S.ProductName>{tenSanPham}</S.ProductName>
                                <S.ProductMeta>
                                  {item.maSanPham ? `Mã SP: ${item.maSanPham} · ` : ''}
                                  Đơn giá: {formatCurrency(item.giaBan)}
                                </S.ProductMeta>
                              </S.ProductInfo>
                              <S.ProductAmount>
                                <span>SL: {item.soLuong}</span>
                                <strong>{formatCurrency(thanhTien)}</strong>
                              </S.ProductAmount>
                            </S.ProductRow>
                          );
                        })}
                      </S.ProductList>
                    )}

                    <S.Actions>
                      {coTheHuyDon(don.trangThaiDH) ? (
                        <S.CancelButton type="button" onClick={() => huyDonHang(don)} disabled={dangHuyDonNay}>
                          {dangHuyDonNay ? 'Đang hủy...' : 'Hủy đơn'}
                        </S.CancelButton>
                      ) : (
                        <S.MutedActionText>
                          {don.trangThaiDH === 'da_huy' ? 'Đơn hàng đã hủy' : 'Đơn hàng không thể hủy'}
                        </S.MutedActionText>
                      )}
                    </S.Actions>
                  </S.OrderCard>
                );
              })}
            </S.OrderList>
          )}
        </>
      )}
    </S.Container>
  );
};
