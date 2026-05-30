# Luồng hoạt động của `Admin.tsx`

## 1) `Admin.tsx` = shell admin
Đây là file chính của khu vực quản trị.

Nó điều khiển:
- sidebar
- tab đang mở
- dashboard
- báo cáo
- chuyển sang các module con
- logout admin

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:1-346`

---

## 2) State chính
- `activeTab` → tab đang mở
- `dashboardStats` → KPI dashboard
- `loading` → đang tải thống kê
- `donHangTrangThai` → data chart trạng thái đơn
- `doanhThuNgay` → data chart doanh thu ngày
- `topSanPham` → data top sản phẩm

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:34-47`

---

## 3) `loadDashboardStats()`
Đây là hàm load dữ liệu dashboard.

### Nó gọi:
- `layThongKeDashboard()`
- `layDonHangTheoTrangThai()`
- `layDoanhThuTheoNgay()`
- `layTopSanPham(5)`

### Sau đó:
- set `dashboardStats`
- map dữ liệu chart
- set state chart

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:56-74`

### API liên quan
- `fe/src/services/api.ts:486-545`

---

## 4) `useEffect()` = tự load khi mở dashboard
Khi `activeTab === 'dashboard'`:
- gọi `loadDashboardStats()`

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:49-54`

---

## 5) `formatCurrency(amount)`
**Nhiệm vụ:** rút gọn số tiền.

Ví dụ:
- `1000` → `1.0K`
- `1000000` → `1.0M`
- `1000000000` → `1.0B`

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:76-86`

---

## 6) `handleLogout()`
**Nhiệm vụ:** logout admin.

- gọi `dangXuat()` từ `AuthContext`
- điều hướng về `/dang-nhap`

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:88-91`

---

## 7) `maxDoanhThu`, `maxTopSp`
Đây là giá trị max để scale thanh bar chart.

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:93-94`

---

## 8) Sidebar
Sidebar chứa menu:
- Dashboard
- Sản phẩm
- Đơn hàng
- Nhập hàng
- Kho hàng
- Báo cáo
- Khách hàng

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:97-149`

---

## 9) Header title theo tab
Tựa đề thay đổi theo tab đang chọn.

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:151-162`

---

## 10) Render dashboard
Khi `activeTab === 'dashboard'`:
- hiện KPI cards
- hiện chart trạng thái đơn
- hiện chart doanh thu
- hiện top sản phẩm

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:164-276`

---

## 11) Tab modules con
Khi đổi tab:
- `products` → `QuanLySanPham`
- `orders` → `QuanLyDonHang`
- `imports` → `QuanLyNhapHang`
- `inventory` → `QuanLyKho`
- `reports` → render report panel
- `customers` → chức năng khách hàng

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:278-346`

---

## 12) Báo cáo
Tab `reports` dùng data đã load ở dashboard để hiển thị:
- doanh thu
- đơn hoàn tất
- đơn chờ
- sản phẩm top 1
- bảng top sản phẩm

### Vị trí
- `fe/src/pages/Admin/Admin.tsx:282-346`

---

## 13) CSS
Admin dùng style riêng:
- `fe/src/pages/Admin/styles.ts`

Trong đó có:
- sidebar
- dashboard card
- chart card
- report card

---

## 14) Đổ data lên form
`Admin.tsx` **không có form nhập liệu trực tiếp**.

### Cách hiểu
- File này chỉ là shell/layout.
- Khi chuyển tab sang:
  - `products` → form nằm ở `QuanLySanPham.tsx` / `FormSanPham.tsx`
  - `imports` → form nằm ở `QuanLyNhapHang.tsx`
  - `inventory` → form nằm ở `QuanLyKho.tsx`
- Vì vậy `Admin.tsx` không set data vào form, mà chỉ điều phối tab để component con tự đổ data vào form của nó.

---

## 15) Tóm tắt nhanh theo luồng
```txt
mở Admin.tsx
→ activeTab = dashboard
→ loadDashboardStats()
→ gọi API thống kê
→ render dashboard
→ bấm tab khác
→ render component tương ứng
```

---

## 15) Kết luận
`Admin.tsx` là **file shell** của admin: nó điều khiển toàn bộ layout và chuyển tab cho các module con.
