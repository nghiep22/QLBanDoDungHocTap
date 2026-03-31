using Microsoft.EntityFrameworkCore;
using Models;

namespace DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TaiKhoan> TaiKhoan { get; set; } = null!;
        public DbSet<VaiTro> VaiTro { get; set; } = null!;
        public DbSet<NhanVien> NhanVien { get; set; } = null!;
        public DbSet<KhachHang> KhachHang { get; set; } = null!;
        public DbSet<NhaCungCap> NhaCungCap { get; set; } = null!;
        public DbSet<LoaiDoHocTap> LoaiDoHocTap { get; set; } = null!;
        public DbSet<DoHocTap> DoHocTap { get; set; } = null!;
        public DbSet<Kho> Kho { get; set; } = null!;
        public DbSet<DonHang> DonHang { get; set; } = null!;
        public DbSet<ChiTietDonHang> ChiTietDonHang { get; set; } = null!;
        public DbSet<HoaDonNhap> HoaDonNhap { get; set; } = null!;
        public DbSet<ChiTietHDNhap> ChiTietHDNhap { get; set; } = null!;
        public DbSet<KhuyenMai> KhuyenMai { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaiKhoan>(entity =>
            {
                entity.ToTable("TaiKhoan");

                entity.HasKey(e => e.TaiKhoan_Id);

                entity.HasIndex(e => e.TenDangNhap)
                      .IsUnique();

                entity.Property(e => e.TenDangNhap)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(e => e.MatKhau)
                      .HasMaxLength(255)
                      .IsRequired();

                entity.Property(e => e.TrangThai)
                      .HasDefaultValue(true);

                entity.Property(e => e.NgayTao)
                      .HasDefaultValueSql("GETDATE()");
            });

            modelBuilder.Entity<VaiTro>(entity =>
            {
                entity.ToTable("VaiTro");
                entity.HasKey(e => e.VaiTro_Id);
            });

            modelBuilder.Entity<NhanVien>(entity =>
            {
                entity.ToTable("NhanVien");
                entity.HasKey(e => e.NhanVien_Id);
            });

            modelBuilder.Entity<KhachHang>(entity =>
            {
                entity.ToTable("KhachHang");
                entity.HasKey(e => e.KhachHang_Id);
            });

            modelBuilder.Entity<NhaCungCap>(entity =>
            {
                entity.ToTable("NhaCungCap");
                entity.HasKey(e => e.NhaCungCap_Id);
            });

            modelBuilder.Entity<LoaiDoHocTap>(entity =>
            {
                entity.ToTable("LoaiDoHocTap");
                entity.HasKey(e => e.Loai_Id);
            });

            modelBuilder.Entity<DoHocTap>(entity =>
            {
                entity.ToTable("DoHocTap");
                entity.HasKey(e => e.SanPham_Id);
            });

            modelBuilder.Entity<Kho>(entity =>
            {
                entity.ToTable("Kho");
                entity.HasKey(e => e.Kho_Id);
            });

            modelBuilder.Entity<DonHang>(entity =>
            {
                entity.ToTable("DonHang");
                entity.HasKey(e => e.DonHang_Id);
            });

            modelBuilder.Entity<ChiTietDonHang>(entity =>
            {
                entity.ToTable("ChiTietDonHang");
                entity.HasKey(e => e.ChiTiet_Id);
            });

            modelBuilder.Entity<HoaDonNhap>(entity =>
            {
                entity.ToTable("HoaDonNhap");
                entity.HasKey(e => e.HdNhap_Id);
            });

            modelBuilder.Entity<ChiTietHDNhap>(entity =>
            {
                entity.ToTable("ChiTietHDNhap");
                entity.HasKey(e => e.ChiTiet_Id);
            });

            modelBuilder.Entity<KhuyenMai>(entity =>
            {
                entity.ToTable("KhuyenMai");
                entity.HasKey(e => e.Km_Id);
            });
        }
    }
}

