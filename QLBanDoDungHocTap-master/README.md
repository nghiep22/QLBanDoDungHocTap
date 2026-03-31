# Thiên Long Shop - React TypeScript

Ứng dụng bán đồ dùng học tập được xây dựng lại từ đầu với React, TypeScript và Styled Components, thiết kế theo phong cách trang web Thiên Long.

## Công Nghệ

- React 18
- TypeScript
- Styled Components
- React Router v6
- Vite
- Context API (Cart & Auth Management)

## Cài Đặt

```bash
npm install
```

## Cấu Hình

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cấu hình API Gateway URL trong `.env`:

```
VITE_API_BASE_URL=http://localhost:5000
```

## Chạy Backend

### Cách 1: Chạy Thủ Công (Khuyến nghị)

Mở 4 terminal/command prompt và chạy từng API:

**Terminal 1 - API Gateway:**
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_GETWAY
dotnet run --urls http://localhost:5000
```

**Terminal 2 - API Login:**
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_Login
dotnet run
```

**Terminal 3 - API SanPham:**
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_SanPham
dotnet run
```

**Terminal 4 - API DonHang:**
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_DonHang
dotnet run
```

### Cách 2: Sử dụng Visual Studio

1. Mở file `QLBanDDHT.sln`
2. Right-click Solution → Properties → Multiple startup projects
3. Set tất cả 4 API thành "Start"
4. Nhấn F5

Xem chi tiết trong file `HUONG_DAN_CHAY_BACKEND.md`

Backend sẽ chạy trên các port:
- API Gateway: http://localhost:5000
- API Login: http://localhost:5010
- API SanPham: http://localhost:5020
- API DonHang: http://localhost:5030

## Chạy Frontend

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## Build Production

```bash
npm run build
```

## Cấu Trúc Dự Án

```
src/
├── components/       # Components tái sử dụng
│   ├── Header/      # Header với search, cart & auth
│   ├── Footer/      # Footer với links
│   ├── ProductCard/ # Card hiển thị sản phẩm
│   └── ProtectedRoute.tsx # Bảo vệ routes theo vai trò
├── pages/           # Các trang
│   ├── Home/        # Trang chủ
│   ├── Cart/        # Giỏ hàng
│   ├── Login/       # Đăng nhập
│   ├── Register/    # Đăng ký (đang phát triển)
│   └── Admin/       # Admin panel
├── context/         # React Context
│   ├── CartContext/ # Quản lý giỏ hàng
│   └── AuthContext/ # Quản lý authentication
├── services/        # API services
│   └── api.ts       # API calls
├── data/            # Mock data
├── styles/          # Global styles & theme
├── types/           # TypeScript types
├── App.tsx
└── main.tsx
```

## Tính Năng Đã Hoàn Thành

✅ **Authentication:**
- Đăng nhập với JWT
- Routing theo vai trò (Admin/Khách hàng)
- Lưu token vào localStorage
- Auto-login khi refresh
- Đăng xuất
- Protected routes

✅ **Admin Panel:**
- Dashboard với thống kê
- Sidebar menu với 6 chức năng
- Giao diện riêng cho admin (không có header/footer)
- Redirect tự động sau login theo vai trò

✅ **UI/UX:**
- Header với tìm kiếm và giỏ hàng  
- Hiển thị danh sách sản phẩm với ảnh  
- Lọc sản phẩm theo danh mục  
- Card sản phẩm với giá, giảm giá, badge  
- Footer với thông tin liên hệ  
- Responsive design  

✅ **Giỏ Hàng:**
- Thêm/xóa/cập nhật số lượng sản phẩm  
- Tính tổng tiền tự động  
- Lưu vào localStorage  

✅ **API Integration:**
- Kết nối API Gateway
- Login endpoint: `/login/api/auth/login`
- JWT Bearer token authentication

## Vai Trò & Routing

Hệ thống có 2 vai trò:
- **Admin (vaiTro_Id = 1)**: Sau khi đăng nhập → chuyển đến `/admin`
- **Khách hàng (vaiTro_Id = 2)**: Sau khi đăng nhập → chuyển đến `/`

Protected routes:
- `/admin` - Chỉ admin mới truy cập được
- Nếu chưa đăng nhập → redirect về `/dang-nhap`
- Nếu không phải admin → redirect về `/`

## API Endpoints

### Authentication
- `POST /login/api/auth/login` - Đăng nhập
  ```json
  {
    "tenDangNhap": "string",
    "matKhau": "string"
  }
  ```

- `POST /login/api/auth/register` - Đăng ký
  ```json
  {
    "tenDangNhap": "string",
    "matKhau": "string",
    "xacNhanMatKhau": "string"
  }
  ```

- `GET /login/api/auth/me` - Lấy thông tin user (cần token)

## TODO

- [ ] Tích hợp API sản phẩm thật từ backend
- [ ] Tích hợp API đơn hàng
- [ ] Trang chi tiết sản phẩm
- [ ] Trang thanh toán
- [ ] Quản lý đơn hàng
- [ ] Hoàn thiện các chức năng trong Admin panel
- [ ] Cập nhật backend để xóa references đến bảng NhanVien
- [ ] Endpoint đăng ký tài khoản

## Thiết Kế

Thiết kế dựa trên trang web chính thức của Thiên Long (thienlong.vn):
- Màu chủ đạo: Đỏ #e31e24
- Font: Inter
- Layout hiện đại, sạch sẽ
- Card sản phẩm với hover effect
- Badge cho sản phẩm mới & giảm giá

## Ghi Chú

Dự án này được xây dựng lại từ dự án cũ QLBanDoDungHocTap. 

**Tài liệu quan trọng:**
- `DOC_STRUCTURE_OLD.md` - Cấu trúc backend và database cũ
- `BANDD_V2.sql` - Database schema mới (đã xóa bảng NhanVien)
- `HUONG_DAN_CHAY_BACKEND.md` - Hướng dẫn chạy backend
- `HUONG_DAN_DANG_NHAP.md` - Hướng dẫn đăng nhập và test

**Thay đổi quan trọng:**
- Đã xóa bảng NhanVien khỏi database
- Chỉ còn 2 vai trò: Admin (vaiTro_Id = 1) và Khách hàng (vaiTro_Id = 2)
- Bảng HoaDonNhap giờ liên kết với TaiKhoan thay vì NhanVien
- Bảng DonHang không còn trường nhanVien_id

## License

MIT
