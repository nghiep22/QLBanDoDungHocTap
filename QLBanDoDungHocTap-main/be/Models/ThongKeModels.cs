namespace Models
{
    // Response cho dashboard tổng quan
    public class DashboardThongKe
    {
        public int TongSanPham { get; set; }
        public int TongDonHang { get; set; }
        public int TongKhachHang { get; set; }
        public decimal TongDoanhThu { get; set; }
    }

    // Doanh thu theo ngày
    public class DoanhThuTheoNgay
    {
        public DateTime Ngay { get; set; }
        public int SoDonHang { get; set; }
        public decimal DoanhThu { get; set; }
    }

    // Top sản phẩm bán chạy
    public class TopSanPham
    {
        public int SanPhamId { get; set; }
        public string TenSanPham { get; set; } = string.Empty;
        public int TongSoLuongBan { get; set; }
        public decimal TongDoanhThu { get; set; }
    }

    // Đơn hàng theo trạng thái
    public class DonHangTheoTrangThai
    {
        public string TrangThai { get; set; } = string.Empty;
        public int SoLuong { get; set; }
        public decimal TongTien { get; set; }
    }
}
