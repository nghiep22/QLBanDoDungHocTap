namespace Models
{
    public class DoHocTapCreateRequest
    {
        public int Loai_Id { get; set; }
        public int NhaCungCap_Id { get; set; }
        public string? MaSanPham { get; set; }
        public string TenSanPham { get; set; } = string.Empty;
        public string? MoTa { get; set; }
        public decimal GiaBan { get; set; }
        public decimal GiaNhap { get; set; }
        public string? HinhAnh { get; set; }
    }

    public class DoHocTapUpdateRequest
    {
        public int Loai_Id { get; set; }
        public int NhaCungCap_Id { get; set; }
        public string? MaSanPham { get; set; }
        public string TenSanPham { get; set; } = string.Empty;
        public string? MoTa { get; set; }
        public decimal GiaBan { get; set; }
        public decimal GiaNhap { get; set; }
        public string? HinhAnh { get; set; }
        public bool TrangThai { get; set; }
    }
}
