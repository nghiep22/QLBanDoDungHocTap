# Tài liệu dự án QLBanDoDungHocTap

Bộ tài liệu này mô tả dự án từ tổng quan đến chi tiết, bao gồm kiến trúc, luồng chức năng, cấu trúc frontend/backend, các trang, component, API và cách các phần liên kết với nhau.

## Danh sách tài liệu

1. [00-tong-quan-du-an.md](./00-tong-quan-du-an.md)
   - Mục tiêu dự án, công nghệ sử dụng, kiến trúc tổng thể.

2. [01-kien-truc-he-thong.md](./01-kien-truc-he-thong.md)
   - Cấu trúc thư mục FE/BE, API Gateway, service backend, context frontend.

3. [02-frontend-routes-pages-components.md](./02-frontend-routes-pages-components.md)
   - Router, các trang chính, component chính, điều hướng giữa các trang.

4. [03-api-va-luong-du-lieu.md](./03-api-va-luong-du-lieu.md)
   - Service API frontend, endpoint backend, luồng request/response và mapping dữ liệu.

5. [04-cac-chuc-nang-chinh.md](./04-cac-chuc-nang-chinh.md)
   - Luồng hoạt động của các chức năng như đăng nhập, duyệt sản phẩm, lọc, giỏ hàng, admin sản phẩm.

6. [05-phan-tich-chi-tiet-theo-module.md](./05-phan-tich-chi-tiet-theo-module.md)
   - Phân tích từng module FE/BE và các hàm quan trọng đang được sử dụng.

7. [06-co-so-du-lieu-va-backend.md](./06-co-so-du-lieu-va-backend.md)
   - Mô hình dữ liệu, bảng dữ liệu, BLL, DAL và backend controllers.

## Gợi ý thứ tự đọc

- Nếu mới làm quen dự án: đọc `00` -> `01` -> `02`
- Nếu cần hiểu cách gọi API và luồng dữ liệu: đọc `03` -> `04`
- Nếu cần bảo trì hoặc phát triển tiếp: đọc `05` -> `06`
