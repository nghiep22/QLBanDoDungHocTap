import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham, LoaiSanPham } from '../../types';
import { dichVuApi } from '../../services/api';
import { chuyendoidanhsachsanpham, danhsachloaisanpham } from '../../utils/sanpham';
import { duLieuSanPhamTinh } from '../../data/staticProducts';
import * as S from './styles';

const danhMucList: (LoaiSanPham & { slug: string })[] = danhsachloaisanpham.map(l => ({
  id: l.id,
  ten: l.ten,
  slug: l.slug,
}));

const heroSlides = [
  {
    title: 'Thiên Long Shop - Đồ dùng học tập & văn phòng phẩm',
    description: 'Mô phỏng cảm hứng từ thienlong.vn với không gian mua sắm hiện đại, ưu đãi nổi bật và sản phẩm học tập chất lượng.',
    button: 'Khám phá ngay',
  },
  {
    title: 'Chuyên trang học cụ, mỹ thuật và giấy in',
    description: 'Tập trung các dòng sản phẩm được yêu thích cho học sinh, sinh viên, giáo viên và dân văn phòng.',
    button: 'Xem danh mục',
  },
  {
    title: 'Ưu đãi theo mùa và bộ sưu tập nổi bật',
    description: 'Hiển thị các khối nội dung nổi bật như Top Sale, sản phẩm mới, bài viết hay và chuyên trang khuyến mãi.',
    button: 'Xem ưu đãi',
  },
];

const bannerNoiBat = {
  title: 'Sản phẩm cao cấp',
  image: 'https://cdn.hstatic.net/files/1000230347/collection/1920_x_600___cta__2_6bdac017615d4613955045ae760a0259_1024x1024.jpg',
};

const chuyenTrang = [
  {
    title: 'Chuyên trang học cụ',
    image: 'https://cdn.hstatic.net/files/1000230347/file/1920x600__15_.webp',
  },
  {
    title: 'Thiên Long bút viết',
    image: 'https://cdn.hstatic.net/files/1000230347/file/1920_x_600___cta__2.webp',
  },
  {
    title: 'Mỹ thuật sáng tạo',
    image: 'https://cdn.hstatic.net/files/1000230347/file/1920x600__16_.webp',
  },
];

const soSanPhamMoiMuc = 4;

const baiVietNoiBat = [
  {
    title: 'Ngày Sách và Văn hoá đọc Việt Nam 21/04',
    date: '17/04/2026',
    excerpt: 'Nền tảng nuôi dưỡng tri thức trong đời sống hiện đại và cảm hứng đọc sách mỗi ngày.',
  },
  {
    title: 'Cách sơ cứu tinh thần nhanh - đơn giản - kín đáo',
    date: '03/04/2026',
    excerpt: 'Một vài gợi ý nhỏ để cân bằng cảm xúc trong học tập và công việc bận rộn.',
  },
  {
    title: 'Giải mã những con số GSM phía sau từng tờ giấy',
    date: '16/03/2026',
    excerpt: 'Hiểu đúng độ dày giấy để chọn giấy in, giấy học tập và giấy văn phòng phù hợp.',
  },
];

const sanPhamTieuBieu = [
  { ten: 'Combo 5 Ream giấy A4 70 gsm IK Copy', gia: '382,500₫' },
  { ten: 'Máy tính khoa học Thiên Long Flexio Fx799VN', gia: '556,800₫' },
  { ten: 'Combo 10 Bút gel Minimalist GEL-071', gia: '102,000₫' },
  { ten: 'Cặp học sinh Strive Thiên Long', gia: '227,700₫' },
  { ten: 'Combo 10 Bút gel Joyee GEL-067', gia: '58,000₫' },
  { ten: 'Máy tính văn phòng Thiên Long Flexio CAL-011', gia: '155,000₫' },
];

