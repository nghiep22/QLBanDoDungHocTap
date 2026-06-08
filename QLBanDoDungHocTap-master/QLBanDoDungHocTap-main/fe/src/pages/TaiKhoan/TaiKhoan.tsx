import { FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDangNhap } from '../../context/AuthContext';
import { dichVuApi } from '../../services/api';
import * as S from './styles';

const formatDate = (value?: string) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('vi-VN');
};

export const TaiKhoan = () => {
  const { nguoiDung, daDangNhap, capNhatNguoiDung } = useDangNhap();
  const [tenDangNhap, setTenDangNhap] = useState(nguoiDung?.tenDangNhap || '');
  const [matKhauCu, setMatKhauCu] = useState('');
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [xacNhanMatKhauMoi, setXacNhanMatKhauMoi] = useState('');
  const [dangLuuThongTin, setDangLuuThongTin] = useState(false);
  const [dangDoiMatKhau, setDangDoiMatKhau] = useState(false);
  const [loiThongTin, setLoiThongTin] = useState('');
  const [thongBaoThongTin, setThongBaoThongTin] = useState('');
  const [loiMatKhau, setLoiMatKhau] = useState('');
  const [thongBaoMatKhau, setThongBaoMatKhau] = useState('');

  useEffect(() => {
    setTenDangNhap(nguoiDung?.tenDangNhap || '');
  }, [nguoiDung?.tenDangNhap]);

  if (!daDangNhap) {
    return <Navigate to="/dang-nhap" replace />;
  }

  const capNhatThongTin = async (event: FormEvent) => {
    event.preventDefault();
    setDangLuuThongTin(true);
    setLoiThongTin('');
    setThongBaoThongTin('');

    try {
      const ketQua = await dichVuApi.capNhatTaiKhoanCuaToi({ tenDangNhap });
      capNhatNguoiDung(ketQua);
      setThongBaoThongTin(ketQua.message || 'Cập nhật tài khoản thành công.');
    } catch (error: any) {
      setLoiThongTin(error.message || 'Không thể cập nhật tài khoản.');
    } finally {
      setDangLuuThongTin(false);
    }
  };

  const doiMatKhau = async (event: FormEvent) => {
    event.preventDefault();
    setDangDoiMatKhau(true);
    setLoiMatKhau('');
    setThongBaoMatKhau('');

    try {
      const ketQua = await dichVuApi.doiMatKhau({
        matKhauCu,
        matKhauMoi,
        xacNhanMatKhauMoi,
      });
      setMatKhauCu('');
      setMatKhauMoi('');
      setXacNhanMatKhauMoi('');
      setThongBaoMatKhau(ketQua.message || 'Đổi mật khẩu thành công.');
    } catch (error: any) {
      setLoiMatKhau(error.message || 'Không thể đổi mật khẩu.');
    } finally {
      setDangDoiMatKhau(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title>Tài khoản của tôi</S.Title>
          <S.Subtitle>Quản lý thông tin đăng nhập và mật khẩu của bạn.</S.Subtitle>
        </div>
        <S.Badge>{nguoiDung?.vaiTro_Id === 1 ? 'Quản trị viên' : 'Người dùng'}</S.Badge>
      </S.Header>

      <S.Grid>
        <S.Panel>
          <S.PanelTitle>Thông tin tài khoản</S.PanelTitle>
          <S.PanelDescription>Cập nhật tên đăng nhập đang sử dụng cho tài khoản này.</S.PanelDescription>

          <S.InfoList>
            <S.InfoRow>
              <dt>Mã tài khoản</dt>
              <dd>{nguoiDung?.taiKhoan_Id}</dd>
            </S.InfoRow>
            <S.InfoRow>
              <dt>Ngày tạo</dt>
              <dd>{formatDate(nguoiDung?.ngayTao)}</dd>
            </S.InfoRow>
          </S.InfoList>

          <S.Form onSubmit={capNhatThongTin}>
            {loiThongTin && <S.Message $type="error">{loiThongTin}</S.Message>}
            {thongBaoThongTin && <S.Message $type="success">{thongBaoThongTin}</S.Message>}

            <S.Field>
              <S.Label htmlFor="tenDangNhap">Tên đăng nhập</S.Label>
              <S.Input
                id="tenDangNhap"
                value={tenDangNhap}
                onChange={(event) => setTenDangNhap(event.target.value)}
                minLength={3}
                required
              />
            </S.Field>

            <S.Button type="submit" disabled={dangLuuThongTin}>
              {dangLuuThongTin ? 'Đang lưu...' : 'Lưu thay đổi'}
            </S.Button>
          </S.Form>
        </S.Panel>

        <S.Panel>
          <S.PanelTitle>Đổi mật khẩu</S.PanelTitle>
          <S.PanelDescription>Mật khẩu mới cần tối thiểu 6 ký tự và khác mật khẩu hiện tại.</S.PanelDescription>

          <S.Form onSubmit={doiMatKhau}>
            {loiMatKhau && <S.Message $type="error">{loiMatKhau}</S.Message>}
            {thongBaoMatKhau && <S.Message $type="success">{thongBaoMatKhau}</S.Message>}

            <S.Field>
              <S.Label htmlFor="matKhauCu">Mật khẩu hiện tại</S.Label>
              <S.Input
                id="matKhauCu"
                type="password"
                value={matKhauCu}
                onChange={(event) => setMatKhauCu(event.target.value)}
                required
              />
            </S.Field>

            <S.Field>
              <S.Label htmlFor="matKhauMoi">Mật khẩu mới</S.Label>
              <S.Input
                id="matKhauMoi"
                type="password"
                value={matKhauMoi}
                onChange={(event) => setMatKhauMoi(event.target.value)}
                minLength={6}
                required
              />
            </S.Field>

            <S.Field>
              <S.Label htmlFor="xacNhanMatKhauMoi">Xác nhận mật khẩu mới</S.Label>
              <S.Input
                id="xacNhanMatKhauMoi"
                type="password"
                value={xacNhanMatKhauMoi}
                onChange={(event) => setXacNhanMatKhauMoi(event.target.value)}
                minLength={6}
                required
              />
            </S.Field>

            <S.Button type="submit" disabled={dangDoiMatKhau}>
              {dangDoiMatKhau ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </S.Button>
          </S.Form>
        </S.Panel>
      </S.Grid>
    </S.Container>
  );
};
