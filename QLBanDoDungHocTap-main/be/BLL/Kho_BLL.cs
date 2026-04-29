using DAL;
using Models;

namespace BLL
{
    public class Kho_BLL : IKho_BLL
    {
        private readonly Kho_DAL _dal;

        public Kho_BLL(Kho_DAL dal)
        {
            _dal = dal;
        }

        public async Task<List<KhoTonKhoView>> GetAllAsync()
        {
            return await _dal.GetInventoryAsync();
        }

        public async Task<List<KhoTonKhoView>> GetLowStockAsync()
        {
            return await _dal.GetLowStockAsync();
        }

        public async Task<KhoTonKhoView?> GetBySanPhamIdAsync(int sanPhamId)
        {
            if (sanPhamId <= 0) throw new ArgumentException("ID sản phẩm không hợp lệ");
            return await _dal.GetInventoryBySanPhamIdAsync(sanPhamId);
        }

        public async Task<bool> UpdateAsync(int sanPhamId, KhoCapNhatRequest req)
        {
            if (sanPhamId <= 0) throw new ArgumentException("ID sản phẩm không hợp lệ");
            if (req.SoLuongTon < 0) throw new ArgumentException("Số lượng tồn không được âm");
            if (req.SoLuongToiThieu < 0) throw new ArgumentException("Số lượng tối thiểu không được âm");
            return await _dal.UpdateInventoryAsync(sanPhamId, req);
        }

        public async Task<bool> UpdateQuantityAsync(int sanPhamId, int soLuongThayDoi)
        {
            if (sanPhamId <= 0) throw new ArgumentException("ID sản phẩm không hợp lệ");
            if (soLuongThayDoi == 0) throw new ArgumentException("Số lượng thay đổi phải khác 0");
            return await _dal.UpdateSoLuongAsync(sanPhamId, soLuongThayDoi);
        }

        public async Task<List<LichSuKhoView>> GetHistoryAsync()
        {
            return await _dal.GetHistoryAsync();
        }
    }
}
