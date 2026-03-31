@echo off
chcp 65001 >nul
echo ========================================
echo   KHOI DONG TAT CA API - QLBanDDHT
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Khoi dong API_GETWAY (Port 5000)...
start "API_GETWAY - Port 5000" cmd /k "cd API_GETWAY && echo Starting API_GETWAY... && dotnet run --urls http://localhost:5000"
timeout /t 5 /nobreak >nul

echo [2/4] Khoi dong API_Login (Port 5010)...
start "API_Login - Port 5010" cmd /k "cd API_Login && echo Starting API_Login... && dotnet run"
timeout /t 5 /nobreak >nul

echo [3/4] Khoi dong API_SanPham (Port 5020)...
start "API_SanPham - Port 5020" cmd /k "cd API_SanPham && echo Starting API_SanPham... && dotnet run"
timeout /t 5 /nobreak >nul

echo [4/4] Khoi dong API_DonHang (Port 5030)...
start "API_DonHang - Port 5030" cmd /k "cd API_DonHang && echo Starting API_DonHang... && dotnet run"

echo.
echo ========================================
echo   DANG KHOI DONG...
echo ========================================
echo.
echo Doi 20-30 giay de tat ca API khoi dong xong
echo.
echo Sau do kiem tra:
echo   1. Gateway: http://localhost:5000
echo   2. Swagger Login: https://localhost:5010/swagger
echo   3. Swagger SanPham: https://localhost:5020/swagger
echo   4. Swagger DonHang: https://localhost:5030/swagger
echo.
echo De dung tat ca: STOP_ALL.bat
echo.
pause
