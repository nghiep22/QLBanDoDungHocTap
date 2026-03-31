import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/shop.css';

interface HeaderProps {
  soLuongGioHang: number;
  onTimKiem: (tuKhoa: string) => void;
}

export default function Header({ soLuongGioHang, onTimKiem }: HeaderProps) {
  const [tuKhoa, setTuKhoa] = useState('');

  const xuLyTimKiem = (e: React.FormEvent) => {
    e.preventDefault();
    onTimKiem(tuKhoa);
  };

  return (
    <header className="header-shop">
      <div className="header-top">
        <div className="container">
          <div className="header-top-left">
            <i className="fas fa-phone"></i> Hotline: 1900 6868
          </div>
          <div className="header-top-right">
            <Link to="/dang-nhap"><i className="fas fa-user"></i> Đăng nhập</Link>
            <Link to="/dang-ky"><i className="fas fa-user-plus"></i> Đăng ký</Link>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <Link to="/shop" className="logo">
            <h1>SHOP ĐỒ HỌC TẬP</h1>
          </Link>

          <form className="search-box" onSubmit={xuLyTimKiem}>
            <input
              type="text"
              value={tuKhoa}
              onChange={(e) => setTuKhoa(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button type="submit"><i className="fas fa-search"></i></button>
          </form>

          <div className="header-actions">
            <Link to="/gio-hang" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              {soLuongGioHang > 0 && <span className="cart-count">{soLuongGioHang}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <ul className="nav-menu">
            <li><Link to="/shop" className="active">Trang chủ</Link></li>
            <li><Link to="/shop">Tất cả sản phẩm</Link></li>
            <li><Link to="/shop">Sản phẩm mới</Link></li>
            <li><Link to="/shop">Top bán chạy</Link></li>
            <li><Link to="/quan-tri">Quản lý</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
