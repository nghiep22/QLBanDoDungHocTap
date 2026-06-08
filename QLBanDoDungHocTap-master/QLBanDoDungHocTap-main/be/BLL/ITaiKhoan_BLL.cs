using Models;

namespace BLL
{
    public interface ITaiKhoan_BLL
    {
        Task<TaiKhoan?> DangNhapAsync(string tenDangNhap, string matKhau);
        Task<(bool Success, string Message, TaiKhoan? TaiKhoan)> DangKyAsync(string tenDangNhap, string matKhau, int vaiTroId = 2);
        Task<TaiKhoan?> LayTheoIdAsync(int taiKhoanId);
        Task<(bool Success, string Message, TaiKhoan? TaiKhoan)> CapNhatTaiKhoanAsync(int taiKhoanId, string tenDangNhap);
        Task<(bool Success, string Message)> DoiMatKhauAsync(int taiKhoanId, string matKhauCu, string matKhauMoi, string xacNhanMatKhauMoi);
    }
}
