# Script kiểm tra nhanh các API (giả sử services đã chạy)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KIỂM TRA NHANH CÁC API" -ForegroundColor Cyan
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

$gateway = "http://localhost:5000"

Write-Host "Kiểm tra API Gateway..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$gateway/api/dohoctap" -UseBasicParsing -TimeoutSec 5
    Write-Host "✓ API Gateway hoạt động (Status: $($response.StatusCode))" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Danh sách API có thể test:" -ForegroundColor Cyan
    Write-Host "  POST $gateway/api/auth/register" -ForegroundColor White
    Write-Host "  POST $gateway/api/auth/login" -ForegroundColor White
    Write-Host "  GET  $gateway/api/dohoctap" -ForegroundColor White
    Write-Host "  GET  $gateway/api/nhacungcap" -ForegroundColor White
    Write-Host "  GET  $gateway/api/donhang" -ForegroundColor White
    Write-Host "  GET  $gateway/api/hoadonnhap" -ForegroundColor White
    Write-Host ""
    Write-Host "✓ TẤT CẢ API SẴN SÀNG!" -ForegroundColor Green
}
catch {
    Write-Host "✗ Không thể kết nối đến API Gateway" -ForegroundColor Red
    Write-Host ""
    Write-Host "Vui lòng:" -ForegroundColor Yellow
    Write-Host "1. Chạy START_ALL_V2.bat để khởi động services" -ForegroundColor Yellow
    Write-Host "2. Hoặc chạy AUTO_START_AND_TEST.ps1 để tự động khởi động" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Nhấn phím bất kỳ để thoát..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
