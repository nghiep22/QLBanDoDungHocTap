using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class ChiTietHDNhap_DAL
    {
        private readonly string _connectionString;

        public ChiTietHDNhap_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<ChiTietHDNhap>> GetByHdNhapIdAsync(int hdNhapId)
        {
            var list = new List<ChiTietHDNhap>();
            const string sql = @"
                SELECT chiTiet_id, hdNhap_id, sanPham_id, soLuong, giaNhap
                FROM ChiTietHDNhap
                WHERE hdNhap_id = @HdNhapId";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@HdNhapId", hdNhapId);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new ChiTietHDNhap
                {
                    ChiTiet_Id = reader.GetInt32(0),
                    HdNhap_Id = reader.GetInt32(1),
                    SanPham_Id = reader.GetInt32(2),
                    SoLuong = reader.GetInt32(3),
                    GiaNhap = reader.GetDecimal(4)
                });
            }

            return list;
        }

        public async Task InsertAsync(int hdNhapId, ChiTietHDNhapRequest item)
        {
            const string sql = @"
                INSERT INTO ChiTietHDNhap (hdNhap_id, sanPham_id, soLuong, giaNhap)
                VALUES (@HdNhapId, @SanPhamId, @SoLuong, @GiaNhap)";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@HdNhapId", hdNhapId);
            cmd.Parameters.AddWithValue("@SanPhamId", item.SanPham_Id);
            cmd.Parameters.AddWithValue("@SoLuong", item.SoLuong);
            cmd.Parameters.AddWithValue("@GiaNhap", item.GiaNhap);

            await conn.OpenAsync();
            await cmd.ExecuteNonQueryAsync();
        }
    }
}
