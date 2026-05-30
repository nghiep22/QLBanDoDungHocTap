using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class KhachHang_DAL
    {
        private readonly string _connectionString;

        public KhachHang_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<KhachHang>> GetAllAsync(string? search = null)
        {
            var list = new List<KhachHang>();
            const string sql = @"
                SELECT khachHang_id, taiKhoan_id, hoTen, soDienThoai, email, diaChi, ngaySinh, gioiTinh, ngayDangKy
                FROM KhachHang
                WHERE (
                    @Search IS NULL
                    OR hoTen LIKE N'%' + @Search + N'%'
                    OR soDienThoai LIKE '%' + @Search + '%'
                    OR email LIKE '%' + @Search + '%'
                )
                ORDER BY ngayDangKy DESC, khachHang_id DESC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@Search", SqlDbType.NVarChar, 100).Value =
                string.IsNullOrWhiteSpace(search) ? DBNull.Value : search.Trim();

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapKhachHang(reader));
            }

            return list;
        }

        public async Task<KhachHang?> GetByIdAsync(int id)
        {
            const string sql = @"
                SELECT khachHang_id, taiKhoan_id, hoTen, soDienThoai, email, diaChi, ngaySinh, gioiTinh, ngayDangKy
                FROM KhachHang
                WHERE khachHang_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapKhachHang(reader);
            }

            return null;
        }

        public async Task<int> InsertAsync(KhachHangCreateRequest req)
        {
            const string sql = @"
                INSERT INTO KhachHang (taiKhoan_id, hoTen, soDienThoai, email, diaChi, ngaySinh, gioiTinh)
                VALUES (@TaiKhoanId, @HoTen, @SoDienThoai, @Email, @DiaChi, @NgaySinh, @GioiTinh);
                SELECT CAST(SCOPE_IDENTITY() AS INT);";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            AddKhachHangParameters(cmd, req.TaiKhoan_Id, req.HoTen, req.SoDienThoai, req.Email, req.DiaChi, req.NgaySinh, req.GioiTinh);

            await conn.OpenAsync();
            var newId = await cmd.ExecuteScalarAsync();
            return Convert.ToInt32(newId);
        }

        public async Task<bool> UpdateAsync(int id, KhachHangUpdateRequest req)
        {
            const string sql = @"
                UPDATE KhachHang
                SET hoTen = @HoTen,
                    soDienThoai = @SoDienThoai,
                    email = @Email,
                    diaChi = @DiaChi,
                    ngaySinh = @NgaySinh,
                    gioiTinh = @GioiTinh
                WHERE khachHang_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;
            AddKhachHangParameters(cmd, null, req.HoTen, req.SoDienThoai, req.Email, req.DiaChi, req.NgaySinh, req.GioiTinh, includeTaiKhoan: false);

            await conn.OpenAsync();
            var rows = await cmd.ExecuteNonQueryAsync();
            return rows > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            const string sql = "DELETE FROM KhachHang WHERE khachHang_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;

            await conn.OpenAsync();
            var rows = await cmd.ExecuteNonQueryAsync();
            return rows > 0;
        }

        private static void AddKhachHangParameters(
            SqlCommand cmd,
            int? taiKhoanId,
            string hoTen,
            string? soDienThoai,
            string? email,
            string? diaChi,
            DateTime? ngaySinh,
            bool? gioiTinh,
            bool includeTaiKhoan = true)
        {
            if (includeTaiKhoan)
            {
                cmd.Parameters.Add("@TaiKhoanId", SqlDbType.Int).Value = (object?)taiKhoanId ?? DBNull.Value;
            }

            cmd.Parameters.Add("@HoTen", SqlDbType.NVarChar, 100).Value = hoTen.Trim();
            cmd.Parameters.Add("@SoDienThoai", SqlDbType.VarChar, 15).Value = (object?)NullIfWhiteSpace(soDienThoai) ?? DBNull.Value;
            cmd.Parameters.Add("@Email", SqlDbType.VarChar, 100).Value = (object?)NullIfWhiteSpace(email) ?? DBNull.Value;
            cmd.Parameters.Add("@DiaChi", SqlDbType.NVarChar, 255).Value = (object?)NullIfWhiteSpace(diaChi) ?? DBNull.Value;
            cmd.Parameters.Add("@NgaySinh", SqlDbType.Date).Value = (object?)ngaySinh?.Date ?? DBNull.Value;
            cmd.Parameters.Add("@GioiTinh", SqlDbType.Bit).Value = (object?)gioiTinh ?? DBNull.Value;
        }

        private static string? NullIfWhiteSpace(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        private static KhachHang MapKhachHang(SqlDataReader reader)
        {
            return new KhachHang
            {
                KhachHang_Id = reader.GetInt32(reader.GetOrdinal("khachHang_id")),
                TaiKhoan_Id = reader.IsDBNull(reader.GetOrdinal("taiKhoan_id")) ? null : reader.GetInt32(reader.GetOrdinal("taiKhoan_id")),
                HoTen = reader.GetString(reader.GetOrdinal("hoTen")),
                SoDienThoai = reader.IsDBNull(reader.GetOrdinal("soDienThoai")) ? null : reader.GetString(reader.GetOrdinal("soDienThoai")),
                Email = reader.IsDBNull(reader.GetOrdinal("email")) ? null : reader.GetString(reader.GetOrdinal("email")),
                DiaChi = reader.IsDBNull(reader.GetOrdinal("diaChi")) ? null : reader.GetString(reader.GetOrdinal("diaChi")),
                NgaySinh = reader.IsDBNull(reader.GetOrdinal("ngaySinh")) ? null : reader.GetDateTime(reader.GetOrdinal("ngaySinh")),
                GioiTinh = reader.IsDBNull(reader.GetOrdinal("gioiTinh")) ? null : reader.GetBoolean(reader.GetOrdinal("gioiTinh")),
                NgayDangKy = reader.GetDateTime(reader.GetOrdinal("ngayDangKy"))
            };
        }
    }
}
