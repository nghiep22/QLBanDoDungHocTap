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

const danhMucNoiBat = [
  'Top Sale',
  'Trạm thư Namikokoro',
  'Sản phẩm mới',
  'Cẩm nang ưu đãi',
  'Thư viện Thiên Long',
  'Kiểm tra đơn hàng',
  'Giải pháp in ấn',
  'Văn phòng phẩm doanh nghiệp',
];

const chuyenTrang: Array<{
  title: string;
  subtitle: string;
  accent: 'blue' | 'red' | 'yellow' | 'green';
}> = [
  { title: 'Chuyên trang học cụ', subtitle: 'Máy tính, tập vở, ba lô, combo học tập', accent: 'blue' },
  { title: 'Thiên Long bút viết', subtitle: 'Bút gel, bút bi, bút máy, bút xóa', accent: 'red' },
  { title: 'Mỹ thuật sáng tạo', subtitle: 'Bút lông màu, màu nước, sáp màu, acrylic', accent: 'yellow' },
  { title: 'Giấy in cao cấp', subtitle: 'A3, A4, IK Copy, Copy Plus', accent: 'green' },
];

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
      <S.HeroGrid>
        <S.Banner>
          <S.BannerContent>
            <S.BadgeLabel>Inspired by thienlong.vn</S.BadgeLabel>
            <h1>{heroSlides[0].title}</h1>
            <p>{heroSlides[0].description}</p>
            <S.HeroActions>
              <S.PrimaryAction onClick={() => navigate('/danh-muc/van-phong-pham')}>
                {heroSlides[0].button}
              </S.PrimaryAction>
              <S.SecondaryAction onClick={() => navigate('/gio-hang')}>
                Xem giỏ hàng
              </S.SecondaryAction>
            </S.HeroActions>
          </S.BannerContent>
        </S.Banner>

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
          <S.SectionTitle>Danh mục nổi bật</S.SectionTitle>
          <S.SectionText>Mô phỏng các lối tắt nội dung nổi bật từ trang tham chiếu.</S.SectionText>
        </S.SectionHeader>
        <S.QuickCategoryGrid>
          {danhMucNoiBat.map((item, index) => (
            <S.QuickCategoryCard key={item}>
              <S.QuickCategoryIcon>{index + 1}</S.QuickCategoryIcon>
              <div>
                <h3>{item}</h3>
                <p>Khối nội dung nổi bật giúp người dùng truy cập nhanh hơn.</p>
              </div>
            </S.QuickCategoryCard>
          ))}
        </S.QuickCategoryGrid>
      </S.QuickCategorySection>

      <S.Section>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Sản phẩm nổi bật</S.SectionTitle>
            <S.SectionText>Một số sản phẩm đang có trong hệ thống của bạn.</S.SectionText>
          </div>
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

      <S.ShowcaseSection>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Chuyên trang nổi bật</S.SectionTitle>
            <S.SectionText>Các khối nội dung lớn giống cấu trúc trang chủ Thiên Long.</S.SectionText>
          </div>
        </S.SectionHeader>
        <S.ShowcaseGrid>
          {chuyenTrang.map((item) => (
            <S.ShowcaseCard key={item.title} $accent={item.accent}>
              <span>Chuyên trang</span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </S.ShowcaseCard>
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
