import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SanPham } from '../../types';
import { dichVuApi } from '../../services/api';
import { chuyendoidanhsachsanpham } from '../../utils/sanpham';
import { duLieuSanPhamTinh } from '../../data/staticProducts';
import * as S from '../Category/styles';

const useQuery = () => new URLSearchParams(useLocation().search);

export const SearchResults = () => {
  const query = useQuery();
  const tuKhoa = query.get('search')?.trim() || '';
  const [sanPhams, setSanPhams] = useState<SanPham[]>([]);
  const [dangTai, setDangTai] = useState(true);

  useEffect(() => {
    const taidulieu = async () => {
      setDangTai(true);
      try {
        const apiSanPhams = await dichVuApi.layDanhSachSanPham(undefined, true);
        const danhSachTong = [...apiSanPhams, ...duLieuSanPhamTinh];
        const danhSachKhongTrung = Array.from(new Map(danhSachTong.map((sp) => [sp.sanPham_Id, sp])).values());
        setSanPhams(chuyendoidanhsachsanpham(danhSachKhongTrung));
      } catch (error) {
        console.error('Lỗi tải danh sách tìm kiếm:', error);
      } finally {
        setDangTai(false);
      }
    };

    taidulieu();
  }, []);

  const ketQua = useMemo(() => {
    const key = tuKhoa.toLowerCase();
    if (!key) return sanPhams;

    return sanPhams.filter((sp) =>
      [sp.ten.toLowerCase(), sp.ma.toLowerCase(), (sp.thuongHieu || '').toLowerCase(), (sp.loaiCon || '').toLowerCase()]
        .some((value) => value.includes(key))
    );
  }, [sanPhams, tuKhoa]);

  return (
    <S.PageWrap>
      <S.Container>
        <S.Breadcrumb>
          <span>Trang chủ</span>
          <span>/</span>
          <strong>Tìm kiếm</strong>
        </S.Breadcrumb>

        <S.Layout>
          <S.Sidebar>
            <S.FilterCard>
              <S.FilterTitle>Từ khóa</S.FilterTitle>
              <p>{tuKhoa || 'Chưa nhập từ khóa'}</p>
            </S.FilterCard>
            <S.FilterCard>
              <S.FilterTitle>Gợi ý</S.FilterTitle>
              <p>Nhập tên, mã SP hoặc thương hiệu để tìm sản phẩm.</p>
            </S.FilterCard>
          </S.Sidebar>

          <S.MainContent>
            <S.TopRow>
              <div>
                <S.CategoryTitle>Kết quả tìm kiếm</S.CategoryTitle>
                <S.ProductCount>{ketQua.length} sản phẩm</S.ProductCount>
              </div>
            </S.TopRow>

            {dangTai ? (
              <S.LoadingText>Đang tải...</S.LoadingText>
            ) : ketQua.length === 0 ? (
              <S.EmptyMessage>Không tìm thấy sản phẩm phù hợp</S.EmptyMessage>
            ) : (
              <S.ProductGrid>
                {ketQua.map((sp) => (
                  <ProductCard key={sp.id} sanPham={sp} />
                ))}
              </S.ProductGrid>
            )}
          </S.MainContent>
        </S.Layout>
      </S.Container>
    </S.PageWrap>
  );
};
