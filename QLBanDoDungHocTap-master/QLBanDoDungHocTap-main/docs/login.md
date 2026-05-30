# Luồng hoạt động của `Login.tsx`

## 1) `Login.tsx` = trang đăng nhập
Đây là form đăng nhập chính của FE.

Nó xử lý:
- nhập tên đăng nhập/mật khẩu
- gọi `dangNhap()` từ context
- điều hướng theo vai trò
- hiện lỗi nếu đăng nhập thất bại

### Vị trí
- `fe/src/pages/Login/Login.tsx:1-135`

---

## 2) State chính
- `tenDangNhap` → input username
- `matKhau` → input password
- `thongBaoLoi` → lỗi đăng nhập
- `dangXuLy` → đang gọi API

### Vị trí
- `fe/src/pages/Login/Login.tsx:14-17`

---

## 3) Hooks
- `useDangNhap()` → lấy hàm `dangNhap`
- `useNavigate()` → điều hướng sau login

### Vị trí
- `fe/src/pages/Login/Login.tsx:22-23`

---

## 4) `xuLySubmit(e)`
Hàm submit form.

### Luồng
```txt
submit form
→ e.preventDefault()
→ reset lỗi
→ setDangXuLy(true)
→ dangNhap({ tenDangNhap, matKhau })
→ nếu vai trò admin → /admin
→ ngược lại → /
→ bật/tắt trạng thái xử lý
```

### Chi tiết
- gọi `dangNhap()` từ `AuthContext`
- nếu `ketQua.user.vaiTro_Id === 1` → đi tới `/admin`
- còn lại → đi tới `/`

### Vị trí
- `fe/src/pages/Login/Login.tsx:28-70`

---

## 5) Render UI
Trang gồm:
- logo
- tiêu đề/subtitle
- thông báo lỗi
- form username/password
- nút đăng nhập
- link quay về trang chủ

### Vị trí
- `fe/src/pages/Login/Login.tsx:75-133`

---

## 6) Luồng tổng quát
```txt
user nhập form
→ Login.tsx gọi AuthContext.dangNhap()
→ lưu token/user
→ kiểm tra vai trò
→ admin: /admin
→ user thường: /
```

## 7) Kết luận
`Login.tsx` chỉ lo UI + submit; auth thật sự nằm ở `AuthContext.tsx`.
