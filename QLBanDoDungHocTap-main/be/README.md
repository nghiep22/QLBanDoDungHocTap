# Backend - Quản lý bán đồ dùng học tập

## 📁 Cấu trúc dự án

```
be/
├── API_GETWAY/              # API Gateway (Ocelot) - Port 5000
├── API_Login/               # Service đăng nhập - Port 5010
├── API_SanPham/             # Service sản phẩm - Port 5020
├── API_DonHang/             # Service đơn hàng - Port 5030
├── Models/                  # Data models
├── DAL/                     # Data Access Layer
├── BLL/                     # Business Logic Layer
├── QLBanDoDungHocTap.sln   # Solution file
├── START_ALL_V2.bat         # Script khởi động tất cả services
├── CHECK_APIS.ps1           # Script kiểm tra API
└── TEST_ALL_APIS.http       # File test API
```

## 🚀 Khởi động dự án

### Cách 1: Sử dụng script (Khuyến nghị)
```bash
.\START_ALL_V2.bat
```

### Cách 2: Sử dụng Visual Studio
1. Mở file `QLBanDoDungHocTap.sln`
2. Set Multiple Startup Projects:
   - API_GETWAY
   - API_Login
   - API_SanPham
   - API_DonHang
3. Nhấn F5 để chạy

## 🔧 Cấu hình

### Connection String
Cập nhật trong các file `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=BANDODUNGHOCTAP;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

### Ports
- API Gateway: `5000` (HTTP)
- API_Login: `5010` (HTTPS)
- API_SanPham: `5020` (HTTPS)
- API_DonHang: `5030` (HTTPS)

## 📝 API Endpoints

### 🔐 Authentication (API_Login)
```
POST /api/auth/register    - Đăng ký (không cần token)
POST /api/auth/login       - Đăng nhập (không cần token)
GET  /api/auth/me          - Lấy thông tin user (CẦN token)
```

### 📦 Sản phẩm (API_SanPham) - KHÔNG CẦN TOKEN
```
GET    /api/dohoctap           - Lấy tất cả sản phẩm
GET    /api/dohoctap/{id}      - Lấy sản phẩm theo ID
POST   /api/dohoctap           - Tạo sản phẩm mới
PUT    /api/dohoctap/{id}      - Cập nhật sản phẩm
DELETE /api/dohoctap/{id}      - Xóa sản phẩm
```

### 🏢 Nhà cung cấp (API_SanPham) - KHÔNG CẦN TOKEN
```
GET  /api/nhacungcap       - Lấy tất cả nhà cung cấp
GET  /api/nhacungcap/{id}  - Lấy nhà cung cấp theo ID
POST /api/nhacungcap       - Tạo nhà cung cấp mới
PUT  /api/nhacungcap/{id}  - Cập nhật nhà cung cấp
```

### 🛒 Đơn hàng (API_DonHang) - KHÔNG CẦN TOKEN
```
GET   /api/donhang              - Lấy tất cả đơn hàng
GET   /api/donhang/{id}         - Lấy đơn hàng theo ID
POST  /api/donhang              - Tạo đơn hàng mới
PATCH /api/donhang/{id}/status  - Cập nhật trạng thái
```

### 📋 Hóa đơn nhập (API_DonHang) - KHÔNG CẦN TOKEN
```
GET  /api/hoadonnhap       - Lấy tất cả hóa đơn nhập
GET  /api/hoadonnhap/{id}  - Lấy hóa đơn nhập theo ID
POST /api/hoadonnhap       - Tạo hóa đơn nhập mới
```

## ✅ Kiểm tra API

### Cách 1: PowerShell Script
```powershell
.\CHECK_APIS.ps1
```

### Cách 2: REST Client (VS Code)
Mở file `TEST_ALL_APIS.http` và click "Send Request"

### Cách 3: Swagger UI
- API_Login: https://localhost:5010/swagger
- API_SanPham: https://localhost:5020/swagger
- API_DonHang: https://localhost:5030/swagger

## 🔑 Authentication

### Chỉ API Login cần token
- Endpoint `/api/auth/me` cần token để xem thông tin user
- Các endpoint khác (register, login) không cần token

### Tất cả API khác KHÔNG cần token
- API Sản phẩm: Không cần token
- API Nhà cung cấp: Không cần token
- API Đơn hàng: Không cần token
- API Hóa đơn nhập: Không cần token

### Cách sử dụng token (nếu cần)
```http
GET /api/auth/me
Authorization: Bearer {token}
```

## 🗄️ Database

### Tạo database
1. Mở SQL Server Management Studio
2. Import file SQL từ thư mục gốc
3. Cập nhật connection string

### Tables chính
- TaiKhoan - Tài khoản người dùng
- DoHocTap - Sản phẩm đồ học tập
- LoaiDoHocTap - Loại sản phẩm
- NhaCungCap - Nhà cung cấp
- DonHang - Đơn hàng
- ChiTietDonHang - Chi tiết đơn hàng
- HoaDonNhap - Hóa đơn nhập
- ChiTietHDNhap - Chi tiết hóa đơn nhập
- Kho - Kho hàng

## 🛠️ Công nghệ sử dụng

- .NET 8
- ASP.NET Core Web API
- Ocelot (API Gateway)
- ADO.NET (Data Access)
- JWT Authentication
- SQL Server

## 📚 Tài liệu

- [Hướng dẫn kiểm tra API](HUONG_DAN_KIEM_TRA.md)
- [API Documentation](API_Login/API_DOCUMENTATION.md)
- [Test API](TEST_ALL_APIS.http)

## 🐛 Troubleshooting

### Services không khởi động
1. Kiểm tra port đã được sử dụng chưa
2. Kiểm tra SQL Server đang chạy
3. Kiểm tra connection string

### API trả về 500
1. Xem log trong console
2. Kiểm tra database connection
3. Kiểm tra dữ liệu trong database

### API Gateway không route
1. Kiểm tra `ocelot.json`
2. Đảm bảo tất cả services đang chạy
3. Kiểm tra port trong cấu hình

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Tất cả services đang chạy
2. Database đã được tạo và có dữ liệu
3. Connection string đúng
4. Ports không bị conflict
