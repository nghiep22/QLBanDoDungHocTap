using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API_SanPham.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DoHocTapController : ControllerBase
    {
        private readonly IDoHocTap_BLL _bll;

        public DoHocTapController(IDoHocTap_BLL bll)
        {
            _bll = bll;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? loaiId = null, [FromQuery] bool? trangThai = null)
        {
            try
            {
                var list = await _bll.GetAllAsync(loaiId, trangThai);
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
                    return NotFound(new { message = "Không tìm thấy sản phẩm" });

                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DoHocTapCreateRequest req)
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
        public async Task<IActionResult> Update(int id, [FromBody] DoHocTapUpdateRequest req)
        {
            try
            {
                var success = await _bll.UpdateAsync(id, req);
                if (!success)
                    return NotFound(new { message = "Không tìm thấy sản phẩm" });

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var success = await _bll.DeleteAsync(id);
                if (!success)
                    return NotFound(new { message = "Không tìm thấy sản phẩm" });

                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
