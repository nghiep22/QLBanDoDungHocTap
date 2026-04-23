# 00. Tổng quan dự án

## 1. Giới thiệu

`QLBanDoDungHocTap` là dự án website bán đồ dùng học tập và văn phòng phẩm. Hệ thống gồm:

- **Frontend**: React + TypeScript + Vite
- **Backend**: .NET 8 chia thành nhiều API/service
- **Database**: SQL Server

Mục tiêu chính của dự án là:

- Hiển thị danh mục và sản phẩm học tập
- Cho phép người dùng đăng nhập, đăng ký
- Duyệt sản phẩm theo danh mục
- Lọc sản phẩm theo loại chi tiết, thương hiệu, giá, màu sắc
- Quản lý giỏ hàng ở phía client
- Quản trị sản phẩm ở khu admin

## 2. Công nghệ sử dụng

### Frontend
- React 18
- TypeScript
- React Router DOM
- Styled Components
- Vite

### Backend
- ASP.NET Core .NET 8
- Ocelot API Gateway
- JWT Authentication
- ADO.NET / SQL Server
- Mô hình DAL + BLL + Controllers

## 3. Kiến trúc tổng thể

Hệ thống được tổ chức theo dạng nhiều service backend:

- `API_GETWAY`: cổng vào chung cho frontend
- `API_Login`: xác thực, đăng nhập, đăng ký
- `API_SanPham`: sản phẩm, nhà cung cấp
- `API_DonHang`: đơn hàng, hóa đơn nhập

Frontend thường gọi về gateway tại:
- `http://localhost:5000`

Gateway sẽ chuyển tiếp request đến từng service tương ứng.

## 4. Những chức năng hiện có

### Đã hoạt động ở frontend
- Trang chủ
- Trang danh mục sản phẩm
- Bộ lọc sản phẩm
- Giỏ hàng localStorage
- Đăng nhập / đăng ký
- Trang admin
- CRUD sản phẩm ở admin

### Backend đã có nhưng frontend chưa nối đầy đủ
- Đơn hàng
- Hóa đơn nhập
- Quản lý kho
- Một phần báo cáo

## 5. Luồng sử dụng cơ bản

1. Người dùng mở trang chủ `/`
2. Chọn danh mục sản phẩm
3. Vào trang danh mục `/danh-muc/:slug`
4. Lọc sản phẩm theo tiêu chí
5. Thêm sản phẩm vào giỏ hàng
6. Nếu là admin thì vào `/admin` để quản lý sản phẩm

## 6. Điểm đáng chú ý

- Dữ liệu sản phẩm đang dùng kết hợp giữa API backend và dữ liệu tĩnh.
- Giỏ hàng hiện chỉ chạy ở frontend, chưa tạo đơn hàng thật.
- Một số route trong footer chưa có trang tương ứng.
- Phân quyền admin hiện mạnh ở frontend hơn backend.
