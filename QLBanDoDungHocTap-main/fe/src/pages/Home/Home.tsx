import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham, LoaiSanPham } from '../../types';
import { mockSanPhams } from '../../data/products';
import * as S from './styles';

const danhMucList: (LoaiSanPham & { slug: string })[] = [
  { id: 1, ten: 'Bút viết', slug: 'but-viet' },
  { id: 2, ten: 'Văn phòng phẩm', slug: 'van-phong-pham' },
  { id: 3, ten: 'Dụng cụ học tập', slug: 'dung-cu-hoc-tap' },
  { id: 4, ten: 'Mỹ thuật', slug: 'my-thuat' },
  { id: 5, ten: 'Giấy in', slug: 'giay-in' },
  { id: 6, ten: 'Bút cao cấp', slug: 'but-cao-cap' },
];

export const Home = () => {
  const navigate = useNavigate();
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [dangTai, setDangTai] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSanPhams(mockSanPhams);
      setDangTai(false);
    }, 500);
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
