import type { SanPhamAPI } from '../../../types';
import * as S from '../QuanLySanPham.styles.ts';

interface Props {
  danhSachHienThi: SanPhamAPI[];
  danhsachloai: { id: number; ten: string }[];
  formatCurrency: (value: number | undefined | null) => string;
  moform: (sanpham?: SanPhamAPI) => void;
  xuLyXemChiTiet: (sanPham: SanPhamAPI) => void;
  xulyxoa: (id: number) => void;
}

export const DanhSachSanPham = ({ danhSachHienThi, danhsachloai, formatCurrency, moform, xuLyXemChiTiet, xulyxoa }: Props) => {
  return (
    <S.Table>
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên sản phẩm</th>
          <th>Loại</th>
          <th>Giá bán</th>
          <th>Giá nhập</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {danhSachHienThi.map(sp => (
          <tr key={sp.sanPham_Id}>
            <td>{sp.maSanPham || '-'}</td>
            <td>
              <S.ProductInfo>
                {sp.hinhAnh && <S.ProductImage src={sp.hinhAnh} alt={sp.tenSanPham} />}
                <span>{sp.tenSanPham}</span>
              </S.ProductInfo>
            </td>
            <td>{danhsachloai.find(l => l.id === sp.loai_Id)?.ten}</td>
            <td>{formatCurrency(sp.giaBan)}</td>
            <td>{formatCurrency(sp.giaNhap)}</td>
            <td><S.Badge $active={sp.trangThai}>{sp.trangThai ? 'Đang bán' : 'Ngừng bán'}</S.Badge></td>
            <td>
              <S.ActionButtons>
                <S.EditButton onClick={() => moform(sp)}>Sửa</S.EditButton>
                <S.EditButton onClick={() => xuLyXemChiTiet(sp)}>Chi tiết</S.EditButton>
                <S.DeleteButton onClick={() => xulyxoa(sp.sanPham_Id)}>Xóa</S.DeleteButton>
              </S.ActionButtons>
            </td>
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};
