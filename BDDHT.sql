CREATE DATABASE BANDODUNGHOCTAP ;
USE BANDODUNGHOCTAP ;


-- 1. BẢNG TÀI KHOẢN & PHÂN QUYỀN
CREATE TABLE VaiTro (
    vaiTro_id   INT PRIMARY KEY IDENTITY(1,1),
    tenVaiTro   NVARCHAR(50) NOT NULL,          -- 'admin', 'khach_hang'
    moTa        NVARCHAR(255)
);

CREATE TABLE TaiKhoan (
    taiKhoan_id INT PRIMARY KEY IDENTITY(1,1),
    tenDangNhap VARCHAR(100) NOT NULL UNIQUE,
    matKhau     VARCHAR(255) NOT NULL,          -- lưu dạng hash
    vaiTro_id   INT NOT NULL,
    trangThai   BIT DEFAULT 1,                  -- 1: hoạt động, 0: bị khoá
    ngayTao     DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_TaiKhoan_VaiTro FOREIGN KEY (vaiTro_id) REFERENCES VaiTro(vaiTro_id)
);

-- 2. KHÁCH HÀNG
CREATE TABLE KhachHang (
    khachHang_id    INT PRIMARY KEY IDENTITY(1,1),
    taiKhoan_id     INT UNIQUE,
    hoTen           NVARCHAR(100) NOT NULL,
    soDienThoai     VARCHAR(15),
    email           VARCHAR(100),
    diaChi          NVARCHAR(255),
    ngaySinh        DATE,
    gioiTinh        BIT,                         -- 1: Nam, 0: Nữ
    ngayDangKy      DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_KhachHang_TaiKhoan FOREIGN KEY (taiKhoan_id) REFERENCES TaiKhoan(taiKhoan_id)
);

-- 3. NHÀ CUNG CẤP
CREATE TABLE NhaCungCap (
    nhaCungCap_id   INT PRIMARY KEY IDENTITY(1,1),
    tenNCC          NVARCHAR(150) NOT NULL,
    soDienThoai     VARCHAR(15),
    email           VARCHAR(100),
    diaChi          NVARCHAR(255),
    maSoThue        VARCHAR(20),
    nguoiDaiDien    NVARCHAR(100),
    trangThai       BIT DEFAULT 1
);

-- 4. DANH MỤC & SẢN PHẨM
CREATE TABLE LoaiDoHocTap (
    loai_id     INT PRIMARY KEY IDENTITY(1,1),
    tenLoai     NVARCHAR(100) NOT NULL,
    moTa        NVARCHAR(255),
    hinhAnh     VARCHAR(255)
);

CREATE TABLE DoHocTap (
    sanPham_id      INT PRIMARY KEY IDENTITY(1,1),
    loai_id         INT NOT NULL,
    nhaCungCap_id   INT NOT NULL,
    maSanPham       VARCHAR(50) UNIQUE,
    tenSanPham      NVARCHAR(200) NOT NULL,
    moTa            NVARCHAR(MAX),
    giaBan          DECIMAL(12,0) NOT NULL,
    giaNhap         DECIMAL(12,0) NOT NULL,
    hinhAnh         VARCHAR(255),
    trangThai       BIT DEFAULT 1,              -- 1: đang bán, 0: ngừng bán
    ngayTao         DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_DoHocTap_Loai FOREIGN KEY (loai_id) REFERENCES LoaiDoHocTap(loai_id),
    CONSTRAINT FK_DoHocTap_NCC FOREIGN KEY (nhaCungCap_id) REFERENCES NhaCungCap(nhaCungCap_id)
);

-- 5. KHO HÀNG
CREATE TABLE Kho (
    kho_id          INT PRIMARY KEY IDENTITY(1,1),
    sanPham_id      INT NOT NULL UNIQUE,
    soLuongTon      INT DEFAULT 0,
    soLuongToiThieu INT DEFAULT 5,
    viTriKho        NVARCHAR(100),
    ngayCapNhat     DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Kho_SanPham FOREIGN KEY (sanPham_id) REFERENCES DoHocTap(sanPham_id)
);

-- 6. HÓA ĐƠN NHẬP (Admin quản lý)
CREATE TABLE HoaDonNhap (
    hdNhap_id       INT PRIMARY KEY IDENTITY(1,1),
    nhaCungCap_id   INT NOT NULL,
    taiKhoan_id     INT NOT NULL,               -- Admin tạo hóa đơn nhập
    maHDNhap        VARCHAR(50) UNIQUE,
    ngayNhap        DATETIME DEFAULT GETDATE(),
    tongTien        DECIMAL(15,0) DEFAULT 0,
    ghiChu          NVARCHAR(MAX),
    trangThai       NVARCHAR(30) DEFAULT N'da_nhap',
    CONSTRAINT FK_HDN_NCC FOREIGN KEY (nhaCungCap_id) REFERENCES NhaCungCap(nhaCungCap_id),
    CONSTRAINT FK_HDN_TK FOREIGN KEY (taiKhoan_id) REFERENCES TaiKhoan(taiKhoan_id)
);

