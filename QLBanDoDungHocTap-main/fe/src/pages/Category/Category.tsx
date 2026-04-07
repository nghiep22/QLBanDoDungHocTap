import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham } from '../../types';
import { dichVuApi } from '../../services/api';
import { chuyendoidanhsachsanpham, layloaiidtuslug, laytenloaituid } from '../../utils/sanpham';
import * as S from './styles';

export const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [dangTai, setDangTai] = useState(true);

  const loaiId = slug ? layloaiidtuslug(slug) : undefined;
  const tenLoai = loaiId ? laytenloaituid(loaiId) : 'Tất cả sản phẩm';

  useEffect(() => {
    const taidulieu = async () => {
      setDangTai(true);
      try {
        const apiSanPhams = await dichVuApi.layDanhSachSanPham(loaiId, true);
        const sanphams = chuyendoidanhsachsanpham(apiSanPhams);
        setSanPhams(sanphams);
      } catch (error) {
        console.error('Lỗi tải sản phẩm:', error);
      } finally {
        setDangTai(false);
      }
    };

    taidulieu();
  }, [slug, loaiId]);

  if (slug && !loaiId) {
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
          <h1>{tenLoai}</h1>
          <p>Sản phẩm chất lượng cao</p>
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
