import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useDangNhap } from '../../context/AuthContext';
import * as S from './styles';

export const Header = () => {
  const [timKiem, setTimKiem] = useState('');
  const { tongSoLuong } = useCart();
  const { nguoiDung, daDangNhap, dangXuat } = useDangNhap();
  const navigate = useNavigate();

  const xuLyTimKiem = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tìm kiếm:', timKiem);
  };

  const xuLyDangXuat = () => {
    dangXuat();
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
              {daDangNhap ? (
                <>
                  <span>Xin chào, {nguoiDung?.tenDangNhap}</span>
                  {nguoiDung?.vaiTro_Id === 1 && (
                    <Link to="/admin" style={{ color: '#ffd700', fontWeight: 'bold' }}>
                      Quản trị
                    </Link>
                  )}
                  <button onClick={xuLyDangXuat} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 600 }}>
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
                Tìm
              </S.SearchButton>
            </S.SearchForm>

            <S.CartButton to="/gio-hang">
              Giỏ hàng
              {tongSoLuong > 0 && <S.CartBadge>{tongSoLuong}</S.CartBadge>}
            </S.CartButton>
          </S.HeaderContent>
        </S.Container>
      </S.MainHeader>

      <S.NavBar>
        <S.Container>
          <S.NavContent>
            <S.NavLink to="/danh-muc/van-phong-pham">Văn phòng phẩm</S.NavLink>
            <S.NavLink to="/danh-muc/sach-vo">Sách & Vở</S.NavLink>
            <S.NavLink to="/danh-muc/dung-cu-ve">Dụng cụ vẽ</S.NavLink>
            <S.NavLink to="/danh-muc/ba-lo-tui">Ba lô & Túi</S.NavLink>
            <S.NavLink to="/danh-muc/dien-tu-hoc-tap">Điện tử học tập</S.NavLink>
          </S.NavContent>
        </S.Container>
      </S.NavBar>
    </S.HeaderWrapper>
  );
};
