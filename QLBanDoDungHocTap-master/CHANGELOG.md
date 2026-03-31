# Changelog

## [2024-03-31] - Admin Panel & Role-based Routing

### Đã hoàn thành

#### 1. Database Schema Update
- ✅ Tạo file `BANDD_V2.sql` với schema mới
- ✅ Xóa bảng `NhanVien` khỏi database
- ✅ Chỉ còn 2 vai trò: Admin (vaiTro_Id = 1) và Khách hàng (vaiTro_Id = 2)
- ✅ Cập nhật bảng `HoaDonNhap`: liên kết với `TaiKhoan` thay vì `NhanVien`
- ✅ Cập nhật bảng `DonHang`: xóa trường `nhanVien_id`

#### 2. Admin Panel
- ✅ Tạo trang Admin (`src/pages/Admin/Admin.tsx`)
- ✅ Tạo styles cho Admin page (`src/pages/Admin/styles.ts`)
- ✅ Sidebar menu với 6 chức năng:
  - Dashboard (với 4 stat cards)
  - Quản lý sản phẩm
  - Quản lý đơn hàng
  - Quản lý khách hàng
  - Quản lý kho
  - Báo cáo thống kê
- ✅ Giao diện riêng cho admin (không có header/footer)
- ✅ User info hiển thị trong sidebar
- ✅ Nút đăng xuất

#### 3. Role-based Routing
- ✅ Tạo `ProtectedRoute` component
- ✅ Cập nhật `App.tsx` để thêm route `/admin`
- ✅ Cập nhật `AuthContext` để return user data từ login
- ✅ Cập nhật `Login.tsx` để redirect theo vai trò:
  - Admin (vaiTro_Id = 1) → `/admin`
  - Khách hàng (vaiTro_Id = 2) → `/`
- ✅ Protected route: chỉ admin mới truy cập `/admin`
- ✅ Redirect về `/dang-nhap` nếu chưa đăng nhập

#### 4. TypeScript Configuration
- ✅ Tạo `src/vite-env.d.ts` cho Vite environment variables
- ✅ Tạo `src/styled.d.ts` cho Styled Components theme types
- ✅ Fix tất cả TypeScript errors
- ✅ Build thành công

#### 5. Documentation
- ✅ Cập nhật `README.md` với thông tin mới
- ✅ Thêm section "Vai Trò & Routing"
- ✅ Cập nhật cấu trúc dự án
- ✅ Cập nhật TODO list

### Chưa hoàn thành

#### Backend Updates (Cần làm thủ công)
- ⏳ Cập nhật `DAL/DonHang_DAL.cs` để xóa references đến `nhanVien_id`
- ⏳ Cập nhật `DAL/HoaDonNhap_DAL.cs` để dùng `taiKhoan_id` thay vì `nhanVien_id`
- ⏳ Cập nhật `BLL/DonHang_BLL.cs`
- ⏳ Cập nhật `BLL/HoaDonNhap_BLL.cs`
- ⏳ Cập nhật Models để phản ánh schema mới
- ⏳ Test lại các API endpoints

#### Admin Panel Features
- ⏳ Tích hợp API thật cho Dashboard stats
- ⏳ Xây dựng trang Quản lý sản phẩm
- ⏳ Xây dựng trang Quản lý đơn hàng
- ⏳ Xây dựng trang Quản lý khách hàng
- ⏳ Xây dựng trang Quản lý kho
- ⏳ Xây dựng trang Báo cáo thống kê

#### Other Features
- ⏳ Endpoint đăng ký tài khoản
- ⏳ Trang chi tiết sản phẩm
- ⏳ Trang thanh toán
- ⏳ Quản lý đơn hàng cho khách hàng

### Files Changed

#### Created
- `src/pages/Admin/Admin.tsx`
- `src/pages/Admin/styles.ts`
- `src/components/ProtectedRoute.tsx`
- `src/vite-env.d.ts`
- `src/styled.d.ts`
- `BANDD_V2.sql`
- `CHANGELOG.md`

#### Modified
- `src/App.tsx` - Thêm admin route và import ProtectedRoute
- `src/pages/Login/Login.tsx` - Thêm logic redirect theo vai trò
- `src/context/AuthContext.tsx` - Return response từ login function
- `README.md` - Cập nhật documentation

### Testing

Để test tính năng mới:

1. **Cập nhật database:**
   - Import database mới: `BANDD_V2.sql`
   - Hoặc chạy script: `UPDATE_PASSWORD.sql` để cập nhật mật khẩu
   
2. **Tài khoản test:**
   - Admin: `admin` / `123456` (vaiTro_Id = 1)
   - User: `user1` / `123456` (vaiTro_Id = 2)
   
3. **Chạy backend** (xem `HUONG_DAN_CHAY_BACKEND.md`)

4. **Chạy frontend:** `npm run dev`

5. **Test flow:**
   - Đăng nhập với tài khoản admin → kiểm tra redirect đến `/admin`
   - Kiểm tra sidebar menu hoạt động
   - Đăng xuất và đăng nhập với tài khoản user1
   - Kiểm tra redirect đến `/`
   - Thử truy cập `/admin` với tài khoản user (sẽ bị redirect về `/`)

### Important Notes

- **Mật khẩu trong database:** Backend hiện tại so sánh mật khẩu trực tiếp (plain text), KHÔNG dùng bcrypt
- Nếu database có mật khẩu dạng hash (`$2b$10$...`), cần chạy `UPDATE_PASSWORD.sql` để đổi về plain text
- Trong production, nên cập nhật backend để dùng bcrypt hash password
