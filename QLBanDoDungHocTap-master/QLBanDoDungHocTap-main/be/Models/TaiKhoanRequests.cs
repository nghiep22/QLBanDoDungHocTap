namespace Models
{
    public class CapNhatTaiKhoanRequest
    {
        public string TenDangNhap { get; set; } = string.Empty;
    }

    public class DoiMatKhauRequest
    {
        public string MatKhauCu { get; set; } = string.Empty;
        public string MatKhauMoi { get; set; } = string.Empty;
        public string XacNhanMatKhauMoi { get; set; } = string.Empty;
    }
}
