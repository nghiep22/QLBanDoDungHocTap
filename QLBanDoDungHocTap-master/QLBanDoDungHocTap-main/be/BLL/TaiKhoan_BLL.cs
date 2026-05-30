using DAL;
using Models;

namespace BLL
{
    public class TaiKhoan_BLL : ITaiKhoan_BLL
    {
        private readonly TaiKhoan_DAL _taiKhoanDal;

        public TaiKhoan_BLL(TaiKhoan_DAL taiKhoanDal)
        {
            _taiKhoanDal = taiKhoanDal;
        }

        public async Task<TaiKhoan?> DangNhapAsync(string tenDangNhap, string matKhau)
        {
            if (string.IsNullOrWhiteSpace(tenDangNhap) || string.IsNullOrWhiteSpace(matKhau))
                return null;

            var user = await _taiKhoanDal.GetByTenDangNhapAsync(tenDangNhap);
            if (user == null) return null;

            if (user.MatKhau != matKhau)
                return null;

            return user;
        }

        public async Task<(bool Success, string Message, TaiKhoan? TaiKhoan)> DangKyAsync(string tenDangNhap, string matKhau, int vaiTroId = 2)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(tenDangNhap))
                return (false, "Tên đăng nhập không được để trống", null);

            if (string.IsNullOrWhiteSpace(matKhau))
                return (false, "Mật khẩu không được để trống", null);

            if (tenDangNhap.Length < 3)
                return (false, "Tên đăng nhập phải có ít nhất 3 ký tự", null);

            if (matKhau.Length < 6)
                return (false, "Mật khẩu phải có ít nhất 6 ký tự", null);

            // Check if username exists
            var exists = await _taiKhoanDal.CheckTenDangNhapExistsAsync(tenDangNhap);
            if (exists)
                return (false, "Tên đăng nhập đã tồn tại", null);

            // Create new account
            var newTaiKhoan = new TaiKhoan
            {
                TenDangNhap = tenDangNhap,
                MatKhau = matKhau, // Note: Should hash password in production
                VaiTro_Id = vaiTroId,
                TrangThai = true,
                NgayTao = DateTime.Now
            };

            var newId = await _taiKhoanDal.CreateAsync(newTaiKhoan);
            newTaiKhoan.TaiKhoan_Id = newId;

            return (true, "Đăng ký thành công", newTaiKhoan);
        }
    }
}
