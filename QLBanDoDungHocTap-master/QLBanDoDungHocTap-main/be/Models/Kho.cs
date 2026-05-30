namespace Models
{
    public class Kho
    {
        public int Kho_Id { get; set; }
        public int SanPham_Id { get; set; }
        public int SoLuongTon { get; set; } = 0;
        public int SoLuongToiThieu { get; set; } = 5;
        public string? ViTriKho { get; set; }
        public DateTime NgayCapNhat { get; set; } = DateTime.Now;
    }
}
