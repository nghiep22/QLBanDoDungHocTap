using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class ThongKe_DAL
    {
        private readonly string _connectionString;

        public ThongKe_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        // Lấy thống kê tổng quan cho dashboard
        public async Task<DashboardThongKe> GetDashboardStatsAsync()
        {
            var stats = new DashboardThongKe();

            using var conn = new SqlConnection(_connectionString);
            await conn.OpenAsync();

            // Đếm tổng sản phẩm
            const string sqlSanPham = "SELECT COUNT(*) FROM DoHocTap WHERE trangThai = 1";
            using (var cmd = new SqlCommand(sqlSanPham, conn))
            {
                stats.TongSanPham = (int)await cmd.ExecuteScalarAsync();
            }

            // Đếm tổng đơn hàng
            const string sqlDonHang = "SELECT COUNT(*) FROM DonHang";
            using (var cmd = new SqlCommand(sqlDonHang, conn))
            {
                stats.TongDonHang = (int)await cmd.ExecuteScalarAsync();
            }

            // Đếm tổng khách hàng
            const string sqlKhachHang = "SELECT COUNT(*) FROM KhachHang";
            using (var cmd = new SqlCommand(sqlKhachHang, conn))
            {
                stats.TongKhachHang = (int)await cmd.ExecuteScalarAsync();
            }

            // Tính tổng doanh thu (chỉ đơn hàng đã giao)
            const string sqlDoanhThu = @"
                SELECT ISNULL(SUM(tongThanhToan), 0) 
                FROM DonHang 
                WHERE trangThaiDH = N'da_giao'";
            using (var cmd = new SqlCommand(sqlDoanhThu, conn))
            {
                var result = await cmd.ExecuteScalarAsync();
                stats.TongDoanhThu = result != DBNull.Value ? Convert.ToDecimal(result) : 0;
            }

            return stats;
        }

        // Lấy doanh thu theo ngày
        public async Task<List<DoanhThuTheoNgay>> GetDoanhThuTheoNgayAsync(DateTime? tuNgay = null, DateTime? denNgay = null)
        {
            var list = new List<DoanhThuTheoNgay>();
            
            const string sql = @"
                SELECT 
                    CAST(ngayDat AS DATE) AS ngay,
                    COUNT(donHang_id) AS soDonHang,
                    ISNULL(SUM(tongThanhToan), 0) AS doanhThu
                FROM DonHang
                WHERE trangThaiDH = N'da_giao'
                    AND (@TuNgay IS NULL OR CAST(ngayDat AS DATE) >= @TuNgay)
                    AND (@DenNgay IS NULL OR CAST(ngayDat AS DATE) <= @DenNgay)
                GROUP BY CAST(ngayDat AS DATE)
                ORDER BY ngay DESC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@TuNgay", SqlDbType.Date).Value = (object?)tuNgay ?? DBNull.Value;
            cmd.Parameters.Add("@DenNgay", SqlDbType.Date).Value = (object?)denNgay ?? DBNull.Value;

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new DoanhThuTheoNgay
                {
                    Ngay = reader.GetDateTime(0),
                    SoDonHang = reader.GetInt32(1),
                    DoanhThu = reader.GetDecimal(2)
                });
            }

            return list;
        }

        // Lấy top sản phẩm bán chạy
        public async Task<List<TopSanPham>> GetTopSanPhamAsync(int limit = 10)
        {
            var list = new List<TopSanPham>();
            
            string sql = $@"
                SELECT TOP {limit}
                    sp.sanPham_id,
                    sp.tenSanPham,
                    ISNULL(SUM(ct.soLuong), 0) AS tongSoLuongBan,
                    ISNULL(SUM(ct.soLuong * ct.giaBan), 0) AS tongDoanhThu
                FROM DoHocTap sp
                LEFT JOIN ChiTietDonHang ct ON sp.sanPham_id = ct.sanPham_id
                LEFT JOIN DonHang dh ON ct.donHang_id = dh.donHang_id AND dh.trangThaiDH = N'da_giao'
                GROUP BY sp.sanPham_id, sp.tenSanPham
                ORDER BY tongSoLuongBan DESC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new TopSanPham
                {
                    SanPhamId = reader.GetInt32(0),
                    TenSanPham = reader.GetString(1),
                    TongSoLuongBan = reader.GetInt32(2),
                    TongDoanhThu = reader.GetDecimal(3)
                });
            }

            return list;
        }

        // Lấy đơn hàng theo trạng thái
        public async Task<List<DonHangTheoTrangThai>> GetDonHangTheoTrangThaiAsync()
        {
            var list = new List<DonHangTheoTrangThai>();
            
            const string sql = @"
                SELECT 
                    trangThaiDH,
                    COUNT(*) AS soLuong,
                    ISNULL(SUM(tongThanhToan), 0) AS tongTien
                FROM DonHang
                GROUP BY trangThaiDH
                ORDER BY soLuong DESC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new DonHangTheoTrangThai
                {
                    TrangThai = reader.GetString(0),
                    SoLuong = reader.GetInt32(1),
                    TongTien = reader.GetDecimal(2)
                });
            }

            return list;
        }
    }
}
