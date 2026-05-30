using DAL;
using Models;

namespace BLL
{
    public interface IThongKe_BLL
    {
        Task<DashboardThongKe> GetDashboardStatsAsync();
        Task<List<DoanhThuTheoNgay>> GetDoanhThuTheoNgayAsync(DateTime? tuNgay = null, DateTime? denNgay = null);
        Task<List<TopSanPham>> GetTopSanPhamAsync(int limit = 10);
        Task<List<DonHangTheoTrangThai>> GetDonHangTheoTrangThaiAsync();
    }

    public class ThongKe_BLL : IThongKe_BLL
    {
        private readonly ThongKe_DAL _dal;

        public ThongKe_BLL(string connectionString)
        {
            _dal = new ThongKe_DAL(connectionString);
        }

        public async Task<DashboardThongKe> GetDashboardStatsAsync()
        {
            return await _dal.GetDashboardStatsAsync();
        }

        public async Task<List<DoanhThuTheoNgay>> GetDoanhThuTheoNgayAsync(DateTime? tuNgay = null, DateTime? denNgay = null)
        {
            return await _dal.GetDoanhThuTheoNgayAsync(tuNgay, denNgay);
        }

        public async Task<List<TopSanPham>> GetTopSanPhamAsync(int limit = 10)
        {
            if (limit <= 0 || limit > 100)
                throw new ArgumentException("Limit phải từ 1 đến 100");

            return await _dal.GetTopSanPhamAsync(limit);
        }

        public async Task<List<DonHangTheoTrangThai>> GetDonHangTheoTrangThaiAsync()
        {
            return await _dal.GetDonHangTheoTrangThaiAsync();
        }
    }
}
