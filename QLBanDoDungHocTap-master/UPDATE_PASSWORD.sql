-- Script để cập nhật mật khẩu trong database
-- Chạy script này trong SQL Server Management Studio hoặc Azure Data Studio

USE BANDODUNGHOCTAP;

-- Cập nhật mật khẩu thành plain text '123456' cho tất cả tài khoản
UPDATE TaiKhoan SET matKhau = '123456';

-- Hoặc cập nhật từng tài khoản cụ thể:
-- UPDATE TaiKhoan SET matKhau = '123456' WHERE tenDangNhap = 'admin';
-- UPDATE TaiKhoan SET matKhau = '123456' WHERE tenDangNhap = 'user1';

-- Kiểm tra kết quả
SELECT taiKhoan_id, tenDangNhap, matKhau, vaiTro_id FROM TaiKhoan;
