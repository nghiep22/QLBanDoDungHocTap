using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class DoHocTap_DAL
    {
        private readonly string _connectionString;

        public DoHocTap_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<DoHocTap>> GetAllAsync(int? loaiId = null, bool? trangThai = null)
        {
            var list = new List<DoHocTap>();
            const string sql = @"
                SELECT sanPham_id, loai_id, nhaCungCap_id, maSanPham, tenSanPham, 
                       moTa, giaBan, giaNhap, hinhAnh, trangThai, ngayTao
                FROM DoHocTap
                WHERE (@LoaiId IS NULL OR loai_id = @LoaiId)
                  AND (@TrangThai IS NULL OR trangThai = @TrangThai)
                ORDER BY tenSanPham";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@LoaiId", SqlDbType.Int).Value = (object?)loaiId ?? DBNull.Value;
            cmd.Parameters.Add("@TrangThai", SqlDbType.Bit).Value = (object?)trangThai ?? DBNull.Value;

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapDoHocTap(reader));
            }

            return list;
        }

        public async Task<DoHocTap?> GetByIdAsync(int id)
        {
            const string sql = @"
                SELECT sanPham_id, loai_id, nhaCungCap_id, maSanPham, tenSanPham, 
                       moTa, giaBan, giaNhap, hinhAnh, trangThai, ngayTao
                FROM DoHocTap
                WHERE sanPham_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapDoHocTap(reader);
            }

            return null;
        }

        public async Task<int> InsertAsync(DoHocTapCreateRequest req)
        {
            const string sql = @"
                INSERT INTO DoHocTap (loai_id, nhaCungCap_id, maSanPham, tenSanPham, moTa, giaBan, giaNhap, hinhAnh)
                VALUES (@LoaiId, @NhaCungCapId, @MaSanPham, @TenSanPham, @MoTa, @GiaBan, @GiaNhap, @HinhAnh);
                SELECT CAST(SCOPE_IDENTITY() AS INT);";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@LoaiId", req.Loai_Id);
            cmd.Parameters.AddWithValue("@NhaCungCapId", req.NhaCungCap_Id);
            cmd.Parameters.AddWithValue("@MaSanPham", (object?)req.MaSanPham ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@TenSanPham", req.TenSanPham);
            cmd.Parameters.AddWithValue("@MoTa", (object?)req.MoTa ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@GiaBan", req.GiaBan);
            cmd.Parameters.AddWithValue("@GiaNhap", req.GiaNhap);
            cmd.Parameters.AddWithValue("@HinhAnh", (object?)req.HinhAnh ?? DBNull.Value);

            await conn.OpenAsync();
            var newId = await cmd.ExecuteScalarAsync();
            return Convert.ToInt32(newId);
        }

        public async Task<bool> UpdateAsync(int id, DoHocTapUpdateRequest req)
        {
            const string sql = @"
                UPDATE DoHocTap
                SET loai_id = @LoaiId, nhaCungCap_id = @NhaCungCapId, maSanPham = @MaSanPham,
                    tenSanPham = @TenSanPham, moTa = @MoTa, giaBan = @GiaBan, giaNhap = @GiaNhap,
                    hinhAnh = @HinhAnh, trangThai = @TrangThai
                WHERE sanPham_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@LoaiId", req.Loai_Id);
            cmd.Parameters.AddWithValue("@NhaCungCapId", req.NhaCungCap_Id);
            cmd.Parameters.AddWithValue("@MaSanPham", (object?)req.MaSanPham ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@TenSanPham", req.TenSanPham);
            cmd.Parameters.AddWithValue("@MoTa", (object?)req.MoTa ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@GiaBan", req.GiaBan);
            cmd.Parameters.AddWithValue("@GiaNhap", req.GiaNhap);
            cmd.Parameters.AddWithValue("@HinhAnh", (object?)req.HinhAnh ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@TrangThai", req.TrangThai);

            await conn.OpenAsync();
            var rows = await cmd.ExecuteNonQueryAsync();
            return rows > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            const string sql = "DELETE FROM DoHocTap WHERE sanPham_id = @Id";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            await conn.OpenAsync();
            var rows = await cmd.ExecuteNonQueryAsync();
            return rows > 0;
        }

        private DoHocTap MapDoHocTap(SqlDataReader reader)
        {
            return new DoHocTap
            {
                SanPham_Id = reader.GetInt32(reader.GetOrdinal("sanPham_id")),
                Loai_Id = reader.GetInt32(reader.GetOrdinal("loai_id")),
                NhaCungCap_Id = reader.GetInt32(reader.GetOrdinal("nhaCungCap_id")),
                MaSanPham = reader.IsDBNull(reader.GetOrdinal("maSanPham")) ? null : reader.GetString(reader.GetOrdinal("maSanPham")),
                TenSanPham = reader.GetString(reader.GetOrdinal("tenSanPham")),
                MoTa = reader.IsDBNull(reader.GetOrdinal("moTa")) ? null : reader.GetString(reader.GetOrdinal("moTa")),
                GiaBan = reader.GetDecimal(reader.GetOrdinal("giaBan")),
                GiaNhap = reader.GetDecimal(reader.GetOrdinal("giaNhap")),
                HinhAnh = reader.IsDBNull(reader.GetOrdinal("hinhAnh")) ? null : reader.GetString(reader.GetOrdinal("hinhAnh")),
                TrangThai = reader.GetBoolean(reader.GetOrdinal("trangThai")),
                NgayTao = reader.GetDateTime(reader.GetOrdinal("ngayTao"))
            };
        }
    }
}
