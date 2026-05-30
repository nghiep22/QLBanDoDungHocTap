import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDangNhap } from '../../context/AuthContext';
import { dichVuApi } from '../../services/api';
import type { DonHangAPI } from '../../types';

const formatCurrency = (value: number) => value.toLocaleString('vi-VN') + 'đ';
const formatDate = (value?: string | null) => value ? new Date(value).toLocaleString('vi-VN') : '-';
const formatStatus = (value: string) => value.replace(/_/g, ' ');

export const DonDaMua = () => {
  const { daDangNhap } = useDangNhap();
  const [danhSachDonHang, setDanhSachDonHang] = useState<DonHangAPI[]>([]);
  const [dangTai, setDangTai] = useState(true);
  const [loi, setLoi] = useState('');

  useEffect(() => {
    const taiDonHang = async () => {
      if (!daDangNhap) {
        setLoi('Vui lòng đăng nhập để xem đơn đã mua.');
        setDangTai(false);
        return;
      }

      try {
        setDangTai(true);
        const data = await dichVuApi.layDonHangCuaToi();
        setDanhSachDonHang(data);
      } catch (error: any) {
        setLoi(error.message || 'Không thể tải danh sách đơn hàng');
      } finally {
        setDangTai(false);
      }
    };

    taiDonHang();
  }, [daDangNhap]);

  const tongTien = useMemo(
    () => danhSachDonHang.reduce((tong, don) => tong + don.tongThanhToan, 0),
    [danhSachDonHang]
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 28 }}>Đơn đã mua</h2>
          <p style={{ margin: '8px 0 0', color: '#6b7280' }}>
            {daDangNhap ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
          </p>
        </div>
        <Link to="/gio-hang" style={{ padding: '10px 16px', borderRadius: 999, background: '#e31e24', color: '#fff', fontWeight: 600 }}>
          Quay lại giỏ hàng
        </Link>
      </div>

      {dangTai && <div>Đang tải...</div>}
      {loi && <div style={{ padding: 16, borderRadius: 12, background: '#fef2f2', color: '#b91c1c' }}>{loi}</div>}

      {!dangTai && !loi && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ color: '#666', marginBottom: 8 }}>Tổng đơn</div>
              <strong style={{ fontSize: 28 }}>{danhSachDonHang.length}</strong>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ color: '#666', marginBottom: 8 }}>Tổng đã chi</div>
              <strong style={{ fontSize: 28, color: '#e31e24' }}>{formatCurrency(tongTien)}</strong>
            </div>
          </div>

          {danhSachDonHang.length === 0 ? (
            <div style={{ padding: 24, borderRadius: 16, background: '#fff', textAlign: 'center' }}>
              Chưa có đơn hàng nào.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {danhSachDonHang.map(don => (
                <div key={don.donHang_Id} style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                    <div>
                      <strong>{don.maDonHang || `DH-${don.donHang_Id}`}</strong>
                      <div style={{ color: '#6b7280', marginTop: 4 }}>{formatDate(don.ngayDat)}</div>
                    </div>
                    <div style={{ padding: '6px 12px', borderRadius: 999, background: '#f3f4f6' }}>{formatStatus(don.trangThaiDH)}</div>
                  </div>
                  <div style={{ display: 'grid', gap: 8, color: '#374151' }}>
                    <div>Thanh toán: {don.phuongThucTT || '-'}</div>
                    <div>Địa chỉ: {don.diaChiGiao || '-'}</div>
                    <div>Tổng tiền: {formatCurrency(don.tongThanhToan)}</div>
                    {don.ghiChu && <div>Ghi chú: {don.ghiChu}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
