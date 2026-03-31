# GHI NHỚ CẤU TRÚC DỰ ÁN CŨ - QLBanDoDungHocTap

## 1. BACKEND ARCHITECTURE (Microservices)

### API Services
- **API_GETWAY** (Port 5000): Gateway chính
- **API_Login** (Port 5010): Xác thực & JWT
- **API_SanPham** (Port 5020): Quản lý sản phẩm
- **API_DonHang** (Port 5030): Quản lý đơn hàng

### 3-Layer Pattern
- **DAL**: SqlCommand trực tiếp với SQL Server
- **BLL**: Business logic, validation
- **Controllers**: REST API với JWT Authorization

## 2. DATABASE SCHEMA

### Bảng Chính
- VaiTro, TaiKhoan, NhanVien, KhachHang
- NhaCungCap, LoaiDoHocTap, DoHocTap
- Kho (tồn kho, tối thiểu, vị trí)
- DonHang, ChiTietDonHang
- HoaDonNhap, ChiTietHDNhap
- KhuyenMai, KM_LoaiSP

### Triggers
- Cập nhật kho tự động khi giao hàng
- Cập nhật kho khi nhập hàng

## 3. MODELS

### DoHocTap (Sản phẩm)
- SanPham_Id, Loai_Id, NhaCungCap_Id
- MaSanPham, TenSanPham, MoTa
- GiaBan, GiaNhap, HinhAnh
- TrangThai, NgayTao

### DonHang
- DonHang_Id, KhachHang_Id, NhanVien_Id
- MaDonHang, NgayDat, NgayGiao
- DiaChiGiao, PhuongThucTT
- TrangThaiDH (cho_xac_nhan, da_giao)
- TongTienGoc, TienGiam, TongThanhToan

### TaiKhoan
- TaiKhoan_Id, TenDangNhap, MatKhau (hash)
- VaiTro_Id (admin/nhan_vien/khach_hang)
- TrangThai, NgayTao

## 4. FRONTEND REACT

### Cấu Trúc Thư Mục
```
fe-react/
├── src/
│   ├── trang/          # Pages
│   ├── thanhphan/      # Components
│   ├── dichvu/         # API Services
│   ├── kieu/           # TypeScript Types
│   ├── ngucanh/        # Context
│   └── styles/         # CSS
```

### Trang Chính
- TrangShop: Hiển thị sản phẩm, giỏ hàng
- TrangDangNhap/DangKy: Authentication
- TrangQuanTri: Admin dashboard
- TrangTongQuan, TrangVi, TrangDanhMuc, TrangGiaoDich

## 5. CHỨC NĂNG CHÍNH

### Quản Lý Sản Phẩm
- CRUD sản phẩm (tên, giá, danh mục, hình ảnh)
- Lọc theo danh mục
- Tìm kiếm sản phẩm
- Quản lý nhà cung cấp

### Quản Lý Kho
- Theo dõi tồn kho
- Cảnh báo tồn kho tối thiểu
- Cập nhật tự động (trigger)

### Quản Lý Đơn Hàng
- Tạo đơn hàng (giỏ hàng)
- Cập nhật trạng thái
- Tính toán tổng tiền, khuyến mãi
- Cập nhật kho tự động

### Quản Lý Nhập Hàng
- Tạo hóa đơn nhập từ NCC
- Chi tiết nhập hàng
- Cập nhật kho tự động

### Khuyến Mãi
- Mã giảm giá (% hoặc số tiền)
- Điều kiện áp dụng
- Áp dụng theo danh mục

### Xác Thực & Phân Quyền
- JWT authentication
- 3 vai trò: admin, nhân_vien, khach_hang
- Protected routes

## 6. CÔNG NGHỆ

### Backend
- .NET 8 / C#
- SQL Server
- JWT Authentication
- CORS

### Frontend
- React + TypeScript
- React Router
- Fetch API
- localStorage (giỏ hàng)

## 7. FLOW NGHIỆP VỤ

### Mua Hàng
1. Xem sản phẩm → Thêm giỏ hàng (localStorage)
2. Tạo đơn hàng → Tính tổng tiền + khuyến mãi
3. Cập nhật trạng thái → Trigger cập nhật kho

### Nhập Hàng
1. Tạo hóa đơn nhập → Thêm chi tiết
2. Trigger cập nhật kho tự động

---
**Ngày ghi nhớ**: 2026-03-31
**Mục đích**: Xây dựng lại với React TypeScript, thiết kế theo Thiên Long
