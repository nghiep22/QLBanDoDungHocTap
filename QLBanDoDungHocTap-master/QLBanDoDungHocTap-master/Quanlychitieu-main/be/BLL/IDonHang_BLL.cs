using Models;

namespace BLL
{
    public interface IDonHang_BLL
    {
        Task<List<DonHang>> GetAllAsync(string? trangThai = null);
        Task<DonHang?> GetByIdAsync(int id);
        Task<int> CreateAsync(DonHangCreateRequest req);
        Task<bool> UpdateStatusAsync(int id, string trangThai);
    }
}
