# Luồng hoạt động của `QuanLyNhapHang.tsx`

## 1) `QuanLyNhapHang.tsx` = file cha
Đây là trang quản lý nhập hàng.

Nó giữ:
- danh sách hóa đơn nhập
- danh sách nhà cung cấp
- danh sách sản phẩm
- trạng thái form tạo phiếu
- chi tiết từng phiếu
- thông báo
- loading

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:1-291`

---

## 2) State chính
- `danhSachHoaDon` → danh sách hóa đơn nhập
- `danhSachNhaCungCap` → nhà cung cấp
- `danhSachSanPham` → sản phẩm dùng để nhập
- `dangTai` → đang load dữ liệu
- `dangLuu` → đang lưu phiếu
- `hienThiForm` → mở/đóng form
- `hoaDonDangXem` → hóa đơn đang xem
- `thongBao` → thông báo
- `form` → dữ liệu phiếu nhập đang tạo

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:15-29`

---

## 3) `taiDuLieu()`
Hàm này tải dữ liệu cần thiết cho trang.

### Nó gọi:
- `layDanhSachHoaDonNhap()`
- `layDanhSachNhaCungCap()`
- `layDanhSachSanPham()`

### Sau đó:
- set danh sách hóa đơn
- set nhà cung cấp
- set sản phẩm
- nếu chưa có NCC mặc định → set NCC đầu tiên vào form

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:31-50`

---

## 4) `useEffect()`
Khi mở tab nhập hàng:
- tự gọi `taiDuLieu()`

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:52-54`

---

## 5) `tongTienNhap`
Tính tổng tiền của các dòng đang tạo trong form.

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:56-58`

---

## 6) `themChiTiet()`
Thêm 1 dòng chi tiết nhập vào form.

### Nó làm gì?
- lấy sản phẩm mặc định đầu tiên
- thêm vào `form.chiTiet`

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:60-67`

---

## 7) `capNhatChiTiet(index, field, value)`
Cập nhật từng dòng chi tiết.

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:69-78`

---

## 8) `xoaChiTiet(index)`
Xóa 1 dòng chi tiết khỏi form.

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:80-85`

---

## 9) `moForm()`
Mở modal tạo phiếu nhập.

### Nó làm gì?
- reset form
- gán NCC đầu tiên
- gán 1 dòng chi tiết mặc định nếu có sản phẩm
- mở modal

### Cách đổ dữ liệu lên form
- Đây là form **tạo mới**, không phải form sửa.
- Khi bấm `+ Tạo phiếu nhập`, `moForm()` sẽ set lại toàn bộ `form` từ đầu.
- Nếu có nhà cung cấp trong danh sách:
  - chọn mặc định NCC đầu tiên vào `form.nhaCungCap_Id`.
- Nếu có sản phẩm:
  - tạo sẵn 1 dòng trong `form.chiTiet`
  - gán `sanPham_Id`, `soLuong`, `donGia` mặc định.
- Nhờ vậy modal mở ra là có sẵn dữ liệu nền để người dùng nhập nhanh, không phải chọn từ trạng thái rỗng hoàn toàn.

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:87-97`


---

## 10) `dongForm()`
Đóng modal tạo phiếu nhập.

- không cho đóng nếu đang lưu

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:99-102`

---

## 11) `luuHoaDon(e)`
Đây là hàm submit phiếu nhập.

### Luồng
1. validate NCC
2. validate có ít nhất 1 chi tiết
3. validate số lượng và đơn giá > 0
4. gọi `dichVuApi.taoHoaDonNhap(form)`
5. báo thành công
6. đóng form
7. load lại dữ liệu

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:104-130`

### API liên quan
- `fe/src/services/api.ts` → `taoHoaDonNhap()`

---

## 12) UI chính
Trang có 4 phần:
- header + nút tải lại/tạo phiếu
- thông báo
- bảng danh sách hóa đơn nhập
- modal tạo phiếu nhập

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:132-291`

---

## 13) Bảng hóa đơn nhập
Mỗi hóa đơn hiển thị:
- mã phiếu
- ngày nhập
- nhà cung cấp
- tổng tiền
- trạng thái
- ghi chú
- thao tác xem chi tiết

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:157-198`

---

## 14) Form tạo phiếu nhập
Trong modal có:
- nhà cung cấp
- nhân viên tạo
- ghi chú
- nhiều dòng chi tiết
- tổng tiền
- nút lưu

### Vị trí
- `fe/src/pages/Admin/QuanLyNhapHang.tsx:200-289`

---

## 15) CSS
Trang này dùng style chung:
- `fe/src/pages/Admin/QuanLySanPham.styles.ts`

---

## 16) Tóm tắt nhanh theo luồng
```txt
mở tab nhập hàng
→ useEffect()
→ taiDuLieu()
→ render bảng
→ bấm + Tạo phiếu nhập
→ moForm()
→ nhập chi tiết
→ luuHoaDon()
→ tải lại dữ liệu
```

---

## 17) Kết luận
`QuanLyNhapHang.tsx` là trang admin xử lý **nhập hàng / tạo phiếu nhập / xem danh sách hóa đơn nhập**.
