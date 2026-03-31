# Hướng Dẫn Chạy Backend Thủ Công

## Yêu Cầu
- .NET 8 SDK
- SQL Server
- Database đã được tạo (chạy file BANDD.sql)

## Cấu Trúc Backend

Backend gồm 4 API services:
1. **API_GETWAY** (Port 5000) - Gateway chính
2. **API_Login** (Port 5010) - Authentication
3. **API_SanPham** (Port 5020) - Quản lý sản phẩm
4. **API_DonHang** (Port 5030) - Quản lý đơn hàng

## Cách 1: Chạy Từng API Riêng Lẻ (Khuyến nghị)

### Bước 1: Mở 4 Terminal/Command Prompt

### Bước 2: Chạy API Gateway
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_GETWAY
dotnet run --urls http://localhost:5000
```

### Bước 3: Chạy API Login (Terminal mới)
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_Login
dotnet run
```
API sẽ chạy trên port 5010 (xem trong launchSettings.json)

### Bước 4: Chạy API SanPham (Terminal mới)
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_SanPham
dotnet run
```
API sẽ chạy trên port 5020

### Bước 5: Chạy API DonHang (Terminal mới)
```bash
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_DonHang
dotnet run
```
API sẽ chạy trên port 5030

## Cách 2: Sử dụng Visual Studio

### Option A: Chạy Multiple Projects
1. Mở file `QLBanDDHT.sln` trong Visual Studio
2. Right-click vào Solution → Properties
3. Chọn "Multiple startup projects"
4. Set tất cả 4 API projects thành "Start"
5. Nhấn F5 hoặc Start

### Option B: Chạy Từng Project
1. Mở Solution trong Visual Studio
2. Right-click vào từng project → Debug → Start New Instance
3. Chạy theo thứ tự:
   - API_GETWAY
   - API_Login
   - API_SanPham
   - API_DonHang

## Cách 3: Sử dụng VS Code

### Tạo file launch.json
Tạo file `.vscode/launch.json` trong thư mục `be`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "API Gateway",
      "type": "coreclr",
      "request": "launch",
      "preLaunchTask": "build",
      "program": "${workspaceFolder}/API_GETWAY/bin/Debug/net8.0/API_GETWAY.dll",
      "args": [],
      "cwd": "${workspaceFolder}/API_GETWAY",
      "env": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "ASPNETCORE_URLS": "http://localhost:5000"
      }
    },
    {
      "name": "API Login",
      "type": "coreclr",
      "request": "launch",
      "preLaunchTask": "build",
      "program": "${workspaceFolder}/API_Login/bin/Debug/net8.0/API_Login.dll",
      "args": [],
      "cwd": "${workspaceFolder}/API_Login",
      "env": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    {
      "name": "API SanPham",
      "type": "coreclr",
      "request": "launch",
      "preLaunchTask": "build",
      "program": "${workspaceFolder}/API_SanPham/bin/Debug/net8.0/API_SanPham.dll",
      "args": [],
      "cwd": "${workspaceFolder}/API_SanPham",
      "env": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    {
      "name": "API DonHang",
      "type": "coreclr",
      "request": "launch",
      "preLaunchTask": "build",
      "program": "${workspaceFolder}/API_DonHang/bin/Debug/net8.0/API_DonHang.dll",
      "args": [],
      "cwd": "${workspaceFolder}/API_DonHang",
      "env": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  ],
  "compounds": [
    {
      "name": "All APIs",
      "configurations": [
        "API Gateway",
        "API Login",
        "API SanPham",
        "API DonHang"
      ]
    }
  ]
}
```

Sau đó chọn "All APIs" trong Debug panel và nhấn F5.

## Kiểm Tra API Đã Chạy

### 1. Kiểm tra qua Browser
- Gateway: http://localhost:5000
- Login Swagger: https://localhost:5010/swagger
- SanPham Swagger: https://localhost:5020/swagger
- DonHang Swagger: https://localhost:5030/swagger

### 2. Kiểm tra qua Command Line
```bash
# Test Gateway
curl http://localhost:5000

# Test Login API
curl https://localhost:5010/swagger/index.html

# Test SanPham API
curl https://localhost:5020/swagger/index.html

# Test DonHang API
curl https://localhost:5030/swagger/index.html
```

### 3. Kiểm tra Process đang chạy
```bash
# Windows
netstat -ano | findstr "5000 5010 5020 5030"

# Hoặc
tasklist | findstr "dotnet"
```

## Cấu Hình Connection String

Kiểm tra file `appsettings.json` trong mỗi API project:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=BANDODUNGHOCTAP;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Nếu SQL Server của bạn khác, cập nhật connection string.

## Dừng API

### Cách 1: Trong Terminal
Nhấn `Ctrl + C` trong mỗi terminal đang chạy API

### Cách 2: Kill Process
```bash
# Windows - Kill tất cả dotnet process
taskkill /F /IM dotnet.exe

# Hoặc kill từng port cụ thể
# Tìm PID
netstat -ano | findstr ":5000"
# Kill PID
taskkill /F /PID <PID_NUMBER>
```

## Troubleshooting

### Lỗi: Port đã được sử dụng
```bash
# Tìm process đang dùng port
netstat -ano | findstr ":5000"

# Kill process
taskkill /F /PID <PID>
```

### Lỗi: Không kết nối được database
1. Kiểm tra SQL Server đã chạy
2. Kiểm tra connection string
3. Kiểm tra database đã được tạo

### Lỗi: Certificate SSL
Chạy lệnh:
```bash
dotnet dev-certs https --trust
```

## Build Production

```bash
# Build tất cả projects
cd QLBanDoDungHocTap-master/Quanlychitieu-main/be
dotnet build QLBanDDHT.sln --configuration Release

# Publish
dotnet publish QLBanDDHT.sln --configuration Release --output ./publish
```

## Chạy Production Build

```bash
cd publish
dotnet API_GETWAY.dll --urls http://localhost:5000
# Tương tự cho các API khác
```

## Tips

1. **Chạy trong background (Linux/Mac)**:
```bash
nohup dotnet run --urls http://localhost:5000 > gateway.log 2>&1 &
```

2. **Xem logs realtime**:
```bash
tail -f gateway.log
```

3. **Restart nhanh**: Nhấn `Ctrl+C` rồi chạy lại `dotnet run`

4. **Hot reload**: Sử dụng `dotnet watch run` thay vì `dotnet run`
