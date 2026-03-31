using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class LoaiDoHocTap_DAL
    {
        private readonly string _connectionString;

        public LoaiDoHocTap_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<LoaiDoHocTap>> GetAllAsync()
        {
            var list = new List<LoaiDoHocTap>();
            const string sql = "SELECT loai_id, tenLoai, moTa, hinhAnh FROM LoaiDoHocTap ORDER BY tenLoai";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new LoaiDoHocTap
                {
                    Loai_Id = reader.GetInt32(0),
                    TenLoai = reader.GetString(1),
                    MoTa = reader.IsDBNull(2) ? null : reader.GetString(2),
                    HinhAnh = reader.IsDBNull(3) ? null : reader.GetString(3)
                });
            }

            return list;
        }

        public async Task<LoaiDoHocTap?> GetByIdAsync(int id)
        {
            const string sql = "SELECT loai_id, tenLoai, moTa, hinhAnh FROM LoaiDoHocTap WHERE loai_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new LoaiDoHocTap
                {
                    Loai_Id = reader.GetInt32(0),
                    TenLoai = reader.GetString(1),
                    MoTa = reader.IsDBNull(2) ? null : reader.GetString(2),
                    HinhAnh = reader.IsDBNull(3) ? null : reader.GetString(3)
                };
            }

            return null;
        }
    }
}
