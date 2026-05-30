# Luồng hoạt động của `Register.tsx`

## 1) `Register.tsx` = trang đăng ký
Đây là form tạo tài khoản mới.

Nó xử lý:
- nhập username/mật khẩu
- validate cơ bản
- gọi API đăng ký
- tự đăng nhập sau khi đăng ký thành công

### Vị trí
- `fe/src/pages/Register/Register.tsx:1-188`

---

## 2) State chính
- `tenDangNhap`
- `matKhau`
- `xacNhanMatKhau`
- `thongBaoLoi`
- `dangXuLy`

### Vị trí
- `fe/src/pages/Register/Register.tsx:15-19`

---

## 3) Hooks
- `useNavigate()` → điều hướng
- `useDangNhap()` → auto login sau đăng ký
- `dichVuApi.dangKy()` → API tạo tài khoản

### Vị trí
- `fe/src/pages/Register/Register.tsx:24-25`

---

## 4) `kiemTraDuLieu()`
Hàm validate input.

### Rule
- username >= 3 ký tự
- password >= 6 ký tự
- password = xác nhận password

### Vị trí
- `fe/src/pages/Register/Register.tsx:30-50`

---

## 5) `xuLySubmit(e)`
Hàm submit form đăng ký.

### Luồng
```txt
submit form
→ e.preventDefault()
→ reset lỗi
→ kiemTraDuLieu()
→ setDangXuLy(true)
→ dichVuApi.dangKy({ tenDangNhap, matKhau })
→ nếu có token: dangNhap() rồi về /
→ nếu không: chuyển /dang-nhap
```

### Vị trí
- `fe/src/pages/Register/Register.tsx:55-107`

---

## 6) Auto login sau đăng ký
Nếu API trả về `token`:
- gọi `dangNhap({ tenDangNhap, matKhau })`
- lưu auth state
- điều hướng về trang chủ

Nếu không có token:
- hiện alert
- chuyển sang trang login

### Vị trí
- `fe/src/pages/Register/Register.tsx:81-97`

---

## 7) Render UI
Trang gồm:
- logo
- tiêu đề/subtitle
- form username/password/confirm password
- nút đăng ký
- link sang đăng nhập
- link về trang chủ

### Vị trí
- `fe/src/pages/Register/Register.tsx:112-186`

---

## 8) Kết luận
`Register.tsx` lo form + validation; auth state vẫn do `AuthContext.tsx` giữ.
