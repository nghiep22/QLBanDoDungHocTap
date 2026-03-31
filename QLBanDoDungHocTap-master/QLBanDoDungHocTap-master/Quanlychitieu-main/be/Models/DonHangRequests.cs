namespace Models
{
    public class DonHangCreateRequest
    {
        public int? KhachHang_Id { get; set; }
        public int? NhanVien_Id { get; set; }
        public int? Km_Id { get; set; }
        public string? DiaChiGiao { get; set; }
        public string? PhuongThucTT { get; set; }
        public string? GhiChu { get; set; }
        public List<ChiTietDonHangRequest> ChiTiet { get; set; } = new();
    }

    public class ChiTietDonHangRequest
    {
        public int SanPham_Id { get; set; }
        public int SoLuong { get; set; }
        public decimal GiaBan { get; set; }
    }

    public class DonHangUpdateStatusRequest
    {
        public string TrangThaiDH { get; set; } = string.Empty;
    }
}
