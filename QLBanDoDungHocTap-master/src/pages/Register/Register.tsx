import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import * as S from '../Login/styles';

export const Register = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (matKhau !== xacNhanMatKhau) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (matKhau.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsLoading(true);

    try {
      await apiService.register({ tenDangNhap, matKhau, xacNhanMatKhau });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/dang-nhap');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Logo>
          <h1>THIÊN LONG</h1>
          <span>Shop</span>
        </S.Logo>

        <S.Title>Đăng ký</S.Title>
        <S.Subtitle>Tạo tài khoản mới để mua sắm</S.Subtitle>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label>Tên đăng nhập</S.Label>
            <S.Input
              type="text"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
              minLength={3}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Mật khẩu</S.Label>
            <S.Input
              type="password"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              required
              minLength={6}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Xác nhận mật khẩu</S.Label>
            <S.Input
              type="password"
              value={xacNhanMatKhau}
              onChange={(e) => setXacNhanMatKhau(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              required
              minLength={6}
            />
          </S.FormGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </S.SubmitButton>
        </S.Form>

        <S.Footer>
          Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập ngay</Link>
        </S.Footer>

        <S.BackToHome to="/">← Quay về trang chủ</S.BackToHome>
      </S.FormWrapper>
    </S.Container>
  );
};
