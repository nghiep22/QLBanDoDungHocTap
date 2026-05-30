using Models;

namespace BLL
{
    public interface IKhachHang_BLL
    {
        Task<List<KhachHang>> GetAllAsync(string? search = null);
        Task<KhachHang?> GetByIdAsync(int id);
        Task<int> CreateAsync(KhachHangCreateRequest req);
        Task<bool> UpdateAsync(int id, KhachHangUpdateRequest req);
        Task<bool> DeleteAsync(int id);
    }
}
