import type { SanPhamAPI } from '../../../types';
import * as S from '../QuanLySanPham.styles.ts';

interface Props {
  hienThiChiTiet: boolean;
  dangTaiChiTiet: boolean;
  sanPhamChiTiet: SanPhamAPI | null;
  danhsachloai: { id: number; ten: string }[];
  formatCurrency: (value: number | undefined | null) => string;
  dongChiTiet: () => void;
}

export const ChiTietSanPham = ({ hienThiChiTiet, dangTaiChiTiet, sanPhamChiTiet, danhsachloai, formatCurrency, dongChiTiet }: Props) => {
  if (!hienThiChiTiet) return null;
  return (
    <S.Modal onClick={dongChiTiet}>
      <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <S.ModalHeader>
          <h3>Chi tiết sản phẩm</h3>
          <S.CloseButton onClick={dongChiTiet}>×</S.CloseButton>
        </S.ModalHeader>
        <div style={{ padding: '20px' }}>
          {dangTaiChiTiet && <S.Loading>Đang tải chi tiết...</S.Loading>}
          {!dangTaiChiTiet && sanPhamChiTiet && (
            <div style={{ display: 'grid', gap: 12 }}>
              {sanPhamChiTiet.hinhAnh && <img src={sanPhamChiTiet.hinhAnh} alt={sanPhamChiTiet.tenSanPham} style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 8 }} />}
              <p><strong>Mã SP:</strong> {sanPhamChiTiet.maSanPham || '-'}</p>
              <p><strong>Tên SP:</strong> {sanPhamChiTiet.tenSanPham}</p>
              <p><strong>Loại:</strong> {danhsachloai.find(l => l.id === sanPhamChiTiet.loai_Id)?.ten || '-'}</p>
              <p><strong>Thương hiệu:</strong> {sanPhamChiTiet.thuongHieu || '-'}</p>
              <p><strong>Màu sắc:</strong> {sanPhamChiTiet.mauSac || '-'}</p>
              <p><strong>Giá bán:</strong> {formatCurrency(sanPhamChiTiet.giaBan)}</p>
              <p><strong>Giá nhập:</strong> {formatCurrency(sanPhamChiTiet.giaNhap)}</p>
              <p><strong>Trạng thái:</strong> {sanPhamChiTiet.trangThai ? 'Đang bán' : 'Ngừng bán'}</p>
              <p><strong>Mô tả:</strong> {sanPhamChiTiet.moTa || 'Chưa có mô tả'}</p>
            </div>
          )}
        </div>
      </S.ModalContent>
    </S.Modal>
  );
};
