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
            +
          </S.AddToCartButton>
        </S.Actions>
      </S.Content>
    </S.Card>
  );
};
