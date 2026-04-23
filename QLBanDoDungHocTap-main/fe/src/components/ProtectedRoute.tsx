// ============================================
// COMPONENT BẢO VỆ ROUTE
// Chỉ cho phép truy cập nếu đã đăng nhập
// ============================================

import { Navigate } from 'react-router-dom';
import { useDangNhap } from '../context/AuthContext';

// ============================================
// ĐỊNH NGHĨA PROPS
// ============================================
interface PropsRouteBaoVe {
  children: React.ReactNode;  // Nội dung bên trong route
  yeuCauAdmin?: boolean;       // Có yêu cầu quyền admin không?
}

// ============================================
// COMPONENT PROTECTED ROUTE
// ============================================
export const ProtectedRoute = ({ 
  children, 
  yeuCauAdmin = false 
}: PropsRouteBaoVe) => {
  // Lấy thông tin từ Context
  const { nguoiDung, daDangNhap, dangTai } = useDangNhap();

  // ============================================
  // TRƯỜNG HỢP 1: Đang tải dữ liệu
  // ============================================
  if (dangTai) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Đang tải...
      </div>
    );
  }

  // ============================================
  // TRƯỜNG HỢP 2: Chưa đăng nhập
  // → Chuyển đến trang đăng nhập
  // ============================================
  if (!daDangNhap) {
    console.log('⚠️ Chưa đăng nhập, chuyển đến /dang-nhap');
    return <Navigate to="/dang-nhap" replace />;
  }

  // ============================================
  // TRƯỜNG HỢP 3: Yêu cầu admin nhưng không phải admin
  // → Chuyển về trang chủ
  // ============================================
  if (yeuCauAdmin && nguoiDung?.vaiTro_Id !== 1) {
    console.log(' Không có quyền admin, chuyển về trang chủ');
    return <Navigate to="/" replace />;
  }

  // ============================================
  // TRƯỜNG HỢP 4: Đã đăng nhập và có quyền
  // → Cho phép truy cập
  // ============================================
  console.log(' Cho phép truy cập route');
  return <>{children}</>;
};
