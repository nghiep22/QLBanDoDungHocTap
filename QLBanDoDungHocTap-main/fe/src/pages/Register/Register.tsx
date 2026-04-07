// ============================================
// TRANG ĐĂNG KÝ
// ============================================

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { dichVuApi } from '../../services/api';
import { useDangNhap } from '../../context/AuthContext';
import * as S from '../Login/styles';

export const Register = () => {
  // ============================================
  // STATE QUẢN LÝ FORM
  // ============================================
  const [tenDangNhap, setTenDangNhap] = useState('');          // Tên đăng nhập
  const [matKhau, setMatKhau] = useState('');                  // Mật khẩu
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');   // Xác nhận mật khẩu
  const [thongBaoLoi, setThongBaoLoi] = useState('');         // Thông báo lỗi
  const [dangXuLy, setDangXuLy] = useState(false);            // Đang xử lý request

  // ============================================
  // HOOKS
  // ============================================
  const dieuHuong = useNavigate();      // Hook điều hướng trang
  const { dangNhap } = useDangNhap();   // Lấy hàm đăng nhập để tự động login sau khi đăng ký

  // ============================================
  // VALIDATION: Kiểm tra dữ liệu đầu vào
  // ============================================
  const kiemTraDuLieu = (): boolean => {
    // Kiểm tra tên đăng nhập
    if (tenDangNhap.length < 3) {
      setThongBaoLoi('Tên đăng nhập phải có ít nhất 3 ký tự');
      return false;
    }

    // Kiểm tra mật khẩu
    if (matKhau.length < 6) {
      setThongBaoLoi('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    // Kiểm tra mật khẩu khớp
    if (matKhau !== xacNhanMatKhau) {
      setThongBaoLoi('Mật khẩu xác nhận không khớp');
      return false;
    }

    return true;
  };

  // ============================================
  // XỬ LÝ SUBMIT FORM ĐĂNG KÝ
  // ============================================
  const xuLySubmit = async (e: FormEvent) => {
    // Ngăn form reload trang
    e.preventDefault();
    
    // Reset thông báo lỗi cũ
    setThongBaoLoi('');

    // Kiểm tra validation
    if (!kiemTraDuLieu()) {
      return;
    }

    // Bật trạng thái đang xử lý
    setDangXuLy(true);

    try {
      console.log('🔵 Bắt đầu xử lý đăng ký...');
      
      // Gọi API đăng ký
      const ketQuaDangKy = await dichVuApi.dangKy({ 
        tenDangNhap, 
        matKhau 
      });
      
      console.log('✅ Đăng ký thành công!');

      // ============================================
      // TỰ ĐỘNG ĐĂNG NHẬP SAU KHI ĐĂNG KÝ THÀNH CÔNG
      // ============================================
      if (ketQuaDangKy && ketQuaDangKy.token) {
        console.log('🔵 Tự động đăng nhập...');
        
        // Lưu token và user vào Context
        await dangNhap({ tenDangNhap, matKhau });
        
        // Điều hướng về trang chủ
        console.log('→ Điều hướng đến trang chủ');
        dieuHuong('/');
      } else {
        // Nếu không có token, chuyển đến trang đăng nhập
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        dieuHuong('/dang-nhap');
      }
      
    } catch (loi: any) {
      // Xử lý lỗi
      console.error('❌ Lỗi đăng ký:', loi);
      setThongBaoLoi(loi.message || 'Đăng ký thất bại');
    } finally {
      // Tắt trạng thái đang xử lý
      setDangXuLy(false);
    }
  };

  // ============================================
  // RENDER GIAO DIỆN
  // ============================================
  return (
    <S.Container>
      <S.FormWrapper>
        {/* Logo */}
        <S.Logo>
          <h1>THIÊN LONG</h1>
          <span>Shop</span>
        </S.Logo>

        {/* Tiêu đề */}
        <S.Title>Đăng ký</S.Title>
        <S.Subtitle>Tạo tài khoản mới để mua sắm</S.Subtitle>

        {/* Hiển thị thông báo lỗi (nếu có) */}
        {thongBaoLoi && <S.ErrorMessage>{thongBaoLoi}</S.ErrorMessage>}

        {/* Form đăng ký */}
        <S.Form onSubmit={xuLySubmit}>
          {/* Input tên đăng nhập */}
          <S.FormGroup>
            <S.Label>Tên đăng nhập</S.Label>
            <S.Input
              type="text"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              placeholder="Nhập tên đăng nhập (tối thiểu 3 ký tự)"
              required
              minLength={3}
              disabled={dangXuLy}
            />
          </S.FormGroup>

          {/* Input mật khẩu */}
          <S.FormGroup>
            <S.Label>Mật khẩu</S.Label>
            <S.Input
              type="password"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              required
              minLength={6}
              disabled={dangXuLy}
            />
          </S.FormGroup>

          {/* Input xác nhận mật khẩu */}
          <S.FormGroup>
            <S.Label>Xác nhận mật khẩu</S.Label>
            <S.Input
              type="password"
              value={xacNhanMatKhau}
              onChange={(e) => setXacNhanMatKhau(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              required
              minLength={6}
              disabled={dangXuLy}
            />
          </S.FormGroup>

          {/* Nút submit */}
          <S.SubmitButton type="submit" disabled={dangXuLy}>
            {dangXuLy ? 'Đang đăng ký...' : 'Đăng ký'}
          </S.SubmitButton>
        </S.Form>

        {/* Footer - Link đến trang đăng nhập */}
        <S.Footer>
          Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập ngay</Link>
        </S.Footer>

        {/* Link quay về trang chủ */}
        <S.BackToHome to="/">← Quay về trang chủ</S.BackToHome>
      </S.FormWrapper>
    </S.Container>
  );
};
