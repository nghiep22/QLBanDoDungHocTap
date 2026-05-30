# Luồng hoạt động của `QuanLyDonHang.tsx`

## 1) `QuanLyDonHang.tsx` = trang quản lý đơn hàng
Trang admin để:
- xem danh sách đơn
- lọc theo trạng thái
- đổi trạng thái đơn
- xem doanh thu tạm tính

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:1-138`

---

## 2) State chính
- `danhSachDonHang` → list đơn
- `dangTai` → đang load data
- `locTrangThai` → filter trạng thái
- `thongBao` → lỗi/thành công

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:20-23`

---

## 3) `taiDonHang()`
Hàm load danh sách đơn.

### Luồng
```txt
setDangTai(true)
→ dichVuApi.layDanhSachDonHang(locTrangThai)
→ setDanhSachDonHang(data)
→ tắt loading
```

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:25-35`

### API liên quan
- `fe/src/services/api.ts`

---

## 4) `useEffect()`
Khi `locTrangThai` đổi:
- tự gọi lại `taiDonHang()`

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:37-39`

---

## 5) `tongDoanhThu`
Tính tổng tiền tất cả đơn đang hiển thị.

```ts
reduce((tong, don) => tong + don.tongThanhToan, 0)
```

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:41-44`

---

## 6) `capNhatTrangThai(id, trangThaiDH)`
Đổi trạng thái đơn.

### Luồng
```txt
chọn trạng thái mới
→ dichVuApi.capNhatTrangThaiDonHang(id, { trangThaiDH })
→ setThongBao(thanh_cong)
→ taiDonHang()
```

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:46-54`

---

## 7) UI chính
Trang gồm:
- filter trạng thái
- nút tải lại
- card tổng đơn / doanh thu
- bảng danh sách đơn
- select đổi trạng thái từng đơn

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:56-136`

---

## 8) Cột bảng
Hiển thị:
- mã đơn
- ngày đặt
- địa chỉ giao
- phương thức thanh toán
- tổng tiền
- ghi chú
- trạng thái

### Vị trí
- `fe/src/pages/Admin/QuanLyDonHang.tsx:93-135`

---

## 9) Kết luận
File này là trang list + update state đơn; không có modal hay tách con.
