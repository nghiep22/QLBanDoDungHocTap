using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class NhaCungCap_DAL
    {
        private readonly string _connectionString;

        public NhaCungCap_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<NhaCungCap>> GetAllAsync(bool? trangThai = null)
        {
            var list = new List<NhaCungCap>();
            const string sql = @"
                SELECT nhaCungCap_id, tenNCC, soDienThoai, email, diaChi, maSoThue, nguoiDaiDien, trangThai
                FROM NhaCungCap
                WHERE (@TrangThai IS NULL OR trangThai = @TrangThai)
                ORDER BY tenNCC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@TrangThai", SqlDbType.Bit).Value = (object?)trangThai ?? DBNull.Value;

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapNhaCungCap(reader));
            }

            return list;
        }

        public async Task<NhaCungCap?> GetByIdAsync(int id)
        {
            const string sql = @"
                SELECT nhaCungCap_id, tenNCC, soDienThoai, email, diaChi, maSoThue, nguoiDaiDien, trangThai
                FROM NhaCungCap
                WHERE nhaCungCap_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapNhaCungCap(reader);
            }

            return null;
        }

        public async Task<int> InsertAsync(NhaCungCapCreateRequest req)
        {
            const string sql = @"
                INSERT INTO NhaCungCap (tenNCC, soDienThoai, email, diaChi, maSoThue, nguoiDaiDien)
                VALUES (@TenNCC, @SoDienThoai, @Email, @DiaChi, @MaSoThue, @NguoiDaiDien);
                SELECT CAST(SCOPE_IDENTITY() AS INT);";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@TenNCC", req.TenNCC);
            cmd.Parameters.AddWithValue("@SoDienThoai", (object?)req.SoDienThoai ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Email", (object?)req.Email ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@DiaChi", (object?)req.DiaChi ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@MaSoThue", (object?)req.MaSoThue ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@NguoiDaiDien", (object?)req.NguoiDaiDien ?? DBNull.Value);

            await conn.OpenAsync();
            var newId = await cmd.ExecuteScalarAsync();
            return Convert.ToInt32(newId);
        }

        public async Task<bool> UpdateAsync(int id, NhaCungCapUpdateRequest req)
        {
            const string sql = @"
                UPDATE NhaCungCap
                SET tenNCC = @TenNCC, soDienThoai = @SoDienThoai, email = @Email,
                    diaChi = @DiaChi, maSoThue = @MaSoThue, nguoiDaiDien = @NguoiDaiDien, trangThai = @TrangThai
                WHERE nhaCungCap_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@TenNCC", req.TenNCC);
            cmd.Parameters.AddWithValue("@SoDienThoai", (object?)req.SoDienThoai ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Email", (object?)req.Email ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@DiaChi", (object?)req.DiaChi ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@MaSoThue", (object?)req.MaSoThue ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@NguoiDaiDien", (object?)req.NguoiDaiDien ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@TrangThai", req.TrangThai);

            await conn.OpenAsync();
            var rows = await cmd.ExecuteNonQueryAsync();
            return rows > 0;
        }

        private NhaCungCap MapNhaCungCap(SqlDataReader reader)
        {
            return new NhaCungCap
            {
                NhaCungCap_Id = reader.GetInt32(reader.GetOrdinal("nhaCungCap_id")),
                TenNCC = reader.GetString(reader.GetOrdinal("tenNCC")),
                SoDienThoai = reader.IsDBNull(reader.GetOrdinal("soDienThoai")) ? null : reader.GetString(reader.GetOrdinal("soDienThoai")),
                Email = reader.IsDBNull(reader.GetOrdinal("email")) ? null : reader.GetString(reader.GetOrdinal("email")),
                DiaChi = reader.IsDBNull(reader.GetOrdinal("diaChi")) ? null : reader.GetString(reader.GetOrdinal("diaChi")),
                MaSoThue = reader.IsDBNull(reader.GetOrdinal("maSoThue")) ? null : reader.GetString(reader.GetOrdinal("maSoThue")),
                NguoiDaiDien = reader.IsDBNull(reader.GetOrdinal("nguoiDaiDien")) ? null : reader.GetString(reader.GetOrdinal("nguoiDaiDien")),
                TrangThai = reader.GetBoolean(reader.GetOrdinal("trangThai"))
            };
        }
    }
}
