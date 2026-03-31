namespace Models
{
    public class ChiTietHDNhap
    {
        public int ChiTiet_Id { get; set; }
        public int HdNhap_Id { get; set; }
        public int SanPham_Id { get; set; }
        public int SoLuong { get; set; }
        public decimal GiaNhap { get; set; }
        public decimal ThanhTien => SoLuong * GiaNhap;
    }
}
