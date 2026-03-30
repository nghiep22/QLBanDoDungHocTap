import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <h1>Quản lý chi tiêu</h1>
        </Link>
        
        <nav className="header-nav">
          <Link to="/dashboard">Tổng quan</Link>
          <Link to="/transactions">Giao dịch</Link>
          <Link to="/wallets">Ví</Link>
          <Link to="/categories">Danh mục</Link>
          <Link to="/budgets">Ngân sách</Link>
          <Link to="/goals">Mục tiêu</Link>
        </nav>

        <div className="header-user">
          {user ? (
            <>
              <span className="user-name">{user.tenDangNhap || user.email}</span>
              <button onClick={handleLogout} className="btn-logout">
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-login">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
