import { useState } from 'react';
import { SanPham } from '../../types';
import { useCart } from '../../context/CartContext';
import { dichVuApi } from '../../services/api';
import * as S from './styles';

interface Props {
  sanPham: SanPham;
}

export const ProductCard = ({ sanPham }: Props) => {
  const { themVaoGio } = useCart();
  const [dangTaiChiTiet, setDangTaiChiTiet] = useState(false);
  const [hienThiChiTiet, setHienThiChiTiet] = useState(false);
  const [chiTietSanPham, setChiTietSanPham] = useState<any>(null);
  const phanTramGiam = sanPham.giaGoc 
    ? Math.round(((sanPham.giaGoc - sanPham.giaBan) / sanPham.giaGoc) * 100)
    : 0;

  const xuLyThemVaoGio = () => {
    themVaoGio(sanPham);
    alert('Đã thêm vào giỏ hàng!');
  };

  const xuLyXemNhanh = async () => {
    setHienThiChiTiet(true);
    setDangTaiChiTiet(true);
    try {
      const data = await dichVuApi.layChiTietSanPham(sanPham.id);
      setChiTietSanPham(data);
    } catch {
      setChiTietSanPham({
        tenSanPham: sanPham.ten,
        maSanPham: sanPham.ma,
        giaBan: sanPham.giaBan,
        giaNhap: sanPham.giaGoc || 0,
        moTa: sanPham.moTa,
        hinhAnh: sanPham.hinhAnh,
        trangThai: true,
      });
    } finally {
      setDangTaiChiTiet(false);
    }
  };

  const dongChiTiet = () => {
    setHienThiChiTiet(false);
    setChiTietSanPham(null);
  };

  return (
    <>
      <S.Card>
        {sanPham.moi && <S.Badge color="success">New</S.Badge>}
        {phanTramGiam > 0 && <S.DiscountBadge>-{phanTramGiam}%</S.DiscountBadge>}
        
        <S.ImageWrapper>
          <S.Image src={sanPham.hinhAnh} alt={sanPham.ten} />
        </S.ImageWrapper>

        <S.Content>
          <S.Title>{sanPham.ten}</S.Title>
          
          {sanPham.daBan && (
            <S.SoldCount>Đã bán {sanPham.daBan}</S.SoldCount>
          )}

          <S.PriceWrapper>
            <S.Price>{sanPham.giaBan.toLocaleString('vi-VN')}₫</S.Price>
            {sanPham.giaGoc && (
              <S.OriginalPrice>{sanPham.giaGoc.toLocaleString('vi-VN')}₫</S.OriginalPrice>
            )}
          </S.PriceWrapper>

          <S.Actions>
            <S.QuickViewButton onClick={xuLyXemNhanh}>XEM NHANH</S.QuickViewButton>
            <S.AddToCartButton onClick={xuLyThemVaoGio}>
              +
            </S.AddToCartButton>
          </S.Actions>
        </S.Content>
      </S.Card>

      {hienThiChiTiet && (
        <S.Card as="div" style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={dongChiTiet}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, padding: 20, maxHeight: '90vh', overflow: 'auto' }}>
            {dangTaiChiTiet ? (
              <p>Đang tải chi tiết...</p>
            ) : chiTietSanPham ? (
              <div style={{ display: 'grid', gap: 12 }}>
                {chiTietSanPham.hinhAnh && <img src={chiTietSanPham.hinhAnh} alt={chiTietSanPham.tenSanPham} style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 12 }} />}
                <h3 style={{ margin: 0 }}>{chiTietSanPham.tenSanPham}</h3>
                <p><strong>Mã SP:</strong> {chiTietSanPham.maSanPham || '-'}</p>
                <p><strong>Giá bán:</strong> {Number(chiTietSanPham.giaBan).toLocaleString('vi-VN')}₫</p>
                <p><strong>Giá nhập:</strong> {Number(chiTietSanPham.giaNhap || 0).toLocaleString('vi-VN')}₫</p>
                <p><strong>Mô tả:</strong> {chiTietSanPham.moTa || 'Chưa có mô tả'}</p>
                <button onClick={dongChiTiet} style={{ padding: '10px 14px', border: 'none', borderRadius: 8, background: '#e31e24', color: '#fff', cursor: 'pointer' }}>Đóng</button>
              </div>
            ) : null}
          </div>
        </S.Card>
      )}
    </>
  );
};
