using DAL;
using Models;

namespace BLL
{
    public class NhaCungCap_BLL : INhaCungCap_BLL
    {
        private readonly NhaCungCap_DAL _dal;

        public NhaCungCap_BLL(NhaCungCap_DAL dal)
        {
            _dal = dal;
        }

        public async Task<List<NhaCungCap>> GetAllAsync(bool? trangThai = null)
        {
            return await _dal.GetAllAsync(trangThai);
        }

        public async Task<NhaCungCap?> GetByIdAsync(int id)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            return await _dal.GetByIdAsync(id);
        }

        public async Task<int> CreateAsync(NhaCungCapCreateRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.TenNCC))
                throw new ArgumentException("Tên nhà cung cấp không được để trống");

            return await _dal.InsertAsync(req);
        }

        public async Task<bool> UpdateAsync(int id, NhaCungCapUpdateRequest req)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            
            if (string.IsNullOrWhiteSpace(req.TenNCC))
                throw new ArgumentException("Tên nhà cung cấp không được để trống");

            return await _dal.UpdateAsync(id, req);
        }
    }
}
