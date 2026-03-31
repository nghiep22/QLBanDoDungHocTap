namespace Models
{
    public class NhaCungCap
    {
        public int NhaCungCap_Id { get; set; }
        public string TenNCC { get; set; } = string.Empty;
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public string? MaSoThue { get; set; }
        public string? NguoiDaiDien { get; set; }
        public bool TrangThai { get; set; } = true;
    }
}
