import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import * as S from './styles';

export const Header = () => {
  const [timKiem, setTimKiem] = useState('');
  const { tongSoLuong } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const xuLyTimKiem = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tìm kiếm:', timKiem);
  };

  const xuLyDangXuat = () => {
    logout();
    navigate('/');
  };

  return (
    <S.HeaderWrapper>
      <S.TopBar>
        <S.Container>
          <S.TopBarContent>
            <S.TopBarLeft>
              <span>Hotline: 1900 866 819</span>
            </S.TopBarLeft>
            <S.TopBarRight>
              {isAuthenticated ? (
                <>
                  <span>Xin chào, {user?.tenDangNhap}</span>
                  {user?.vaiTro_Id === 1 && (
                    <Link to="/admin" style={{ color: '#ffd700', fontWeight: 'bold' }}>
                      Quản trị
                    </Link>
                  )}
                  <button onClick={xuLyDangXuat} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/dang-nhap">Đăng nhập</Link>
                  <Link to="/dang-ky">Đăng ký</Link>
                </>
              )}
            </S.TopBarRight>
          </S.TopBarContent>
        </S.Container>
      </S.TopBar>

      <S.MainHeader>
        <S.Container>
          <S.HeaderContent>
            <S.Logo to="/">
              <h1>THIÊN LONG</h1>
              <span>Shop</span>
            </S.Logo>

            <S.SearchForm onSubmit={xuLyTimKiem}>
              <S.SearchInput
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={timKiem}
                onChange={(e) => setTimKiem(e.target.value)}
              />
              <S.SearchButton type="submit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </S.SearchButton>
            </S.SearchForm>

            <S.CartButton to="/gio-hang">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 2L7 6M17 2L19 6M3 6H21M19 6L18 20H6L5 6M10 11V16M14 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {tongSoLuong > 0 && <S.CartBadge>{tongSoLuong}</S.CartBadge>}
            </S.CartButton>
          </S.HeaderContent>
        </S.Container>
      </S.MainHeader>

      <S.NavBar>
        <S.Container>
          <S.NavContent>
            <S.NavLink to="/danh-muc/but-viet">Bút viết</S.NavLink>
            <S.NavLink to="/danh-muc/van-phong-pham">Văn phòng phẩm</S.NavLink>
            <S.NavLink to="/danh-muc/dung-cu-hoc-tap">Dụng cụ học tập</S.NavLink>
            <S.NavLink to="/danh-muc/my-thuat">Mỹ thuật</S.NavLink>
            <S.NavLink to="/danh-muc/giay-in">Giấy in</S.NavLink>
            <S.NavLink to="/danh-muc/but-cao-cap">Bút cao cấp</S.NavLink>
          </S.NavContent>
        </S.Container>
      </S.NavBar>
    </S.HeaderWrapper>
  );
};
