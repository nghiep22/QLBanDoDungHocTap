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

        public Task<TaiKhoan?> LayTheoIdAsync(int taiKhoanId)
        {
            return _taiKhoanDal.GetByIdAsync(taiKhoanId);
        }

        public async Task<(bool Success, string Message, TaiKhoan? TaiKhoan)> CapNhatTaiKhoanAsync(int taiKhoanId, string tenDangNhap)
        {
            if (string.IsNullOrWhiteSpace(tenDangNhap))
                return (false, "Tên đăng nhập không được để trống", null);

            tenDangNhap = tenDangNhap.Trim();

            if (tenDangNhap.Length < 3)
                return (false, "Tên đăng nhập phải có ít nhất 3 ký tự", null);

            var taiKhoan = await _taiKhoanDal.GetByIdAsync(taiKhoanId);
            if (taiKhoan == null)
                return (false, "Không tìm thấy tài khoản", null);

            if (!string.Equals(taiKhoan.TenDangNhap, tenDangNhap, StringComparison.OrdinalIgnoreCase))
            {
                var exists = await _taiKhoanDal.CheckTenDangNhapExistsAsync(tenDangNhap);
                if (exists)
                    return (false, "Tên đăng nhập đã tồn tại", null);
            }

            var updated = await _taiKhoanDal.UpdateTenDangNhapAsync(taiKhoanId, tenDangNhap);
            if (!updated)
                return (false, "Không thể cập nhật tài khoản", null);

            taiKhoan.TenDangNhap = tenDangNhap;
            return (true, "Cập nhật tài khoản thành công", taiKhoan);
        }

        public async Task<(bool Success, string Message)> DoiMatKhauAsync(
            int taiKhoanId,
            string matKhauCu,
            string matKhauMoi,
            string xacNhanMatKhauMoi)
        {
            if (string.IsNullOrWhiteSpace(matKhauCu))
                return (false, "Mật khẩu hiện tại không được để trống");

            if (string.IsNullOrWhiteSpace(matKhauMoi))
                return (false, "Mật khẩu mới không được để trống");

            if (matKhauMoi.Length < 6)
                return (false, "Mật khẩu mới phải có ít nhất 6 ký tự");

            if (matKhauMoi != xacNhanMatKhauMoi)
                return (false, "Xác nhận mật khẩu mới không khớp");

            var taiKhoan = await _taiKhoanDal.GetByIdAsync(taiKhoanId);
            if (taiKhoan == null)
                return (false, "Không tìm thấy tài khoản");

            if (taiKhoan.MatKhau != matKhauCu)
                return (false, "Mật khẩu hiện tại không đúng");

            if (taiKhoan.MatKhau == matKhauMoi)
                return (false, "Mật khẩu mới phải khác mật khẩu hiện tại");

            var updated = await _taiKhoanDal.UpdateMatKhauAsync(taiKhoanId, matKhauMoi);
            if (!updated)
                return (false, "Không thể đổi mật khẩu");

            return (true, "Đổi mật khẩu thành công");
        }
    }
}
