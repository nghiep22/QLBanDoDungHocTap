using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class DonHang_DAL
    {
        private readonly string _connectionString;

        public DonHang_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<DonHang>> GetAllAsync(string? trangThai = null)
        {
            var list = new List<DonHang>();
            const string sql = @"
                SELECT donHang_id, khachHang_id, km_id, maDonHang, ngayDat, ngayGiao,
                       diaChiGiao, phuongThucTT, trangThaiDH, tongTienGoc, tienGiam, tongThanhToan, ghiChu
                FROM DonHang
                WHERE (@TrangThai IS NULL OR trangThaiDH = @TrangThai)
                ORDER BY ngayDat DESC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@TrangThai", SqlDbType.NVarChar, 30).Value = (object?)trangThai ?? DBNull.Value;

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapDonHang(reader));
            }

            return list;
        }

        public async Task<DonHang?> GetByIdAsync(int id)
        {
            const string sql = @"
                SELECT donHang_id, khachHang_id, km_id, maDonHang, ngayDat, ngayGiao,
                       diaChiGiao, phuongThucTT, trangThaiDH, tongTienGoc, tienGiam, tongThanhToan, ghiChu
                FROM DonHang
                WHERE donHang_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapDonHang(reader);
            }

            return null;
        }

        public async Task<int> InsertAsync(DonHangCreateRequest req, string maDonHang, decimal tongTienGoc, decimal tienGiam, decimal tongThanhToan)
        {
            const string sql = @"
                INSERT INTO DonHang (khachHang_id, km_id, maDonHang, diaChiGiao, phuongThucTT, 
                                     tongTienGoc, tienGiam, tongThanhToan, ghiChu)
                VALUES (@KhachHangId, @KmId, @MaDonHang, @DiaChiGiao, @PhuongThucTT,
                        @TongTienGoc, @TienGiam, @TongThanhToan, @GhiChu);
                SELECT CAST(SCOPE_IDENTITY() AS INT);";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@KhachHangId", SqlDbType.Int).Value = (object?)req.KhachHang_Id ?? DBNull.Value;
            cmd.Parameters.Add("@KmId", SqlDbType.Int).Value = (object?)req.Km_Id ?? DBNull.Value;
            cmd.Parameters.AddWithValue("@MaDonHang", maDonHang);
            cmd.Parameters.AddWithValue("@DiaChiGiao", (object?)req.DiaChiGiao ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@PhuongThucTT", (object?)req.PhuongThucTT ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@TongTienGoc", tongTienGoc);
            cmd.Parameters.AddWithValue("@TienGiam", tienGiam);
            cmd.Parameters.AddWithValue("@TongThanhToan", tongThanhToan);
            cmd.Parameters.AddWithValue("@GhiChu", (object?)req.GhiChu ?? DBNull.Value);

            await conn.OpenAsync();
            var newId = await cmd.ExecuteScalarAsync();
            return Convert.ToInt32(newId);
        }

        public async Task<bool> UpdateStatusAsync(int id, string trangThai)
        {
            const string sql = @"
                UPDATE DonHang
                SET trangThaiDH = @TrangThai,
                    ngayGiao = CASE WHEN @TrangThai = N'da_giao' THEN GETDATE() ELSE ngayGiao END
                WHERE donHang_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@TrangThai", trangThai);

            await conn.OpenAsync();
            var rows = await cmd.ExecuteNonQueryAsync();
            return rows > 0;
        }

        private DonHang MapDonHang(SqlDataReader reader)
        {
            return new DonHang
            {
                DonHang_Id = reader.GetInt32(reader.GetOrdinal("donHang_id")),
                KhachHang_Id = reader.IsDBNull(reader.GetOrdinal("khachHang_id")) ? null : reader.GetInt32(reader.GetOrdinal("khachHang_id")),
                NhanVien_Id = null,
                Km_Id = reader.IsDBNull(reader.GetOrdinal("km_id")) ? null : reader.GetInt32(reader.GetOrdinal("km_id")),
                MaDonHang = reader.IsDBNull(reader.GetOrdinal("maDonHang")) ? null : reader.GetString(reader.GetOrdinal("maDonHang")),
                NgayDat = reader.GetDateTime(reader.GetOrdinal("ngayDat")),
                NgayGiao = reader.IsDBNull(reader.GetOrdinal("ngayGiao")) ? null : reader.GetDateTime(reader.GetOrdinal("ngayGiao")),
                DiaChiGiao = reader.IsDBNull(reader.GetOrdinal("diaChiGiao")) ? null : reader.GetString(reader.GetOrdinal("diaChiGiao")),
                PhuongThucTT = reader.IsDBNull(reader.GetOrdinal("phuongThucTT")) ? null : reader.GetString(reader.GetOrdinal("phuongThucTT")),
                TrangThaiDH = reader.GetString(reader.GetOrdinal("trangThaiDH")),
                TongTienGoc = reader.GetDecimal(reader.GetOrdinal("tongTienGoc")),
                TienGiam = reader.GetDecimal(reader.GetOrdinal("tienGiam")),
                TongThanhToan = reader.GetDecimal(reader.GetOrdinal("tongThanhToan")),
                GhiChu = reader.IsDBNull(reader.GetOrdinal("ghiChu")) ? null : reader.GetString(reader.GetOrdinal("ghiChu"))
            };
        }
    }
}
