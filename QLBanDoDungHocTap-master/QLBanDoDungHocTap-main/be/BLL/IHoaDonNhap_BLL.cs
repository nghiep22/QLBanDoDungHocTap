using Models;

namespace BLL
{
    public interface IHoaDonNhap_BLL
    {
        Task<List<HoaDonNhap>> GetAllAsync();
        Task<HoaDonNhap?> GetByIdAsync(int id);
        Task<int> CreateAsync(HoaDonNhapCreateRequest req);
    }
}
