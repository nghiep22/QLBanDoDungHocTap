// ============================================
// DỊCH VỤ API - GỌI BACKEND
// ============================================

import { 
  YeuCauDangNhap, 
  YeuCauDangKy, 
  KetQuaDangNhap,
  SanPhamAPI,
  TaoSanPhamRequest,
  CapNhatSanPhamRequest,
  NhaCungCapAPI,
  TaoDonHangRequest,
  DonHangAPI,
  CapNhatTrangThaiDonHangRequest
} from '../types';

// URL gốc của API backend
const URL_API_GOC = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

class DichVuApi {
  // ============================================
  // HÀM PHỤ TRỢ: Tạo headers cho request
  // ============================================
  private taoHeaders(coToken = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Nếu cần token, lấy từ localStorage
    if (coToken) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // ============================================
  // API ĐĂNG NHẬP
  // ============================================
  async dangNhap(duLieu: YeuCauDangNhap): Promise<KetQuaDangNhap> {
    try {
      console.log('Gửi yêu cầu đăng nhập:', {
        url: `${URL_API_GOC}/login/api/auth/login`,
        duLieu: { ...duLieu, matKhau: '***' } // Ẩn mật khẩu khi log
      });

      // Gửi request POST đến backend
      const phanHoi = await fetch(`${URL_API_GOC}/login/api/auth/login`, {
        method: 'POST',
        headers: this.taoHeaders(),
        body: JSON.stringify(duLieu),
      });

      console.log('Trạng thái phản hồi:', phanHoi.status, phanHoi.statusText);

      // Đọc nội dung phản hồi
      const noiDung = await phanHoi.text();
      console.log('Nội dung phản hồi:', noiDung);
      
      // Kiểm tra lỗi
      if (!phanHoi.ok) {
        let thongBaoLoi = 'Đăng nhập thất bại';
        try {
          const loi = JSON.parse(noiDung);
          thongBaoLoi = loi.message || thongBaoLoi;
        } catch {
          thongBaoLoi = noiDung || thongBaoLoi;
        }
        console.error('Đăng nhập thất bại:', thongBaoLoi);
        throw new Error(thongBaoLoi);
      }

      // Parse JSON và trả về
      try {
        const ketQua = JSON.parse(noiDung);
        console.log('Đăng nhập thành công:', { ...ketQua, token: '***' });
        return ketQua;
      } catch (loi) {
        console.error('Lỗi parse JSON:', loi);
        throw new Error('Lỗi phản hồi từ server');
      }
    } catch (loi: any) {
      console.error('Lỗi đăng nhập:', loi);
      if (loi.message) throw loi;
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa.');
    }
  }

  // ============================================
  // API ĐĂNG KÝ
  // ============================================
  async dangKy(duLieu: YeuCauDangKy): Promise<KetQuaDangNhap> {
    try {
      console.log('Gửi yêu cầu đăng ký:', {
        url: `${URL_API_GOC}/login/api/auth/register`,
        duLieu: { ...duLieu, matKhau: '***' }
      });

      // Gửi request POST đến backend
      const phanHoi = await fetch(`${URL_API_GOC}/login/api/auth/register`, {
        method: 'POST',
        headers: this.taoHeaders(),
        body: JSON.stringify(duLieu),
      });

      // Đọc nội dung phản hồi
      const noiDung = await phanHoi.text();
      console.log('Nội dung phản hồi đăng ký:', noiDung);

      // Kiểm tra lỗi
      if (!phanHoi.ok) {
        let thongBaoLoi = 'Đăng ký thất bại';
        try {
          const loi = JSON.parse(noiDung);
          thongBaoLoi = loi.message || thongBaoLoi;
        } catch {
          thongBaoLoi = noiDung || thongBaoLoi;
        }
        console.error('Đăng ký thất bại:', thongBaoLoi);
        throw new Error(thongBaoLoi);
      }

      // Parse JSON và trả về
      try {
        const ketQua = JSON.parse(noiDung);
        console.log('Đăng ký thành công:', { ...ketQua, token: '***' });
        return ketQua;
      } catch (loi) {
        console.error('Lỗi parse JSON:', loi);
        throw new Error('Lỗi phản hồi từ server');
      }
    } catch (loi: any) {
      console.error('Lỗi đăng ký:', loi);
      if (loi.message) throw loi;
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa.');
    }
  }

  // ============================================
  // API LẤY THÔNG TIN NGƯỜI DÙNG HIỆN TẠI
  // ============================================
  async layThongTinCuaToi(): Promise<any> {
    try {
      const phanHoi = await fetch(`${URL_API_GOC}/login/api/auth/me`, {
        headers: this.taoHeaders(true), // Có token
      });

      if (!phanHoi.ok) {
        throw new Error('Không thể lấy thông tin người dùng');
      }

      return phanHoi.json();
    } catch (loi: any) {
      console.error('Lỗi lấy thông tin:', loi);
      throw loi;
    }
  }

  // ============================================
  // QUẢN LÝ SẢN PHẨM
  // ============================================
  
  // Lấy danh sách tất cả sản phẩm
  async layDanhSachSanPham(loaiId?: number, trangThai?: boolean): Promise<SanPhamAPI[]> {
    const params = new URLSearchParams();
    if (loaiId) params.append('loaiId', loaiId.toString());
    if (trangThai !== undefined) params.append('trangThai', trangThai.toString());
    
    const url = params.toString() ? `/api/dohoctap?${params}` : '/api/dohoctap';
    const response = await fetch(`${URL_API_GOC}${url}`);
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách sản phẩm');
    }
    
    return response.json();
  }
  
