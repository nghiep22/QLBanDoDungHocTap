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
            return await cmd.ExecuteNonQueryAsync() > 0;
        }

        public async Task<bool> HasEnoughStockAsync(int sanPhamId, int soLuongCan)
        {
            const string sql = @"
                SELECT CASE WHEN EXISTS (
                    SELECT 1
                    FROM Kho
                    WHERE sanPham_id = @SanPhamId AND soLuongTon >= @SoLuongCan
                ) THEN 1 ELSE 0 END";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@SanPhamId", sanPhamId);
            cmd.Parameters.AddWithValue("@SoLuongCan", soLuongCan);

            await conn.OpenAsync();
            var result = await cmd.ExecuteScalarAsync();
            return Convert.ToInt32(result) == 1;
        }

        public async Task<bool> DecreaseStockAsync(int sanPhamId, int soLuong)
        {
            const string sql = @"
                UPDATE Kho
                SET soLuongTon = soLuongTon - @SoLuong, ngayCapNhat = GETDATE()
                WHERE sanPham_id = @SanPhamId AND soLuongTon >= @SoLuong";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@SanPhamId", sanPhamId);
            cmd.Parameters.AddWithValue("@SoLuong", soLuong);

            await conn.OpenAsync();
            return await cmd.ExecuteNonQueryAsync() > 0;
        }

        public async Task<List<KhoTonKhoView>> GetInventoryAsync()
        {
            var list = new List<KhoTonKhoView>();
            const string sql = @"
                SELECT 
                    ISNULL(k.kho_id, 0) AS kho_id,
                    sp.sanPham_id,
                    sp.maSanPham,
                    sp.tenSanPham,
                    sp.hinhAnh,
                    sp.giaBan,
                    sp.giaNhap,
                    ISNULL(k.soLuongTon, 0) AS soLuongTon,
                    ISNULL(k.soLuongToiThieu, 0) AS soLuongToiThieu,
                    k.viTriKho,
                    ISNULL(k.ngayCapNhat, sp.ngayTao) AS ngayCapNhat
                FROM DoHocTap sp
                LEFT JOIN Kho k ON sp.sanPham_id = k.sanPham_id
                ORDER BY sp.tenSanPham";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapInventory(reader));
            }

            return list;
        }

        public async Task<List<KhoTonKhoView>> GetLowStockAsync()
        {
            var list = new List<KhoTonKhoView>();
            const string sql = @"
                SELECT 
                    ISNULL(k.kho_id, 0) AS kho_id,
                    sp.sanPham_id,
                    sp.maSanPham,
                    sp.tenSanPham,
                    sp.hinhAnh,
                    sp.giaBan,
                    sp.giaNhap,
                    ISNULL(k.soLuongTon, 0) AS soLuongTon,
                    ISNULL(k.soLuongToiThieu, 0) AS soLuongToiThieu,
                    k.viTriKho,
                    ISNULL(k.ngayCapNhat, sp.ngayTao) AS ngayCapNhat
                FROM DoHocTap sp
                LEFT JOIN Kho k ON sp.sanPham_id = k.sanPham_id
                WHERE ISNULL(k.soLuongTon, 0) <= ISNULL(k.soLuongToiThieu, 0)
                ORDER BY ISNULL(k.soLuongTon, 0) ASC, sp.tenSanPham";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(MapInventory(reader));
            }

            return list;
        }

        public async Task<KhoTonKhoView?> GetInventoryBySanPhamIdAsync(int sanPhamId)
        {
            const string sql = @"
                SELECT TOP 1
                    ISNULL(k.kho_id, 0) AS kho_id,
                    sp.sanPham_id,
                    sp.maSanPham,
                    sp.tenSanPham,
                    sp.hinhAnh,
                    sp.giaBan,
                    sp.giaNhap,
                    ISNULL(k.soLuongTon, 0) AS soLuongTon,
                    ISNULL(k.soLuongToiThieu, 0) AS soLuongToiThieu,
                    k.viTriKho,
                    ISNULL(k.ngayCapNhat, sp.ngayTao) AS ngayCapNhat
                FROM DoHocTap sp
                LEFT JOIN Kho k ON sp.sanPham_id = k.sanPham_id
                WHERE sp.sanPham_id = @SanPhamId";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@SanPhamId", sanPhamId);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return MapInventory(reader);
            }

            return null;
        }

        public async Task<bool> UpdateInventoryAsync(int sanPhamId, KhoCapNhatRequest req)
        {
            const string sql = @"
                IF EXISTS (SELECT 1 FROM Kho WHERE sanPham_id = @SanPhamId)
                BEGIN
                    UPDATE Kho
                    SET soLuongTon = @SoLuongTon,
                        soLuongToiThieu = @SoLuongToiThieu,
                        viTriKho = @ViTriKho,
                        ngayCapNhat = GETDATE()
                    WHERE sanPham_id = @SanPhamId
                END
                ELSE
                BEGIN
                    INSERT INTO Kho (sanPham_id, soLuongTon, soLuongToiThieu, viTriKho, ngayCapNhat)
                    VALUES (@SanPhamId, @SoLuongTon, @SoLuongToiThieu, @ViTriKho, GETDATE())
                END";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@SanPhamId", sanPhamId);
            cmd.Parameters.AddWithValue("@SoLuongTon", req.SoLuongTon);
            cmd.Parameters.AddWithValue("@SoLuongToiThieu", req.SoLuongToiThieu);
            cmd.Parameters.AddWithValue("@ViTriKho", (object?)req.ViTriKho ?? DBNull.Value);

            await conn.OpenAsync();
            return await cmd.ExecuteNonQueryAsync() > 0;
        }

        public async Task<List<LichSuKhoView>> GetHistoryAsync()
        {
            var list = new List<LichSuKhoView>();
            const string sql = @"
                SELECT * FROM (
                    SELECT
                        N'nhap' AS LoaiGiaoDich,
                        hd.maHDNhap AS SoChungTu,
                        hd.ngayNhap AS NgayGiaoDich,
                        sp.sanPham_id AS SanPham_Id,
                        sp.tenSanPham AS TenSanPham,
                        ct.soLuong AS SoLuong,
                        ct.giaNhap AS DonGia,
                        ct.soLuong * ct.giaNhap AS ThanhTien,
                        ncc.tenNCC AS DoiTuong,
                        hd.trangThai AS TrangThai
                    FROM HoaDonNhap hd
                    INNER JOIN ChiTietHDNhap ct ON hd.hdNhap_id = ct.hdNhap_id
                    INNER JOIN DoHocTap sp ON ct.sanPham_id = sp.sanPham_id
                    LEFT JOIN NhaCungCap ncc ON hd.nhaCungCap_id = ncc.nhaCungCap_id

                    UNION ALL

                    SELECT
                        N'xuat' AS LoaiGiaoDich,
                        dh.maDonHang AS SoChungTu,
                        dh.ngayDat AS NgayGiaoDich,
                        sp.sanPham_id AS SanPham_Id,
                        sp.tenSanPham AS TenSanPham,
                        ct.soLuong AS SoLuong,
                        ct.giaBan AS DonGia,
                        ct.soLuong * ct.giaBan AS ThanhTien,
                        kh.hoTen AS DoiTuong,
                        dh.trangThaiDH AS TrangThai
                    FROM DonHang dh
                    INNER JOIN ChiTietDonHang ct ON dh.donHang_id = ct.donHang_id
                    INNER JOIN DoHocTap sp ON ct.sanPham_id = sp.sanPham_id
                    LEFT JOIN KhachHang kh ON dh.khachHang_id = kh.khachHang_id
                ) AS lichSu
                ORDER BY NgayGiaoDich DESC";

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand(sql, conn);

            await conn.OpenAsync();
            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new LichSuKhoView
                {
                    LoaiGiaoDich = reader.GetString(reader.GetOrdinal("LoaiGiaoDich")),
                    SoChungTu = reader.IsDBNull(reader.GetOrdinal("SoChungTu")) ? string.Empty : reader.GetString(reader.GetOrdinal("SoChungTu")),
                    NgayGiaoDich = reader.GetDateTime(reader.GetOrdinal("NgayGiaoDich")),
                    SanPham_Id = reader.GetInt32(reader.GetOrdinal("SanPham_Id")),
                    TenSanPham = reader.GetString(reader.GetOrdinal("TenSanPham")),
                    SoLuong = reader.GetInt32(reader.GetOrdinal("SoLuong")),
                    DonGia = reader.GetDecimal(reader.GetOrdinal("DonGia")),
                    ThanhTien = reader.GetDecimal(reader.GetOrdinal("ThanhTien")),
                    DoiTuong = reader.IsDBNull(reader.GetOrdinal("DoiTuong")) ? null : reader.GetString(reader.GetOrdinal("DoiTuong")),
                    TrangThai = reader.IsDBNull(reader.GetOrdinal("TrangThai")) ? null : reader.GetString(reader.GetOrdinal("TrangThai"))
                });
            }

            return list;
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

        private KhoTonKhoView MapInventory(SqlDataReader reader)
        {
            return new KhoTonKhoView
            {
                Kho_Id = reader.GetInt32(reader.GetOrdinal("kho_id")),
                SanPham_Id = reader.GetInt32(reader.GetOrdinal("sanPham_id")),
                MaSanPham = reader.IsDBNull(reader.GetOrdinal("maSanPham")) ? null : reader.GetString(reader.GetOrdinal("maSanPham")),
                TenSanPham = reader.GetString(reader.GetOrdinal("tenSanPham")),
                HinhAnh = reader.IsDBNull(reader.GetOrdinal("hinhAnh")) ? null : reader.GetString(reader.GetOrdinal("hinhAnh")),
                GiaBan = reader.GetDecimal(reader.GetOrdinal("giaBan")),
                GiaNhap = reader.GetDecimal(reader.GetOrdinal("giaNhap")),
                SoLuongTon = reader.GetInt32(reader.GetOrdinal("soLuongTon")),
                SoLuongToiThieu = reader.GetInt32(reader.GetOrdinal("soLuongToiThieu")),
                ViTriKho = reader.IsDBNull(reader.GetOrdinal("viTriKho")) ? null : reader.GetString(reader.GetOrdinal("viTriKho")),
                NgayCapNhat = reader.GetDateTime(reader.GetOrdinal("ngayCapNhat"))
            };
        }
    }
}
