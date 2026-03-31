import { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham, LoaiSanPham } from '../../types';
import { mockSanPhams } from '../../data/products';
import * as S from './styles';

const mockLoais: LoaiSanPham[] = [
  { id: 0, ten: 'Tất cả' },
  { id: 1, ten: 'Bút viết' },
  { id: 2, ten: 'Văn phòng phẩm' },
  { id: 3, ten: 'Dụng cụ học tập' },
  { id: 4, ten: 'Mỹ thuật' },
];

export const Home = () => {
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [loaiDaChon, setLoaiDaChon] = useState(0);
  const [dangTai, setDangTai] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSanPhams(mockSanPhams);
      setDangTai(false);
    }, 500);
  }, []);

  const sanPhamLoc = loaiDaChon === 0 
    ? sanPhams 
    : sanPhams.filter(sp => sp.loaiId === loaiDaChon);

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
          {mockLoais.map(loai => (
            <S.FilterButton
              key={loai.id}
              active={loaiDaChon === loai.id}
              onClick={() => setLoaiDaChon(loai.id)}
            >
              {loai.ten}
            </S.FilterButton>
          ))}
        </S.FilterButtons>
      </S.FilterSection>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>Sản phẩm nổi bật</S.SectionTitle>
          <S.ViewAllLink to="/san-pham">Xem tất cả →</S.ViewAllLink>
        </S.SectionHeader>

        {dangTai ? (
          <S.LoadingText>Đang tải...</S.LoadingText>
        ) : (
          <S.ProductGrid>
            {sanPhamLoc.map(sp => (
              <ProductCard key={sp.id} sanPham={sp} />
            ))}
          </S.ProductGrid>
        )}
      </S.Section>
    </S.Container>
  );
};
