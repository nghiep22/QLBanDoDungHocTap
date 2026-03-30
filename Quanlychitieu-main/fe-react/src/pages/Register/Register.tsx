import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import './Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    tenDangNhap: '',
    email: '',
    matKhau: '',
    xacNhanMatKhau: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.matKhau !== formData.xacNhanMatKhau) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        tenDangNhap: formData.tenDangNhap,
        email: formData.email,
        matKhau: formData.matKhau,
      });
      
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Đăng ký tài khoản</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="tenDangNhap">Tên đăng nhập</label>
          <input
            id="tenDangNhap"
            name="tenDangNhap"
            type="text"
            value={formData.tenDangNhap}
            onChange={handleChange}
            required
            placeholder="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="matKhau">Mật khẩu</label>
          <input
            id="matKhau"
            name="matKhau"
            type="password"
            value={formData.matKhau}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>

        <div className="form-group">
          <label htmlFor="xacNhanMatKhau">Xác nhận mật khẩu</label>
          <input
            id="xacNhanMatKhau"
            name="xacNhanMatKhau"
            type="password"
            value={formData.xacNhanMatKhau}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>

        <p className="form-footer">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}
