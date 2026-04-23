using DAL;
using Models;

namespace BLL
{
    public class DoHocTap_BLL : IDoHocTap_BLL
    {
        private readonly DoHocTap_DAL _dal;
        private readonly Kho_DAL _khoDal;

        public DoHocTap_BLL(DoHocTap_DAL dal, Kho_DAL khoDal)
        {
            _dal = dal;
            _khoDal = khoDal;
        }

        public async Task<List<DoHocTap>> GetAllAsync(int? loaiId = null, bool? trangThai = null)
        {
            return await _dal.GetAllAsync(loaiId, trangThai);
        }

        public async Task<DoHocTap?> GetByIdAsync(int id)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            return await _dal.GetByIdAsync(id);
        }

        public async Task<int> CreateAsync(DoHocTapCreateRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.TenSanPham))
                throw new ArgumentException("Tên sản phẩm không được để trống");
            
            if (req.GiaBan <= 0 || req.GiaNhap <= 0)
                throw new ArgumentException("Giá bán và giá nhập phải lớn hơn 0");

            if (string.IsNullOrWhiteSpace(req.LoaiCon))
                throw new ArgumentException("Loại chi tiết không được để trống");

            if (string.IsNullOrWhiteSpace(req.ThuongHieu))
                throw new ArgumentException("Thương hiệu không được để trống");

            if (string.IsNullOrWhiteSpace(req.MauSac))
                throw new ArgumentException("Màu sắc không được để trống");

            return await _dal.InsertAsync(req);
        }

        public async Task<bool> UpdateAsync(int id, DoHocTapUpdateRequest req)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            
            if (string.IsNullOrWhiteSpace(req.TenSanPham))
                throw new ArgumentException("Tên sản phẩm không được để trống");
            
            if (req.GiaBan <= 0 || req.GiaNhap <= 0)
                throw new ArgumentException("Giá bán và giá nhập phải lớn hơn 0");

            if (string.IsNullOrWhiteSpace(req.LoaiCon))
                throw new ArgumentException("Loại chi tiết không được để trống");

            if (string.IsNullOrWhiteSpace(req.ThuongHieu))
                throw new ArgumentException("Thương hiệu không được để trống");

            if (string.IsNullOrWhiteSpace(req.MauSac))
                throw new ArgumentException("Màu sắc không được để trống");

            return await _dal.UpdateAsync(id, req);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            return await _dal.DeleteAsync(id);
        }
    }
}
