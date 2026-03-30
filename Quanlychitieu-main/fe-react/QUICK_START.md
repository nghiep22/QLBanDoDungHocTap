# 🚀 Quick Start Guide

## Bước 1: Cài đặt Dependencies

```bash
cd Quanlychitieu-main/fe-react
npm install
```

## Bước 2: Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:5173**

## Bước 3: Truy cập ứng dụng

1. Mở browser và truy cập: `http://localhost:5173`
2. Bạn sẽ thấy trang đăng nhập
3. Nhấn "Đăng ký ngay" để tạo tài khoản mới
4. Sau khi đăng ký, đăng nhập với tài khoản vừa tạo

## 📋 Lưu ý

### Backend API
- Đảm bảo backend API đang chạy tại `http://localhost:7001`
- Nếu backend chạy ở port khác, cập nhật trong `src/config/axios.ts`

### Cấu trúc trang

**Trang công khai (không cần đăng nhập):**
- `/login` - Đăng nhập
- `/register` - Đăng ký

**Trang yêu cầu đăng nhập:**
- `/dashboard` - Tổng quan
- `/transactions` - Giao dịch
- `/wallets` - Ví
- `/categories` - Danh mục
- `/budgets` - Ngân sách
- `/goals` - Mục tiêu

## 🔧 Troubleshooting

### Lỗi kết nối API
```
Error: Network Error
```
**Giải pháp:** Kiểm tra backend API có đang chạy không

### Lỗi CORS
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Giải pháp:** Cấu hình CORS trong backend để cho phép origin `http://localhost:5173`

### Port đã được sử dụng
```
Port 5173 is already in use
```
**Giải pháp:** 
- Tắt process đang dùng port 5173
- Hoặc Vite sẽ tự động chọn port khác (5174, 5175...)

## 📱 Tính năng đã hoàn thành

✅ Cấu trúc dự án chuẩn  
✅ Routing với React Router  
✅ Authentication (Login/Register)  
✅ Protected Routes  
✅ Layout với Header/Footer  
✅ Dashboard  
✅ Các trang quản lý (Wallet, Transaction, Category, Budget, Goal)  
✅ Responsive design  
✅ TypeScript support  

## 🎯 Bước tiếp theo

1. Kết nối với backend API thực tế
2. Implement các chức năng CRUD cho từng module
3. Thêm validation cho forms
4. Thêm loading states và error handling
5. Thêm charts và visualizations
6. Implement search và filter
7. Thêm pagination
8. Optimize performance

## 💡 Tips

- Sử dụng React DevTools để debug
- Kiểm tra Network tab trong DevTools để xem API calls
- Xem console để debug errors
- Sử dụng `npm run build` để test production build

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Console log trong browser
2. Terminal output
3. Network requests trong DevTools
4. Backend API logs