CREATE TABLE ChiTietHDNhap (
    chiTiet_id      INT PRIMARY KEY IDENTITY(1,1),
    hdNhap_id       INT NOT NULL,
    sanPham_id      INT NOT NULL,
    soLuong         INT NOT NULL,
    giaNhap         DECIMAL(12,0) NOT NULL,
    thanhTien       AS (soLuong * giaNhap),
    CONSTRAINT FK_CTHDN_HD FOREIGN KEY (hdNhap_id) REFERENCES HoaDonNhap(hdNhap_id),
    CONSTRAINT FK_CTHDN_SP FOREIGN KEY (sanPham_id) REFERENCES DoHocTap(sanPham_id)
);

-- 7. KHUYẾN MÃI
CREATE TABLE KhuyenMai (
    km_id           INT PRIMARY KEY IDENTITY(1,1),
    tenKM           NVARCHAR(150) NOT NULL,
    maKM            VARCHAR(50) UNIQUE,
    loaiKM          NVARCHAR(30) NOT NULL,      -- 'phan_tram', 'so_tien'
    giaTriKM        DECIMAL(12,0) NOT NULL,
    giaTriToiDa     DECIMAL(12,0),
    dieuKienApDung  DECIMAL(12,0) DEFAULT 0,
    ngayBatDau      DATE NOT NULL,
    ngayKetThuc     DATE NOT NULL,
    soLuongMa       INT DEFAULT 0,
    daSD            INT DEFAULT 0,
    trangThai       BIT DEFAULT 1
);

CREATE TABLE KM_LoaiSP (
    km_id   INT NOT NULL,
    loai_id INT NOT NULL,
    PRIMARY KEY (km_id, loai_id),
    CONSTRAINT FK_KM_LSP_KM FOREIGN KEY (km_id) REFERENCES KhuyenMai(km_id),
    CONSTRAINT FK_KM_LSP_L FOREIGN KEY (loai_id) REFERENCES LoaiDoHocTap(loai_id)
);

-- 8. ĐƠN HÀNG
CREATE TABLE DonHang (
    donHang_id      INT PRIMARY KEY IDENTITY(1,1),
    khachHang_id    INT,
    km_id           INT,
    maDonHang       VARCHAR(50) UNIQUE,
    ngayDat         DATETIME DEFAULT GETDATE(),
    ngayGiao        DATETIME,
    diaChiGiao      NVARCHAR(255),
    phuongThucTT    NVARCHAR(50),
    trangThaiDH     NVARCHAR(30) DEFAULT N'cho_xac_nhan',
    tongTienGoc     DECIMAL(15,0) DEFAULT 0,
    tienGiam        DECIMAL(15,0) DEFAULT 0,
    tongThanhToan   DECIMAL(15,0) DEFAULT 0,
    ghiChu          NVARCHAR(MAX),
    CONSTRAINT FK_DH_KH FOREIGN KEY (khachHang_id) REFERENCES KhachHang(khachHang_id),
    CONSTRAINT FK_DH_KM FOREIGN KEY (km_id) REFERENCES KhuyenMai(km_id)
);

CREATE TABLE ChiTietDonHang (
    chiTiet_id  INT PRIMARY KEY IDENTITY(1,1),
    donHang_id  INT NOT NULL,
    sanPham_id  INT NOT NULL,
    soLuong     INT NOT NULL,
    giaBan      DECIMAL(12,0) NOT NULL,
    thanhTien   AS (soLuong * giaBan),
    CONSTRAINT FK_CTDH_DH FOREIGN KEY (donHang_id) REFERENCES DonHang(donHang_id),
    CONSTRAINT FK_CTDH_SP FOREIGN KEY (sanPham_id) REFERENCES DoHocTap(sanPham_id)
);

GO

-- 9. THỐNG KÊ (VIEW)
CREATE VIEW V_DoanhThuNgay AS
SELECT
    CAST(ngayDat AS DATE) AS ngay,
    COUNT(donHang_id)     AS soDonHang,
    SUM(tongThanhToan)    AS doanhThu
FROM DonHang
WHERE trangThaiDH = N'da_giao'
GROUP BY CAST(ngayDat AS DATE);
GO

CREATE VIEW V_TopSanPham AS
SELECT TOP 100 PERCENT
    sp.sanPham_id,
    sp.tenSanPham,
    SUM(ct.soLuong)             AS tongSoLuongBan,
    SUM(ct.soLuong * ct.giaBan) AS tongDoanhThu
