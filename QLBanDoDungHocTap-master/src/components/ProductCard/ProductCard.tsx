import { SanPham } from '../../types';
import { useCart } from '../../context/CartContext';
import * as S from './styles';

interface Props {
  sanPham: SanPham;
}

export const ProductCard = ({ sanPham }: Props) => {
  const { themVaoGio } = useCart();
  const phanTramGiam = sanPham.giaGoc 
    ? Math.round(((sanPham.giaGoc - sanPham.giaBan) / sanPham.giaGoc) * 100)
    : 0;

  const xuLyThemVaoGio = () => {
    themVaoGio(sanPham);
    alert('Đã thêm vào giỏ hàng!');
  };

  return (
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
          <S.QuickViewButton>XEM NHANH</S.QuickViewButton>
          <S.AddToCartButton onClick={xuLyThemVaoGio}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 2L7 6M17 2L19 6M3 6H21M19 6L18 20H6L5 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </S.AddToCartButton>
        </S.Actions>
      </S.Content>
    </S.Card>
  );
};
