# Luồng hoạt động của `QuanLyKho.tsx`

## 1) `QuanLyKho.tsx` = trang quản lý tồn kho
Trang admin để:
- xem tồn kho
- lọc hàng sắp hết
- sửa tồn kho
- cộng/trừ nhanh số lượng
- xem lịch sử nhập/xuất kho

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:1-265`

---

## 2) State chính
- `danhSachKho` → tất cả tồn kho
- `danhSachSapHet` → hàng sắp hết
- `danhSachLichSu` → lịch sử kho
- `dangTai` → load tồn kho
- `dangTaiLichSu` → load lịch sử
- `loc` → filter `all/low`
- `dangChinhSua` → item đang sửa
- `hienThiForm` → mở/đóng modal
- `thongBao` → lỗi/thành công
- `form` → dữ liệu form sửa kho

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:10-23`

---

## 3) `taiDuLieu()`
Load 2 danh sách song song:
- tồn kho
- hàng sắp hết

### Luồng
```txt
setDangTai(true)
→ Promise.all([layDanhSachTonKho(), layDanhSachSapHetHang()])
→ setDanhSachKho()
→ setDanhSachSapHet()
→ tắt loading
```

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:25-39`

---

## 4) `taiLichSu()`
Load lịch sử nhập/xuất kho.

### Luồng
```txt
setDangTaiLichSu(true)
→ dichVuApi.layLichSuKho()
→ setDanhSachLichSu()
→ tắt loading
```

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:41-51`

---

## 5) `useEffect()`
Khi page mở:
- gọi `taiDuLieu()`
- gọi `taiLichSu()`

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:53-56`

---

## 6) `danhSachHienThi`
Danh sách render theo filter:
- `all` → `danhSachKho`
- `low` → `danhSachSapHet`

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:58-60`

---

## 7) Thống kê nhanh
Tính:
- tổng sản phẩm
- tổng sắp hết
- tổng tồn

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:62-65`

---

## 8) `moForm(item)` / `dongForm()`
### `moForm(item)`
- set item đang sửa
- đổ dữ liệu vào form
- mở modal

### Cách đổ dữ liệu lên form
- `item` là 1 dòng tồn kho được bấm nút `Sửa`.
- `moForm(item)` lấy trực tiếp dữ liệu từ row đó rồi set vào state `form`:
  - `soLuongTon` ← `item.soLuongTon`
  - `soLuongToiThieu` ← `item.soLuongToiThieu`
  - `viTriKho` ← `item.viTriKho`
- Đồng thời set `dangChinhSua = item` để biết form này đang sửa bản ghi nào.
- `hienThiForm = true` làm modal hiện lên với dữ liệu đã đổ sẵn.
- Input trong modal bind vào `form`, nên user thấy ngay dữ liệu cũ và chỉ cần sửa phần cần đổi.

### `dongForm()`
- đóng modal
- clear item đang sửa

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:66-79`

---

## 9) `luuKho(e)`
Hàm lưu form sửa kho.

### Luồng
```txt
submit form
→ e.preventDefault()
→ dichVuApi.capNhatTonKho(sanPham_Id, form)
→ setThongBao(thanh_cong)
→ dongForm()
→ taiDuLieu()
→ taiLichSu()
```

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:81-94`

---

## 10) `xuLyCongTru(item, soLuongThayDoi)`
Cộng/trừ nhanh 1 đơn vị.

### Luồng
```txt
bấm +1 hoặc -1
→ dichVuApi.capNhatSoLuongTon(item.sanPham_Id, soLuongThayDoi)
→ setThongBao()
→ taiDuLieu()
→ taiLichSu()
```

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:96-105`

---

## 11) UI chính
Trang gồm:
- header + filter
- card thống kê
- bảng tồn kho
- bảng lịch sử nhập/xuất
- modal cập nhật kho

### Vị trí
- `fe/src/pages/Admin/QuanLyKho.tsx:107-265`

---

## 12) Kết luận
`QuanLyKho.tsx` là file controller cho tồn kho + lịch sử; modal sửa kho nằm chung file.
