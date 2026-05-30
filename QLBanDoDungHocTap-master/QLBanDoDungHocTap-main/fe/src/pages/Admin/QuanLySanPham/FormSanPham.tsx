import type { NhaCungCapAPI, TaoSanPhamRequest, SanPhamAPI } from '../../../types';
import * as S from '../QuanLySanPham.styles.ts';

interface Props {
  hienthiform: boolean;
  sanphamdangchinhsua: SanPhamAPI | null;
  formdulieu: TaoSanPhamRequest;
  dangtai: boolean;
  danhsachloai: { id: number; ten: string }[];
  danhsachnhacungcap: NhaCungCapAPI[];
  dongform: () => void;
  xulyluu: (e: React.FormEvent) => void;
  xulynhap: (field: keyof TaoSanPhamRequest, value: any) => void;
}

export const FormSanPham = ({ hienthiform, sanphamdangchinhsua, formdulieu, dangtai, danhsachloai, danhsachnhacungcap, dongform, xulyluu, xulynhap }: Props) => {
  if (!hienthiform) return null;
  return (
    <S.Modal onClick={dongform}>
      <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <S.ModalHeader>
          <h3>{sanphamdangchinhsua ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h3>
          <S.CloseButton onClick={dongform}>×</S.CloseButton>
        </S.ModalHeader>
        <S.Form onSubmit={xulyluu}>
          <S.FormRow>
            <S.FormGroup>
              <label>Mã sản phẩm</label>
              <input
                type="text"
                value={formdulieu.maSanPham}
                onChange={e => xulynhap('maSanPham', e.target.value)}
                placeholder="VD: SP001"
                maxLength={50}
              />
              <S.HelperText>Tối đa 50 ký tự</S.HelperText>
            </S.FormGroup>
            <S.FormGroup>
              <label>Tên sản phẩm *</label>
              <input
                type="text"
                value={formdulieu.tenSanPham}
                onChange={e => xulynhap('tenSanPham', e.target.value)}
                placeholder="Nhập tên sản phẩm"
                maxLength={200}
                required
              />
              <S.HelperText>{formdulieu.tenSanPham.length}/200 ký tự</S.HelperText>
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup>
              <label>Loại sản phẩm *</label>
              <select
                value={formdulieu.loai_Id}
                onChange={e => xulynhap('loai_Id', parseInt(e.target.value))}
                required
              >
                {danhsachloai.map(loai => (
                  <option key={loai.id} value={loai.id}>{loai.ten}</option>
                ))}
              </select>
            </S.FormGroup>
            <S.FormGroup>
              <label>Nhà cung cấp *</label>
              <select
                value={formdulieu.nhaCungCap_Id}
                onChange={e => xulynhap('nhaCungCap_Id', parseInt(e.target.value))}
                required
              >
                {danhsachnhacungcap.map(ncc => (
                  <option key={ncc.nhaCungCap_Id} value={ncc.nhaCungCap_Id}>{ncc.tenNCC}</option>
                ))}
              </select>
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup>
              <label>Loại chi tiết *</label>
              <input
                type="text"
                value={formdulieu.loaiCon || ''}
                onChange={e => xulynhap('loaiCon', e.target.value)}
                placeholder="VD: Bút bi, Vở kẻ ngang..."
                maxLength={100}
                required
              />
            </S.FormGroup>
            <S.FormGroup>
              <label>Thương hiệu *</label>
              <input
                type="text"
                value={formdulieu.thuongHieu || ''}
                onChange={e => xulynhap('thuongHieu', e.target.value)}
                placeholder="VD: Thiên Long"
                maxLength={100}
                required
              />
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup>
              <label>Màu sắc *</label>
              <input
                type="text"
                value={formdulieu.mauSac || ''}
                onChange={e => xulynhap('mauSac', e.target.value)}
                placeholder="VD: Xanh dương"
                maxLength={50}
                required
              />
            </S.FormGroup>
            <S.FormGroup>
              <label>Hình ảnh</label>
              <input
                type="text"
                value={formdulieu.hinhAnh || ''}
                onChange={e => xulynhap('hinhAnh', e.target.value)}
                placeholder="Dán URL ảnh sản phẩm"
              />
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup>
              <label>Giá bán *</label>
              <input
                type="number"
                value={formdulieu.giaBan}
                onChange={e => xulynhap('giaBan', Number(e.target.value))}
                min={0}
                required
              />
            </S.FormGroup>
            <S.FormGroup>
              <label>Giá nhập *</label>
              <input
                type="number"
                value={formdulieu.giaNhap}
                onChange={e => xulynhap('giaNhap', Number(e.target.value))}
                min={0}
                required
              />
            </S.FormGroup>
          </S.FormRow>

          <S.FormGroup>
            <label>Mô tả</label>
            <textarea
              value={formdulieu.moTa || ''}
              onChange={e => xulynhap('moTa', e.target.value)}
              placeholder="Nhập mô tả sản phẩm"
              rows={4}
            />
          </S.FormGroup>

          <S.FormActions>
            <S.CancelButton type="button" onClick={dongform}>Hủy</S.CancelButton>
            <S.SubmitButton type="submit" disabled={dangtai}>{dangtai ? 'Đang lưu...' : 'Lưu'}</S.SubmitButton>
          </S.FormActions>
        </S.Form>
      </S.ModalContent>
    </S.Modal>
  );
};
