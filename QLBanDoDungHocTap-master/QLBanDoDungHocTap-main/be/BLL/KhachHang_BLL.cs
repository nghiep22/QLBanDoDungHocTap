using DAL;
using Microsoft.Data.SqlClient;
using Models;

namespace BLL
{
    public class KhachHang_BLL : IKhachHang_BLL
    {
        private readonly KhachHang_DAL _dal;

        public KhachHang_BLL(KhachHang_DAL dal)
        {
            _dal = dal;
        }

        public async Task<List<KhachHang>> GetAllAsync(string? search = null)
        {
            return await _dal.GetAllAsync(search);
        }

        public async Task<KhachHang?> GetByIdAsync(int id)
        {
            if (id <= 0) throw new ArgumentException("ID khong hop le");
            return await _dal.GetByIdAsync(id);
        }

        public async Task<int> CreateAsync(KhachHangCreateRequest req)
        {
            Validate(req.HoTen, req.Email, req.SoDienThoai);

            try
            {
                return await _dal.InsertAsync(req);
            }
            catch (SqlException ex) when (ex.Number == 2601 || ex.Number == 2627)
            {
                throw new ArgumentException("Tai khoan nay da duoc gan voi khach hang khac");
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                throw new ArgumentException("Tai khoan khong ton tai");
            }
        }

        public async Task<bool> UpdateAsync(int id, KhachHangUpdateRequest req)
        {
            if (id <= 0) throw new ArgumentException("ID khong hop le");
            Validate(req.HoTen, req.Email, req.SoDienThoai);

            return await _dal.UpdateAsync(id, req);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (id <= 0) throw new ArgumentException("ID khong hop le");

            try
            {
                return await _dal.DeleteAsync(id);
            }
            catch (SqlException ex) when (ex.Number == 547)
            {
                throw new InvalidOperationException("Khach hang da co don hang, khong the xoa");
            }
        }

        private static void Validate(string hoTen, string? email, string? soDienThoai)
        {
            if (string.IsNullOrWhiteSpace(hoTen))
                throw new ArgumentException("Ho ten khong duoc de trong");

            if (!string.IsNullOrWhiteSpace(email) && !email.Contains('@'))
                throw new ArgumentException("Email khong hop le");

            if (!string.IsNullOrWhiteSpace(soDienThoai) && soDienThoai.Trim().Length > 15)
                throw new ArgumentException("So dien thoai khong duoc qua 15 ky tu");
        }
    }
}
