using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API_DonHang.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DonHangController : ControllerBase
    {
        private readonly IDonHang_BLL _bll;

        public DonHangController(IDonHang_BLL bll)
        {
            _bll = bll;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? trangThai = null)
        {
            try
            {
                var list = await _bll.GetAllAsync(trangThai);
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var item = await _bll.GetByIdAsync(id);
                if (item == null)
                    return NotFound(new { message = "Không tìm thấy đơn hàng" });

                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DonHangCreateRequest req)
        {
            try
            {
                var newId = await _bll.CreateAsync(req);
                return CreatedAtAction(nameof(GetById), new { id = newId }, new { id = newId });
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

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] DonHangUpdateStatusRequest req)
        {
            try
            {
                var success = await _bll.UpdateStatusAsync(id, req.TrangThaiDH);
                if (!success)
                    return NotFound(new { message = "Không tìm thấy đơn hàng" });

                return Ok(new { message = "Cập nhật trạng thái thành công" });
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
