namespace Models
{
    public class DoHocTap
    {
        public int SanPham_Id { get; set; }
        public int Loai_Id { get; set; }
        public int NhaCungCap_Id { get; set; }
        public string? MaSanPham { get; set; }
        public string TenSanPham { get; set; } = string.Empty;
        public string? MoTa { get; set; }
        public decimal GiaBan { get; set; }
        public decimal GiaNhap { get; set; }
        public string? HinhAnh { get; set; }
        public string? LoaiCon { get; set; }
        public string? ThuongHieu { get; set; }
        public string? MauSac { get; set; }
        public bool TrangThai { get; set; } = true;
        public DateTime NgayTao { get; set; } = DateTime.Now;
    }
}
