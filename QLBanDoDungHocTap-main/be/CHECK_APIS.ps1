# Script kiểm tra tất cả APIs
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KIỂM TRA CÁC API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Biến
$gateway = "http://localhost:5000"
$apiLogin = "https://localhost:5010"
$apiSanPham = "https://localhost:5020"
$apiDonHang = "https://localhost:5030"

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
    Write-Host "  URL: $Url" -ForegroundColor Gray
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($Method -eq "GET") {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -UseBasicParsing -ErrorAction Stop
        } else {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $headers -Body $Body -UseBasicParsing -ErrorAction Stop
        }
        
        Write-Host "  ✓ Status: $($response.StatusCode)" -ForegroundColor Green
        
        # Parse JSON response
        $jsonResponse = $response.Content | ConvertFrom-Json
        Write-Host "  Response: $($response.Content.Substring(0, [Math]::Min(100, $response.Content.Length)))..." -ForegroundColor Gray
        
        return $true
    }
    catch {
        Write-Host "  ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    
    Write-Host ""
}

# Đếm kết quả
$total = 0
$passed = 0

Write-Host ""
Write-Host "1. API LOGIN (Authentication)" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

# Test Register
$total++
$body = @{
    tenDangNhap = "testuser_$(Get-Random)"
    matKhau = "123456"
    vaiTro_Id = 2
} | ConvertTo-Json

if (Test-API -Name "Register" -Url "$gateway/api/auth/register" -Method "POST" -Body $body) {
    $passed++
}

# Test Login
$total++
$body = @{
    tenDangNhap = "admin"
    matKhau = "admin"
} | ConvertTo-Json

if (Test-API -Name "Login" -Url "$gateway/api/auth/login" -Method "POST" -Body $body) {
    $passed++
}

Write-Host ""
Write-Host "2. API SẢN PHẨM (Không cần token)" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

# Test Get All Products
$total++
if (Test-API -Name "Get All Products" -Url "$gateway/api/dohoctap") {
    $passed++
}

Write-Host ""
Write-Host "3. API NHÀ CUNG CẤP (Không cần token)" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

# Test Get All Suppliers
$total++
if (Test-API -Name "Get All Suppliers" -Url "$gateway/api/nhacungcap") {
    $passed++
}

Write-Host ""
Write-Host "4. API ĐƠN HÀNG (Không cần token)" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

# Test Get All Orders
$total++
if (Test-API -Name "Get All Orders" -Url "$gateway/api/donhang") {
    $passed++
}

Write-Host ""
Write-Host "5. API HÓA ĐƠN NHẬP (Không cần token)" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Cyan

# Test Get All Import Invoices
$total++
if (Test-API -Name "Get All Import Invoices" -Url "$gateway/api/hoadonnhap") {
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
    Write-Host ""
    Write-Host "Lưu ý:" -ForegroundColor Yellow
    Write-Host "- Đảm bảo tất cả services đang chạy (API Gateway, API_Login, API_SanPham, API_DonHang)" -ForegroundColor Yellow
    Write-Host "- Kiểm tra database đã được tạo và có dữ liệu" -ForegroundColor Yellow
    Write-Host "- Kiểm tra connection string trong appsettings.json" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Nhấn phím bất kỳ để thoát..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
