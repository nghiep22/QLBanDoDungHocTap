import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dangNhap, duongDanSauDangNhap } from '../dichvu/dichVuXacThuc';
import { useDangNhap } from '../ngucanh/NguCanhXacThuc';

export default function TrangDangNhap() {
    const navigate = useNavigate();
    const { capNhatPhien } = useDangNhap();
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [ghiNho, setGhiNho] = useState(false);
    const [thongBao, setThongBao] = useState('');
    const [loiThongBao, setLoiThongBao] = useState(false);
    const [dangXuLy, setDangXuLy] = useState(false);

    const xuLyDangNhap = async (e: FormEvent) => {
        e.preventDefault();
        setDangXuLy(true);
        setThongBao('Đang đăng nhập...');
        setLoiThongBao(false);
        try {
            const data = await dangNhap({ tenDangNhap, matKhau }, ghiNho);
            setThongBao('Đăng nhập thành công!');
            capNhatPhien();
            setTimeout(() => navigate(duongDanSauDangNhap(data.user)), 500);
        } catch (err: unknown) {
            setLoiThongBao(true);
            setThongBao((err as Error).message || 'Đăng nhập thất bại');
            setDangXuLy(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="logo">📊</div>
                    <h1>QL Ngân Quỹ</h1>
                    <p>Quản lý chi tiêu cá nhân thông minh</p>
                </div>
                {thongBao && (
                    <div style={{ margin: '0 0 14px', padding: '10px 12px', borderRadius: '10px', background: loiThongBao ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)', color: loiThongBao ? '#7f1d1d' : '#065f46' }}>
                        {thongBao}
                    </div>
                )}
                <form onSubmit={xuLyDangNhap}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input type="text" value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} placeholder="Nhập tên đăng nhập" required />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input type="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} placeholder="Nhập mật khẩu" required />
                    </div>
                    <div className="form-remember">
                        <label><input type="checkbox" checked={ghiNho} onChange={(e) => setGhiNho(e.target.checked)} /> Ghi nhớ đăng nhập</label>
                        <a href="#" className="forgot-password">Quên mật khẩu?</a>
                    </div>
                    <button type="submit" className="btn-submit" disabled={dangXuLy}>Đăng Nhập</button>
                </form>
                <div className="login-footer">Chưa có tài khoản? <Link to="/dang-ky">Đăng ký ngay</Link></div>
            </div>
        </div>
    );
}
