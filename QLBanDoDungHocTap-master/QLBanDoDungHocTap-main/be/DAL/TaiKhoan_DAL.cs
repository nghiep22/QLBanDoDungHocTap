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

        public async Task<bool> CheckTenDangNhapExistsAsync(string tenDangNhap)
        {
            const string sql = "SELECT COUNT(1) FROM TaiKhoan WHERE tenDangNhap = @user";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            cmd.Parameters.Add("@user", SqlDbType.VarChar, 100).Value = tenDangNhap;

            await conn.OpenAsync();

            var count = (int)await cmd.ExecuteScalarAsync();
            return count > 0;
        }

        public async Task<int> CreateAsync(TaiKhoan taiKhoan)
        {
            const string sql = @"
                INSERT INTO TaiKhoan (tenDangNhap, matKhau, vaiTro_id, trangThai, ngayTao)
                VALUES (@tenDangNhap, @matKhau, @vaiTro_id, @trangThai, @ngayTao);
                SELECT CAST(SCOPE_IDENTITY() as int);";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            cmd.Parameters.Add("@tenDangNhap", SqlDbType.VarChar, 100).Value = taiKhoan.TenDangNhap;
            cmd.Parameters.Add("@matKhau", SqlDbType.VarChar, 255).Value = taiKhoan.MatKhau;
            cmd.Parameters.Add("@vaiTro_id", SqlDbType.Int).Value = taiKhoan.VaiTro_Id;
            cmd.Parameters.Add("@trangThai", SqlDbType.Bit).Value = taiKhoan.TrangThai;
            cmd.Parameters.Add("@ngayTao", SqlDbType.DateTime).Value = taiKhoan.NgayTao;

            await conn.OpenAsync();

            var newId = (int)await cmd.ExecuteScalarAsync();
            return newId;
        }
    }
}
