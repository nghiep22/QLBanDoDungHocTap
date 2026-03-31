namespace Models
{
    public class ChiTietDonHang
    {
        public int ChiTiet_Id { get; set; }
        public int DonHang_Id { get; set; }
        public int SanPham_Id { get; set; }
        public int SoLuong { get; set; }
        public decimal GiaBan { get; set; }
        public decimal ThanhTien => SoLuong * GiaBan;
    }
}