FROM ChiTietDonHang ct
JOIN DoHocTap sp ON ct.sanPham_id = sp.sanPham_id
JOIN DonHang dh  ON ct.donHang_id = dh.donHang_id
WHERE dh.trangThaiDH = N'da_giao'
GROUP BY sp.sanPham_id, sp.tenSanPham
ORDER BY tongSoLuongBan DESC;
GO

-- 10. TRIGGER
-- Cập nhật kho sau khi bán
CREATE TRIGGER trg_CapNhatKhoSauBan
ON DonHang
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted i JOIN deleted d ON i.donHang_id = d.donHang_id 
               WHERE i.trangThaiDH = N'da_giao' AND d.trangThaiDH <> N'da_giao')
    BEGIN
        UPDATE k
        SET k.soLuongTon = k.soLuongTon - ct.soLuong
        FROM Kho k
        JOIN ChiTietDonHang ct ON ct.sanPham_id = k.sanPham_id
        JOIN inserted i ON i.donHang_id = ct.donHang_id;
    END
END;
GO

-- Cập nhật kho sau khi nhập hàng
CREATE TRIGGER trg_CapNhatKhoSauNhap
ON ChiTietHDNhap
AFTER INSERT
AS
BEGIN
    UPDATE k
    SET k.soLuongTon = k.soLuongTon + i.soLuong
    FROM Kho k
    JOIN inserted i ON k.sanPham_id = i.sanPham_id;
END;
GO

-- 11. DỮ LIỆU MẪU
INSERT INTO VaiTro (tenVaiTro, moTa) VALUES
(N'admin', N'Quản trị viên toàn quyền'),
(N'khach_hang', N'Khách hàng mua sắm');

INSERT INTO LoaiDoHocTap (tenLoai, moTa) VALUES
(N'Văn phòng phẩm', N'Bút, mực, ghim, kẹp...'),
(N'Sách & Vở', N'Vở ô ly, vở kẻ ngang, sách giáo khoa...'),
(N'Dụng cụ vẽ', N'Màu sáp, màu nước, cọ vẽ...'),
(N'Ba lô & Túi', N'Ba lô học sinh, túi đựng bút...'),
(N'Điện tử học tập', N'Máy tính bỏ túi, đèn học...');

INSERT INTO NhaCungCap (tenNCC, soDienThoai, email, diaChi) VALUES
(N'Công ty Thiên Long', '02838344730', 'info@thienlong.com.vn', N'TP.HCM'),
(N'Tập đoàn Hồng Hà', '02438256789', 'contact@hongha.vn', N'Hà Nội'),
(N'Deli Vietnam', '02839999888', 'vn@deli.com', N'TP.HCM');

-- Tài khoản (mật khẩu: 123456 - plain text, chưa hash)
-- LƯU Ý: Backend hiện tại so sánh mật khẩu trực tiếp, không dùng bcrypt
INSERT INTO TaiKhoan (tenDangNhap, matKhau, vaiTro_id) VALUES
('admin', '123456', 1),
('user1', '123456', 2),
('user2', '123456', 2);

INSERT INTO KhachHang (taiKhoan_id, hoTen, soDienThoai, email) VALUES
(2, N'Nguyễn Văn A', '0912345678', 'vana@gmail.com'),
(3, N'Trần Thị B', '0987654321', 'thib@gmail.com');

INSERT INTO DoHocTap (loai_id, nhaCungCap_id, maSanPham, tenSanPham, giaBan, giaNhap, hinhAnh) VALUES
(1, 1, 'SP001', N'Bút bi Thiên Long TL-027 (hộp 10 cái)', 45000, 28000, 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400'),
(2, 2, 'SP002', N'Vở ô ly Hồng Hà 200 trang', 18000, 10000, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400'),
(3, 3, 'SP003', N'Màu sáp Deli 24 màu', 35000, 20000, 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400'),
(4, 1, 'SP004', N'Hộp bút đa năng in 3D', 45000, 25000, 'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=400'),
(1, 3, 'SP005', N'Thước kẻ nhựa 30cm Deli', 8000, 4000, 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400');

INSERT INTO Kho (sanPham_id, soLuongTon, soLuongToiThieu, viTriKho) VALUES
(1, 150, 20, N'Kệ A1'), (2, 90, 15, N'Kệ A2'),
(3, 60, 10, N'Kệ B1'), (4, 35, 10, N'Kệ B2'),
(5, 210, 30, N'Kệ A3');

INSERT INTO KhuyenMai (tenKM, maKM, loaiKM, giaTriKM, dieuKienApDung, ngayBatDau, ngayKetThuc) VALUES
(N'Giảm 20% cho đơn từ 100k', 'GIAM20', 'phan_tram', 20, 100000, '2026-01-01', '2026-12-31'),
(N'Giảm 15k cho đơn từ 50k',  'GIAM15K', 'so_tien', 15000, 50000, '2026-01-01', '2026-06-30');
