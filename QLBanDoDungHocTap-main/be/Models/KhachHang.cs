namespace Models
{
    public class KhachHang
    {
        public int KhachHang_Id { get; set; }
        public int? TaiKhoan_Id { get; set; }
        public string HoTen { get; set; } = string.Empty;
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public DateTime? NgaySinh { get; set; }
        public bool? GioiTinh { get; set; }
        public DateTime NgayDangKy { get; set; } = DateTime.Now;
    }
}
