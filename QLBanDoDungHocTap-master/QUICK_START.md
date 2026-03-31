# Quick Start - Hướng Dẫn Nhanh

## Bước 1: Chuẩn Bị Database

### Kiểm tra SQL Server
- Server: `DESKTOP-IO3LR9C\SQLEXPRESS`
- Database: `BANDODUNGHOCTAP`

### Import Database Mới

**Cách 1: Sử dụng SQL Server Management Studio (SSMS)**
1. Mở SSMS
2. Connect đến: `DESKTOP-IO3LR9C\SQLEXPRESS`
3. Mở file `BANDD_V2.sql`
4. Chạy toàn bộ script (F5)

**Cách 2: Sử dụng sqlcmd**
```bash
sqlcmd -S DESKTOP-IO3LR9C\SQLEXPRESS -i BANDD_V2.sql
```

### Hoặc Cập Nhật Mật Khẩu (Nếu Database Đã Có)

Nếu database đã tồn tại và có mật khẩu hash, chạy script:

```sql
-- Mở file UPDATE_PASSWORD.sql và chạy, hoặc:
USE BANDODUNGHOCTAP;
UPDATE TaiKhoan SET matKhau = '123456';
SELECT taiKhoan_id, tenDangNhap, matKhau, vaiTro_id FROM TaiKhoan;
```

## Bước 2: Kiểm Tra Cấu Hình Backend

Tất cả file `appsettings.json` đã được cấu hình đúng:

✅ **API_Login/appsettings.json**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-IO3LR9C\\SQLEXPRESS;Database=BANDODUNGHOCTAP;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

✅ **API_SanPham/appsettings.json** - Giống như trên
✅ **API_DonHang/appsettings.json** - Giống như trên

## Bước 3: Chạy Backend

Mở 4 terminal và chạy từng API:

### Terminal 1 - API Gateway
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_GETWAY
dotnet run --urls http://localhost:5000
```

### Terminal 2 - API Login
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_Login
dotnet run
```

### Terminal 3 - API SanPham
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_SanPham
dotnet run
```

### Terminal 4 - API DonHang
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_DonHang
dotnet run
```

**Chờ đến khi thấy:**
```
Now listening on: http://localhost:5000
Now listening on: https://localhost:5010
Now listening on: https://localhost:5020
Now listening on: https://localhost:5030
```

## Bước 4: Chạy Frontend

Mở terminal mới:

```bash
npm install
npm run dev
```

Truy cập: http://localhost:3000

## Bước 5: Đăng Nhập

### Tài Khoản Admin
- Tên đăng nhập: `admin`
- Mật khẩu: `123456`
- Sau khi đăng nhập → Chuyển đến `/admin`

### Tài Khoản Khách Hàng
- Tên đăng nhập: `user1`
- Mật khẩu: `123456`
- Sau khi đăng nhập → Chuyển đến `/` (trang chủ)

## Xử Lý Lỗi

### Lỗi: "Sai tên đăng nhập hoặc mật khẩu"

**Nguyên nhân:** Mật khẩu trong database là hash (`$2b$10$...`)

**Giải pháp:**
1. Mở SQL Server Management Studio
2. Connect đến `DESKTOP-IO3LR9C\SQLEXPRESS`
3. Chạy script:
```sql
USE BANDODUNGHOCTAP;
UPDATE TaiKhoan SET matKhau = '123456';
```
4. Restart backend
5. Thử đăng nhập lại

### Lỗi: "Failed to execute 'json' on 'Response'"

**Nguyên nhân:** Backend chưa chạy hoặc không kết nối được database

**Giải pháp:**
1. Kiểm tra 4 terminal backend có đang chạy không
2. Kiểm tra SQL Server có đang chạy không
3. Kiểm tra connection string trong appsettings.json
4. Xem logs trong terminal backend

### Lỗi: "Cannot connect to SQL Server"

**Giải pháp:**
1. Mở SQL Server Configuration Manager
2. Kiểm tra SQL Server (SQLEXPRESS) đang chạy
3. Enable TCP/IP protocol
4. Restart SQL Server service

## Kiểm Tra Nhanh

### Test API trực tiếp:

```bash
# Test login endpoint
curl -X POST http://localhost:5000/login/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"tenDangNhap\":\"admin\",\"matKhau\":\"123456\"}"
```

Nếu thành công, bạn sẽ nhận được:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "taiKhoan_Id": 1,
    "tenDangNhap": "admin",
    "vaiTro_Id": 1
  }
}
```

## Tài Liệu Khác

- `HUONG_DAN_CHAY_BACKEND.md` - Chi tiết về backend
- `HUONG_DAN_DANG_NHAP.md` - Chi tiết về đăng nhập
- `CHANGELOG.md` - Lịch sử thay đổi
- `README.md` - Tổng quan dự án

## Checklist

- [ ] SQL Server đang chạy
- [ ] Database BANDODUNGHOCTAP đã được tạo
- [ ] Mật khẩu trong database là `123456` (plain text)
- [ ] 4 API backend đang chạy
- [ ] Frontend đang chạy tại http://localhost:3000
- [ ] Có thể đăng nhập với admin/123456
