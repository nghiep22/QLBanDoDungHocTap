# Quản Lý Bán Đồ Dùng Học Tập

Hệ thống quản lý bán đồ dùng học tập với kiến trúc Microservices.

## 📁 Cấu trúc dự án

```
QLBanDoDungHocTap-main/
├── be/                          # Backend (C# .NET 8)
│   ├── API_GETWAY/              # API Gateway (Ocelot)
│   ├── API_Login/               # Service đăng nhập
│   ├── API_SanPham/             # Service sản phẩm
│   ├── API_DonHang/             # Service đơn hàng
│   ├── Models/                  # Data models
│   ├── DAL/                     # Data Access Layer
│   ├── BLL/                     # Business Logic Layer
│   └── QLBanDoDungHocTap.sln   # Solution file
│
├── fe/                          # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Pages
│   │   ├── services/            # API services
│   │   ├── context/             # React Context
│   │   ├── types/               # TypeScript types
│   │   └── styles/              # Styled components
│   ├── package.json
│   └── vite.config.ts
│
└── sql.sql                      # Database schema
```

## 🚀 Hướng dẫn chạy dự án

### Backend

1. Mở file `be/QLBanDoDungHocTap.sln` bằng Visual Studio
2. Restore NuGet packages
3. Chạy file `be/START_ALL_V2.bat` để khởi động tất cả services
4. Hoặc chạy từng service riêng lẻ

**Ports:**
- API Gateway: 7001
- API Login: 5001
- API SanPham: 5002
- API DonHang: 5003

### Frontend

```bash
cd fe
npm install
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173

### Database

1. Mở SQL Server Management Studio
2. Import file `sql.sql`
3. Cập nhật connection string trong các file `appsettings.json`

## 🛠️ Công nghệ sử dụng

### Backend
- C# .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- Ocelot (API Gateway)
- SQL Server

### Frontend
- React 18
- TypeScript
- Vite
- Styled Components
- React Router

## 📝 Tính năng

- Quản lý sản phẩm (đồ dùng học tập)
- Quản lý đơn hàng
- Quản lý khách hàng
- Quản lý nhà cung cấp
- Quản lý kho
- Quản lý hóa đơn nhập
- Xác thực và phân quyền
- Dashboard thống kê

## 📄 License

MIT