export const Home = () => {
  const navigate = useNavigate();
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [dangTai, setDangTai] = useState(true);

  useEffect(() => {
    const taidulieu = async () => {
      try {
        const apiSanPhams = await dichVuApi.layDanhSachSanPham(undefined, true);
        const danhSachTong = [...apiSanPhams, ...duLieuSanPhamTinh];
        const danhSachKhongTrung = Array.from(new Map(danhSachTong.map((sp) => [sp.sanPham_Id, sp])).values());
        const sanphams = chuyendoidanhsachsanpham(danhSachKhongTrung);
        setSanPhams(sanphams);
      } catch (error) {
        console.error('Lỗi tải sản phẩm:', error);
      } finally {
        setDangTai(false);
      }
    };

    taidulieu();
  }, []);

  const sanPhamTheoDanhMuc = useMemo(() => {
    return danhMucList.map((danhMuc) => {
      const danhSach = sanPhams.filter((sp) => sp.loaiId === danhMuc.id);
      return {
        ...danhMuc,
        sanPhamNoiBat: danhSach.slice(0, soSanPhamMoiMuc),
        sanPhamThuGon: danhSach.slice(soSanPhamMoiMuc),
      };
    }).filter((danhMuc) => danhMuc.sanPhamNoiBat.length > 0);
  }, [sanPhams]);

  return (
    <S.Container>
      <S.HeroGrid>
        <S.Banner />

        <S.SideHighlights>
          {heroSlides.slice(1).map((item) => (
            <S.HighlightCard key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </S.HighlightCard>
          ))}
        </S.SideHighlights>
      </S.HeroGrid>

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

      <S.QuickCategorySection>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Danh mục nổi bật</S.SectionTitle>
            <S.SectionText>Thay thế danh sách mô phỏng bằng banner tham chiếu từ Thiên Long.</S.SectionText>
          </div>
        </S.SectionHeader>
        <S.FeatureBannerCard>
          <img src={bannerNoiBat.image} alt={bannerNoiBat.title} />
        </S.FeatureBannerCard>
      </S.QuickCategorySection>

      <S.Section>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Sản phẩm theo từng mục</S.SectionTitle>
            <S.SectionText>Mỗi mục hiển thị 4 sản phẩm, các sản phẩm còn lại được thu gọn ngay bên dưới mục đó.</S.SectionText>
          </div>
        </S.SectionHeader>

        {dangTai ? (
          <S.LoadingText>Đang tải...</S.LoadingText>
        ) : (
          <S.ProductSectionStack>
            {sanPhamTheoDanhMuc.map((danhMuc, index) => (
              <S.ProductCategoryBlock key={danhMuc.id}>
                <S.CategoryBlockHeader>
                  <div>
                    <S.CategoryBlockTitle>{danhMuc.ten}</S.CategoryBlockTitle>
                    <S.CategoryBlockSubtitle>{danhMuc.sanPhamNoiBat.length + danhMuc.sanPhamThuGon.length} sản phẩm</S.CategoryBlockSubtitle>
                  </div>
                </S.CategoryBlockHeader>

                <S.ProductGrid>
                  {danhMuc.sanPhamNoiBat.map((sp) => (
                    <ProductCard key={sp.id} sanPham={sp} />
                  ))}
                </S.ProductGrid>

                {danhMuc.sanPhamThuGon.length > 0 && (
                  <S.CollapsibleSection>
                    <details>
                      <summary>Xem thêm {danhMuc.sanPhamThuGon.length} sản phẩm của mục {danhMuc.ten}</summary>
                      <S.CollapsibleContent>
                        <S.ProductGrid>
                          {danhMuc.sanPhamThuGon.map((sp) => (
                            <ProductCard key={sp.id} sanPham={sp} />
                          ))}
                        </S.ProductGrid>
                      </S.CollapsibleContent>
                    </details>
                  </S.CollapsibleSection>
                )}

                {chuyenTrang[index % chuyenTrang.length] && (
                  <S.ProductInlineBanner>
                    <img
                      src={chuyenTrang[index % chuyenTrang.length].image}
                      alt={chuyenTrang[index % chuyenTrang.length].title}
                    />
                  </S.ProductInlineBanner>
                )}
              </S.ProductCategoryBlock>
            ))}
          </S.ProductSectionStack>
        )}
      </S.Section>

      <S.ShowcaseSection>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Chuyên trang nổi bật</S.SectionTitle>
            <S.SectionText>Các khối nội dung lớn giống cấu trúc trang chủ Thiên Long.</S.SectionText>
          </div>
        </S.SectionHeader>
        <S.ShowcaseGrid>
          {chuyenTrang.map((item) => (
            <S.ShowcaseImageCard key={item.title}>
              <img src={item.image} alt={item.title} />
            </S.ShowcaseImageCard>
          ))}
        </S.ShowcaseGrid>
      </S.ShowcaseSection>

      <S.InfoSection>
        <S.FeaturePanel>
          <S.SectionHeader>
            <div>
              <S.SectionTitle>Thông tin tham khảo từ homepage</S.SectionTitle>
              <S.SectionText>Những sản phẩm tiêu biểu được đưa vào để tạo cảm giác trang bán hàng đầy đủ hơn.</S.SectionText>
            </div>
          </S.SectionHeader>
          <S.FeatureList>
            {sanPhamTieuBieu.map((item) => (
              <S.FeatureItem key={item.ten}>
                <div>
                  <h4>{item.ten}</h4>
                  <p>Sản phẩm tiêu biểu từ nội dung tham chiếu</p>
                </div>
                <strong>{item.gia}</strong>
              </S.FeatureItem>
            ))}
          </S.FeatureList>
        </S.FeaturePanel>

        <S.BlogPanel>
          <S.SectionHeader>
            <div>
              <S.SectionTitle>Thư viện Thiên Long</S.SectionTitle>
              <S.SectionText>Mô phỏng khu vực blog / bài viết nổi bật.</S.SectionText>
            </div>
          </S.SectionHeader>
          <S.BlogList>
            {baiVietNoiBat.map((item) => (
              <S.BlogCard key={item.title}>
                <span>{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </S.BlogCard>
            ))}
          </S.BlogList>
        </S.BlogPanel>
      </S.InfoSection>
    </S.Container>
  );
};
