using Models;

namespace BLL
{
    public interface IDoHocTap_BLL
    {
        Task<List<DoHocTap>> GetAllAsync(int? loaiId = null, bool? trangThai = null);
        Task<DoHocTap?> GetByIdAsync(int id);
        Task<int> CreateAsync(DoHocTapCreateRequest req);
        Task<bool> UpdateAsync(int id, DoHocTapUpdateRequest req);
        Task<bool> DeleteAsync(int id);
    }
}
