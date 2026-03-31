# Script kiểm tra cấu hình hệ thống

Write-Host "=== KIỂM TRA CẤU HÌNH HỆ THỐNG ===" -ForegroundColor Cyan
Write-Host ""

# 1. Kiểm tra SQL Server
Write-Host "1. Kiểm tra SQL Server..." -ForegroundColor Yellow
$sqlService = Get-Service -Name "MSSQL`$SQLEXPRESS" -ErrorAction SilentlyContinue
if ($sqlService) {
    if ($sqlService.Status -eq "Running") {
        Write-Host "   ✓ SQL Server đang chạy" -ForegroundColor Green
    } else {
        Write-Host "   ✗ SQL Server không chạy. Trạng thái: $($sqlService.Status)" -ForegroundColor Red
        Write-Host "   → Chạy: Start-Service MSSQL`$SQLEXPRESS" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✗ Không tìm thấy SQL Server SQLEXPRESS" -ForegroundColor Red
}

# 2. Kiểm tra .NET SDK
Write-Host ""
Write-Host "2. Kiểm tra .NET SDK..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "   ✓ .NET SDK version: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ .NET SDK chưa được cài đặt" -ForegroundColor Red
}

# 3. Kiểm tra Node.js
Write-Host ""
Write-Host "3. Kiểm tra Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Node.js chưa được cài đặt" -ForegroundColor Red
}

# 4. Kiểm tra npm
Write-Host ""
Write-Host "4. Kiểm tra npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "   ✓ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ npm chưa được cài đặt" -ForegroundColor Red
}

# 5. Kiểm tra database connection
Write-Host ""
Write-Host "5. Kiểm tra kết nối database..." -ForegroundColor Yellow
$serverName = "DESKTOP-IO3LR9C\SQLEXPRESS"
$databaseName = "BANDODUNGHOCTAP"

try {
    $connectionString = "Server=$serverName;Database=master;Trusted_Connection=True;TrustServerCertificate=True"
    $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $connection.Open()
    
    $command = $connection.CreateCommand()
    $command.CommandText = "SELECT name FROM sys.databases WHERE name = '$databaseName'"
    $result = $command.ExecuteScalar()
    
    if ($result) {
        Write-Host "   ✓ Database '$databaseName' tồn tại" -ForegroundColor Green
        
        # Kiểm tra mật khẩu
        $connectionString2 = "Server=$serverName;Database=$databaseName;Trusted_Connection=True;TrustServerCertificate=True"
        $connection2 = New-Object System.Data.SqlClient.SqlConnection($connectionString2)
        $connection2.Open()
        
        $command2 = $connection2.CreateCommand()
        $command2.CommandText = "SELECT TOP 1 tenDangNhap, matKhau FROM TaiKhoan WHERE tenDangNhap = 'admin'"
        $reader = $command2.ExecuteReader()
        
        if ($reader.Read()) {
            $username = $reader["tenDangNhap"]
            $password = $reader["matKhau"]
            Write-Host "   ✓ Tài khoản admin tồn tại" -ForegroundColor Green
            Write-Host "     Username: $username" -ForegroundColor Gray
            Write-Host "     Password: $password" -ForegroundColor Gray
            
            if ($password -like '$2b$*') {
                Write-Host "   ⚠ Mật khẩu đang ở dạng hash!" -ForegroundColor Yellow
                Write-Host "   → Chạy script UPDATE_PASSWORD.sql để đổi về plain text" -ForegroundColor Yellow
            } elseif ($password -eq "123456") {
                Write-Host "   ✓ Mật khẩu đã đúng (123456)" -ForegroundColor Green
            }
        }
        
        $reader.Close()
        $connection2.Close()
    } else {
        Write-Host "   ✗ Database '$databaseName' chưa tồn tại" -ForegroundColor Red
        Write-Host "   → Import file BANDD_V2.sql" -ForegroundColor Yellow
    }
    
    $connection.Close()
} catch {
    Write-Host "   ✗ Không thể kết nối đến SQL Server" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 6. Kiểm tra file cấu hình
Write-Host ""
Write-Host "6. Kiểm tra file cấu hình..." -ForegroundColor Yellow

$configFiles = @(
    "QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_Login/appsettings.json",
    "QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_SanPham/appsettings.json",
    "QLBanDoDungHocTap-master/Quanlychitieu-main/be/API_DonHang/appsettings.json",
    ".env"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file không tồn tại" -ForegroundColor Red
    }
}

# 7. Tóm tắt
Write-Host ""
Write-Host "=== TÓM TẮT ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Nếu tất cả đều OK, bạn có thể:" -ForegroundColor White
Write-Host "1. Chạy backend: Xem file QUICK_START.md" -ForegroundColor White
Write-Host "2. Chạy frontend: npm run dev" -ForegroundColor White
Write-Host "3. Đăng nhập với: admin / 123456" -ForegroundColor White
Write-Host ""
