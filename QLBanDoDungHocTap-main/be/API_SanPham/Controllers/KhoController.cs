using BLL;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API_SanPham.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KhoController : ControllerBase
    {
        private readonly IKho_BLL _bll;

        public KhoController(IKho_BLL bll)
        {
            _bll = bll;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var list = await _bll.GetAllAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("canh-bao")]
        public async Task<IActionResult> GetLowStock()
        {
            try
            {
                var list = await _bll.GetLowStockAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("lich-su")]
        public async Task<IActionResult> GetHistory()
        {
            try
            {
                var list = await _bll.GetHistoryAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("san-pham/{sanPhamId}")]
        public async Task<IActionResult> GetBySanPhamId(int sanPhamId)
        {
            try
            {
                var item = await _bll.GetBySanPhamIdAsync(sanPhamId);
                if (item == null)
                    return NotFound(new { message = "Không tìm thấy tồn kho" });

                return Ok(item);
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

        [HttpPut("san-pham/{sanPhamId}")]
        public async Task<IActionResult> Update(int sanPhamId, [FromBody] KhoCapNhatRequest req)
        {
            try
            {
                var success = await _bll.UpdateAsync(sanPhamId, req);
                if (!success)
                    return NotFound(new { message = "Không tìm thấy tồn kho" });

                return Ok(new { message = "Cập nhật tồn kho thành công" });
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

        [HttpPatch("san-pham/{sanPhamId}/so-luong")]
        public async Task<IActionResult> UpdateQuantity(int sanPhamId, [FromBody] int soLuongThayDoi)
        {
            try
            {
                var success = await _bll.UpdateQuantityAsync(sanPhamId, soLuongThayDoi);
                if (!success)
                    return NotFound(new { message = "Không tìm thấy tồn kho" });

                return Ok(new { message = "Cập nhật số lượng tồn thành công" });
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
    }
}
