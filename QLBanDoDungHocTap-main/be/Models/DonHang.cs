namespace Models
{
    public class DonHang
    {
        public int DonHang_Id { get; set; }
        public int? KhachHang_Id { get; set; }
        public int? NhanVien_Id { get; set; }
        public int? Km_Id { get; set; }
        public string? MaDonHang { get; set; }
        public DateTime NgayDat { get; set; } = DateTime.Now;
        public DateTime? NgayGiao { get; set; }
        public string? DiaChiGiao { get; set; }
        public string? PhuongThucTT { get; set; }
        public string TrangThaiDH { get; set; } = "cho_xac_nhan";
        public decimal TongTienGoc { get; set; } = 0;
        public decimal TienGiam { get; set; } = 0;
        public decimal TongThanhToan { get; set; } = 0;
        public string? GhiChu { get; set; }
    }
}
