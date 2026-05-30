using Models;

namespace BLL
{
    public interface IKho_BLL
    {
        Task<List<KhoTonKhoView>> GetAllAsync();
        Task<List<KhoTonKhoView>> GetLowStockAsync();
        Task<KhoTonKhoView?> GetBySanPhamIdAsync(int sanPhamId);
        Task<bool> UpdateAsync(int sanPhamId, KhoCapNhatRequest req);
        Task<bool> UpdateQuantityAsync(int sanPhamId, int soLuongThayDoi);
        Task<List<LichSuKhoView>> GetHistoryAsync();
    }
}
