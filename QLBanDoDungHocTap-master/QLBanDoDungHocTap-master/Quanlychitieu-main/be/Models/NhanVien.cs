namespace Models
{
    public class NhanVien
    {
        public int NhanVien_Id { get; set; }
        public int? TaiKhoan_Id { get; set; }
        public string HoTen { get; set; } = string.Empty;
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public string? ChucVu { get; set; }
        public DateTime? NgayVaoLam { get; set; }
        public bool TrangThai { get; set; } = true;
    }
}
