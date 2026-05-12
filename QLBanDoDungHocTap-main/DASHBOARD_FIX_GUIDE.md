# HƯỚNG DẪN FIX DASHBOARD - LẤY DỮ LIỆU THẬT TỪ SQL

## 📋 Tổng quan

Dashboard đã được cập nhật để lấy dữ liệu thật từ SQL thay vì dữ liệu giả (hardcoded).

## 🔧 Các thay đổi đã thực hiện

### 1. Backend - Tạo API Thống kê mới

#### a) Models (be/Models/ThongKeModels.cs)
- `DashboardThongKe`: Thống kê tổng quan (tổng sản phẩm, đơn hàng, khách hàng, doanh thu)
- `DoanhThuTheoNgay`: Doanh thu theo ngày
- `TopSanPham`: Top sản phẩm bán chạy
- `DonHangTheoTrangThai`: Đơn hàng theo trạng thái

#### b) Data Access Layer (be/DAL/ThongKe_DAL.cs)
Các methods:
- `GetDashboardStatsAsync()`: Lấy thống kê tổng quan
- `GetDoanhThuTheoNgayAsync()`: Lấy doanh thu theo ngày
- `GetTopSanPhamAsync()`: Lấy top sản phẩm bán chạy
- `GetDonHangTheoTrangThaiAsync()`: Lấy đơn hàng theo trạng thái

#### c) Business Logic Layer (be/BLL/ThongKe_BLL.cs)
Interface `IThongKe_BLL` và implementation `ThongKe_BLL`

#### d) Controller (be/API_DonHang/Controllers/ThongKeController.cs)
API Endpoints:
- `GET /api/thongke/dashboard` - Thống kê tổng quan
- `GET /api/thongke/doanh-thu?tuNgay=...&denNgay=...` - Doanh thu theo ngày
- `GET /api/thongke/top-san-pham?limit=10` - Top sản phẩm
- `GET /api/thongke/don-hang-theo-trang-thai` - Đơn hàng theo trạng thái

#### e) Dependency Injection (be/API_DonHang/Program.cs)
Đã thêm:
```csharp
builder.Services.AddTransient(sp => new ThongKe_DAL(connStr));
builder.Services.AddScoped<IThongKe_BLL>(sp => new ThongKe_BLL(connStr));
```

#### f) API Gateway Routing (be/API_GETWAY/ocelot.json)
Đã thêm route cho `/api/thongke/{everything}` → API_DonHang (Port 5030)

### 2. Frontend - Cập nhật Dashboard

#### a) API Service (fe/src/services/api.ts)
Đã thêm methods:
- `layThongKeDashboard()`: Lấy thống kê dashboard
- `layDoanhThuTheoNgay()`: Lấy doanh thu theo ngày
- `layTopSanPham()`: Lấy top sản phẩm
- `layDonHangTheoTrangThai()`: Lấy đơn hàng theo trạng thái

#### b) Admin Component (fe/src/pages/Admin/Admin.tsx)
Thay đổi:
- Thêm state `dashboardStats` và `loading`
- Thêm `useEffect` để load dữ liệu khi vào dashboard
- Thêm function `loadDashboardStats()` để gọi API
- Thêm function `formatCurrency()` để format số tiền (K, M, B)
- Cập nhật UI để hiển thị dữ liệu thật thay vì hardcoded

## 🚀 Cách chạy và test

### 1. Khởi động Backend

```bash
cd be
.\START_ALL_V2.bat
```

Hoặc chạy từng service:
```bash
# Terminal 1 - API Gateway
cd API_GETWAY
dotnet run

# Terminal 2 - API Login
cd API_Login
dotnet run

# Terminal 3 - API SanPham
cd API_SanPham
dotnet run

# Terminal 4 - API DonHang
cd API_DonHang
dotnet run
```

### 2. Khởi động Frontend

```bash
cd fe
npm install
npm run dev
```

### 3. Test API trực tiếp

#### Test API Dashboard Stats
```bash
curl http://localhost:5000/api/thongke/dashboard
```

