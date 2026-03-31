# Hướng Dẫn Đăng Nhập

## ⚠️ LƯU Ý QUAN TRỌNG

**Backend hiện tại so sánh mật khẩu trực tiếp (plain text), KHÔNG dùng bcrypt!**

Nếu database có mật khẩu dạng hash (`$2b$10$hashedpassword_admin`), bạn cần:
1. Chạy script `UPDATE_PASSWORD.sql` để cập nhật mật khẩu về plain text
2. Hoặc import lại database từ `BANDD_V2.sql`

## Tài Khoản Test

### Admin
- **Tên đăng nhập**: `admin`
- **Mật khẩu**: `123456`
- **Vai trò**: Admin (vaiTro_Id = 1)
- **Sau khi đăng nhập**: Chuyển đến `/admin`

### Khách hàng
- **Tên đăng nhập**: `user1` hoặc `user2`
- **Mật khẩu**: `123456`
- **Vai trò**: Khách hàng (vaiTro_Id = 2)
- **Sau khi đăng nhập**: Chuyển đến `/` (trang chủ)

## Cách Sửa Lỗi Đăng Nhập

### Nếu không đăng nhập được:

**Bước 1:** Kiểm tra mật khẩu trong database
```sql
USE BANDODUNGHOCTAP;
SELECT taiKhoan_id, tenDangNhap, matKhau, vaiTro_id FROM TaiKhoan;
```

**Bước 2:** Nếu mật khẩu là hash (`$2b$10$...`), chạy script:
```sql
-- Chạy file UPDATE_PASSWORD.sql hoặc:
UPDATE TaiKhoan SET matKhau = '123456';
```

**Bước 3:** Restart backend và thử đăng nhập lại với:
- Tên đăng nhập: `admin`
- Mật khẩu: `123456`

## Cách Tạo Tài Khoản Mới

### Cách 1: Tạo tài khoản test trong database

```sql
-- Thêm tài khoản mới (mật khẩu: 123456)
INSERT INTO TaiKhoan (tenDangNhap, matKhau, vaiTro_id, trangThai) 
VALUES ('testuser', '123456', 3, 1);

-- Thêm thông tin khách hàng
INSERT INTO KhachHang (taiKhoan_id, hoTen, soDienThoai, email) 
VALUES (SCOPE_IDENTITY(), N'Người Dùng Test', '0123456789', 'test@email.com');
```

### Cách 2: Sử dụng API (Nếu có endpoint register)

Hiện tại backend chưa có endpoint `/api/auth/register`. Cần thêm vào `AuthController.cs`:

```csharp
[HttpPost("register")]
[AllowAnonymous]
public async Task<IActionResult> Register([FromBody] RegisterRequest request)
{
    try
    {
        // Kiểm tra username đã tồn tại
        var existing = await _taiKhoanBll.GetByUsernameAsync(request.TenDangNhap);
        if (existing != null)
            return BadRequest(new { message = "Tên đăng nhập đã tồn tại" });

        // Tạo tài khoản mới
        var newUser = await _taiKhoanBll.CreateAsync(new TaiKhoan
        {
            TenDangNhap = request.TenDangNhap,
            MatKhau = request.MatKhau, // Nên hash trước khi lưu
            VaiTro_Id = 3, // Khách hàng
            TrangThai = true
        });

        return Ok(new { message = "Đăng ký thành công" });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = ex.Message });
    }
}
```

## Kiểm Tra Backend

Xem hướng dẫn chi tiết trong file `HUONG_DAN_CHAY_BACKEND.md`

1. Chạy 4 API services (xem hướng dẫn trên)

2. Kiểm tra Swagger:
- API Login: https://localhost:5010/swagger
- API Gateway: http://localhost:5000

3. Test endpoint login:
```bash
curl -X POST http://localhost:5000/login/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"tenDangNhap":"admin","matKhau":"123456"}'
```

## Lỗi Thường Gặp

### 1. "Failed to execute 'json' on 'Response'"
- Backend chưa chạy hoặc endpoint không đúng
- Kiểm tra console browser để xem response thực tế

### 2. "Sai tên đăng nhập hoặc mật khẩu"
- Mật khẩu trong database đã được hash
- Cần sử dụng mật khẩu gốc hoặc tạo tài khoản mới

### 3. CORS Error
- Kiểm tra CORS đã được cấu hình trong backend
- Thêm vào `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

app.UseCors("AllowAll");
```

## Giải Pháp Tạm Thời

Nếu không thể đăng nhập, có thể:

1. **Tạo tài khoản test trực tiếp trong database** với mật khẩu plain text (không an toàn nhưng dùng để test):

```sql
INSERT INTO TaiKhoan (tenDangNhap, matKhau, vaiTro_id, trangThai) 
VALUES ('demo', '123456', 3, 1);
```

2. **Sửa code backend** để tạm thời không hash mật khẩu (chỉ để test):

```csharp
// Trong TaiKhoan_BLL.cs
public async Task<TaiKhoan?> DangNhapAsync(string username, string password)
{
    var user = await _dal.GetByUsernameAsync(username);
    if (user == null) return null;
    
    // Tạm thời so sánh trực tiếp (không an toàn)
    if (user.MatKhau == password)
        return user;
    
    return null;
}
```

## Liên Hệ

Nếu vẫn gặp vấn đề, vui lòng kiểm tra:
1. Backend logs
2. Browser console
3. Network tab trong DevTools
