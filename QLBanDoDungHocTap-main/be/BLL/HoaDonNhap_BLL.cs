using DAL;
using Models;

namespace BLL
{
    public class HoaDonNhap_BLL : IHoaDonNhap_BLL
    {
        private readonly HoaDonNhap_DAL _dal;
        private readonly ChiTietHDNhap_DAL _chiTietDal;

        public HoaDonNhap_BLL(HoaDonNhap_DAL dal, ChiTietHDNhap_DAL chiTietDal)
        {
            _dal = dal;
            _chiTietDal = chiTietDal;
        }

        public async Task<List<HoaDonNhap>> GetAllAsync()
        {
            return await _dal.GetAllAsync();
        }

        public async Task<HoaDonNhap?> GetByIdAsync(int id)
        {
            if (id <= 0) throw new ArgumentException("ID không hợp lệ");
            return await _dal.GetByIdAsync(id);
        }

        public async Task<int> CreateAsync(HoaDonNhapCreateRequest req)
        {
            if (req.ChiTiet == null || req.ChiTiet.Count == 0)
                throw new ArgumentException("Hóa đơn nhập phải có ít nhất 1 sản phẩm");

            foreach (var item in req.ChiTiet)
            {
                if (item.SoLuong <= 0)
                    throw new ArgumentException("Số lượng nhập phải lớn hơn 0");

                if (item.GiaNhap <= 0)
                    throw new ArgumentException("Đơn giá nhập phải lớn hơn 0");
            }

            decimal tongTien = req.ChiTiet.Sum(x => x.SoLuong * x.GiaNhap);
            string maHDNhap = $"HDN{DateTime.Now:yyyyMMddHHmmss}";

            var hdNhapId = await _dal.InsertAsync(req, maHDNhap, tongTien);

            foreach (var item in req.ChiTiet)
            {
                await _chiTietDal.InsertAsync(hdNhapId, item);
            }

            return hdNhapId;
        }
    }
}
