import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { dichVuApi } from '../../services/api';
import type { KhachHangAPI } from '../../types';
import * as S from './QuanLySanPham.styles.ts';

const formatDate = (value?: string | null) => value ? new Date(value).toLocaleDateString('vi-VN') : '-';
const formatGender = (value?: boolean | null) => value === true ? 'Nam' : value === false ? 'Nu' : '-';

export const QuanLyKhachHang2 = () => {
  const [danhSachKhachHang, setDanhSachKhachHang] = useState<KhachHangAPI[]>([]);
  const [dangTai, setDangTai] = useState(false);
  const [tuKhoa, setTuKhoa] = useState('');
  const [tuKhoaDangTim, setTuKhoaDangTim] = useState('');
  const [thongBao, setThongBao] = useState<{ loai: 'thanh_cong' | 'loi'; noidung: string } | null>(null);

  const taiKhachHang = async (search = tuKhoaDangTim) => {
    setDangTai(true);
    try {
      const data = await dichVuApi.layDanhSachKhachHang(search);
      setDanhSachKhachHang(data);
      setThongBao({ loai: 'thanh_cong', noidung: `Da tai ${data.length} khach hang tu API backend` });
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Khong the tai du lieu khach hang' });
    } finally {
      setDangTai(false);
    }
  };

  useEffect(() => {
    taiKhachHang('');
  }, []);

  const thongKe = useMemo(() => {
    const coTaiKhoan = danhSachKhachHang.filter((khach) => khach.taiKhoan_Id).length;
    return {
      tongKhachHang: danhSachKhachHang.length,
      coTaiKhoan,
      chuaCoTaiKhoan: danhSachKhachHang.length - coTaiKhoan,
    };
  }, [danhSachKhachHang]);

  const timKiem = (event: FormEvent) => {
    event.preventDefault();
    const search = tuKhoa.trim();
    setTuKhoaDangTim(search);
    taiKhachHang(search);
  };

  const taiLai = () => {
    setTuKhoa('');
    setTuKhoaDangTim('');
    taiKhachHang('');
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Khach hang 2</h2>
          <p style={{ margin: '6px 0 0', color: '#6b7280' }}>
            Trang doc du lieu tu API backend GET /api/khachhang va hien thi rieng trong Admin.
          </p>
        </div>
        <S.Toolbar>
          <S.SearchForm onSubmit={timKiem}>
            <S.SearchInput
              value={tuKhoa}
              onChange={(event) => setTuKhoa(event.target.value)}
              placeholder="Tim ten, SDT, email..."
            />
            <S.Button type="submit">Tim kiem</S.Button>
          </S.SearchForm>
          <S.Button type="button" onClick={taiLai}>Tai lai</S.Button>
        </S.Toolbar>
      </S.Header>

      {thongBao && <S.Thongbao $loai={thongBao.loai}>{thongBao.noidung}</S.Thongbao>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Tong khach hang</div>
          <strong style={{ fontSize: 28 }}>{thongKe.tongKhachHang}</strong>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Co tai khoan</div>
          <strong style={{ fontSize: 28, color: '#2563eb' }}>{thongKe.coTaiKhoan}</strong>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Chua co tai khoan</div>
          <strong style={{ fontSize: 28, color: '#059669' }}>{thongKe.chuaCoTaiKhoan}</strong>
        </div>
      </div>

      {dangTai && <S.Loading>Dang tai du lieu khach hang...</S.Loading>}

      <S.Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tai khoan</th>
            <th>Ho ten</th>
            <th>SDT</th>
            <th>Email</th>
            <th>Dia chi</th>
            <th>Ngay sinh</th>
            <th>Gioi tinh</th>
            <th>Ngay dang ky</th>
          </tr>
        </thead>
        <tbody>
          {danhSachKhachHang.map((khachHang) => (
            <tr key={khachHang.khachHang_Id}>
              <td>#{khachHang.khachHang_Id}</td>
              <td>{khachHang.taiKhoan_Id ? `TK #${khachHang.taiKhoan_Id}` : 'Chua gan'}</td>
              <td><strong>{khachHang.hoTen}</strong></td>
              <td>{khachHang.soDienThoai || '-'}</td>
              <td>{khachHang.email || '-'}</td>
              <td style={{ maxWidth: 280, whiteSpace: 'normal', lineHeight: 1.5 }}>{khachHang.diaChi || '-'}</td>
              <td>{formatDate(khachHang.ngaySinh)}</td>
              <td>{formatGender(khachHang.gioiTinh)}</td>
              <td>{formatDate(khachHang.ngayDangKy)}</td>
            </tr>
          ))}
          {!dangTai && danhSachKhachHang.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center', padding: '24px 12px', color: '#666' }}>
                Khong co du lieu khach hang.
              </td>
            </tr>
          )}
        </tbody>
      </S.Table>
    </S.Container>
  );
};
