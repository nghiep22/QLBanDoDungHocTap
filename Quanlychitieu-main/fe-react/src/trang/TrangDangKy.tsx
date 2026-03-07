import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dangKy } from '../dichvu/dichVuXacThuc';

export default function TrangDangKy() {
    const navigate = useNavigate();
    const [hoTen, setHoTen] = useState('');
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [xacNhan, setXacNhan] = useState('');
    const [thongBao, setThongBao] = useState('');
    const [loiThongBao, setLoiThongBao] = useState(false);
    const [dangXuLy, setDangXuLy] = useState(false);

    const xuLyDangKy = async (e: FormEvent) => {
        e.preventDefault();
        if (matKhau !== xacNhan) { setThongBao('Mật khẩu xác nhận không khớp.'); setLoiThongBao(true); return; }
        setDangXuLy(true); setThongBao('Đang tạo tài khoản...'); setLoiThongBao(false);
        try {
            await dangKy({ hoTen, tenDangNhap, matKhau });
            setThongBao('Đăng ký thành công!');
            setTimeout(() => navigate('/dang-nhap'), 700);
        } catch (err: unknown) { setLoiThongBao(true); setThongBao((err as Error).message || 'Đăng ký thất bại'); setDangXuLy(false); }
    };

    return (
        <div className="login-container">
            <div className="login-box register-box">
                <div className="login-header">
                    <div className="logo">📊</div>
                    <h1>QL Ngân Quỹ</h1>
                    <p>Tạo tài khoản mới</p>
                </div>
                {thongBao && (
                    <div style={{ margin: '0 0 14px', padding: '10px 12px', borderRadius: '10px', background: loiThongBao ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)', color: loiThongBao ? '#7f1d1d' : '#065f46' }}>
                        {thongBao}
                    </div>
                )}
                <form onSubmit={xuLyDangKy}>
                    <div className="form-group">
                        <label>Họ tên</label>
                        <input type="text" value={hoTen} onChange={(e) => setHoTen(e.target.value)} placeholder="Nhập họ tên" required />
                    </div>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input type="text" value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} placeholder="Tối thiểu 4 ký tự" required />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input type="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} placeholder="Tối thiểu 6 ký tự" required />
                    </div>
                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input type="password" value={xacNhan} onChange={(e) => setXacNhan(e.target.value)} placeholder="Nhập lại mật khẩu" required />
                    </div>
                    <button type="submit" className="btn-submit" disabled={dangXuLy}>Đăng Ký</button>
                </form>
                <div className="login-footer">Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link></div>
            </div>
        </div>
    );
}
