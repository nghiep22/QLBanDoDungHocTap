import axios from 'axios';
import { DoHocTap, LoaiDoHocTap, DonHang } from '../kieu/sanpham';

const API_URL = 'http://localhost:5000/api';

// Lấy token từ localStorage
const layToken = () => localStorage.getItem('token');

// Cấu hình axios với token
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = layToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Sản phẩm
export const apiSanPham = {
  layTatCa: async (loaiId?: number, trangThai?: boolean): Promise<DoHocTap[]> => {
    const params = new URLSearchParams();
    if (loaiId) params.append('loaiId', loaiId.toString());
    if (trangThai !== undefined) params.append('trangThai', trangThai.toString());
    
    const response = await axiosInstance.get(`/dohoctap?${params}`);
    return response.data;
  },

  layTheoId: async (id: number): Promise<DoHocTap> => {
    const response = await axiosInstance.get(`/dohoctap/${id}`);
    return response.data;
  },

  timKiem: async (tuKhoa: string): Promise<DoHocTap[]> => {
    const response = await axiosInstance.get(`/dohoctap`);
    const tatCa: DoHocTap[] = response.data;
    return tatCa.filter(sp => 
      sp.tenDoHocTap.toLowerCase().includes(tuKhoa.toLowerCase()) ||
      sp.moTa?.toLowerCase().includes(tuKhoa.toLowerCase())
    );
  }
};

// API Loại sản phẩm
export const apiLoaiSanPham = {
  layTatCa: async (): Promise<LoaiDoHocTap[]> => {
    // Tạm thời trả về dữ liệu mẫu vì API chưa có endpoint này
    return [
      { loaiDoHocTap_Id: 1, tenLoai: 'Bút viết', moTa: 'Các loại bút' },
      { loaiDoHocTap_Id: 2, tenLoai: 'Vở', moTa: 'Vở các loại' },
      { loaiDoHocTap_Id: 3, tenLoai: 'Balo', moTa: 'Balo học sinh' },
      { loaiDoHocTap_Id: 4, tenLoai: 'Dụng cụ học tập', moTa: 'Các dụng cụ khác' }
    ];
  }
};

// API Đơn hàng
export const apiDonHang = {
  tao: async (donHang: DonHang): Promise<number> => {
    const response = await axiosInstance.post('/donhang', donHang);
    return response.data.id;
  },

  layTheoId: async (id: number): Promise<DonHang> => {
    const response = await axiosInstance.get(`/donhang/${id}`);
    return response.data;
  },

  layTatCa: async (trangThai?: string): Promise<DonHang[]> => {
    const params = trangThai ? `?trangThai=${trangThai}` : '';
    const response = await axiosInstance.get(`/donhang${params}`);
    return response.data;
  }
};
