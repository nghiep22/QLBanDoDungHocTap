namespace Models
{
    public class LoaiDoHocTap
    {
        public int Loai_Id { get; set; }
        public string TenLoai { get; set; } = string.Empty;
        public string? MoTa { get; set; }
        public string? HinhAnh { get; set; }
    }
}
