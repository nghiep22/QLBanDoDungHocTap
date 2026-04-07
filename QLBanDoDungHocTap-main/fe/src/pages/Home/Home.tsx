import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham, LoaiSanPham } from '../../types';
import { dichVuApi } from '../../services/api';
import { chuyendoidanhsachsanpham, danhsachloaisanpham } from '../../utils/sanpham';
import * as S from './styles';

const danhMucList: (LoaiSanPham & { slug: string })[] = danhsachloaisanpham.map(l => ({
  id: l.id,
  ten: l.ten,
  slug: l.slug,
}));

export const Home = () => {
  const navigate = useNavigate();
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [dangTai, setDangTai] = useState(true);

  useEffect(() => {
    const taidulieu = async () => {
      try {
        const apiSanPhams = await dichVuApi.layDanhSachSanPham(undefined, true);
        const sanphams = chuyendoidanhsachsanpham(apiSanPhams);
        setSanPhams(sanphams);
      } catch (error) {
        console.error('Lỗi tải sản phẩm:', error);
      } finally {
        setDangTai(false);
      }
    };

    taidulieu();
  }, []);

  return (
    <S.Container>
      <S.Banner>
        <S.BannerContent>
          <h1>Chào mừng đến với Thiên Long Shop</h1>
          <p>Đồ dùng học tập chất lượng cao</p>
        </S.BannerContent>
      </S.Banner>

      <S.FilterSection>
        <S.FilterTitle>Danh mục sản phẩm</S.FilterTitle>
        <S.FilterButtons>
          {danhMucList.map(dm => (
            <S.FilterButton
              key={dm.id}
              active={false}
              onClick={() => navigate(`/danh-muc/${dm.slug}`)}
            >
              {dm.ten}
            </S.FilterButton>
          ))}
        </S.FilterButtons>
      </S.FilterSection>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>Sản phẩm nổi bật</S.SectionTitle>
        </S.SectionHeader>

        {dangTai ? (
          <S.LoadingText>Đang tải...</S.LoadingText>
        ) : (
          <S.ProductGrid>
            {sanPhams.slice(0, 8).map(sp => (
              <ProductCard key={sp.id} sanPham={sp} />
            ))}
          </S.ProductGrid>
        )}
      </S.Section>
    </S.Container>
  );
};
