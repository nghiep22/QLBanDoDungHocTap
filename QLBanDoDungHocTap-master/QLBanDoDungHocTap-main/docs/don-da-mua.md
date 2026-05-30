# Luồng hoạt động của `DonDaMua.tsx`

## 1) `DonDaMua.tsx` = trang xem đơn đã mua
Đây là trang hiển thị danh sách đơn của tài khoản đang đăng nhập.

### Vị trí
- `fe/src/pages/DonDaMua/DonDaMua.tsx:1-103`

---

## 2) State chính
- `danhSachDonHang` → danh sách đơn của user
- `dangTai` → đang load dữ liệu
- `loi` → thông báo lỗi

### Vị trí
- `fe/src/pages/DonDaMua/DonDaMua.tsx:11-15`

---

## 3) `useEffect()` = tự load đơn khi vào trang
Khi trang mở:
- kiểm tra login
- nếu chưa login → báo lỗi
- nếu đã login → gọi API lấy đơn của tôi

### Vị trí
- `fe/src/pages/DonDaMua/DonDaMua.tsx:17-37`

### Luồng
```txt
mở trang
→ useEffect()
→ taiDonHang()
→ nếu chưa login → báo lỗi
→ nếu đã login → layDonHangCuaToi()
```

---

## 4) `taiDonHang()` nằm trong `useEffect`
Đây là hàm nội bộ để load đơn.

### Nó làm gì?
- bật loading
- gọi `dichVuApi.layDonHangCuaToi()`
- set danh sách đơn
- bắt lỗi
- tắt loading

### API liên quan
- `fe/src/services/api.ts:310-320`

---

## 5) `tongTien`
Đây là tổng tiền của tất cả đơn đang hiển thị.

### Cách tính
- dùng `reduce()` trên `danhSachDonHang`

### Vị trí
- `fe/src/pages/DonDaMua/DonDaMua.tsx:39-42`

---

## 6) Header của trang
Hiển thị:
- tiêu đề `Đơn đã mua`
- trạng thái login
- nút quay lại giỏ hàng

### Vị trí
- `fe/src/pages/DonDaMua/DonDaMua.tsx:44-56`

---

## 7) Trạng thái loading / lỗi / rỗng
### Nếu đang tải
- hiện `Đang tải...`

### Nếu lỗi
- hiện box đỏ

### Nếu không có đơn
- hiện `Chưa có đơn hàng nào.`

### Vị trí
- `fe/src/pages/DonDaMua/DonDaMua.tsx:58-78`

---

## 8) Danh sách đơn hàng
Mỗi đơn hiển thị:
- mã đơn
- ngày đặt
- trạng thái
- phương thức thanh toán
- địa chỉ giao
- tổng tiền
- ghi chú

### Vị trí
- `fe/src/pages/DonDaMua/DonDaMua.tsx:79-98`

---

## 9) BE liên quan
Trang này không tự lọc trên FE.
Nó gọi API `/api/donhang/me` để BE tự lọc theo user hiện tại.

### BE file
- `be/API_DonHang/Controllers/DonHangController.cs:18-88`
- `be/API_DonHang/Program.cs:1-51`
- `be/API_Login/Services/JwtTokenService.cs:25-46`
- `be/DAL/DonHang_DAL.cs:41-62`

---

## 10) CSS
Trang này dùng style inline là chính, không có component style riêng nhiều.

---

## 11) Tóm tắt nhanh theo luồng
```txt
mở DonDaMua.tsx
→ useEffect()
→ taiDonHang()
→ layDonHangCuaToi()
→ setDanhSachDonHang()
→ render list
```

---

## 12) Kết luận
`DonDaMua.tsx` là trang **xem lịch sử đơn của user**.
Nó chỉ đọc dữ liệu từ BE, không tạo hay sửa đơn.
