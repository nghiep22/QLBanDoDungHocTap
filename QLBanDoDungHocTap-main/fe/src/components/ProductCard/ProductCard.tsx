import { useNavigate } from 'react-router-dom';
import { SanPham } from '../../types';
import { useCart } from '../../context/CartContext';
import * as S from './styles';

interface Props {
  sanPham: SanPham;
}

export const ProductCard = ({ sanPham }: Props) => {
  const { themVaoGio } = useCart();
  const navigate = useNavigate();
  const phanTramGiam = sanPham.giaGoc 
    ? Math.round(((sanPham.giaGoc - sanPham.giaBan) / sanPham.giaGoc) * 100)
    : 0;

  const xuLyThemVaoGio = (e: React.MouseEvent) => {
    e.stopPropagation();
    themVaoGio(sanPham);
    alert('Đã thêm vào giỏ hàng!');
  };

  const xuLyXemChiTiet = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    navigate(`/san-pham/${sanPham.id}`);
  };

  const xuLyPhimTat = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      xuLyXemChiTiet(e);
    }
  };

  return (
    <S.Card
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/san-pham/${sanPham.id}`)}
      onKeyDown={xuLyPhimTat}
      style={{ cursor: 'pointer' }}
    >
      {sanPham.moi && <S.Badge color="success">New</S.Badge>}
      {phanTramGiam > 0 && <S.DiscountBadge>-{phanTramGiam}%</S.DiscountBadge>}
      
      <S.ImageWrapper>
        <S.Image src={sanPham.hinhAnh} alt={sanPham.ten} />
      </S.ImageWrapper>

      <S.Content>
        <S.Title>{sanPham.ten}</S.Title>
        {sanPham.daBan > 0 && <S.SoldCount>Đã bán {sanPham.daBan}</S.SoldCount>}

        <S.PriceWrapper>
          <S.Price>{sanPham.giaBan.toLocaleString('vi-VN')}₫</S.Price>
          {sanPham.giaGoc > 0 && (
            <S.OriginalPrice>{sanPham.giaGoc.toLocaleString('vi-VN')}₫</S.OriginalPrice>
          )}
        </S.PriceWrapper>

        <S.Actions>
          <S.QuickViewButton type="button" onClick={xuLyXemChiTiet}>XEM CHI TIẾT</S.QuickViewButton>
          <S.AddToCartButton type="button" onClick={xuLyThemVaoGio}>
            +
          </S.AddToCartButton>
        </S.Actions>
      </S.Content>
    </S.Card>
  );
};