Hoặc mở trình duyệt: `http://localhost:5000/api/thongke/dashboard`

Response mẫu:
```json
{
  "tongSanPham": 15,
  "tongDonHang": 8,
  "tongKhachHang": 5,
  "tongDoanhThu": 2500000
}
```

#### Test API Doanh thu theo ngày
```bash
curl "http://localhost:5000/api/thongke/doanh-thu?tuNgay=2024-01-01&denNgay=2024-12-31"
```

#### Test API Top sản phẩm
```bash
curl "http://localhost:5000/api/thongke/top-san-pham?limit=10"
```

#### Test API Đơn hàng theo trạng thái
```bash
curl http://localhost:5000/api/thongke/don-hang-theo-trang-thai
```

### 4. Test trên Frontend

1. Mở trình duyệt: `http://localhost:3000`
2. Đăng nhập với tài khoản admin
3. Vào trang Admin
4. Xem Dashboard - Dữ liệu sẽ được load từ API

## 📊 Dữ liệu hiển thị

Dashboard hiển thị 4 thẻ thống kê:

1. **Tổng sản phẩm**: Đếm từ bảng `DoHocTap` (chỉ sản phẩm đang hoạt động)
2. **Đơn hàng**: Đếm từ bảng `DonHang`
3. **Khách hàng**: Đếm từ bảng `KhachHang`
4. **Doanh thu**: Tổng `tongThanhToan` từ bảng `DonHang` (chỉ đơn đã giao)

## 🔍 Kiểm tra dữ liệu trong SQL

```sql
-- Kiểm tra tổng sản phẩm
SELECT COUNT(*) FROM DoHocTap WHERE trangThai = 1;

-- Kiểm tra tổng đơn hàng
SELECT COUNT(*) FROM DonHang;

-- Kiểm tra tổng khách hàng
SELECT COUNT(*) FROM KhachHang;

-- Kiểm tra tổng doanh thu
SELECT SUM(tongThanhToan) FROM DonHang WHERE trangThaiDH = N'da_giao';
```

## 🐛 Troubleshooting

### Lỗi: "Không thể lấy thống kê dashboard"

**Nguyên nhân**: Backend chưa chạy hoặc API Gateway chưa route đúng

**Giải pháp**:
1. Kiểm tra tất cả services đã chạy chưa
2. Kiểm tra ocelot.json đã có route `/api/thongke`
3. Kiểm tra connection string trong appsettings.json

### Lỗi: Dashboard hiển thị 0 cho tất cả

**Nguyên nhân**: Database chưa có dữ liệu

**Giải pháp**:
1. Chạy script SQL để insert dữ liệu mẫu
2. Hoặc tạo sản phẩm, đơn hàng, khách hàng qua UI

### Lỗi: CORS

**Nguyên nhân**: Frontend không được phép gọi API

**Giải pháp**: Đã cấu hình CORS trong Program.cs:
```csharp
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAll", p => p
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});
```

## 📝 Ghi chú

- API thống kê được đặt trong `API_DonHang` (Port 5030)
- Tất cả API thống kê đều route qua API Gateway (Port 5000)
- Frontend gọi API qua `http://localhost:5000/api/thongke/...`
- Dữ liệu được format tự động (K, M, B) cho dễ đọc
- Loading state được hiển thị khi đang tải dữ liệu

## ✅ Checklist

- [x] Tạo Models cho thống kê
- [x] Tạo ThongKe_DAL với queries SQL
- [x] Tạo ThongKe_BLL với business logic
- [x] Tạo ThongKeController với API endpoints
- [x] Cập nhật Program.cs để inject dependencies
- [x] Cập nhật ocelot.json để route API
- [x] Thêm methods vào api.ts (frontend)
- [x] Cập nhật Admin.tsx để gọi API thực
- [x] Thêm loading state và error handling
- [x] Format số tiền (K, M, B)

## 🎉 Kết quả

Dashboard giờ đây hiển thị dữ liệu thật từ SQL Server thay vì dữ liệu giả!
