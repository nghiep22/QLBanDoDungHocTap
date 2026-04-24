// ============================================
// TRANG ĐĂNG NHẬP
// ============================================

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDangNhap } from '../../context/AuthContext';
import * as S from './styles';

export const Login = () => {
  // ============================================
  // STATE QUẢN LÝ FORM
  // ============================================
  const [tenDangNhap, setTenDangNhap] = useState('');  // Tên đăng nhập
  const [matKhau, setMatKhau] = useState('');          // Mật khẩu
  const [thongBaoLoi, setThongBaoLoi] = useState(''); // Thông báo lỗi
  const [dangXuLy, setDangXuLy] = useState(false);    // Đang xử lý request

  // ============================================
  // HOOKS
  // ============================================
  const { dangNhap } = useDangNhap();  // Lấy hàm đăng nhập từ Context
  const dieuHuong = useNavigate();      // Hook điều hướng trang

  // ============================================
  // XỬ LÝ SUBMIT FORM ĐĂNG NHẬP
  // ============================================
  const xuLySubmit = async (e: FormEvent) => {
    // Ngăn form reload trang
    e.preventDefault();
    
    // Reset thông báo lỗi cũ
    setThongBaoLoi('');
    
    // Bật trạng thái đang xử lý
    setDangXuLy(true);

    try {
      console.log('Bắt đầu xử lý đăng nhập...');
      
      // Gọi hàm đăng nhập từ Context
      const ketQua = await dangNhap({ 
        tenDangNhap, 
        matKhau 
      });
      
      console.log('Đăng nhập thành công, chuẩn bị điều hướng...');
      
      // ============================================
      // PHÂN QUYỀN: Điều hướng theo vai trò
      // ============================================
      if (ketQua.user.vaiTro_Id === 1) {
        // Admin → Trang quản trị
        console.log('→ Điều hướng đến trang Admin');
        dieuHuong('/admin');
      } else {
        // User thường → Trang chủ
        console.log('→ Điều hướng đến trang chủ');
        dieuHuong('/');
      }
      
    } catch (loi: any) {
      // Xử lý lỗi
      console.error('Lỗi đăng nhập:', loi);
      setThongBaoLoi(loi.message || 'Đăng nhập thất bại');
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
        <S.Title>Đăng nhập</S.Title>
        <S.Subtitle>Chào mừng bạn quay trở lại!</S.Subtitle>

        {/* Hiển thị thông báo lỗi (nếu có) */}
        {thongBaoLoi && <S.ErrorMessage>{thongBaoLoi}</S.ErrorMessage>}

        {/* Form đăng nhập */}
        <S.Form onSubmit={xuLySubmit}>
          {/* Input tên đăng nhập */}
          <S.FormGroup>
            <S.Label>Tên đăng nhập</S.Label>
            <S.Input
              type="text"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
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
              placeholder="Nhập mật khẩu"
              required
              disabled={dangXuLy}
            />
          </S.FormGroup>

          {/* Nút submit */}
          <S.SubmitButton type="submit" disabled={dangXuLy}>
            {dangXuLy ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </S.SubmitButton>
        </S.Form>

        {/* Footer */}
        <S.Footer>
          <small>Chức năng đăng ký đang được phát triển</small>
        </S.Footer>

        {/* Link quay về trang chủ */}
        <S.BackToHome to="/">← Quay về trang chủ</S.BackToHome>
      </S.FormWrapper>
    </S.Container>
  );
};
