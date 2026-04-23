# 01. Kiến trúc hệ thống

## 1. Cấu trúc thư mục gốc

```text
QLBanDoDungHocTap-main/
├─ fe/        # Frontend React
├─ be/        # Backend .NET
├─ README.md
└─ BDDHT.sql  # Script database
```

## 2. Kiến trúc frontend

Thư mục chính:

- `fe/src/App.tsx`: router tổng
- `fe/src/pages/`: các trang
- `fe/src/components/`: component dùng lại
- `fe/src/context/`: state toàn cục bằng React Context
- `fe/src/services/api.ts`: lớp gọi API
- `fe/src/types/index.ts`: kiểu dữ liệu
- `fe/src/utils/`: hàm phụ trợ
- `fe/src/data/`: dữ liệu tĩnh

### 2.1. Router frontend
Router được khai báo trong `fe/src/App.tsx:17`.

Chia 3 nhóm:

- **Auth routes**: `/dang-nhap`, `/dang-ky`
- **Admin route**: `/admin`
- **Main routes**: `/`, `/danh-muc/:slug`, `/gio-hang`

### 2.2. State toàn cục
Frontend dùng 2 context chính:

- `AuthContext` tại `fe/src/context/AuthContext.tsx:29`
- `CartContext` tại `fe/src/context/CartContext.tsx:16`

## 3. Kiến trúc backend

Backend gồm nhiều service:

### 3.1. API Gateway
- Thư mục: `be/API_GETWAY/`
- File chính: `be/API_GETWAY/ocelot.json:1`

Gateway nhận request từ frontend rồi forward về service phù hợp.

### 3.2. API Login
- Thư mục: `be/API_Login/`
- Chức năng:
  - đăng nhập
  - đăng ký
  - lấy thông tin user hiện tại

### 3.3. API Sản phẩm
- Thư mục: `be/API_SanPham/`
- Chức năng:
  - CRUD sản phẩm
  - lấy danh sách nhà cung cấp

### 3.4. API Đơn hàng
- Thư mục: `be/API_DonHang/`
- Chức năng:
  - đơn hàng
  - hóa đơn nhập
  - kho liên quan

## 4. Mô hình nội bộ backend

Backend dùng mô hình:

- **Controller**: nhận request HTTP
- **BLL**: business logic
- **DAL**: truy cập dữ liệu SQL Server
- **Models**: entity và request DTO

Ví dụ luồng sản phẩm:

`DoHocTapController -> DoHocTap_BLL -> DoHocTap_DAL -> SQL Server`

## 5. Gateway mapping

Theo `be/API_GETWAY/ocelot.json:1`:

- `/login/api/auth/*` -> `API_Login`
- `/api/dohoctap/*` -> `API_SanPham`
- `/api/nhacungcap/*` -> `API_SanPham`
- `/api/donhang/*` -> `API_DonHang`
- `/api/hoadonnhap/*` -> `API_DonHang`

## 6. Kiến trúc dữ liệu frontend

Frontend không dùng raw data backend trực tiếp ở mọi nơi. Có bước map:

- Backend trả `SanPhamAPI`
- Frontend chuyển sang `SanPham`
- Hàm map nằm ở `fe/src/utils/sanpham.ts`

Điều này giúp frontend:
- chuẩn hóa dữ liệu hiển thị
- gắn thêm metadata như thương hiệu, loại chi tiết, màu sắc
- kết hợp dữ liệu tĩnh nếu cần

## 7. Dữ liệu tĩnh hỗ trợ

Các file dữ liệu tĩnh quan trọng:

- `fe/src/data/categoryData.ts`: cấu hình bộ lọc theo danh mục
- `fe/src/data/staticProducts.ts`: sản phẩm mẫu bổ sung

## 8. Nhận xét kiến trúc

### Ưu điểm
- Dễ tách module
- Dễ phát triển frontend độc lập với backend
- Gateway giúp frontend chỉ cần gọi một base URL

### Hạn chế hiện tại
- Phân quyền backend chưa siết chặt cho admin APIs
- Chưa có tầng cache/query hiện đại ở FE
- Một số module backend có sẵn nhưng FE chưa sử dụng
