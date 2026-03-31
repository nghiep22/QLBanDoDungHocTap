# Debug Login Issue

## Vấn đề
- Test API bằng Swagger/Postman: ✅ Thành công
- Đăng nhập từ React frontend: ❌ Thất bại

## Các bước debug

### Bước 1: Test với file HTML đơn giản

Mở file `test-login.html` trong browser:
```bash
# Mở trực tiếp file hoặc dùng Live Server
start test-login.html
```

Nhấn nút "Test Login" và xem kết quả trong:
- Màn hình
- Console (F12)

### Bước 2: Kiểm tra Console trong React App

1. Mở React app: http://localhost:3000/dang-nhap
2. Mở DevTools (F12) → Console tab
3. Thử đăng nhập với: `admin` / `123456`
4. Xem logs với prefix 🔵 và ❌

**Logs cần chú ý:**
```
🔵 Login request: { url, data }
🔵 Response status: 200 OK
🔵 Response text: {...}
✅ Login success
```

Hoặc:
```
❌ Login failed: Sai tên đăng nhập hoặc mật khẩu
```

### Bước 3: Kiểm tra Network Tab

1. DevTools → Network tab
2. Thử đăng nhập
3. Tìm request: `login` hoặc `auth/login`
4. Click vào request đó

**Kiểm tra:**
- **Request URL**: Phải là `http://localhost:5000/login/api/auth/login`
- **Request Method**: POST
- **Request Headers**: 
  - `Content-Type: application/json`
- **Request Payload**: 
  ```json
  {
    "tenDangNhap": "admin",
    "matKhau": "123456"
  }
  ```
- **Response Status**: 200 OK (nếu thành công)
- **Response Body**: 
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

### Bước 4: Các lỗi thường gặp

#### Lỗi 1: CORS Error
```
Access to fetch at 'http://localhost:5000/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Giải pháp:**
- Kiểm tra API Gateway có CORS được cấu hình
- File: `API_GETWAY/Program.cs`
- Phải có: `app.UseCors("GW");`

#### Lỗi 2: 401 Unauthorized
```
Response status: 401
Response text: {"message":"Sai tên đăng nhập hoặc mật khẩu"}
```

**Giải pháp:**
- Kiểm tra mật khẩu trong database
- Chạy: `SELECT * FROM TaiKhoan WHERE tenDangNhap = 'admin'`
- Nếu mật khẩu là hash (`$2b$10$...`), chạy `UPDATE_PASSWORD.sql`

#### Lỗi 3: 500 Internal Server Error
```
Response status: 500
```

**Giải pháp:**
- Xem logs trong terminal backend
- Kiểm tra connection string trong `appsettings.json`
- Kiểm tra SQL Server đang chạy

#### Lỗi 4: Network Error / Failed to fetch
```
❌ Không thể kết nối đến server
```

**Giải pháp:**
- Backend chưa chạy
- Chạy 4 API services (xem `QUICK_START.md`)
- Kiểm tra port 5000 có đang được sử dụng

#### Lỗi 5: Response không phải JSON
```
⚠️ Lỗi phản hồi từ server
Response text: <html>...
```

**Giải pháp:**
- Backend trả về HTML thay vì JSON
- Có thể là error page hoặc redirect
- Kiểm tra endpoint URL đúng chưa

### Bước 5: So sánh Request

**Test API thành công (Swagger):**
```http
POST https://localhost:5010/api/auth/login
Content-Type: application/json

{
  "tenDangNhap": "admin",
  "matKhau": "123456"
}
```

**Frontend gửi (qua Gateway):**
```http
POST http://localhost:5000/login/api/auth/login
Content-Type: application/json

{
  "tenDangNhap": "admin",
  "matKhau": "123456"
}
```

**Khác biệt:**
- Swagger: `https://localhost:5010` (trực tiếp API)
- Frontend: `http://localhost:5000` (qua Gateway)

### Bước 6: Test trực tiếp API (bypass Gateway)

Thử đổi URL trong `.env`:
```
VITE_API_BASE_URL=https://localhost:5010
```

Và đổi endpoint trong `api.ts`:
```typescript
// Thay vì: /login/api/auth/login
// Dùng: /api/auth/login
```

Nếu thành công → Vấn đề ở Gateway
Nếu vẫn lỗi → Vấn đề ở frontend code

### Bước 7: Kiểm tra Backend Logs

Xem terminal đang chạy API_Login, tìm logs:
```
info: Microsoft.AspNetCore.Hosting.Diagnostics[1]
      Request starting HTTP/1.1 POST http://localhost:5010/api/auth/login
```

Nếu không thấy logs → Request không đến backend
Nếu thấy logs → Xem response status và error message

## Checklist Debug

- [ ] Backend 4 API đang chạy
- [ ] SQL Server đang chạy
- [ ] Database BANDODUNGHOCTAP tồn tại
- [ ] Mật khẩu trong DB là `123456` (plain text)
- [ ] Test với `test-login.html` thành công
- [ ] Console logs hiển thị trong React app
- [ ] Network tab hiển thị request/response
- [ ] CORS không có lỗi
- [ ] Response status là 200
- [ ] Response body là JSON hợp lệ

## Liên hệ

Nếu vẫn lỗi, cung cấp:
1. Screenshot Console logs
2. Screenshot Network tab (request + response)
3. Backend terminal logs
4. Kết quả test với `test-login.html`
