import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { dichVuApi } from '../../services/api';
import type { CapNhatKhachHangRequest, KhachHangAPI, TaoKhachHangRequest } from '../../types';
import * as S from './QuanLySanPham.styles.ts';

type FormKhachHang = {
  taiKhoan_Id: string;
  hoTen: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  ngaySinh: string;
  gioiTinh: string;
};

const formRong: FormKhachHang = {
  taiKhoan_Id: '',
  hoTen: '',
  soDienThoai: '',
  email: '',
  diaChi: '',
  ngaySinh: '',
  gioiTinh: '',
};

const formatDate = (value?: string | null) => value ? new Date(value).toLocaleDateString('vi-VN') : '-';
const formatGender = (value?: boolean | null) => value === true ? 'Nam' : value === false ? 'Nữ' : '-';

const chuanHoaForm = (form: FormKhachHang): TaoKhachHangRequest => ({
  taiKhoan_Id: form.taiKhoan_Id ? Number(form.taiKhoan_Id) : null,
  hoTen: form.hoTen.trim(),
  soDienThoai: form.soDienThoai.trim() || null,
  email: form.email.trim() || null,
  diaChi: form.diaChi.trim() || null,
  ngaySinh: form.ngaySinh || null,
  gioiTinh: form.gioiTinh === '' ? null : form.gioiTinh === 'true',
});

