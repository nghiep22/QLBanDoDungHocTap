namespace Models
{
    public class HoaDonNhapCreateRequest
    {
        public int NhaCungCap_Id { get; set; }
        public int NhanVien_Id { get; set; }
        public string? GhiChu { get; set; }
        public List<ChiTietHDNhapRequest> ChiTiet { get; set; } = new();
    }

    public class ChiTietHDNhapRequest
    {
        public int SanPham_Id { get; set; }
        public int SoLuong { get; set; }
        public decimal GiaNhap { get; set; }
    }
}
