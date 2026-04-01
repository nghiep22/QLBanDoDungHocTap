using Models;

namespace BLL
{
    public interface ITaiKhoan_BLL
    {
        Task<TaiKhoan?> DangNhapAsync(string tenDangNhap, string matKhau);
        Task<(bool Success, string Message, TaiKhoan? TaiKhoan)> DangKyAsync(string tenDangNhap, string matKhau, int vaiTroId = 2);
    }
}
