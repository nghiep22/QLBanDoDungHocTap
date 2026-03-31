import api from '../config/axios';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types/user.type';

export const authService = {
  // POST /login/api/auth/login
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login/api/auth/login', {
      TenDangNhap: email,
      MatKhau: password,
    });
    return response.data;
  },

  // POST /login/api/auth/register (nếu có)
  async register(data: RegisterRequest): Promise<void> {
    await api.post('/login/api/auth/register', {
      TenDangNhap: data.tenDangNhap,
      Email: data.email,
      MatKhau: data.matKhau,
      HoTen: data.hoTen,
    });
  },

  // GET /login/api/auth/me
  async getMe(): Promise<User> {
    const response = await api.get<User>('/login/api/auth/me');
    return response.data;
  },
};
