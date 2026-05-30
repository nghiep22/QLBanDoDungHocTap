# Script tự động khởi động và kiểm tra tất cả API
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TỰ ĐỘNG KHỞI ĐỘNG VÀ KIỂM TRA API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra .NET SDK
Write-Host "Kiểm tra .NET SDK..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✓ .NET SDK version: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ .NET SDK không được cài đặt!" -ForegroundColor Red
    Write-Host "Vui lòng cài đặt .NET 8 SDK từ: https://dotnet.microsoft.com/download" -ForegroundColor Yellow
    exit
}

Write-Host ""

# Kiểm tra SQL Server
Write-Host "Kiểm tra SQL Server..." -ForegroundColor Yellow
$sqlService = Get-Service -Name "MSSQL*" -ErrorAction SilentlyContinue | Where-Object {$_.Status -eq "Running"}
if ($sqlService) {
    Write-Host "✓ SQL Server đang chạy" -ForegroundColor Green
} else {
    Write-Host "⚠ SQL Server có thể chưa chạy" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KHỞI ĐỘNG CÁC SERVICES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function để khởi động service
function Start-Service {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Port
    )
    
    Write-Host "Khởi động $Name (Port $Port)..." -ForegroundColor Yellow
    
    $process = Start-Process -FilePath "dotnet" -ArgumentList "run --project `"$Path`"" -PassThru -WindowStyle Minimized
    
    if ($process) {
        Write-Host "✓ $Name đã khởi động (PID: $($process.Id))" -ForegroundColor Green
        return $process
    } else {
        Write-Host "✗ Không thể khởi động $Name" -ForegroundColor Red
        return $null
    }
}

# Lưu các process để dọn dẹp sau
$processes = @()

# Khởi động API_Login
$processes += Start-Service -Name "API_Login" -Path "API_Login\API_Login.csproj" -Port "5010"
Start-Sleep -Seconds 5

# Khởi động API_SanPham
$processes += Start-Service -Name "API_SanPham" -Path "API_SanPham\API_SanPham.csproj" -Port "5020"
Start-Sleep -Seconds 5

# Khởi động API_DonHang
$processes += Start-Service -Name "API_DonHang" -Path "API_DonHang\API_DonHang.csproj" -Port "5030"
Start-Sleep -Seconds 5

# Khởi động API_GETWAY
$processes += Start-Service -Name "API_GETWAY" -Path "API_GETWAY\API_GETWAY.csproj" -Port "5000"

Write-Host ""
Write-Host "Đợi các services khởi động hoàn tất..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KIỂM TRA CÁC API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Bỏ qua SSL certificate validation
add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

# Function để test API
function Test-API {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [string]$Body = $null
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($Method -eq "GET") {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        } else {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -Body $Body -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        }
        
        Write-Host "  ✓ Status: $($response.StatusCode)" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "  ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Biến
$gateway = "http://localhost:5000"
$total = 0
$passed = 0

# Test APIs
Write-Host "1. API Gateway Health Check" -ForegroundColor Cyan
$total++
if (Test-API -Name "Gateway" -Url "$gateway/api/auth/login" -Method "POST" -Body '{"tenDangNhap":"test","matKhau":"test"}') {
    $passed++
}

Write-Host ""
Write-Host "2. API Login - Register" -ForegroundColor Cyan
$total++
$randomUser = "testuser_$(Get-Random -Maximum 10000)"
$body = @{
    tenDangNhap = $randomUser
    matKhau = "123456"
    vaiTro_Id = 2
} | ConvertTo-Json

if (Test-API -Name "Register" -Url "$gateway/api/auth/register" -Method "POST" -Body $body) {
    $passed++
}

Write-Host ""
Write-Host "3. API Sản phẩm - Get All" -ForegroundColor Cyan
$total++
if (Test-API -Name "Get Products" -Url "$gateway/api/dohoctap") {
    $passed++
}

Write-Host ""
Write-Host "4. API Nhà cung cấp - Get All" -ForegroundColor Cyan
$total++
if (Test-API -Name "Get Suppliers" -Url "$gateway/api/nhacungcap") {
    $passed++
}

Write-Host ""
Write-Host "5. API Đơn hàng - Get All" -ForegroundColor Cyan
$total++
if (Test-API -Name "Get Orders" -Url "$gateway/api/donhang") {
    $passed++
}

Write-Host ""
Write-Host "6. API Hóa đơn nhập - Get All" -ForegroundColor Cyan
$total++
if (Test-API -Name "Get Import Invoices" -Url "$gateway/api/hoadonnhap") {
    $passed++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KẾT QUẢ KIỂM TRA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Tổng số test: $total" -ForegroundColor White
Write-Host "Thành công: $passed" -ForegroundColor Green
Write-Host "Thất bại: $($total - $passed)" -ForegroundColor Red
Write-Host ""

if ($passed -eq $total) {
    Write-Host "✓ TẤT CẢ API HOẠT ĐỘNG ĐÚNG!" -ForegroundColor Green
} else {
    Write-Host "✗ CÓ LỖI XẢY RA!" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "THÔNG TIN SERVICES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "API Gateway:  http://localhost:5000" -ForegroundColor White
Write-Host "API Login:    https://localhost:5010/swagger" -ForegroundColor White
Write-Host "API SanPham:  https://localhost:5020/swagger" -ForegroundColor White
Write-Host "API DonHang:  https://localhost:5030/swagger" -ForegroundColor White
Write-Host ""

# Hỏi người dùng có muốn dừng services không
Write-Host "Nhấn 'S' để dừng tất cả services, hoặc phím khác để giữ chạy..." -ForegroundColor Yellow
$key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

if ($key.Character -eq 's' -or $key.Character -eq 'S') {
    Write-Host ""
    Write-Host "Đang dừng các services..." -ForegroundColor Yellow
    
    foreach ($proc in $processes) {
        if ($proc -and !$proc.HasExited) {
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
            Write-Host "✓ Đã dừng process $($proc.Id)" -ForegroundColor Green
        }
    }
    
    Write-Host "✓ Đã dừng tất cả services" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Services vẫn đang chạy. Đóng cửa sổ này để dừng." -ForegroundColor Yellow
    Write-Host "Nhấn phím bất kỳ để thoát..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
