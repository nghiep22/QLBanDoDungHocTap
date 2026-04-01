namespace Models
{
    public class RegisterRequest
    {
        public string TenDangNhap { get; set; } = string.Empty;
        public string MatKhau { get; set; } = string.Empty;
        public int VaiTro_Id { get; set; } = 2; // Mặc định là user (2)
    }
}
