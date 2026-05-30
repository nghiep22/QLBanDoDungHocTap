namespace Models
{
    public class KhuyenMai
    {
        public int Km_Id { get; set; }
        public string TenKM { get; set; } = string.Empty;
        public string? MaKM { get; set; }
        public string LoaiKM { get; set; } = string.Empty;
        public decimal GiaTriKM { get; set; }
        public decimal? GiaTriToiDa { get; set; }
        public decimal DieuKienApDung { get; set; } = 0;
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        public int SoLuongMa { get; set; } = 0;
        public int DaSD { get; set; } = 0;
        public bool TrangThai { get; set; } = true;
    }
}
