import { useMemo, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useDangNhap } from '../../context/AuthContext';
import { dichVuApi } from '../../services/api';
import * as S from './styles';

const TRANG_THAI_DON_HANG_MAC_DINH = 'cho_xac_nhan';

export const Cart = () => {
  const { gioHang, xoaKhoiGio, capNhatSoLuong, tongTien, xoaToanBoGio, tongSoLuong } = useCart();
  const { daDangNhap } = useDangNhap();
  const [hienThiForm, setHienThiForm] = useState(false);
  const [dangDatHang, setDangDatHang] = useState(false);
  const [thongBao, setThongBao] = useState<{ loai: 'thanh_cong' | 'loi'; noiDung: string } | null>(null);
  const [formData, setFormData] = useState({
    hoTen: '',
    soDienThoai: '',
    diaChiGiao: '',
    phuongThucTT: 'COD',
    ghiChu: '',
  });

  const tamTinh = tongTien;
  const phiVanChuyen = 0;
  const tongCong = tamTinh + phiVanChuyen;

  const moTaDonHang = useMemo(() => {
    return gioHang.map(item => `${item.sanPham.ten} x${item.soLuong}`).join(', ');
  }, [gioHang]);

  const capNhatForm = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const moFormThanhToan = () => {
    if (!daDangNhap) {
      setThongBao({ loai: 'loi', noiDung: 'Vui lòng đăng nhập trước khi thanh toán.' });
      return;
    }
    setThongBao(null);
    setHienThiForm(true);
  };

  const dongFormThanhToan = () => {
    if (dangDatHang) return;
    setHienThiForm(false);
  };

  const datHang = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.hoTen.trim() || !formData.soDienThoai.trim() || !formData.diaChiGiao.trim()) {
      setThongBao({ loai: 'loi', noiDung: 'Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.' });
      return;
    }

    if (gioHang.length === 0) {
      setThongBao({ loai: 'loi', noiDung: 'Giỏ hàng đang trống.' });
      return;
    }

    setDangDatHang(true);
    setThongBao(null);

    try {
      await dichVuApi.taoDonHang({
        diaChiGiao: formData.diaChiGiao,
        phuongThucTT: formData.phuongThucTT,
        ghiChu: `Người nhận: ${formData.hoTen} | SĐT: ${formData.soDienThoai}${formData.ghiChu.trim() ? ` | Ghi chú: ${formData.ghiChu.trim()}` : ''} | Sản phẩm: ${moTaDonHang}`,
        chiTiet: gioHang.map(item => ({
          sanPham_Id: item.sanPham.id,
          soLuong: item.soLuong,
          giaBan: item.sanPham.giaBan,
        })),
      });

      xoaToanBoGio();
      setThongBao({ loai: 'thanh_cong', noiDung: 'Đặt hàng thành công. Admin đã có thể xem đơn hàng của bạn.' });
      setFormData({
        hoTen: '',
        soDienThoai: '',
        diaChiGiao: '',
        phuongThucTT: 'COD',
        ghiChu: '',
      });
      setHienThiForm(false);
    } catch (error: any) {
      setThongBao({ loai: 'loi', noiDung: error.message || 'Không thể tạo đơn hàng.' });
    } finally {
      setDangDatHang(false);
    }
  };

  if (gioHang.length === 0) {
    return (
      <S.Container>
        <S.EmptyCart>
          {thongBao && <S.Alert $type={thongBao.loai}>{thongBao.noiDung}</S.Alert>}
          <h2>Giỏ hàng trống</h2>
          <p>Hãy thêm sản phẩm vào giỏ hàng</p>
          <S.ContinueButton to="/">Tiếp tục mua sắm</S.ContinueButton>
        </S.EmptyCart>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.TitleWrap>
        <div>
          <S.Title>Giỏ hàng của bạn</S.Title>
          <S.Subtitle>{tongSoLuong} sản phẩm đang chờ thanh toán</S.Subtitle>
        </div>
        <S.ContinueButton to="/">Mua thêm</S.ContinueButton>
      </S.TitleWrap>

      {thongBao && <S.Alert $type={thongBao.loai}>{thongBao.noiDung}</S.Alert>}
      
      <S.CartContent>
        <S.CartItems>
          {gioHang.map(item => (
            <S.CartItem key={item.sanPham.id}>
              <S.ItemImage src={item.sanPham.hinhAnh} alt={item.sanPham.ten} />
              <S.ItemInfo>
                <S.ItemName>{item.sanPham.ten}</S.ItemName>
                <S.ItemMeta>Mã SP: {item.sanPham.ma || `SP-${item.sanPham.id}`}</S.ItemMeta>
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
          <S.HighlightCard>
            <strong>{TRANG_THAI_DON_HANG_MAC_DINH.replace(/_/g, ' ')}</strong>
            <span>Đơn sẽ được tạo sau khi bạn điền thông tin và xác nhận thanh toán.</span>
          </S.HighlightCard>
          <S.SummaryRow>
            <span>Tạm tính:</span>
            <span>{tamTinh.toLocaleString('vi-VN')}₫</span>
          </S.SummaryRow>
          <S.SummaryRow>
            <span>Phí vận chuyển:</span>
            <span>{phiVanChuyen > 0 ? `${phiVanChuyen.toLocaleString('vi-VN')}₫` : 'Miễn phí'}</span>
          </S.SummaryRow>
          <S.TotalRow>
            <span>Tổng cộng:</span>
            <span>{tongCong.toLocaleString('vi-VN')}₫</span>
          </S.TotalRow>
          <S.CheckoutButton onClick={moFormThanhToan}>Thanh toán</S.CheckoutButton>
        </S.CartSummary>
      </S.CartContent>

      {hienThiForm && (
        <S.ModalOverlay onClick={dongFormThanhToan}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <div>
                <h3>Thông tin đơn hàng</h3>
                <p>Điền đầy đủ thông tin để tạo đơn hàng.</p>
              </div>
              <S.CloseButton type="button" onClick={dongFormThanhToan}>×</S.CloseButton>
            </S.ModalHeader>

            <S.Form onSubmit={datHang}>
              <S.FormGrid>
                <S.FormGroup>
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    value={formData.hoTen}
                    onChange={(e) => capNhatForm('hoTen', e.target.value)}
                    placeholder="Nhập họ tên người nhận"
                    required
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.soDienThoai}
                    onChange={(e) => capNhatForm('soDienThoai', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </S.FormGroup>
              </S.FormGrid>

              <S.FormGroup>
                <label>Địa chỉ giao hàng</label>
                <textarea
                  value={formData.diaChiGiao}
                  onChange={(e) => capNhatForm('diaChiGiao', e.target.value)}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  rows={3}
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <label>Phương thức thanh toán</label>
                <select
                  value={formData.phuongThucTT}
                  onChange={(e) => capNhatForm('phuongThucTT', e.target.value)}
                >
                  <option value="COD">Thanh toán khi nhận hàng</option>
                  <option value="ChuyenKhoan">Chuyển khoản</option>
                </select>
              </S.FormGroup>

              <S.FormGroup>
                <label>Ghi chú</label>
                <textarea
                  value={formData.ghiChu}
                  onChange={(e) => capNhatForm('ghiChu', e.target.value)}
                  placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao"
                  rows={3}
                />
              </S.FormGroup>

              <S.OrderPreview>
                <h4>Tóm tắt đơn hàng</h4>
                <p>{moTaDonHang}</p>
                <strong>{tongCong.toLocaleString('vi-VN')}₫</strong>
              </S.OrderPreview>

              <S.FormActions>
                <S.SecondaryButton type="button" onClick={dongFormThanhToan}>Hủy</S.SecondaryButton>
                <S.SubmitButton type="submit" disabled={dangDatHang}>
                  {dangDatHang ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                </S.SubmitButton>
              </S.FormActions>
            </S.Form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};
