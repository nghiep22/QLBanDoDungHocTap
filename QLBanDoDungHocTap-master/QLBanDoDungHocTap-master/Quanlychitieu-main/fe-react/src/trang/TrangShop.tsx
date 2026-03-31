import { useState, useEffect } from 'react';
import Header from '../thanhphan/shop/Header';
import TheSanPham from '../thanhphan/shop/TheSanPham';
import { DoHocTap, LoaiDoHocTap, GioHang } from '../kieu/sanpham';
import { apiSanPham, apiLoaiSanPham } from '../dichvu/apiSanPham';
import '../styles/shop.css';

export default function TrangShop() {
  const [sanPhams, setSanPhams] = useState<DoHocTap[]>([]);
  const [sanPhamHienThi, setSanPhamHienThi] = useState<DoHocTap[]>([]);
  const [loais, setLoais] = useState<LoaiDoHocTap[]>([]);
  const [gioHang, setGioHang] = useState<GioHang[]>([]);
  const [dangTai, setDangTai] = useState(true);
  const [loaiDaChon, setLoaiDaChon] = useState<number | null>(null);

  useEffect(() => {
    taiDuLieu();
  }, []);

  const taiDuLieu = async () => {
    try {
      setDangTai(true);
      const [dsSanPham, dsLoai] = await Promise.all([
        apiSanPham.layTatCa(undefined, true),
        apiLoaiSanPham.layTatCa()
      ]);
      setSanPhams(dsSanPham);
      setSanPhamHienThi(dsSanPham);
      setLoais(dsLoai);
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
      alert('Không thể tải dữ liệu sản phẩm');
    } finally {
      setDangTai(false);
    }
  };

  const xuLyTimKiem = async (tuKhoa: string) => {
    if (!tuKhoa.trim()) {
      setSanPhamHienThi(sanPhams);
      return;
    }

    try {
      const ketQua = await apiSanPham.timKiem(tuKhoa);
      setSanPhamHienThi(ketQua);
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
    }
  };

  const locTheoLoai = (loaiId: number | null) => {
    setLoaiDaChon(loaiId);
    if (loaiId === null) {
      setSanPhamHienThi(sanPhams);
    } else {
      setSanPhamHienThi(sanPhams.filter(sp => sp.loaiDoHocTap_Id === loaiId));
    }
  };

  const sapXep = (kieuSapXep: string) => {
    const dsSapXep = [...sanPhamHienThi];
    
    switch (kieuSapXep) {
      case 'price-asc':
        dsSapXep.sort((a, b) => a.giaBan - b.giaBan);
        break;
      case 'price-desc':
        dsSapXep.sort((a, b) => b.giaBan - a.giaBan);
        break;
      case 'name':
        dsSapXep.sort((a, b) => a.tenDoHocTap.localeCompare(b.tenDoHocTap));
        break;
    }
    
    setSanPhamHienThi(dsSapXep);
  };

  const themVaoGioHang = (sanPham: DoHocTap) => {
    const gioHangMoi = [...gioHang];
    const viTri = gioHangMoi.findIndex(item => item.sanPham.doHocTap_Id === sanPham.doHocTap_Id);
    
    if (viTri >= 0) {
      gioHangMoi[viTri].soLuong += 1;
    } else {
      gioHangMoi.push({ sanPham, soLuong: 1 });
    }
    
    setGioHang(gioHangMoi);
    localStorage.setItem('gioHang', JSON.stringify(gioHangMoi));
    alert('Đã thêm vào giỏ hàng!');
  };

  const tongSoLuongGioHang = gioHang.reduce((tong, item) => tong + item.soLuong, 0);

  if (dangTai) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <Header soLuongGioHang={tongSoLuongGioHang} onTimKiem={xuLyTimKiem} />

      {/* Banner */}
      <section className="banner-slider">
        <div className="slider-container">
          <div className="slide active">
            <div className="slide-content">
              <h2>Khuyến mãi lớn</h2>
              <p>Giảm giá đến 50% cho tất cả sản phẩm</p>
              <button className="btn-primary">Mua ngay</button>
            </div>
          </div>
        </div>
      </section>

      {/* Danh mục */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Danh mục nổi bật</h2>
          <div className="category-grid">
            <div 
              className={`category-card ${loaiDaChon === null ? 'active' : ''}`}
              onClick={() => locTheoLoai(null)}
            >
              <i className="fas fa-th"></i>
              <h3>Tất cả</h3>
            </div>
            {loais.map(loai => (
              <div 
                key={loai.loaiDoHocTap_Id}
                className={`category-card ${loaiDaChon === loai.loaiDoHocTap_Id ? 'active' : ''}`}
                onClick={() => locTheoLoai(loai.loaiDoHocTap_Id)}
              >
                <i className="fas fa-box"></i>
                <h3>{loai.tenLoai}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          
          <div className="filter-bar">
            <select onChange={(e) => sapXep(e.target.value)} defaultValue="">
              <option value="">Sắp xếp</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="name">Tên A-Z</option>
            </select>
            <span className="product-count">
              Hiển thị {sanPhamHienThi.length} sản phẩm
            </span>
          </div>

          {sanPhamHienThi.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <p>Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <div className="product-grid">
              {sanPhamHienThi.map(sanPham => (
                <TheSanPham
                  key={sanPham.doHocTap_Id}
                  sanPham={sanPham}
                  onThemVaoGio={themVaoGioHang}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col">
              <h3>Về chúng tôi</h3>
              <p>Shop đồ dùng học tập uy tín, chất lượng cao</p>
            </div>
            <div className="footer-col">
              <h3>Liên hệ</h3>
              <p><i className="fas fa-phone"></i> 1900 6868</p>
              <p><i className="fas fa-envelope"></i> support@shop.vn</p>
            </div>
            <div className="footer-col">
              <h3>Theo dõi</h3>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
