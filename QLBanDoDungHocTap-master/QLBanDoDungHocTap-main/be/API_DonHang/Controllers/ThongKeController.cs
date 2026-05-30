using BLL;
using Microsoft.AspNetCore.Mvc;

namespace API_DonHang.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThongKeController : ControllerBase
    {
        private readonly IThongKe_BLL _bll;

        public ThongKeController(IThongKe_BLL bll)
        {
            _bll = bll;
        }

        // GET: api/thongke/dashboard
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardStats()
        {
            try
            {
                var stats = await _bll.GetDashboardStatsAsync();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/thongke/doanh-thu?tuNgay=2024-01-01&denNgay=2024-12-31
        [HttpGet("doanh-thu")]
        public async Task<IActionResult> GetDoanhThuTheoNgay([FromQuery] DateTime? tuNgay = null, [FromQuery] DateTime? denNgay = null)
        {
            try
            {
                var list = await _bll.GetDoanhThuTheoNgayAsync(tuNgay, denNgay);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/thongke/top-san-pham?limit=10
        [HttpGet("top-san-pham")]
        public async Task<IActionResult> GetTopSanPham([FromQuery] int limit = 10)
        {
            try
            {
                var list = await _bll.GetTopSanPhamAsync(limit);
                return Ok(list);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/thongke/don-hang-theo-trang-thai
        [HttpGet("don-hang-theo-trang-thai")]
        public async Task<IActionResult> GetDonHangTheoTrangThai()
        {
            try
            {
                var list = await _bll.GetDonHangTheoTrangThaiAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
