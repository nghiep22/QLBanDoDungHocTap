using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class TaiKhoan_DAL
    {
        private readonly string _connectionString;

        public TaiKhoan_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<TaiKhoan?> GetByTenDangNhapAsync(string tenDangNhap)
        {
            const string sql = @"
                SELECT taiKhoan_id, tenDangNhap, matKhau, vaiTro_id, trangThai, ngayTao
                FROM TaiKhoan
                WHERE tenDangNhap = @user AND trangThai = 1";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            cmd.Parameters.Add("@user", SqlDbType.VarChar, 100).Value = tenDangNhap;

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                return null;

            return new TaiKhoan
            {
                TaiKhoan_Id = reader.GetInt32(reader.GetOrdinal("taiKhoan_id")),
                TenDangNhap = reader.GetString(reader.GetOrdinal("tenDangNhap")),
                MatKhau = reader.GetString(reader.GetOrdinal("matKhau")),
                VaiTro_Id = reader.GetInt32(reader.GetOrdinal("vaiTro_id")),
                TrangThai = reader.GetBoolean(reader.GetOrdinal("trangThai")),
                NgayTao = reader.GetDateTime(reader.GetOrdinal("ngayTao"))
            };
        }
    }
}