export const QuanLyKhachHang = () => {
  const [danhSachKhachHang, setDanhSachKhachHang] = useState<KhachHangAPI[]>([]);
  const [dangTai, setDangTai] = useState(false);
  const [tuKhoa, setTuKhoa] = useState('');
  const [tuKhoaDangTim, setTuKhoaDangTim] = useState('');
  const [dangMoForm, setDangMoForm] = useState(false);
  const [khachHangDangSua, setKhachHangDangSua] = useState<KhachHangAPI | null>(null);
  const [form, setForm] = useState<FormKhachHang>(formRong);
  const [thongBao, setThongBao] = useState<{ loai: 'thanh_cong' | 'loi'; noidung: string } | null>(null);

  const taiKhachHang = async (search = tuKhoaDangTim) => {
    setDangTai(true);
    try {
      const data = await dichVuApi.layDanhSachKhachHang(search);
      setDanhSachKhachHang(data);
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể tải danh sách khách hàng' });
    } finally {
      setDangTai(false);
    }
  };

  useEffect(() => {
    taiKhachHang('');
  }, []);

  const tongKhachHang = danhSachKhachHang.length;
  const khachCoTaiKhoan = useMemo(
    () => danhSachKhachHang.filter(khach => khach.taiKhoan_Id).length,
    [danhSachKhachHang]
  );

  const moFormThem = () => {
    setKhachHangDangSua(null);
    setForm(formRong);
    setDangMoForm(true);
  };

  const moFormSua = (khachHang: KhachHangAPI) => {
    setKhachHangDangSua(khachHang);
    setForm({
      taiKhoan_Id: khachHang.taiKhoan_Id?.toString() || '',
      hoTen: khachHang.hoTen || '',
      soDienThoai: khachHang.soDienThoai || '',
      email: khachHang.email || '',
      diaChi: khachHang.diaChi || '',
      ngaySinh: khachHang.ngaySinh ? khachHang.ngaySinh.slice(0, 10) : '',
      gioiTinh: khachHang.gioiTinh === null || khachHang.gioiTinh === undefined ? '' : String(khachHang.gioiTinh),
    });
    setDangMoForm(true);
  };

  const dongForm = () => {
    setDangMoForm(false);
    setKhachHangDangSua(null);
    setForm(formRong);
  };

  const timKiem = (event: FormEvent) => {
    event.preventDefault();
    const search = tuKhoa.trim();
    setTuKhoaDangTim(search);
    taiKhachHang(search);
  };

  const luuKhachHang = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const data = chuanHoaForm(form);
      if (!data.hoTen) {
        setThongBao({ loai: 'loi', noidung: 'Họ tên không được để trống' });
        return;
      }

      if (khachHangDangSua) {
        const updateData: CapNhatKhachHangRequest = {
          hoTen: data.hoTen,
          soDienThoai: data.soDienThoai,
          email: data.email,
          diaChi: data.diaChi,
          ngaySinh: data.ngaySinh,
          gioiTinh: data.gioiTinh,
        };
        await dichVuApi.capNhatKhachHang(khachHangDangSua.khachHang_Id, updateData);
        setThongBao({ loai: 'thanh_cong', noidung: 'Cập nhật khách hàng thành công' });
      } else {
        await dichVuApi.taoKhachHang(data);
        setThongBao({ loai: 'thanh_cong', noidung: 'Thêm khách hàng thành công' });
      }

      dongForm();
      taiKhachHang();
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể lưu khách hàng' });
    }
  };

  const xoaKhachHang = async (khachHang: KhachHangAPI) => {
    const dongY = window.confirm(`Xóa khách hàng "${khachHang.hoTen}"?`);
    if (!dongY) return;

    try {
      await dichVuApi.xoaKhachHang(khachHang.khachHang_Id);
      setThongBao({ loai: 'thanh_cong', noidung: 'Xóa khách hàng thành công' });
      taiKhachHang();
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể xóa khách hàng' });
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Quản lý khách hàng</h2>
        <S.Toolbar>
          <S.SearchForm onSubmit={timKiem}>
            <S.SearchInput
              value={tuKhoa}
              onChange={(e) => setTuKhoa(e.target.value)}
              placeholder="Tìm tên, SĐT, email..."
            />
            <S.Button type="submit">Tìm kiếm</S.Button>
          </S.SearchForm>
          <S.Button onClick={moFormThem}>Thêm khách hàng</S.Button>
          <S.Button onClick={() => taiKhachHang()}>Tải lại</S.Button>
        </S.Toolbar>
      </S.Header>

      {thongBao && (
        <S.Thongbao $loai={thongBao.loai}>
          {thongBao.noidung}
        </S.Thongbao>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Tổng khách hàng</div>
          <strong style={{ fontSize: 28 }}>{tongKhachHang}</strong>
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Có tài khoản</div>
          <strong style={{ fontSize: 28, color: '#2196f3' }}>{khachCoTaiKhoan}</strong>
        </div>
      </div>

      {dangTai && <S.Loading>Đang tải...</S.Loading>}

      <S.Table>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Ngày đăng ký</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhSachKhachHang.map(khachHang => (
            <tr key={khachHang.khachHang_Id}>
              <td>
                <strong style={{ color: '#333' }}>{khachHang.hoTen}</strong>
                {khachHang.taiKhoan_Id && (
                  <div style={{ fontSize: 12, color: '#777', marginTop: 4 }}>TK #{khachHang.taiKhoan_Id}</div>
                )}
              </td>
              <td>{khachHang.soDienThoai || '-'}</td>
              <td>{khachHang.email || '-'}</td>
              <td style={{ maxWidth: 260, whiteSpace: 'normal', lineHeight: 1.5 }}>{khachHang.diaChi || '-'}</td>
              <td>{formatDate(khachHang.ngaySinh)}</td>
              <td>{formatGender(khachHang.gioiTinh)}</td>
              <td>{formatDate(khachHang.ngayDangKy)}</td>
              <td>
                <S.ActionButtons>
                  <S.EditButton onClick={() => moFormSua(khachHang)}>Sửa</S.EditButton>
                  <S.DeleteButton onClick={() => xoaKhachHang(khachHang)}>Xóa</S.DeleteButton>
                </S.ActionButtons>
              </td>
            </tr>
          ))}
          {!dangTai && danhSachKhachHang.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', padding: '24px 12px', color: '#666' }}>
                Chưa có khách hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </S.Table>

      {dangMoForm && (
        <S.Modal>
          <S.ModalContent>
            <S.ModalHeader>
              <h3>{khachHangDangSua ? 'Sửa khách hàng' : 'Thêm khách hàng'}</h3>
              <S.CloseButton onClick={dongForm}>&times;</S.CloseButton>
            </S.ModalHeader>
            <S.Form onSubmit={luuKhachHang}>
              {!khachHangDangSua && (
                <S.FormGroup>
                  <label>Tài khoản ID</label>
                  <input
                    type="number"
                    min="1"
                    value={form.taiKhoan_Id}
                    onChange={(e) => setForm(prev => ({ ...prev, taiKhoan_Id: e.target.value }))}
                    placeholder="Bỏ trống nếu chưa gắn tài khoản"
                  />
                  <S.HelperText>Chỉ nhập khi tài khoản đã tồn tại và chưa gắn với khách hàng khác.</S.HelperText>
                </S.FormGroup>
              )}

              <S.FormRow>
                <S.FormGroup>
                  <label>Họ tên *</label>
                  <input
                    value={form.hoTen}
                    onChange={(e) => setForm(prev => ({ ...prev, hoTen: e.target.value }))}
                    required
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Số điện thoại</label>
                  <input
                    value={form.soDienThoai}
                    onChange={(e) => setForm(prev => ({ ...prev, soDienThoai: e.target.value }))}
                    maxLength={15}
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    value={form.ngaySinh}
                    onChange={(e) => setForm(prev => ({ ...prev, ngaySinh: e.target.value }))}
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <label>Giới tính</label>
                  <select
                    value={form.gioiTinh}
                    onChange={(e) => setForm(prev => ({ ...prev, gioiTinh: e.target.value }))}
                  >
                    <option value="">Chưa chọn</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </S.FormGroup>
                <S.FormGroup>
                  <label>Địa chỉ</label>
                  <input
                    value={form.diaChi}
                    onChange={(e) => setForm(prev => ({ ...prev, diaChi: e.target.value }))}
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormActions>
                <S.CancelButton type="button" onClick={dongForm}>Hủy</S.CancelButton>
                <S.SubmitButton type="submit">Lưu</S.SubmitButton>
              </S.FormActions>
            </S.Form>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};
