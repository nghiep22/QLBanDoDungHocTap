import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { dichVuApi } from '../../services/api';
import { chuyendoisanpham } from '../../utils/sanpham';
import { SanPham } from '../../types';
import * as S from './styles';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { themVaoGio } = useCart();
  const [sanPham, setSanPham] = useState<SanPham | null>(null);
  const [dangTai, setDangTai] = useState(true);
  const [loi, setLoi] = useState('');
  const [soLuongTonThucTe, setSoLuongTonThucTe] = useState<number | null>(null);

  useEffect(() => {
    const taiChiTiet = async () => {
      if (!id) {
        setLoi('Không tìm thấy sản phẩm');
        setDangTai(false);
        return;
      }

      setDangTai(true);
      setLoi('');
      setSoLuongTonThucTe(null);

      try {
        const [data, kho] = await Promise.all([
          dichVuApi.layChiTietSanPham(Number(id)),
          dichVuApi.layKhoTheoSanPhamId(Number(id)).catch(() => null),
        ]);

        const sanPhamChuyenDoi = chuyendoisanpham(data);
        setSanPham(sanPhamChuyenDoi);
        setSoLuongTonThucTe(kho?.soLuongTon ?? sanPhamChuyenDoi.soLuongTon ?? 0);
      } catch (error) {
        console.error('Lỗi tải chi tiết sản phẩm:', error);
        setLoi('Không thể tải chi tiết sản phẩm');
      } finally {
        setDangTai(false);
      }
    };

    taiChiTiet();
  }, [id]);

  const phanTramGiam = useMemo(() => {
    if (!sanPham?.giaGoc || sanPham.giaGoc <= 0) return 0;
    return Math.round(((sanPham.giaGoc - sanPham.giaBan) / sanPham.giaGoc) * 100);
  }, [sanPham]);

  const xuLyThemVaoGio = () => {
    if (!sanPham) return;
    themVaoGio(sanPham);
    alert('Đã thêm vào giỏ hàng!');
  };

  return (
    <S.PageWrap>
      <S.Container>
        <S.BackButton type="button" onClick={() => navigate(-1)}>
          ← Quay lại
        </S.BackButton>

        {dangTai ? (
          <S.StatusText>Đang tải chi tiết sản phẩm...</S.StatusText>
        ) : loi ? (
          <S.ErrorBox>{loi}</S.ErrorBox>
        ) : sanPham ? (
          <S.DetailCard>
            <S.ImageSection>
              {phanTramGiam > 0 && <S.DiscountBadge>-{phanTramGiam}%</S.DiscountBadge>}
              <S.ProductImage src={sanPham.hinhAnh} alt={sanPham.ten} />
            </S.ImageSection>

            <S.InfoSection>
              <S.Brand>{sanPham.thuongHieu || 'StudyHub'}</S.Brand>
              <S.Title>{sanPham.ten}</S.Title>
              <S.Sku>Mã SP: {sanPham.ma}</S.Sku>

              <S.PriceRow>
                <S.Price>{sanPham.giaBan.toLocaleString('vi-VN')}₫</S.Price>
                {sanPham.giaGoc && sanPham.giaGoc > 0 && (
                  <S.OriginalPrice>{sanPham.giaGoc.toLocaleString('vi-VN')}₫</S.OriginalPrice>
                )}
              </S.PriceRow>

              <S.MetaGrid>
                <div>
                  <span>Loại</span>
                  <strong>{sanPham.loaiCon || 'Chưa cập nhật'}</strong>
                </div>
                <div>
                  <span>Thương hiệu</span>
                  <strong>{sanPham.thuongHieu || 'StudyHub'}</strong>
                </div>
                <div>
                  <span>Màu sắc</span>
                  <strong>{sanPham.mauSac || '-'}</strong>
                </div>
                <div>
                  <span>Tồn kho</span>
                  <strong>{soLuongTonThucTe ?? sanPham.soLuongTon}</strong>
                </div>
              </S.MetaGrid>

              <S.StatusRow>
                <span>Trạng thái</span>
                <S.StatusBadge $active>{(soLuongTonThucTe ?? sanPham.soLuongTon) > 0 ? 'Đang bán' : 'Hết hàng'}</S.StatusBadge>
              </S.StatusRow>

              <S.DescriptionBox>
                <h3>Mô tả sản phẩm</h3>
                <p>{sanPham.moTa || 'Chưa có mô tả cho sản phẩm này.'}</p>
              </S.DescriptionBox>

              <S.Actions>
                <S.PrimaryButton type="button" onClick={xuLyThemVaoGio}>
                  Thêm vào giỏ
                </S.PrimaryButton>
                <S.SecondaryButton type="button" onClick={() => navigate('/')}>
                  Tiếp tục mua sắm
                </S.SecondaryButton>
              </S.Actions>
            </S.InfoSection>
          </S.DetailCard>
        ) : null}
      </S.Container>
    </S.PageWrap>
  );
};
