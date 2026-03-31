import { useCart } from '../../context/CartContext';
import * as S from './styles';

export const Cart = () => {
  const { gioHang, xoaKhoiGio, capNhatSoLuong, tongTien } = useCart();

  if (gioHang.length === 0) {
    return (
      <S.Container>
        <S.EmptyCart>
          <h2>Giỏ hàng trống</h2>
          <p>Hãy thêm sản phẩm vào giỏ hàng</p>
          <S.ContinueButton to="/">Tiếp tục mua sắm</S.ContinueButton>
        </S.EmptyCart>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>Giỏ hàng của bạn</S.Title>
      
      <S.CartContent>
        <S.CartItems>
          {gioHang.map(item => (
            <S.CartItem key={item.sanPham.id}>
              <S.ItemImage src={item.sanPham.hinhAnh} alt={item.sanPham.ten} />
              <S.ItemInfo>
                <S.ItemName>{item.sanPham.ten}</S.ItemName>
                <S.ItemPrice>{item.sanPham.giaBan.toLocaleString('vi-VN')}₫</S.ItemPrice>
              </S.ItemInfo>
              <S.QuantityControl>
                <S.QuantityButton onClick={() => capNhatSoLuong(item.sanPham.id, item.soLuong - 1)}>
                  -
                </S.QuantityButton>
                <S.Quantity>{item.soLuong}</S.Quantity>
                <S.QuantityButton onClick={() => capNhatSoLuong(item.sanPham.id, item.soLuong + 1)}>
                  +
                </S.QuantityButton>
              </S.QuantityControl>
              <S.ItemTotal>
                {(item.sanPham.giaBan * item.soLuong).toLocaleString('vi-VN')}₫
              </S.ItemTotal>
              <S.RemoveButton onClick={() => xoaKhoiGio(item.sanPham.id)}>×</S.RemoveButton>
            </S.CartItem>
          ))}
        </S.CartItems>

        <S.CartSummary>
          <h3>Tổng đơn hàng</h3>
          <S.SummaryRow>
            <span>Tạm tính:</span>
            <span>{tongTien.toLocaleString('vi-VN')}₫</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>Phí vận chuyển:</span>
            <span>Miễn phí</span>
          </S.SummaryRow>
          <S.TotalRow>
            <span>Tổng cộng:</span>
            <span>{tongTien.toLocaleString('vi-VN')}₫</span>
          </S.TotalRow>
          <S.CheckoutButton>Thanh toán</S.CheckoutButton>
        </S.CartSummary>
      </S.CartContent>
    </S.Container>
  );
};
