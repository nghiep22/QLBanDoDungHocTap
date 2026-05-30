# Luồng hoạt động của `AuthContext.tsx`

## 1) `AuthContext.tsx` = context auth toàn app
Đây là nơi quản lý trạng thái đăng nhập cho toàn bộ FE.

Nó giữ:
- `nguoiDung`
- `token`
- `dangTai`
- hàm `dangNhap()`
- hàm `dangXuat()`
- `daDangNhap`

### Vị trí
- `fe/src/context/AuthContext.tsx:1-139`

---

## 2) State chính
- `nguoiDung` → user hiện tại
- `token` → JWT token
- `dangTai` → đang kiểm tra login khi app mở

### Vị trí
- `fe/src/context/AuthContext.tsx:29-37`

---

## 3) `useEffect()` = tự đăng nhập lại khi refresh
Khi app load:
- đọc `localStorage.token`
- đọc `localStorage.user`
- nếu có → set lại state
- rồi tắt loading

### Vị trí
- `fe/src/context/AuthContext.tsx:43-55`

### Luồng
```txt
mở app
→ đọc localStorage
→ nếu có token + user
→ setToken()
→ setNguoiDung()
→ daDangNhap = true
```

---

## 4) `dangNhap(duLieu)`
Đây là hàm login chính.

### Nó làm gì?
- gọi `dichVuApi.dangNhap(duLieu)`
- nhận `ketQua.token` và `ketQua.user`
- lưu vào state
- lưu vào `localStorage`
- trả kết quả cho page login

### Vị trí
- `fe/src/context/AuthContext.tsx:60-82`

### API liên quan
- `fe/src/services/api.ts:49-96`

---

## 5) `dangXuat()`
Hàm logout.

### Nó làm gì?
- xóa `token`
- xóa `nguoiDung`
- xóa `localStorage.token`
- xóa `localStorage.user`

### Vị trí
- `fe/src/context/AuthContext.tsx:87-99`

---

## 6) `daDangNhap`
Đây là giá trị suy ra từ `token`.

```ts
const daDangNhap = !!token;
```

### Vị trí
- `fe/src/context/AuthContext.tsx:104-104`

---

## 7) `useDangNhap()`
Đây là custom hook để component khác dùng auth context.

### Vị trí
- `fe/src/context/AuthContext.tsx:128-136`

### Cách dùng
```ts
const { nguoiDung, daDangNhap, dangNhap, dangXuat } = useDangNhap();
```

---

## 8) Luồng hoạt động tổng quát
```txt
mở app
→ AuthContext đọc localStorage
→ nếu có token/user → tự đăng nhập
→ Login.tsx gọi dangNhap()
→ lưu token/user
→ ProtectedRoute dùng daDangNhap để chặn route
→ logout gọi dangXuat()
```

---

## 9) `useAuth`
Đây là export tên cũ để tương thích.

### Vị trí
- `fe/src/context/AuthContext.tsx:139-139`

---

## 10) Kết luận
`AuthContext.tsx` là nơi **quản lý toàn bộ trạng thái đăng nhập**: login, logout, auto-login, và cung cấp dữ liệu cho các trang khác.
