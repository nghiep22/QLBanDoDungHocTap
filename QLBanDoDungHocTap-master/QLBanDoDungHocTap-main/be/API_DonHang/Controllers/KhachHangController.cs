using BLL;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API_DonHang.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KhachHangController : ControllerBase
    {
        private readonly IKhachHang_BLL _bll;

        public KhachHangController(IKhachHang_BLL bll)
        {
            _bll = bll;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search = null)
        {
            try
            {
                var list = await _bll.GetAllAsync(search);
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
                    return NotFound(new { message = "Khong tim thay khach hang" });

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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] KhachHangCreateRequest req)
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] KhachHangUpdateRequest req)
        {
            try
            {
                var success = await _bll.UpdateAsync(id, req);
                if (!success)
                    return NotFound(new { message = "Khong tim thay khach hang" });

                return Ok(new { message = "Cap nhat thanh cong" });
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var success = await _bll.DeleteAsync(id);
                if (!success)
                    return NotFound(new { message = "Khong tim thay khach hang" });

                return Ok(new { message = "Xoa thanh cong" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
