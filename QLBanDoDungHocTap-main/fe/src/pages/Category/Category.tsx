import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham } from '../../types';
import { mockSanPhams } from '../../data/products';
import * as S from './styles';

interface CategoryInfo {
  id: number;
  ten: string;
  moTa: string;
}

const danhMucMap: { [key: string]: CategoryInfo } = {
  'but-viet': { id: 1, ten: 'Bút viết', moTa: 'Bút bi, bút gel, bút mực các loại' },
  'van-phong-pham': { id: 2, ten: 'Văn phòng phẩm', moTa: 'Giấy, bìa, kẹp tài liệu' },
  'dung-cu-hoc-tap': { id: 3, ten: 'Dụng cụ học tập', moTa: 'Thước, compa, bút chì kỹ thuật' },
  'my-thuat': { id: 4, ten: 'Mỹ thuật', moTa: 'Màu vẽ, cọ, giấy vẽ' },
  'giay-in': { id: 5, ten: 'Giấy in', moTa: 'Giấy A4, A3, giấy ảnh' },
  'but-cao-cap': { id: 6, ten: 'Bút cao cấp', moTa: 'Bút ký, bút máy cao cấp' },
};

export const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [dangTai, setDangTai] = useState(true);

  const categoryInfo = slug ? danhMucMap[slug] : null;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (categoryInfo) {
        const filtered = mockSanPhams.filter(sp => sp.loaiId === categoryInfo.id);
        setSanPhams(filtered);
      } else {
        setSanPhams(mockSanPhams);
      }
      setDangTai(false);
    }, 500);
  }, [slug, categoryInfo]);

  if (!categoryInfo) {
    return (
      <S.Container>
        <S.ErrorMessage>Không tìm thấy danh mục</S.ErrorMessage>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Banner>
        <S.BannerContent>
          <h1>{categoryInfo.ten}</h1>
          <p>{categoryInfo.moTa}</p>
        </S.BannerContent>
      </S.Banner>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>
            {sanPhams.length} sản phẩm
          </S.SectionTitle>
          <S.ViewAllLink to="/">← Quay về trang chủ</S.ViewAllLink>
        </S.SectionHeader>

        {dangTai ? (
          <S.LoadingText>Đang tải...</S.LoadingText>
        ) : sanPhams.length === 0 ? (
          <S.EmptyMessage>
            Danh mục này chưa có sản phẩm
          </S.EmptyMessage>
        ) : (
          <S.ProductGrid>
            {sanPhams.map(sp => (
              <ProductCard key={sp.id} sanPham={sp} />
            ))}
          </S.ProductGrid>
        )}
      </S.Section>
    </S.Container>
  );
};
