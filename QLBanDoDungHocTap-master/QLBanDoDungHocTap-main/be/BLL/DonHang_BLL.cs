using DAL;
using Models;

namespace BLL
{
    public class DonHang_BLL : IDonHang_BLL
    {
        private readonly DonHang_DAL _dal;
        private readonly ChiTietDonHang_DAL _chiTietDal;
        private readonly Kho_DAL _khoDal;

        public DonHang_BLL(DonHang_DAL dal, ChiTietDonHang_DAL chiTietDal, Kho_DAL khoDal)
        {
            _dal = dal;
            _chiTietDal = chiTietDal;
            _khoDal = khoDal;
        }

        public async Task<List<DonHang>> GetAllAsync(string? trangThai = null)
        {
            var list = await _dal.GetAllAsync(trangThai);
            await GanChiTietAsync(list);
            return list;
        }

        public async Task<List<DonHang>> GetByKhachHangIdAsync(int khachHangId)
        {
            var list = await _dal.GetByKhachHangIdAsync(khachHangId);
            await GanChiTietAsync(list);
            return list;
        }

        public async Task<List<DonHang>> GetByTaiKhoanIdAsync(int taiKhoanId)
        {
            if (taiKhoanId <= 0) throw new ArgumentException("ID khong hop le");
            var list = await _dal.GetByTaiKhoanIdAsync(taiKhoanId);
            await GanChiTietAsync(list);
            return list;
        }

        public async Task<DonHang?> GetByIdAsync(int id)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            var donHang = await _dal.GetByIdAsync(id);
            if (donHang != null)
            {
                donHang.ChiTiet = await _chiTietDal.GetByDonHangIdAsync(donHang.DonHang_Id);
            }

            return donHang;
        }

        public async Task<int> CreateAsync(DonHangCreateRequest req)
        {
            if (req.ChiTiet == null || req.ChiTiet.Count == 0)
                throw new ArgumentException("Đơn hàng phải có ít nhất 1 sản phẩm");

            foreach (var item in req.ChiTiet)
            {
                if (item.SoLuong <= 0)
                    throw new ArgumentException("Số lượng sản phẩm phải lớn hơn 0");

                var duKho = await _khoDal.HasEnoughStockAsync(item.SanPham_Id, item.SoLuong);
                if (!duKho)
                    throw new ArgumentException("Tồn kho không đủ cho một hoặc nhiều sản phẩm trong giỏ hàng");
            }

            decimal tongTienGoc = req.ChiTiet.Sum(x => x.SoLuong * x.GiaBan);
            decimal tienGiam = 0;
            decimal tongThanhToan = tongTienGoc - tienGiam;

            string maDonHang = $"DH{DateTime.Now:yyyyMMddHHmmss}";

            var donHangId = await _dal.InsertAsync(req, maDonHang, tongTienGoc, tienGiam, tongThanhToan);

            foreach (var item in req.ChiTiet)
            {
                await _chiTietDal.InsertAsync(donHangId, item);
                await _khoDal.DecreaseStockAsync(item.SanPham_Id, item.SoLuong);
            }

            return donHangId;
        }

        public async Task<bool> UpdateStatusAsync(int id, string trangThai)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            if (string.IsNullOrWhiteSpace(trangThai))
                throw new ArgumentException("Trạng thái không được để trống");

            return await _dal.UpdateStatusAsync(id, trangThai);
        }

        public async Task<bool> CancelByTaiKhoanIdAsync(int id, int taiKhoanId)
        {
            if (id <= 0) throw new ArgumentException("ID khong hop le");
            if (taiKhoanId <= 0) throw new ArgumentException("ID nguoi dung khong hop le");

            var donHang = await _dal.GetByIdForTaiKhoanAsync(id, taiKhoanId);
            if (donHang == null)
                return false;

            if (donHang.TrangThaiDH == "da_huy")
                return true;

            var trangThaiCoTheHuy = new[] { "cho_xac_nhan", "dang_xu_ly" };
            if (!trangThaiCoTheHuy.Contains(donHang.TrangThaiDH))
                throw new ArgumentException("Chi co the huy don hang dang cho xac nhan hoac dang xu ly");

            var success = await _dal.UpdateStatusAsync(id, "da_huy");
            if (!success)
                return false;

            var chiTiet = await _chiTietDal.GetByDonHangIdAsync(id);
            foreach (var item in chiTiet)
            {
                await _khoDal.UpdateSoLuongAsync(item.SanPham_Id, item.SoLuong);
            }

            return true;
        }

        private async Task GanChiTietAsync(List<DonHang> danhSachDonHang)
        {
            foreach (var donHang in danhSachDonHang)
            {
                donHang.ChiTiet = await _chiTietDal.GetByDonHangIdAsync(donHang.DonHang_Id);
            }
        }
    }
}
