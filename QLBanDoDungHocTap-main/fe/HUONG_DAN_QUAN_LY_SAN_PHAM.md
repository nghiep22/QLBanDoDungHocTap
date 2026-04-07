# HƯỚNG DẪN QUẢN LÝ SẢN PHẨM

## Tổng quan
Hệ thống quản lý sản phẩm đã được tích hợp hoàn toàn với API backend. Admin có thể thêm, sửa, xóa sản phẩm và sản phẩm sẽ tự động hiển thị trên các trang tương ứng.

## Cấu trúc API

### Backend API (đã có sẵn)
- **GET** `/api/dohoctap` - Lấy danh sách sản phẩm
- **GET** `/api/dohoctap/{id}` - Lấy chi tiết sản phẩm
- **POST** `/api/dohoctap` - Tạo sản phẩm mới
- **PUT** `/api/dohoctap/{id}` - Cập nhật sản phẩm
- **DELETE** `/api/dohoctap/{id}` - Xóa sản phẩm
- **GET** `/api/nhacungcap` - Lấy danh sách nhà cung cấp

### Frontend Service
File: `fe/src/services/api.ts`

Các method đã thêm:
- `layDanhSachSanPham(loaiId?, trangThai?)` - Lấy danh sách sản phẩm
- `layChiTietSanPham(id)` - Lấy chi tiết sản phẩm
- `taoSanPham(data)` - Tạo sản phẩm mới
- `capNhatSanPham(id, data)` - Cập nhật sản phẩm
- `xoaSanPham(id)` - Xóa sản phẩm
- `layDanhSachNhaCungCap()` - Lấy danh sách nhà cung cấp

## Cấu trúc dữ liệu

### Loại sản phẩm (từ database)
1. Văn phòng phẩm (loai_Id: 1)
2. Sách & Vở (loai_Id: 2)
3. Dụng cụ vẽ (loai_Id: 3)
4. Ba lô & Túi (loai_Id: 4)
5. Điện tử học tập (loai_Id: 5)

### Mapping slug URL
- `/danh-muc/van-phong-pham` → loai_Id: 1
- `/danh-muc/sach-vo` → loai_Id: 2
- `/danh-muc/dung-cu-ve` → loai_Id: 3
- `/danh-muc/ba-lo-tui` → loai_Id: 4
- `/danh-muc/dien-tu-hoc-tap` → loai_Id: 5

## Trang quản lý Admin

### Truy cập
1. Đăng nhập bằng tài khoản admin (username: `admin`, password: `123456`)
2. Vào trang `/admin`
3. Click menu "📦 Sản phẩm"

### Chức năng
- **Xem danh sách**: Hiển thị tất cả sản phẩm với thông tin đầy đủ
- **Thêm mới**: Click nút "+ Thêm sản phẩm"
- **Sửa**: Click nút "Sửa" trên từng sản phẩm
- **Xóa**: Click nút "Xóa" (có xác nhận)

### Form nhập liệu
- Mã sản phẩm (tùy chọn)
- Tên sản phẩm (bắt buộc)
- Loại sản phẩm (dropdown)
- Nhà cung cấp (dropdown)
- Giá nhập (bắt buộc)
- Giá bán (bắt buộc)
- URL hình ảnh (tùy chọn)
- Mô tả (tùy chọn)

## Hiển thị trên Frontend

### Trang chủ (`/`)
- Hiển thị tất cả sản phẩm đang bán (trangThai = true)
- Lấy từ API: `layDanhSachSanPham(undefined, true)`

### Trang danh mục (`/danh-muc/:slug`)
- Hiển thị sản phẩm theo loại
- Lấy từ API: `layDanhSachSanPham(loaiId, true)`

## Files đã tạo/cập nhật

### Tạo mới
1. `fe/src/pages/Admin/QuanLySanPham.tsx` - Component quản lý sản phẩm
2. `fe/src/pages/Admin/QuanLySanPham.styles.ts` - Styles cho quản lý sản phẩm
3. `fe/src/utils/sanpham.ts` - Helper functions chuyển đổi dữ liệu

### Cập nhật
1. `fe/src/types/index.ts` - Thêm types cho API
2. `fe/src/services/api.ts` - Thêm methods quản lý sản phẩm
3. `fe/src/pages/Admin/Admin.tsx` - Tích hợp QuanLySanPham
4. `fe/src/pages/Home/Home.tsx` - Sử dụng API thay vì mock data
5. `fe/src/pages/Category/Category.tsx` - Sử dụng API thay vì mock data
6. `fe/src/components/Header/Header.tsx` - Cập nhật menu danh mục

### Xóa
1. `fe/src/data/products.ts` - Đã xóa mock data

## Lưu ý quan trọng

### Tên biến
Tất cả tên biến sử dụng tiếng Việt không dấu theo quy ước:
- `danhsachsanpham` thay vì `productList`
- `taoSanPham` thay vì `createProduct`
- `capNhatSanPham` thay vì `updateProduct`

### API Gateway
API được gọi qua Gateway tại `http://localhost:5000`
- Gateway route: `/api/dohoctap/*` → API_SanPham (port 5020)

### Database
Sản phẩm được lưu trong bảng `DoHocTap` với các trường:
- sanPham_Id (PK)
- loai_Id (FK → LoaiDoHocTap)
- nhaCungCap_Id (FK → NhaCungCap)
- maSanPham, tenSanPham, moTa
- giaBan, giaNhap
- hinhAnh, trangThai, ngayTao

## Hướng dẫn sử dụng

### 1. Khởi động Backend
```bash
cd be
# Chạy tất cả API services
```

### 2. Khởi động Frontend
```bash
cd fe
npm run dev
```

### 3. Thêm sản phẩm mới
1. Đăng nhập admin
2. Vào trang Admin → Sản phẩm
3. Click "+ Thêm sản phẩm"
4. Điền thông tin
5. Click "Lưu"

### 4. Kiểm tra kết quả
- Sản phẩm sẽ xuất hiện ngay trong danh sách
- Truy cập trang chủ hoặc trang danh mục tương ứng để xem sản phẩm mới

## Troubleshooting

### Không tải được sản phẩm
- Kiểm tra backend API đang chạy
- Kiểm tra console browser để xem lỗi
- Kiểm tra API Gateway đang chạy tại port 5000

### Không thêm được sản phẩm
- Kiểm tra đã điền đầy đủ trường bắt buộc
- Kiểm tra nhà cung cấp đã có trong database
- Xem response error trong console

### Hình ảnh không hiển thị
- Đảm bảo URL hình ảnh hợp lệ và accessible
- Sử dụng URL từ Unsplash hoặc image hosting service
