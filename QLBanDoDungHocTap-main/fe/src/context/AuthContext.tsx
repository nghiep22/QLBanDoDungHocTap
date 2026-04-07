// ============================================
// CONTEXT QUẢN LÝ TRẠNG THÁI ĐĂNG NHẬP
// ============================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dichVuApi } from '../services/api';
import { NguoiDung, YeuCauDangNhap, KetQuaDangNhap } from '../types';

// ============================================
// ĐỊNH NGHĨA KIỂU DỮ LIỆU CHO CONTEXT
// ============================================
interface KieuAuthContext {
  nguoiDung: NguoiDung | null;           // Thông tin người dùng hiện tại
  token: string | null;                   // JWT token
  dangNhap: (duLieu: YeuCauDangNhap) => Promise<KetQuaDangNhap>;  // Hàm đăng nhập
  dangXuat: () => void;                   // Hàm đăng xuất
  daDangNhap: boolean;                    // Trạng thái đã đăng nhập chưa
  dangTai: boolean;                       // Trạng thái đang tải
}

// ============================================
// TẠO CONTEXT
// ============================================
const AuthContext = createContext<KieuAuthContext | undefined>(undefined);

// ============================================
// PROVIDER - CUNG CẤP STATE CHO TOÀN ỨNG DỤNG
// ============================================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State quản lý thông tin người dùng
  const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(null);
  
  // State quản lý token
  const [token, setToken] = useState<string | null>(null);
  
  // State quản lý trạng thái loading
  const [dangTai, setDangTai] = useState(true);

  // ============================================
  // EFFECT: TỰ ĐỘNG ĐĂNG NHẬP KHI MỞ APP
  // Kiểm tra localStorage có token không
  // ============================================
  useEffect(() => {
    const tokenDaLuu = localStorage.getItem('token');
    const nguoiDungDaLuu = localStorage.getItem('user');

    // Nếu có token và user đã lưu → Tự động đăng nhập
    if (tokenDaLuu && nguoiDungDaLuu) {
      setToken(tokenDaLuu);
      setNguoiDung(JSON.parse(nguoiDungDaLuu));
      console.log('✅ Tự động đăng nhập từ localStorage');
    }
    
    setDangTai(false);
  }, []);

  // ============================================
  // HÀM ĐĂNG NHẬP
  // ============================================
  const dangNhap = async (duLieu: YeuCauDangNhap): Promise<KetQuaDangNhap> => {
    try {
      console.log('🔵 Bắt đầu đăng nhập...');
      
      // Gọi API đăng nhập
      const ketQua = await dichVuApi.dangNhap(duLieu);
      
      // Lưu token và thông tin user vào state
      setToken(ketQua.token);
      setNguoiDung(ketQua.user);
      
      // Lưu vào localStorage để persistent (giữ khi refresh)
      localStorage.setItem('token', ketQua.token);
      localStorage.setItem('user', JSON.stringify(ketQua.user));
      
      console.log('✅ Đăng nhập thành công, đã lưu vào localStorage');
      
      return ketQua;
    } catch (loi) {
      console.error('❌ Lỗi trong hàm dangNhap:', loi);
      throw loi;
    }
  };

  // ============================================
  // HÀM ĐĂNG XUẤT
  // ============================================
  const dangXuat = () => {
    console.log('🔵 Đăng xuất...');
    
    // Xóa state
    setToken(null);
    setNguoiDung(null);
    
    // Xóa localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    console.log('✅ Đã đăng xuất và xóa localStorage');
  };

  // ============================================
  // TÍNH TOÁN TRẠNG THÁI ĐÃ ĐĂNG NHẬP
  // ============================================
  const daDangNhap = !!token;

  // ============================================
  // CUNG CẤP STATE VÀ FUNCTIONS CHO TOÀN APP
  // ============================================
  return (
    <AuthContext.Provider
      value={{
        nguoiDung,
        token,
        dangNhap,
        dangXuat,
        daDangNhap,
        dangTai,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ============================================
// HOOK - SỬ DỤNG CONTEXT Ở BẤT KỲ ĐÂU
// ============================================
export const useDangNhap = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useDangNhap phải được sử dụng trong AuthProvider');
  }
  
  return context;
};

// Export tên cũ để tương thích
export const useAuth = useDangNhap;
