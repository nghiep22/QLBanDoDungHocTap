using System.Data;
using Microsoft.Data.SqlClient;
using Models;

namespace DAL
{
    public class ChiTietDonHang_DAL
    {
        private readonly string _connectionString;

        public ChiTietDonHang_DAL(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<ChiTietDonHang>> GetByDonHangIdAsync(int donHangId)
        {
            var list = new List<ChiTietDonHang>();
            const string sql = @"
                SELECT chiTiet_id, donHang_id, sanPham_id, soLuong, giaBan
                FROM ChiTietDonHang
                WHERE donHang_id = @DonHangId";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@DonHangId", donHangId);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new ChiTietDonHang
                {
                    ChiTiet_Id = reader.GetInt32(0),
                    DonHang_Id = reader.GetInt32(1),
                    SanPham_Id = reader.GetInt32(2),
                    SoLuong = reader.GetInt32(3),
                    GiaBan = reader.GetDecimal(4)
                });
            }

            return list;
        }

        public async Task InsertAsync(int donHangId, ChiTietDonHangRequest item)
        {
            const string sql = @"
                INSERT INTO ChiTietDonHang (donHang_id, sanPham_id, soLuong, giaBan)
                VALUES (@DonHangId, @SanPhamId, @SoLuong, @GiaBan)";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@DonHangId", donHangId);
            cmd.Parameters.AddWithValue("@SanPhamId", item.SanPham_Id);
            cmd.Parameters.AddWithValue("@SoLuong", item.SoLuong);
            cmd.Parameters.AddWithValue("@GiaBan", item.GiaBan);

            await conn.OpenAsync();
            await cmd.ExecuteNonQueryAsync();
        }
    }
}
