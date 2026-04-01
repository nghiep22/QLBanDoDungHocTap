using BLL;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API_SanPham.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NhaCungCapController : ControllerBase
    {
        private readonly INhaCungCap_BLL _bll;

        public NhaCungCapController(INhaCungCap_BLL bll)
        {
            _bll = bll;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool? trangThai = null)
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
                    return NotFound(new { message = "Không tìm thấy nhà cung cấp" });

                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NhaCungCapCreateRequest req)
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
        public async Task<IActionResult> Update(int id, [FromBody] NhaCungCapUpdateRequest req)
        {
            try
            {
                var success = await _bll.UpdateAsync(id, req);
                if (!success)
                    return NotFound(new { message = "Không tìm thấy nhà cung cấp" });

                return Ok(new { message = "Cập nhật thành công" });
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
