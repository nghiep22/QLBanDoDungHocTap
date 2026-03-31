import { useDangNhap } from '../ngucanh/NguCanhXacThuc';
import { useNavigate } from 'react-router-dom';

export default function TrangQuanTri() {
    const { nguoiDung, dangXuat } = useDangNhap();
    const navigate = useNavigate();
    const xuLyDangXuat = () => { dangXuat(); navigate('/dang-nhap'); };

    return (
        <div className="admin-wrapper">
            <div className="sidebar">
                <div className="sidebar-logo">📊 QL Ngân Quỹ</div>
                <nav className="sidebar-menu">
                    <a href="#" className="active">📈 Tổng quan</a>
                    <a href="#">👥 Quản lý tài khoản</a>
                    <a href="#">💼 Quản lý ví</a>
                    <a href="#">📋 Quản lý danh mục</a>
                    <a href="#">🔄 Quản lý giao dịch</a>
                    <a href="#">💰 Ngân sách</a>
                    <a href="#">🎯 Mục tiêu tiết kiệm</a>
                    <a href="#">↔️ Chuyển tiền ví</a>
                    <a href="#">🔔 Thông báo</a>
                    <a href="#" onClick={xuLyDangXuat}>🚪 Đăng xuất</a>
                </nav>
            </div>
            <div style={{ flex: 1 }}>
                <div className="topbar">
                    <div className="topbar-content">
                        <div className="topbar-search">
                            <input type="text" placeholder="Tìm kiếm..." />
                        </div>
                        <div className="topbar-right">
                            <div className="topbar-bell">🔔</div>
                            <div className="topbar-avatar">
                                <img src="https://via.placeholder.com/40" alt="Admin" />
                                <span>{nguoiDung?.hoTen || 'Admin'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="main-content">
                        <div className="cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
                            <div className="card"><div className="card-stat"><div><h3 style={{ fontSize: '13px', color: '#6b7280' }}>Tổng người dùng</h3><div style={{ fontSize: '24px', fontWeight: 700 }}>1,245</div></div><div style={{ fontSize: '32px', opacity: 0.2 }}>👥</div></div></div>
                            <div className="card"><div className="card-stat"><div><h3 style={{ fontSize: '13px', color: '#6b7280' }}>Giao dịch tháng này</h3><div style={{ fontSize: '24px', fontWeight: 700 }}>3,856</div></div><div style={{ fontSize: '32px', opacity: 0.2 }}>🔄</div></div></div>
                            <div className="card"><div className="card-stat"><div><h3 style={{ fontSize: '13px', color: '#6b7280' }}>Tổng chi tháng</h3><div style={{ fontSize: '24px', fontWeight: 700 }}>2.5B ₫</div></div><div style={{ fontSize: '32px', opacity: 0.2 }}>💸</div></div></div>
                            <div className="card"><div className="card-stat"><div><h3 style={{ fontSize: '13px', color: '#6b7280' }}>Cảnh báo ngân sách</h3><div style={{ fontSize: '24px', fontWeight: 700 }}>34</div></div><div style={{ fontSize: '32px', opacity: 0.2 }}>⚠️</div></div></div>
                        </div>
                        <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
                            <h2 style={{ marginBottom: '16px' }}>Quản lý tài khoản</h2>
                            <p style={{ color: '#64748b' }}>Chức năng admin sẽ được tích hợp API quản trị.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
