const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface LoginRequest {
  tenDangNhap: string;
  matKhau: string;
}

export interface LoginResponse {
  token: string;
  user: {
    taiKhoan_Id: number;
    tenDangNhap: string;
    vaiTro_Id: number;
  };
}

export interface RegisterRequest {
  tenDangNhap: string;
  matKhau: string;
  xacNhanMatKhau: string;
}

class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔵 Login request:', {
        url: `${API_BASE_URL}/login/api/auth/login`,
        data: { ...data, matKhau: '***' }
      });

      const response = await fetch(`${API_BASE_URL}/login/api/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      console.log('🔵 Response status:', response.status, response.statusText);
      console.log('🔵 Response headers:', Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log('🔵 Response text:', text);
      
      if (!response.ok) {
        let errorMessage = 'Đăng nhập thất bại';
        try {
          const error = JSON.parse(text);
          errorMessage = error.message || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        console.error('❌ Login failed:', errorMessage);
        throw new Error(errorMessage);
      }

      try {
        const parsed = JSON.parse(text);
        console.log('✅ Login success:', { ...parsed, token: '***' });
        return parsed;
      } catch (e) {
        console.error('❌ JSON parse error:', e);
        throw new Error('Lỗi phản hồi từ server');
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      if (error.message) throw error;
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa.');
    }
  }

  async register(data: RegisterRequest): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/login/api/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      const text = await response.text();

      if (!response.ok) {
        let errorMessage = 'Đăng ký thất bại';
        try {
          const error = JSON.parse(text);
          errorMessage = error.message || errorMessage;
        } catch {
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      if (error.message) throw error;
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra backend đã chạy chưa.');
    }
  }

  async getMe(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/login/api/auth/me`, {
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Không thể lấy thông tin người dùng');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
