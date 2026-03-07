import { Link, useLocation } from 'react-router-dom';
import { useDangNhap } from '../../ngucanh/NguCanhXacThuc';
import { useNavigate } from 'react-router-dom';

export default function ThanhTieuDe() {
    const { nguoiDung, token, dangXuat } = useDangNhap();
    const navigate = useNavigate();

    const xuLyDangXuat = () => {
        dangXuat();
        navigate('/dang-nhap');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <h1><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>QL Ngân Quỹ</Link></h1>
                </div>
                <div className="header-search">
                    <input type="text" placeholder="Tìm kiếm giao dịch..." />
                </div>
                <div className="header-right">
                    {!token ? (
                        <div className="header-auth-btns" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Link to="/dang-nhap" className="btn btn-outline btn-sm">Đăng nhập</Link>
                            <Link to="/dang-ky" className="btn btn-primary btn-sm">Đăng ký</Link>
                        </div>
                    ) : (
                        <div className="avatar-dropdown">
                            <img src="https://via.placeholder.com/40" alt="Avatar" className="avatar-img" />
                            <span className="user-name">{nguoiDung?.hoTen || nguoiDung?.tenDangNhap || 'Người dùng'}</span>
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item">Hồ sơ</a>
                                <a href="#" className="dropdown-item">Đổi mật khẩu</a>
                                <a href="#" className="dropdown-item" onClick={xuLyDangXuat}>Đăng xuất</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export function ThanhDieuHuong() {
    const location = useLocation();

    const danhSachMenu = [
        { duongDan: '/', nhan: 'Tổng quan' },
        { duongDan: '/giao-dich', nhan: 'Giao dịch' },
        { duongDan: '/vi', nhan: 'Ví' },
        { duongDan: '/danh-muc', nhan: 'Danh mục' },
        { duongDan: '/ngan-sach', nhan: 'Ngân sách' },
        { duongDan: '/muc-tieu', nhan: 'Mục tiêu' },
    ];

    return (
        <nav className="nav">
            <div className="nav-container">
                {danhSachMenu.map((m) => (
                    <Link
                        key={m.duongDan}
                        to={m.duongDan}
                        className={`nav-item ${location.pathname === m.duongDan ? 'active' : ''}`}
                    >
                        {m.nhan}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export function ChanTrang() {
    return (
        <footer className="footer">
            <p>&copy; 2024 QL Ngân Quỹ. Quản lý chi tiêu thông minh cho tương lai tốt hơn.</p>
        </footer>
    );
}
