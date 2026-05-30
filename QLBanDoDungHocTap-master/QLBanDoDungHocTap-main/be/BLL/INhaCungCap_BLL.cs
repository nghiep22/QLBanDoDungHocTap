using Models;

namespace BLL
{
    public interface INhaCungCap_BLL
    {
        Task<List<NhaCungCap>> GetAllAsync(bool? trangThai = null);
        Task<NhaCungCap?> GetByIdAsync(int id);
        Task<int> CreateAsync(NhaCungCapCreateRequest req);
        Task<bool> UpdateAsync(int id, NhaCungCapUpdateRequest req);
    }
}