  // Lấy chi tiết một sản phẩm
  async layChiTietSanPham(id: number): Promise<SanPhamAPI> {
    const response = await fetch(`${URL_API_GOC}/api/dohoctap/${id}`);
    
    if (!response.ok) {
      throw new Error('Không tìm thấy sản phẩm');
    }
    
    return response.json();
  }
  
  // Tạo sản phẩm mới
  async taoSanPham(data: TaoSanPhamRequest): Promise<{ id: number }> {
    const response = await fetch(`${URL_API_GOC}/api/dohoctap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể tạo sản phẩm');
    }
    
    return response.json();
  }
  
  // Cập nhật sản phẩm
  async capNhatSanPham(id: number, data: CapNhatSanPhamRequest): Promise<void> {
    const response = await fetch(`${URL_API_GOC}/api/dohoctap/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể cập nhật sản phẩm');
    }
  }
  
  // Xóa sản phẩm
  async xoaSanPham(id: number): Promise<void> {
    const response = await fetch(`${URL_API_GOC}/api/dohoctap/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể xóa sản phẩm');
    }
  }
  
  // Lấy danh sách nhà cung cấp
  async layDanhSachNhaCungCap(): Promise<NhaCungCapAPI[]> {
    const response = await fetch(`${URL_API_GOC}/api/nhacungcap`);
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách nhà cung cấp');
    }
    
    return response.json();
  }

  // Tạo đơn hàng
  async taoDonHang(data: TaoDonHangRequest): Promise<{ id: number }> {
    const response = await fetch(`${URL_API_GOC}/api/donhang`, {
      method: 'POST',
      headers: this.taoHeaders(true),
      body: JSON.stringify(data),
    });

    const noiDung = await response.text();

    if (!response.ok) {
      try {
        const error = JSON.parse(noiDung);
        throw new Error(error.message || 'Không thể tạo đơn hàng');
      } catch {
        throw new Error(noiDung || 'Không thể tạo đơn hàng');
      }
    }

    return JSON.parse(noiDung);
  }

  // Lấy danh sách đơn hàng
  async layDanhSachDonHang(trangThai?: string): Promise<DonHangAPI[]> {
    const params = new URLSearchParams();
    if (trangThai) params.append('trangThai', trangThai);

    const url = params.toString() ? `/api/donhang?${params}` : '/api/donhang';
    const response = await fetch(`${URL_API_GOC}${url}`, {
      headers: this.taoHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Không thể lấy danh sách đơn hàng');
    }

    return response.json();
  }

  // Cập nhật trạng thái đơn hàng
  async capNhatTrangThaiDonHang(id: number, data: CapNhatTrangThaiDonHangRequest): Promise<void> {
    const response = await fetch(`${URL_API_GOC}/api/donhang/${id}/status`, {
      method: 'PATCH',
      headers: this.taoHeaders(true),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const noiDung = await response.text();
      try {
        const error = JSON.parse(noiDung);
        throw new Error(error.message || 'Không thể cập nhật trạng thái đơn hàng');
      } catch {
        throw new Error(noiDung || 'Không thể cập nhật trạng thái đơn hàng');
      }
    }
  }
}

// Export instance để sử dụng
export const dichVuApi = new DichVuApi();

// Export class để test (nếu cần)
export default DichVuApi;
