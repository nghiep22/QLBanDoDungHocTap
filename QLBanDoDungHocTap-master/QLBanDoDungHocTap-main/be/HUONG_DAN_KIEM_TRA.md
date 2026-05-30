# Hướng dẫn kiểm tra API

## 🚀 Cách 1: Sử dụng PowerShell Script (Tự động)

### Bước 1: Khởi động tất cả services
```powershell
cd QLBanDoDungHocTap-main/be
.\START_ALL_V2.bat
```

Đợi tất cả services khởi động (khoảng 30 giây).

### Bước 2: Chạy script kiểm tra
Mở PowerShell mới và chạy:
```powershell
cd QLBanDoDungHocTap-main/be
.\CHECK_APIS.ps1
```

Script sẽ tự động test tất cả API và hiển thị kết quả.

---

## 🔧 Cách 2: Sử dụng VS Code REST Client

### Bước 1: Cài đặt extension
1. Mở VS Code
2. Cài extension: **REST Client** (by Huachao Mao)

### Bước 2: Mở file test
```
QLBanDoDungHocTap-main/be/TEST_ALL_APIS.http
```

### Bước 3: Chạy từng request
- Click vào "Send Request" phía trên mỗi request
- Xem kết quả bên phải

---

## 🌐 Cách 3: Sử dụng Swagger UI

### API_Login
```
https://localhost:5010/swagger
```

### API_SanPham
```
https://localhost:5020/swagger
```

### API_DonHang
```
https://localhost:5030/swagger
```

### API Gateway
```
http://localhost:5000
```

---

## 📋 Checklist kiểm tra

### ✅ API Login
- [ ] POST /api/auth/register - Đăng ký tài khoản
- [ ] POST /api/auth/login - Đăng nhập
- [ ] GET /api/auth/me - Lấy thông tin user (cần token)

### ✅ API Sản phẩm (Không cần token)
- [ ] GET /api/dohoctap - Lấy tất cả sản phẩm
- [ ] GET /api/dohoctap/{id} - Lấy sản phẩm theo ID
- [ ] POST /api/dohoctap - Tạo sản phẩm mới
- [ ] PUT /api/dohoctap/{id} - Cập nhật sản phẩm
- [ ] DELETE /api/dohoctap/{id} - Xóa sản phẩm

### ✅ API Nhà cung cấp (Không cần token)
- [ ] GET /api/nhacungcap - Lấy tất cả nhà cung cấp
- [ ] GET /api/nhacungcap/{id} - Lấy nhà cung cấp theo ID
- [ ] POST /api/nhacungcap - Tạo nhà cung cấp mới
- [ ] PUT /api/nhacungcap/{id} - Cập nhật nhà cung cấp

### ✅ API Đơn hàng (Không cần token)
- [ ] GET /api/donhang - Lấy tất cả đơn hàng
- [ ] GET /api/donhang/{id} - Lấy đơn hàng theo ID
- [ ] POST /api/donhang - Tạo đơn hàng mới
- [ ] PATCH /api/donhang/{id}/status - Cập nhật trạng thái

### ✅ API Hóa đơn nhập (Không cần token)
- [ ] GET /api/hoadonnhap - Lấy tất cả hóa đơn nhập
- [ ] GET /api/hoadonnhap/{id} - Lấy hóa đơn nhập theo ID
- [ ] POST /api/hoadonnhap - Tạo hóa đơn nhập mới

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "Cannot connect to server"
**Nguyên nhân:** Services chưa khởi động

**Giải pháp:**
```powershell
cd QLBanDoDungHocTap-main/be
.\START_ALL_V2.bat
```

### Lỗi: "Database connection failed"
**Nguyên nhân:** Connection string sai hoặc database chưa tạo

**Giải pháp:**
1. Kiểm tra SQL Server đang chạy
2. Kiểm tra connection string trong `appsettings.json`
3. Import database từ file SQL

### Lỗi: "404 Not Found"
**Nguyên nhân:** Route không đúng hoặc API Gateway chưa cấu hình

**Giải pháp:**
1. Kiểm tra `ocelot.json` trong API_GETWAY
2. Đảm bảo tất cả services đang chạy
3. Kiểm tra port đúng

### Lỗi: "500 Internal Server Error"
**Nguyên nhân:** Lỗi trong code hoặc database

**Giải pháp:**
1. Xem log trong console của service
2. Kiểm tra database có dữ liệu
3. Kiểm tra stored procedures (nếu có)

---

## 📊 Kết quả mong đợi

### Đăng ký thành công
```json
{
  "message": "Đăng ký thành công",
  "token": "eyJhbGc...",
  "user": {
    "taiKhoan_Id": 5,
    "tenDangNhap": "testuser",
    "vaiTro_Id": 2
  }
}
```

### Đăng nhập thành công
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

### Lấy danh sách sản phẩm
```json
[
  {
    "doHocTap_Id": 1,
    "tenSP": "Bút bi xanh",
    "loaiDoHocTap_Id": 1,
    "donGia": 5000,
    "soLuongTon": 100,
    "moTa": "Bút bi xanh chất lượng cao",
    "trangThai": true
  }
]
```

---

## 🔑 Lưu ý quan trọng

1. **Chỉ API Login cần token** cho endpoint `/api/auth/me`
2. **Tất cả API khác không cần token** - Gọi trực tiếp
3. **API Gateway** chạy ở port `5000` (HTTP)
4. **Các microservices** chạy ở port `5010`, `5020`, `5030` (HTTPS)
5. **Database** phải được tạo và có dữ liệu mẫu

---

## 📞 Ports

| Service | Port | Protocol |
|---------|------|----------|
| API Gateway | 5000 | HTTP |
| API_Login | 5010 | HTTPS |
| API_SanPham | 5020 | HTTPS |
| API_DonHang | 5030 | HTTPS |
