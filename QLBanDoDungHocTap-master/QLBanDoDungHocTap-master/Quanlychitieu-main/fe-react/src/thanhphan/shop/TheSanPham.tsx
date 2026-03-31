import { DoHocTap } from '../../kieu/sanpham';

interface TheSanPhamProps {
  sanPham: DoHocTap;
  onThemVaoGio: (sanPham: DoHocTap) => void;
}

export default function TheSanPham({ sanPham, onThemVaoGio }: TheSanPhamProps) {
  const dinhDangGia = (gia: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(gia);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={sanPham.hinhAnh || '/placeholder-product.jpg'} 
          alt={sanPham.tenDoHocTap}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
        {sanPham.soLuongTon < 10 && sanPham.soLuongTon > 0 && (
          <span className="badge badge-warning">Sắp hết</span>
        )}
        {sanPham.soLuongTon === 0 && (
          <span className="badge badge-danger">Hết hàng</span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{sanPham.tenDoHocTap}</h3>
        {sanPham.moTa && (
          <p className="product-desc">{sanPham.moTa}</p>
        )}
        
        <div className="product-footer">
          <div className="product-price">
            <span className="price-current">{dinhDangGia(sanPham.giaBan)}</span>
          </div>
          
          <button 
            className="btn-add-cart"
            onClick={() => onThemVaoGio(sanPham)}
            disabled={sanPham.soLuongTon === 0}
          >
            <i className="fas fa-cart-plus"></i>
            {sanPham.soLuongTon === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
          </button>
        </div>

        <div className="product-stock">
          Còn lại: {sanPham.soLuongTon} sản phẩm
        </div>
      </div>
    </div>
  );
}
