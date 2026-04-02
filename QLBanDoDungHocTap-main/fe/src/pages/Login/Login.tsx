import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as S from './styles';

export const Login = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({ tenDangNhap, matKhau });
      
      // Redirect based on role: admin (vaiTro_Id = 1) -> /admin, customer (vaiTro_Id = 2) -> /
      if (response.user.vaiTro_Id === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
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

        <S.Title>Đăng nhập</S.Title>
        <S.Subtitle>Chào mừng bạn quay trở lại!</S.Subtitle>

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
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Mật khẩu</S.Label>
            <S.Input
              type="password"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </S.FormGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </S.SubmitButton>
        </S.Form>

        <S.Footer>
          <small>Chức năng đăng ký đang được phát triển</small>
        </S.Footer>

        <S.BackToHome to="/">← Quay về trang chủ</S.BackToHome>
      </S.FormWrapper>
    </S.Container>
  );
};
