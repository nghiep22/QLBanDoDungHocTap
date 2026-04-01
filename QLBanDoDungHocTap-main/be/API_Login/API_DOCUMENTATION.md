# API Login Documentation

## Base URL
- Direct: `https://localhost:5010`
- Via Gateway: `http://localhost:5000`

## Endpoints

### 1. Đăng nhập (Login)

**POST** `/api/auth/login`

Đăng nhập và nhận JWT token.

**Request Body:**
```json
{
  "tenDangNhap": "string",
  "matKhau": "string"
}
```

**Response Success (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "taiKhoan_Id": 1,
    "tenDangNhap": "admin",
    "vaiTro_Id": 1
  }
}
```

**Response Error (401):**
```json
{
  "message": "Sai tên đăng nhập hoặc mật khẩu"
}
```

---

### 2. Đăng ký (Register) ✨ NEW

**POST** `/api/auth/register`

Đăng ký tài khoản mới và tự động đăng nhập (nhận token).

**Request Body:**
```json
{
  "tenDangNhap": "string",
  "matKhau": "string",
  "vaiTro_Id": 2  // Optional, default = 2 (user)
}
```

**Validation Rules:**
- `tenDangNhap`: Tối thiểu 3 ký tự, không được trùng
- `matKhau`: Tối thiểu 6 ký tự
- `vaiTro_Id`: 1 = Admin, 2 = User (default)

**Response Success (200):**
```json
{
  "message": "Đăng ký thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "taiKhoan_Id": 5,
    "tenDangNhap": "newuser",
    "vaiTro_Id": 2
  }
}
```

**Response Error (400):**
```json
{
  "message": "Tên đăng nhập đã tồn tại"
}
```

Hoặc:
```json
{
  "message": "Tên đăng nhập phải có ít nhất 3 ký tự"
}
```

Hoặc:
```json
{
  "message": "Mật khẩu phải có ít nhất 6 ký tự"
}
```

---

### 3. Lấy thông tin user hiện tại (Me)

**GET** `/api/auth/me`

Lấy thông tin user từ JWT token.

**Headers:**
```
Authorization: Bearer {token}
```

**Response Success (200):**
```json
{
  "userName": "admin",
  "claims": [
    {
      "type": "sub",
      "value": "1"
    },
    {
      "type": "name",
      "value": "admin"
    },
    {
      "type": "role",
      "value": "1"
    }
  ]
}
```

**Response Error (401):**
```json
{
  "message": "Unauthorized"
}
```

---

## Vai trò (VaiTro_Id)

| ID | Tên | Mô tả |
|----|-----|-------|
| 1  | Admin | Quản trị viên |
| 2  | User | Người dùng thông thường |

---

## Sử dụng Token

Sau khi đăng nhập hoặc đăng ký thành công, sử dụng token trong header:

```
Authorization: Bearer {token}
```

Token có thời hạn (thường là 24 giờ).

---

## Ví dụ sử dụng

### JavaScript/Fetch
```javascript
// Đăng ký
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tenDangNhap: 'newuser',
    matKhau: '123456'
  })
});

const data = await response.json();
const token = data.token;

// Sử dụng token
const userResponse = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### cURL
```bash
# Đăng ký
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"tenDangNhap":"newuser","matKhau":"123456"}'

# Đăng nhập
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"tenDangNhap":"admin","matKhau":"admin123"}'
```

---

## Lưu ý bảo mật

⚠️ **QUAN TRỌNG**: Hiện tại mật khẩu được lưu dạng plain text. Trong production cần:
1. Hash mật khẩu bằng BCrypt hoặc PBKDF2
2. Sử dụng HTTPS
3. Thêm rate limiting cho API đăng ký/đăng nhập
4. Thêm CAPTCHA để chống bot
5. Thêm email verification
