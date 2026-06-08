using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API_Login.Services;
using Models;
using System.Security.Claims;

namespace API_Login.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITaiKhoan_BLL _taiKhoanBll;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(ITaiKhoan_BLL taiKhoanBll, IJwtTokenService jwtTokenService)
        {
            _taiKhoanBll = taiKhoanBll;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _taiKhoanBll.DangNhapAsync(request.TenDangNhap, request.MatKhau);
            if (user == null)
                return Unauthorized(new { message = "Sai tên đăng nhập hoặc mật khẩu" });

            var token = _jwtTokenService.GenerateToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    user.TaiKhoan_Id,
                    user.TenDangNhap,
                    user.VaiTro_Id
                }
            });
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var (success, message, taiKhoan) = await _taiKhoanBll.DangKyAsync(
                request.TenDangNhap, 
                request.MatKhau, 
                request.VaiTro_Id
            );

            if (!success)
                return BadRequest(new { message });

            // Auto login after registration
            var token = _jwtTokenService.GenerateToken(taiKhoan!);

            return Ok(new
            {
                message = "Đăng ký thành công",
                token,
                user = new
                {
                    taiKhoan!.TaiKhoan_Id,
                    taiKhoan.TenDangNhap,
                    taiKhoan.VaiTro_Id
                }
            });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            var userId = LayTaiKhoanIdTuToken();
            if (userId == null)
                return Unauthorized(new { message = "Token không hợp lệ" });

            var taiKhoan = await _taiKhoanBll.LayTheoIdAsync(userId.Value);
            if (taiKhoan == null)
                return NotFound(new { message = "Không tìm thấy tài khoản" });

            return Ok(new
            {
                taiKhoan.TaiKhoan_Id,
                taiKhoan.TenDangNhap,
                taiKhoan.VaiTro_Id,
                taiKhoan.TrangThai,
                taiKhoan.NgayTao
            });
        }

        [HttpPut("profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] CapNhatTaiKhoanRequest request)
        {
            var userId = LayTaiKhoanIdTuToken();
            if (userId == null)
                return Unauthorized(new { message = "Token không hợp lệ" });

            var (success, message, taiKhoan) = await _taiKhoanBll.CapNhatTaiKhoanAsync(userId.Value, request.TenDangNhap);
            if (!success || taiKhoan == null)
                return BadRequest(new { message });

            var token = _jwtTokenService.GenerateToken(taiKhoan);

            return Ok(new
            {
                message,
                token,
                user = new
                {
                    taiKhoan.TaiKhoan_Id,
                    taiKhoan.TenDangNhap,
                    taiKhoan.VaiTro_Id
                }
            });
        }

        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] DoiMatKhauRequest request)
        {
            var userId = LayTaiKhoanIdTuToken();
            if (userId == null)
                return Unauthorized(new { message = "Token không hợp lệ" });

            var (success, message) = await _taiKhoanBll.DoiMatKhauAsync(
                userId.Value,
                request.MatKhauCu,
                request.MatKhauMoi,
                request.XacNhanMatKhauMoi
            );

            if (!success)
                return BadRequest(new { message });

            return Ok(new { message });
        }

        private int? LayTaiKhoanIdTuToken()
        {
            var userIdValue = User.FindFirstValue("UserId");
            return int.TryParse(userIdValue, out var userId) ? userId : null;
        }
    }
}
