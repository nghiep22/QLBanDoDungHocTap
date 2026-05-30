# Luồng gọi hàm của `QuanLySanPham.tsx`

Tài liệu này mô tả **thứ tự gọi hàm** khi user thêm, sửa, xóa, xem chi tiết và tìm kiếm sản phẩm.

---

## 1) Thêm sản phẩm

### Luồng gọi hàm
```txt
bấm "+ Thêm sản phẩm"
→ moform()
→ setHienthiform(true)
→ FormSanPham hiện
→ user nhập dữ liệu
→ bấm Lưu
→ xulyluu(e)
→ validate dữ liệu
→ nếu là thêm mới:
   → dichVuApi.taoSanPham(formdulieu)
→ hienthithongbao('thanh_cong', ...)
→ dongform()
→ taidulieu()
```

### Giải thích
- `moform()` mở form rỗng.
- `xulyluu()` kiểm tra dữ liệu trước khi gửi API.
- Nếu `sanphamdangchinhsua = null` thì đây là **thêm mới**.
- Sau khi lưu xong, gọi lại `taidulieu()` để bảng cập nhật.

### Hàm liên quan
- `moform()` → mở form
- `xulyluu()` → validate + gọi API thêm
- `taidulieu()` → tải lại danh sách

---

## 2) Sửa sản phẩm

### Luồng gọi hàm
```txt
bấm "Sửa" ở bảng
→ DanhSachSanPham.tsx gọi moform(sp)
→ moform(sp)
→ setSanphamdangchinhsua(sp)
→ setFormdulieu(data cũ)
→ setHienthiform(true)
→ FormSanPham hiện dữ liệu cũ
→ user sửa dữ liệu
→ bấm Lưu
→ xulyluu(e)
→ validate dữ liệu
→ nếu là sửa:
   → dichVuApi.capNhatSanPham(id, dulieucapnhat)
→ hienthithongbao('thanh_cong', ...)
→ dongform()
→ taidulieu()
```

### Cách đổ dữ liệu lên form
- Dữ liệu gốc nằm ở dòng `sp` do `DanhSachSanPham.tsx` truyền lên.
- `moform(sp)` lấy toàn bộ object sản phẩm đang sửa.
- Hàm này set:
  - `setSanphamdangchinhsua(sp)` để biết đang sửa hay thêm.
  - `setFormdulieu(...)` để đổ dữ liệu cũ vào state form.
  - `setHienthiform(true)` để mở modal.
- `FormSanPham.tsx` nhận `formdulieu` qua props rồi bind trực tiếp vào input/select.
- Vì form dùng state từ file cha, nên khi mở modal là thấy sẵn dữ liệu cũ để chỉnh sửa.

### Giải thích
- `moform(sp)` nhận sản phẩm đang sửa.
- Hàm này đổ dữ liệu cũ vào form để user chỉnh sửa.
- `xulyluu()` kiểm tra `sanphamdangchinhsua`:
  - có giá trị → cập nhật
  - không có giá trị → thêm mới
- Sau khi sửa xong, gọi `taidulieu()` để refresh bảng.

### Giải thích
- `moform(sp)` nhận sản phẩm đang sửa.
- Hàm này đổ dữ liệu cũ vào form để user chỉnh sửa.
- `xulyluu()` kiểm tra `sanphamdangchinhsua`:
  - có giá trị → cập nhật
  - không có giá trị → thêm mới
- Sau khi sửa xong, gọi `taidulieu()` để refresh bảng.

### Hàm liên quan
- `moform(sp)` → mở form và đổ dữ liệu cũ
- `xulyluu()` → phân biệt thêm hay sửa
- `capNhatSanPham()` → API cập nhật
- `taidulieu()` → tải lại danh sách

---

## 3) Xóa sản phẩm

### Luồng gọi hàm
```txt
bấm "Xóa" ở bảng
→ DanhSachSanPham.tsx gọi xulyxoa(id)
→ xulyxoa(id)
→ confirm("Bạn có chắc muốn xóa sản phẩm này?")
→ nếu đồng ý:
   → dichVuApi.xoaSanPham(id)
→ hienthithongbao('thanh_cong', ...)
→ taidulieu()
```

### Giải thích
- Nút Xóa nằm ở `DanhSachSanPham.tsx`.
- Hàm `xulyxoa()` ở file cha xử lý confirm và gọi API.
- Xóa xong phải gọi `taidulieu()` để bảng cập nhật lại.

### Hàm liên quan
- `xulyxoa(id)` → confirm + gọi API xóa
- `taidulieu()` → reload list

---

## 4) Xem chi tiết sản phẩm

### Luồng gọi hàm
```txt
bấm "Chi tiết"
→ DanhSachSanPham.tsx gọi xuLyXemChiTiet(sp)
→ xuLyXemChiTiet(sp)
→ setSanPhamChiTiet(sp)
→ setHienThiChiTiet(true)
→ ChiTietSanPham hiện
→ bấm đóng
→ dongChiTiet()
```

### Giải thích
- `xuLyXemChiTiet(sp)` lưu sản phẩm đang xem vào state.
- `ChiTietSanPham.tsx` chỉ render khi `hienThiChiTiet = true`.
- `dongChiTiet()` đóng modal và xóa dữ liệu cũ.

### Hàm liên quan
- `xuLyXemChiTiet(sp)` → mở modal chi tiết
- `dongChiTiet()` → đóng modal

---

## 5) Tìm kiếm sản phẩm

### Luồng gọi hàm
```txt
user nhập keyword
→ setTukhoaTimKiem(...)
→ danhSachHienThi (useMemo) chạy lại
→ bảng tự lọc
```

### Giải thích
- `xuLyTimKiem()` hiện tại chỉ chặn submit.
- Lọc thật nằm ở `danhSachHienThi`.
- `danhSachHienThi` dùng `useMemo` để lọc theo:
  - `maSanPham`
  - `tenSanPham`
  - `sanPham_Id`

### Hàm liên quan
- `setTukhoaTimKiem()` → đổi từ khóa
- `danhSachHienThi` → dữ liệu đã lọc
- `xuLyTimKiem()` → chặn submit form

---

## 6) Tải dữ liệu ban đầu

### Luồng gọi hàm
```txt
mở tab Sản phẩm
→ useEffect()
→ taidulieu()
→ lấy SP + NCC
→ set state
→ render bảng
```

### Giải thích
- Đây là bước khởi tạo trang.
- Không có dữ liệu thì bảng trống.
- Sau khi load xong, UI tự render.

### Hàm liên quan
- `useEffect()` → chạy khi mount
- `taidulieu()` → lấy dữ liệu ban đầu

---

## 7) Tóm tắt nhanh theo từng action

### Thêm
```txt
button → moform() → xulyluu() → taoSanPham() → dongform() → taidulieu()
```

### Sửa
```txt
button → moform(sp) → xulyluu() → capNhatSanPham() → dongform() → taidulieu()
```

### Xóa
```txt
button → xulyxoa(id) → confirm → xoaSanPham() → taidulieu()
```

### Chi tiết
```txt
button → xuLyXemChiTiet(sp) → ChiTietSanPham → dongChiTiet()
```

### Tìm kiếm
```txt
setTukhoaTimKiem() → danhSachHienThi useMemo chạy lại
```

---

## 8) Kết luận
`QuanLySanPham.tsx` là file cha điều phối toàn bộ luồng:
- load dữ liệu
- mở form
- lưu thêm/sửa
- xóa
- xem chi tiết
- tìm kiếm

Các file con chỉ nhận props và hiển thị UI.
