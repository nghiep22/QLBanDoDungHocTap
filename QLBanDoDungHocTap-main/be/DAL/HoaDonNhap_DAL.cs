using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class HoaDonNhap_DAL
    {
        private readonly string _connectionString;

        public HoaDonNhap_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<HoaDonNhap>> GetAllAsync()
        {
            var list = new List<HoaDonNhap>();
            const string sql = @"
                SELECT hdNhap_id, nhaCungCap_id, nhanVien_id, maHDNhap, ngayNhap, tongTien, ghiChu, trangThai
                FROM HoaDonNhap
                ORDER BY ngayNhap DESC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapHoaDonNhap(reader));
            }

            return list;
        }

        public async Task<HoaDonNhap?> GetByIdAsync(int id)
        {
            const string sql = @"
                SELECT hdNhap_id, nhaCungCap_id, nhanVien_id, maHDNhap, ngayNhap, tongTien, ghiChu, trangThai
                FROM HoaDonNhap
                WHERE hdNhap_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapHoaDonNhap(reader);
            }

            return null;
        }

        public async Task<int> InsertAsync(HoaDonNhapCreateRequest req, string maHDNhap, decimal tongTien)
        {
            const string sql = @"
                INSERT INTO HoaDonNhap (nhaCungCap_id, nhanVien_id, maHDNhap, tongTien, ghiChu)
                VALUES (@NhaCungCapId, @NhanVienId, @MaHDNhap, @TongTien, @GhiChu);
                SELECT CAST(SCOPE_IDENTITY() AS INT);";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@NhaCungCapId", req.NhaCungCap_Id);
            cmd.Parameters.AddWithValue("@NhanVienId", req.NhanVien_Id);
            cmd.Parameters.AddWithValue("@MaHDNhap", maHDNhap);
            cmd.Parameters.AddWithValue("@TongTien", tongTien);
            cmd.Parameters.AddWithValue("@GhiChu", (object?)req.GhiChu ?? DBNull.Value);

            await conn.OpenAsync();
            var newId = await cmd.ExecuteScalarAsync();
            return Convert.ToInt32(newId);
        }

        private HoaDonNhap MapHoaDonNhap(SqlDataReader reader)
        {
            return new HoaDonNhap
            {
                HdNhap_Id = reader.GetInt32(reader.GetOrdinal("hdNhap_id")),
                NhaCungCap_Id = reader.GetInt32(reader.GetOrdinal("nhaCungCap_id")),
                NhanVien_Id = reader.GetInt32(reader.GetOrdinal("nhanVien_id")),
                MaHDNhap = reader.IsDBNull(reader.GetOrdinal("maHDNhap")) ? null : reader.GetString(reader.GetOrdinal("maHDNhap")),
                NgayNhap = reader.GetDateTime(reader.GetOrdinal("ngayNhap")),
                TongTien = reader.GetDecimal(reader.GetOrdinal("tongTien")),
                GhiChu = reader.IsDBNull(reader.GetOrdinal("ghiChu")) ? null : reader.GetString(reader.GetOrdinal("ghiChu")),
                TrangThai = reader.GetString(reader.GetOrdinal("trangThai"))
            };
        }
    }
}
