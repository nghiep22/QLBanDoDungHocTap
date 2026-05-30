# Luồng hoạt động của `Cart.tsx`

## 1) `Cart.tsx` = trang giỏ hàng và đặt đơn
Đây là trang xử lý:
- hiển thị giỏ
- tăng/giảm số lượng
- xóa sản phẩm khỏi giỏ
- mở form thanh toán
- tạo đơn hàng

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:1-255`

---

## 2) State chính
- `gioHang` → lấy từ `CartContext`
- `tongTien`, `tongSoLuong` → tính tổng giỏ
- `hienThiForm` → mở/đóng form thanh toán
- `dangDatHang` → trạng thái đang tạo đơn
- `thongBao` → thông báo lỗi/thành công
- `formData` → thông tin người nhận
- `userId` → id user hiện tại

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:10-22`

---

## 3) `moFormThanhToan()`
**Nhiệm vụ:** mở form thanh toán.

### Luồng
- nếu chưa đăng nhập → báo lỗi
- nếu đã login → mở form

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:36-43`

---

## 4) `dongFormThanhToan()`
**Nhiệm vụ:** đóng form thanh toán.

- không cho đóng nếu đang đặt hàng
- nếu không → `setHienThiForm(false)`

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:45-48`

---

## 5) `capNhatForm(field, value)`
**Nhiệm vụ:** cập nhật từng field trong form.

Ví dụ:
- `hoTen`
- `soDienThoai`
- `diaChiGiao`
- `phuongThucTT`
- `ghiChu`

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:32-34`

---

## 6) `datHang(e)`
Đây là **hàm quan trọng nhất** của trang.

### Nhiệm vụ
- validate form
- kiểm tra giỏ không rỗng
- tạo request đơn hàng
- gọi API tạo đơn
- xóa giỏ sau khi thành công
- reset form
- đóng modal

### Luồng gọi hàm
```txt
bấm "Xác nhận đặt hàng"
→ datHang(e)
→ validate form
→ nếu hợp lệ:
   → dichVuApi.taoDonHang(...)
→ xoaToanBoGio()
→ setThongBao('thanh_cong')
→ reset formData
→ setHienThiForm(false)
```

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:50-94`

### API liên quan
- `fe/src/services/api.ts:271-290` → `taoDonHang()`

---

## 7) Màn hình giỏ rỗng
Nếu `gioHang.length === 0`:
- hiện thông báo giỏ trống
- nút quay lại mua sắm

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:96-106`

---

## 8) UI giỏ hàng
### Phần chính
- tiêu đề
- số lượng sản phẩm
- nút `Mua thêm`
- danh sách item trong giỏ
- bảng tổng đơn
- nút `Thanh toán`

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:109-168`

---

## 9) Danh sách item trong giỏ
Mỗi item có:
- ảnh
- tên
- mã
- giá
- nút giảm số lượng
- nút tăng số lượng
- tổng tiền item
- nút xóa

### Hàm gọi
- `capNhatSoLuong(item.sanPham.id, item.soLuong - 1)`
- `capNhatSoLuong(item.sanPham.id, item.soLuong + 1)`
- `xoaKhoiGio(item.sanPham.id)`

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:121-145`

---

## 10) Bảng tổng đơn hàng
Hiển thị:
- tạm tính
- phí vận chuyển
- tổng cộng

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:148-167`

---

## 11) Form thanh toán
Khi bấm `Thanh toán`:
- `moFormThanhToan()` mở modal
- người dùng nhập họ tên, số điện thoại, địa chỉ, phương thức thanh toán, ghi chú
- bấm xác nhận → `datHang()`

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:170-252`

---

## 12) Dữ liệu gửi lên API
Trong `datHang()`:
- `khachHang_Id` → user hiện tại
- `diaChiGiao`
- `phuongThucTT`
- `ghiChu`
- `chiTiet` → map từ `gioHang`

### Vị trí
- `fe/src/pages/Cart/Cart.tsx:66-77`

---

## 13) `CartContext` liên quan thế nào?
Trang này không tự quản lý giỏ hàng.
Nó lấy state từ `CartContext`:
- `gioHang`
- `xoaKhoiGio`
- `capNhatSoLuong`
- `tongTien`
- `xoaToanBoGio`
- `tongSoLuong`

### Vị trí
- `fe/src/context/CartContext.tsx:16-86`

---

## 14) CSS
Trang này dùng style riêng:
- `fe/src/pages/Cart/styles.ts`

---

## 15) Tóm tắt nhanh theo luồng
### Mở trang
```txt
Cart.tsx
→ đọc CartContext
→ render danh sách giỏ
```

### Mở form thanh toán
```txt
bấm Thanh toán
→ moFormThanhToan()
→ setHienThiForm(true)
```

### Đặt hàng
```txt
submit form
→ datHang()
→ taoDonHang()
→ xoaToanBoGio()
→ đóng form
```

### Sửa số lượng
```txt
bấm + / -
→ capNhatSoLuong()
→ CartContext update
→ UI tự render lại
```

---

## 16) Kết luận
`Cart.tsx` là trang **xử lý giỏ + checkout**.
Nó nhận state từ `CartContext`, nhập thông tin từ form, rồi gọi API tạo đơn hàng.
