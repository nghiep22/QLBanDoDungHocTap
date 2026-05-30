import { useEffect, useMemo, useState } from 'react';
import { dichVuApi } from '../../services/api';
import type { DonHangAPI } from '../../types';
import * as S from './QuanLySanPham.styles.ts';

const trangThaiOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'cho_xac_nhan', label: 'Chờ xác nhận' },
  { value: 'dang_xu_ly', label: 'Đang xử lý' },
  { value: 'dang_giao', label: 'Đang giao' },
  { value: 'da_giao', label: 'Đã giao' },
  { value: 'da_huy', label: 'Đã hủy' },
];

const formatCurrency = (value: number) => value.toLocaleString('vi-VN') + 'đ';
const formatDate = (value?: string | null) => value ? new Date(value).toLocaleString('vi-VN') : '-';
const formatStatus = (value: string) => value.replace(/_/g, ' ');

export const QuanLyDonHang = () => {
  const [danhSachDonHang, setDanhSachDonHang] = useState<DonHangAPI[]>([]);
  const [dangTai, setDangTai] = useState(false);
  const [locTrangThai, setLocTrangThai] = useState('');
  const [thongBao, setThongBao] = useState<{ loai: 'thanh_cong' | 'loi'; noidung: string } | null>(null);

  const taiDonHang = async () => {
    setDangTai(true);
    try {
      const data = await dichVuApi.layDanhSachDonHang(locTrangThai || undefined);
      setDanhSachDonHang(data);
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể tải danh sách đơn hàng' });
    } finally {
      setDangTai(false);
    }
  };

  useEffect(() => {
    taiDonHang();
  }, [locTrangThai]);

  const tongDoanhThu = useMemo(
    () => danhSachDonHang.reduce((tong, don) => tong + don.tongThanhToan, 0),
    [danhSachDonHang]
  );

  const capNhatTrangThai = async (id: number, trangThaiDH: string) => {
    try {
      await dichVuApi.capNhatTrangThaiDonHang(id, { trangThaiDH });
      setThongBao({ loai: 'thanh_cong', noidung: 'Cập nhật trạng thái đơn hàng thành công' });
      taiDonHang();
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể cập nhật trạng thái đơn hàng' });
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Quản lý đơn hàng</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select
            value={locTrangThai}
            onChange={(e) => setLocTrangThai(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }}
          >
            {trangThaiOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <S.Button onClick={taiDonHang}>Tải lại</S.Button>
        </div>
      </S.Header>

      {thongBao && (
        <S.Thongbao $loai={thongBao.loai}>
          {thongBao.noidung}
        </S.Thongbao>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Tổng đơn hàng</div>
          <strong style={{ fontSize: 28 }}>{danhSachDonHang.length}</strong>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Doanh thu tạm tính</div>
          <strong style={{ fontSize: 28, color: '#e31e24' }}>{formatCurrency(tongDoanhThu)}</strong>
        </div>
      </div>

      {dangTai && <S.Loading>Đang tải...</S.Loading>}

      <S.Table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Ngày đặt</th>
            <th>Địa chỉ giao</th>
            <th>Thanh toán</th>
            <th>Tổng tiền</th>
            <th>Ghi chú khách</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {danhSachDonHang.map(donHang => (
            <tr key={donHang.donHang_Id}>
              <td>{donHang.maDonHang || `DH-${donHang.donHang_Id}`}</td>
              <td>{formatDate(donHang.ngayDat)}</td>
              <td>{donHang.diaChiGiao || '-'}</td>
              <td>{donHang.phuongThucTT || '-'}</td>
              <td>{formatCurrency(donHang.tongThanhToan)}</td>
              <td style={{ maxWidth: 280, whiteSpace: 'normal', lineHeight: 1.5 }}>{donHang.ghiChu || '-'}</td>
              <td>
                <select
                  value={donHang.trangThaiDH}
                  onChange={(e) => capNhatTrangThai(donHang.donHang_Id, e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', minWidth: 150, textTransform: 'capitalize' }}
                >
                  {trangThaiOptions.filter(option => option.value).map(option => (
                    <option key={option.value} value={option.value}>{formatStatus(option.value)}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {!dangTai && danhSachDonHang.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '24px 12px', color: '#666' }}>
                Chưa có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </S.Table>
    </S.Container>
  );
};
