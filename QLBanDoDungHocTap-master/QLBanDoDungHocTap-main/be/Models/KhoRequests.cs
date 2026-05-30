namespace Models
{
    public class KhoCapNhatRequest
    {
        public int SoLuongTon { get; set; }
        public int SoLuongToiThieu { get; set; }
        public string? ViTriKho { get; set; }
    }

    public class KhoTonKhoView
    {
        public int Kho_Id { get; set; }
        public int SanPham_Id { get; set; }
        public string? MaSanPham { get; set; }
        public string TenSanPham { get; set; } = string.Empty;
        public string? HinhAnh { get; set; }
        public decimal GiaBan { get; set; }
        public decimal GiaNhap { get; set; }
        public int SoLuongTon { get; set; }
        public int SoLuongToiThieu { get; set; }
        public string? ViTriKho { get; set; }
        public DateTime NgayCapNhat { get; set; }
        public bool CanhBaoSapHet => SoLuongTon <= SoLuongToiThieu;
    }

    public class LichSuKhoView
    {
        public string LoaiGiaoDich { get; set; } = string.Empty;
        public string SoChungTu { get; set; } = string.Empty;
        public DateTime NgayGiaoDich { get; set; }
        public int SanPham_Id { get; set; }
        public string TenSanPham { get; set; } = string.Empty;
        public int SoLuong { get; set; }
        public decimal DonGia { get; set; }
        public decimal ThanhTien { get; set; }
        public string? DoiTuong { get; set; }
        public string? TrangThai { get; set; }
    }
}
