using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class Kho_DAL
    {
        private readonly string _connectionString;

        public Kho_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Kho>> GetAllAsync()
        {
            var list = new List<Kho>();
            const string sql = @"
                SELECT kho_id, sanPham_id, soLuongTon, soLuongToiThieu, viTriKho, ngayCapNhat
                FROM Kho
                ORDER BY sanPham_id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapKho(reader));
            }

            return list;
        }

        public async Task<Kho?> GetBySanPhamIdAsync(int sanPhamId)
        {
            const string sql = @"
                SELECT kho_id, sanPham_id, soLuongTon, soLuongToiThieu, viTriKho, ngayCapNhat
                FROM Kho
                WHERE sanPham_id = @SanPhamId";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@SanPhamId", sanPhamId);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapKho(reader);
            }

            return null;
        }

        public async Task<bool> UpdateSoLuongAsync(int sanPhamId, int soLuongThayDoi)
        {
            const string sql = @"
                UPDATE Kho
                SET soLuongTon = soLuongTon + @SoLuongThayDoi, ngayCapNhat = GETDATE()
                WHERE sanPham_id = @SanPhamId";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@SanPhamId", sanPhamId);
            cmd.Parameters.AddWithValue("@SoLuongThayDoi", soLuongThayDoi);

            await conn.OpenAsync();
            var rows = await cmd.ExecuteNonQueryAsync();
            return rows > 0;
        }

        private Kho MapKho(SqlDataReader reader)
        {
            return new Kho
            {
                Kho_Id = reader.GetInt32(reader.GetOrdinal("kho_id")),
                SanPham_Id = reader.GetInt32(reader.GetOrdinal("sanPham_id")),
                SoLuongTon = reader.GetInt32(reader.GetOrdinal("soLuongTon")),
                SoLuongToiThieu = reader.GetInt32(reader.GetOrdinal("soLuongToiThieu")),
                ViTriKho = reader.IsDBNull(reader.GetOrdinal("viTriKho")) ? null : reader.GetString(reader.GetOrdinal("viTriKho")),
                NgayCapNhat = reader.GetDateTime(reader.GetOrdinal("ngayCapNhat"))
            };
        }
    }
}
