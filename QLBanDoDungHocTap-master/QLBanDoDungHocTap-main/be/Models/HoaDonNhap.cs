namespace Models
{
    public class HoaDonNhap
    {
        public int HdNhap_Id { get; set; }
        public int NhaCungCap_Id { get; set; }
        public int NhanVien_Id { get; set; }
        public string? MaHDNhap { get; set; }
        public DateTime NgayNhap { get; set; } = DateTime.Now;
        public decimal TongTien { get; set; } = 0;
        public string? GhiChu { get; set; }
        public string TrangThai { get; set; } = "da_nhap";
    }
}
