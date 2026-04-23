import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham } from '../../types';
import { dichVuApi } from '../../services/api';
import { chuyendoidanhsachsanpham, layloaiidtuslug, laytenloaituid } from '../../utils/sanpham';
import { danhMucTinhTheoSlug, timMauTheoHexHoacTen } from '../../data/categoryData';
import { duLieuSanPhamTinh } from '../../data/staticProducts';
import * as S from './styles';

type KieuSapXep = 'default' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';

export const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [dangTai, setDangTai] = useState(true);
  const [thuongHieuDaChon, setThuongHieuDaChon] = useState<string[]>([]);
  const [loaiDaChon, setLoaiDaChon] = useState<string[]>([]);
  const [giaDaChon, setGiaDaChon] = useState<string[]>([]);
  const [mauDaChon, setMauDaChon] = useState<string[]>([]);
  const [kieuSapXep, setKieuSapXep] = useState<KieuSapXep>('default');

  const loaiId = slug ? layloaiidtuslug(slug) : undefined;
  const tenLoai = loaiId ? laytenloaituid(loaiId) : 'Tất cả sản phẩm';
  const duLieuTinh = slug ? danhMucTinhTheoSlug[slug] : undefined;

  useEffect(() => {
    const taidulieu = async () => {
      setDangTai(true);
      try {
        const apiSanPhams = await dichVuApi.layDanhSachSanPham(loaiId, true);
        const danhSachTong = [
          ...apiSanPhams,
          ...duLieuSanPhamTinh.filter((sp) => !loaiId || sp.loai_Id === loaiId),
        ];
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
  }, [slug, loaiId]);

  useEffect(() => {
    setThuongHieuDaChon([]);
    setLoaiDaChon([]);
    setGiaDaChon([]);
    setMauDaChon([]);
    setKieuSapXep('default');
  }, [slug]);

  const sanPhamBoSungMeta = useMemo(() => {
    return sanPhams.map((sp) => ({
      ...sp,
      thuongHieuGan: sp.thuongHieu || 'Khác',
      loaiGan: sp.loaiCon || 'Khác',
      mauGan: timMauTheoHexHoacTen(sp.mauSac)?.hex || sp.mauSac || '',
    }));
  }, [sanPhams]);

  const sanPhamDaLoc = useMemo(() => {
    let ketQua = [...sanPhamBoSungMeta];

    if (thuongHieuDaChon.length > 0) {
      ketQua = ketQua.filter((sp) => thuongHieuDaChon.includes(sp.thuongHieuGan));
    }

    if (loaiDaChon.length > 0) {
      ketQua = ketQua.filter((sp) => loaiDaChon.includes(sp.loaiGan));
    }

    if (giaDaChon.length > 0 && duLieuTinh) {
      ketQua = ketQua.filter((sp) =>
        giaDaChon.some((id) => {
          const khoangGia = duLieuTinh.priceRanges.find((item) => item.id === id);
          if (!khoangGia) return false;
          const hopMin = khoangGia.min === undefined || sp.giaBan >= khoangGia.min;
          const hopMax = khoangGia.max === undefined || sp.giaBan < khoangGia.max;
          return hopMin && hopMax;
        })
      );
    }

    if (mauDaChon.length > 0) {
      ketQua = ketQua.filter((sp) => mauDaChon.includes(sp.mauGan));
    }

    switch (kieuSapXep) {
      case 'name-asc':
        ketQua.sort((a, b) => a.ten.localeCompare(b.ten, 'vi'));
        break;
      case 'name-desc':
        ketQua.sort((a, b) => b.ten.localeCompare(a.ten, 'vi'));
        break;
      case 'price-asc':
        ketQua.sort((a, b) => a.giaBan - b.giaBan);
        break;
      case 'price-desc':
        ketQua.sort((a, b) => b.giaBan - a.giaBan);
        break;
      case 'newest':
        ketQua.sort((a, b) => b.id - a.id);
        break;
    }

    return ketQua;
  }, [duLieuTinh, giaDaChon, kieuSapXep, loaiDaChon, mauDaChon, sanPhamBoSungMeta, thuongHieuDaChon]);

  const toggleItem = (value: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const xoaTatCaBoLoc = () => {
    setThuongHieuDaChon([]);
    setLoaiDaChon([]);
    setGiaDaChon([]);
    setMauDaChon([]);
    setKieuSapXep('default');
  };

  if (slug && !loaiId) {
    return (
      <S.Container>
        <S.ErrorMessage>Không tìm thấy danh mục</S.ErrorMessage>
      </S.Container>
    );
  }

  return (
    <S.PageWrap>
      <S.Container>
        <S.Breadcrumb>
          <span>Trang chủ</span>
          <span>/</span>
          <span>Danh mục</span>
          <span>/</span>
          <strong>{tenLoai}</strong>
        </S.Breadcrumb>

        <S.Layout>
          <S.Sidebar>
              <S.FilterCard>
                <S.FilterTitle>Loại sản phẩm</S.FilterTitle>
                <S.FilterList>
                  {(duLieuTinh?.productTypes || []).map((item) => {
                    const soLuong = sanPhams.filter((sp) => sp.loaiCon === item).length;
                    return (
                      <S.FilterOption key={item}>
                        <input
                          type="checkbox"
                          checked={loaiDaChon.includes(item)}
                          onChange={() => toggleItem(item, loaiDaChon, setLoaiDaChon)}
                        />
                        <span>{item}{soLuong > 0 ? ` (${soLuong})` : ''}</span>
                      </S.FilterOption>
                    );
                  })}
                </S.FilterList>
              </S.FilterCard>


              <S.FilterCard>
                <S.FilterTitle>Thương hiệu</S.FilterTitle>
                <S.FilterList>
                  {(duLieuTinh?.brands || []).map((item) => {
                    const soLuong = sanPhams.filter((sp) => sp.thuongHieu === item).length;
                    return (
                      <S.FilterOption key={item}>
                        <input
                          type="checkbox"
                          checked={thuongHieuDaChon.includes(item)}
                          onChange={() => toggleItem(item, thuongHieuDaChon, setThuongHieuDaChon)}
                        />
                        <span>{item}{soLuong > 0 ? ` (${soLuong})` : ''}</span>
                      </S.FilterOption>
                    );
                  })}
                </S.FilterList>
              </S.FilterCard>


            <S.FilterCard>
              <S.FilterTitle>Mức giá</S.FilterTitle>
              <S.FilterList>
                {(duLieuTinh?.priceRanges || []).map((item) => (
                  <S.FilterOption key={item.id}>
                    <input
                      type="checkbox"
                      checked={giaDaChon.includes(item.id)}
                      onChange={() => toggleItem(item.id, giaDaChon, setGiaDaChon)}
                    />
                    <span>{item.label}</span>
                  </S.FilterOption>
                ))}
              </S.FilterList>
            </S.FilterCard>

            <S.FilterCard>
              <S.FilterTitle>Màu sắc</S.FilterTitle>
              <S.ColorGrid>
                {(duLieuTinh?.colors || []).map((item) => (
                  <S.ColorSwatch
                    key={item.hex}
                    type="button"
                    title={item.name}
                    aria-label={item.name}
                    $color={item.hex}
                    $active={mauDaChon.includes(item.hex)}
                    onClick={() => toggleItem(item.hex, mauDaChon, setMauDaChon)}
                  />
                ))}
              </S.ColorGrid>

              <S.FilterActions>
                <S.FilterActionButton type="button" $primary onClick={xoaTatCaBoLoc}>
                  Xóa bộ lọc
                </S.FilterActionButton>
              </S.FilterActions>
            </S.FilterCard>
          </S.Sidebar>

          <S.MainContent>
            <S.Banner style={{ backgroundImage: `url('${duLieuTinh?.bannerImage || ''}')` }} />

            <S.Section>
              <S.TopRow>
                <div>
                  <S.CategoryTitle>{duLieuTinh?.title || tenLoai}</S.CategoryTitle>
                  <S.ProductCount>{sanPhamDaLoc.length} sản phẩm</S.ProductCount>
                </div>
                <S.SortBar>
                  <span>Sắp xếp:</span>
                  <S.SortButton type="button" $active={kieuSapXep === 'name-asc'} onClick={() => setKieuSapXep('name-asc')}>Tên A → Z</S.SortButton>
                  <S.SortButton type="button" $active={kieuSapXep === 'name-desc'} onClick={() => setKieuSapXep('name-desc')}>Tên Z → A</S.SortButton>
                  <S.SortButton type="button" $active={kieuSapXep === 'price-asc'} onClick={() => setKieuSapXep('price-asc')}>Giá tăng dần</S.SortButton>
                  <S.SortButton type="button" $active={kieuSapXep === 'price-desc'} onClick={() => setKieuSapXep('price-desc')}>Giá giảm dần</S.SortButton>
                  <S.SortButton type="button" $active={kieuSapXep === 'newest'} onClick={() => setKieuSapXep('newest')}>Hàng mới</S.SortButton>
                </S.SortBar>
              </S.TopRow>

              {dangTai ? (
                <S.LoadingText>Đang tải...</S.LoadingText>
              ) : sanPhamDaLoc.length === 0 ? (
                <S.EmptyMessage>
                  Không có sản phẩm phù hợp với bộ lọc hiện tại
                </S.EmptyMessage>
              ) : (
                <S.ProductGrid>
                  {sanPhamDaLoc.slice(0, 4).map(sp => (
                    <ProductCard key={sp.id} sanPham={sp} />
                  ))}
                </S.ProductGrid>
              )}

              <S.BottomLinks>
                <S.ViewAllLink to="/">← Quay về trang chủ</S.ViewAllLink>
              </S.BottomLinks>
            </S.Section>
          </S.MainContent>
        </S.Layout>
      </S.Container>
    </S.PageWrap>
  );
};
