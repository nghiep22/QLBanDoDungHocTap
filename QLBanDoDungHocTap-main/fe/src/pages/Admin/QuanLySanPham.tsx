import { useState, useEffect, useMemo } from 'react';
import { dichVuApi } from '../../services/api';
import type { SanPhamAPI, TaoSanPhamRequest, CapNhatSanPhamRequest, NhaCungCapAPI } from '../../types';
import { layDanhMucTheoLoaiId, timMauTheoHexHoacTen } from '../../data/categoryData';
import * as S from './QuanLySanPham.styles.ts';

export const QuanLySanPham = () => {
  const [danhsachsanpham, setDanhsachsanpham] = useState<SanPhamAPI[]>([]);
  const [danhsachnhacungcap, setDanhsachnhacungcap] = useState<NhaCungCapAPI[]>([]);
  const [dangtai, setDangtai] = useState(false);
  const [hienthiform, setHienthiform] = useState(false);
  const [sanphamdangchinhsua, setSanphamdangchinhsua] = useState<SanPhamAPI | null>(null);
  const [thongbao, setThongbao] = useState<{ loai: 'thanh_cong' | 'loi'; noidung: string } | null>(null);

  // Form data
  const [formdulieu, setFormdulieu] = useState<TaoSanPhamRequest>({
    loai_Id: 1,
    nhaCungCap_Id: 1,
    maSanPham: '',
    tenSanPham: '',
    moTa: '',
    giaBan: 0,
    giaNhap: 0,
    hinhAnh: '',
    loaiCon: '',
    thuongHieu: '',
    mauSac: '',
  });

  // Danh sách loại sản phẩm (hardcode từ database)
  const danhsachloai = [
    { id: 1, ten: 'Văn phòng phẩm' },
    { id: 2, ten: 'Sách & Vở' },
    { id: 3, ten: 'Dụng cụ vẽ' },
    { id: 4, ten: 'Ba lô & Túi' },
    { id: 5, ten: 'Điện tử học tập' },
  ];

  const danhmucdangchon = useMemo(() => layDanhMucTheoLoaiId(formdulieu.loai_Id), [formdulieu.loai_Id]);

  useEffect(() => {
    taidulieu();
  }, []);

  const taidulieu = async () => {
    setDangtai(true);
    try {
      const [sanpham, nhacungcap] = await Promise.all([
        dichVuApi.layDanhSachSanPham(),
        dichVuApi.layDanhSachNhaCungCap(),
      ]);
      setDanhsachsanpham(sanpham);
      setDanhsachnhacungcap(nhacungcap);
    } catch (error) {
      hienthithongbao('loi', 'Không thể tải dữ liệu');
    } finally {
      setDangtai(false);
    }
  };

  const hienthithongbao = (loai: 'thanh_cong' | 'loi', noidung: string) => {
    setThongbao({ loai, noidung });
    setTimeout(() => setThongbao(null), 3000);
  };

  const moform = (sanpham?: SanPhamAPI) => {
    if (sanpham) {
      setSanphamdangchinhsua(sanpham);
      setFormdulieu({
        loai_Id: sanpham.loai_Id,
        nhaCungCap_Id: sanpham.nhaCungCap_Id,
        maSanPham: sanpham.maSanPham || '',
        tenSanPham: sanpham.tenSanPham,
        moTa: sanpham.moTa || '',
        giaBan: sanpham.giaBan,
        giaNhap: sanpham.giaNhap,
        hinhAnh: sanpham.hinhAnh || '',
        loaiCon: sanpham.loaiCon || '',
        thuongHieu: sanpham.thuongHieu || '',
        mauSac: sanpham.mauSac || '',
      });
    } else {
      setSanphamdangchinhsua(null);
      setFormdulieu({
        loai_Id: 1,
        nhaCungCap_Id: 1,
        maSanPham: '',
        tenSanPham: '',
        moTa: '',
        giaBan: 0,
        giaNhap: 0,
        hinhAnh: '',
        loaiCon: '',
        thuongHieu: '',
        mauSac: '',
      });
    }
    setHienthiform(true);
  };

  const dongform = () => {
    setHienthiform(false);
    setSanphamdangchinhsua(null);
  };

  const xulynhap = (field: keyof TaoSanPhamRequest, value: any) => {
    setFormdulieu(prev => {
      const dulieuMoi = { ...prev, [field]: value };

      if (field === 'loai_Id') {
        const danhMucMoi = layDanhMucTheoLoaiId(value);
        const loaiConHopLe = danhMucMoi?.productTypes.includes(dulieuMoi.loaiCon || '') ? dulieuMoi.loaiCon : (danhMucMoi?.productTypes[0] || '');
        const thuongHieuHopLe = danhMucMoi?.brands.includes(dulieuMoi.thuongHieu || '') ? dulieuMoi.thuongHieu : (danhMucMoi?.brands[0] || '');
        const mauHopLe = timMauTheoHexHoacTen(dulieuMoi.mauSac)?.name;
        const mauMacDinh = danhMucMoi?.colors.some((item) => item.name === mauHopLe) ? mauHopLe : (danhMucMoi?.colors[0]?.name || '');

        return {
          ...dulieuMoi,
          loaiCon: loaiConHopLe,
          thuongHieu: thuongHieuHopLe,
          mauSac: mauMacDinh,
        };
      }

      return dulieuMoi;
    });
  };

  const xulyluu = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formdulieu.loaiCon?.trim()) {
      hienthithongbao('loi', 'Vui lòng chọn loại sản phẩm chi tiết');
      return;
    }

    if (!formdulieu.thuongHieu?.trim()) {
      hienthithongbao('loi', 'Vui lòng chọn thương hiệu');
      return;
    }

    if (!formdulieu.mauSac?.trim()) {
      hienthithongbao('loi', 'Vui lòng chọn màu sắc');
      return;
    }
    
    if (!formdulieu.tenSanPham.trim()) {
      hienthithongbao('loi', 'Vui lòng nhập tên sản phẩm');
      return;
    }

    if (formdulieu.tenSanPham.length > 200) {
      hienthithongbao('loi', 'Tên sản phẩm không được vượt quá 200 ký tự');
      return;
    }

    if (formdulieu.maSanPham && formdulieu.maSanPham.length > 50) {
      hienthithongbao('loi', 'Mã sản phẩm không được vượt quá 50 ký tự');
      return;
    }

    if (formdulieu.giaBan <= 0 || formdulieu.giaNhap <= 0) {
      hienthithongbao('loi', 'Giá bán và giá nhập phải lớn hơn 0');
      return;
    }

    setDangtai(true);
    try {
      if (sanphamdangchinhsua) {
        // Cập nhật
        const dulieucapnhat: CapNhatSanPhamRequest = {
          ...formdulieu,
          trangThai: true,
        };
        await dichVuApi.capNhatSanPham(sanphamdangchinhsua.sanPham_Id, dulieucapnhat);
        hienthithongbao('thanh_cong', 'Cập nhật sản phẩm thành công');
      } else {
        // Tạo mới
        await dichVuApi.taoSanPham(formdulieu);
        hienthithongbao('thanh_cong', 'Thêm sản phẩm thành công');
      }
      dongform();
      taidulieu();
    } catch (error: any) {
      const errorMessage = error.message || 'Có lỗi xảy ra';
      
      // Xử lý các lỗi cụ thể
      if (errorMessage.includes('truncated')) {
        hienthithongbao('loi', 'Dữ liệu nhập vào quá dài. Vui lòng kiểm tra lại.');
      } else if (errorMessage.includes('duplicate') || errorMessage.includes('UNIQUE')) {
        hienthithongbao('loi', 'Mã sản phẩm đã tồn tại. Vui lòng sử dụng mã khác.');
      } else {
        hienthithongbao('loi', errorMessage);
      }
    } finally {
      setDangtai(false);
    }
  };

  const xulyxoa = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    setDangtai(true);
    try {
      await dichVuApi.xoaSanPham(id);
      hienthithongbao('thanh_cong', 'Xóa sản phẩm thành công');
      taidulieu();
    } catch (error: any) {
      hienthithongbao('loi', error.message || 'Không thể xóa sản phẩm');
    } finally {
      setDangtai(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Quản lý sản phẩm</h2>
        <S.Button onClick={() => moform()}>+ Thêm sản phẩm</S.Button>
      </S.Header>

      {thongbao && (
        <S.Thongbao $loai={thongbao.loai}>
          {thongbao.noidung}
        </S.Thongbao>
      )}

      {dangtai && <S.Loading>Đang tải...</S.Loading>}

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
          {danhsachsanpham.map(sp => (
            <tr key={sp.sanPham_Id}>
              <td>{sp.maSanPham || '-'}</td>
              <td>
                <S.ProductInfo>
                  {sp.hinhAnh && <S.ProductImage src={sp.hinhAnh} alt={sp.tenSanPham} />}
                  <span>{sp.tenSanPham}</span>
                </S.ProductInfo>
              </td>
              <td>{danhsachloai.find(l => l.id === sp.loai_Id)?.ten}</td>
              <td>{sp.giaBan.toLocaleString()}đ</td>
              <td>{sp.giaNhap.toLocaleString()}đ</td>
              <td>
                <S.Badge $active={sp.trangThai}>
                  {sp.trangThai ? 'Đang bán' : 'Ngừng bán'}
                </S.Badge>
              </td>
              <td>
                <S.ActionButtons>
                  <S.EditButton onClick={() => moform(sp)}>Sửa</S.EditButton>
                  <S.DeleteButton onClick={() => xulyxoa(sp.sanPham_Id)}>Xóa</S.DeleteButton>
                </S.ActionButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      {hienthiform && (
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
                      <option key={ncc.nhaCungCap_Id} value={ncc.nhaCungCap_Id}>
                        {ncc.tenNCC}
                      </option>
                    ))}
                  </select>
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <label>Loại chi tiết *</label>
                  <select
                    value={formdulieu.loaiCon}
                    onChange={e => xulynhap('loaiCon', e.target.value)}
                    required
                  >
                    <option value="">Chọn loại chi tiết</option>
                    {(danhmucdangchon?.productTypes || []).map((loaiCon) => (
                      <option key={loaiCon} value={loaiCon}>{loaiCon}</option>
                    ))}
                  </select>
                </S.FormGroup>

                <S.FormGroup>
                  <label>Thương hiệu *</label>
                  <select
                    value={formdulieu.thuongHieu}
                    onChange={e => xulynhap('thuongHieu', e.target.value)}
                    required
                  >
                    <option value="">Chọn thương hiệu</option>
                    {(danhmucdangchon?.brands || []).map((thuongHieu) => (
                      <option key={thuongHieu} value={thuongHieu}>{thuongHieu}</option>
                    ))}
                  </select>
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <label>Màu sắc *</label>
                  <select
                    value={formdulieu.mauSac}
                    onChange={e => xulynhap('mauSac', e.target.value)}
                    required
                  >
                    <option value="">Chọn màu sắc</option>
                    {(danhmucdangchon?.colors || []).map((mau) => (
                      <option key={mau.hex} value={mau.name}>{mau.name}</option>
                    ))}
                  </select>
                </S.FormGroup>

                <S.FormGroup>
                  <label>Giá nhập *</label>
                  <input
                    type="number"
                    value={formdulieu.giaNhap}
                    onChange={e => xulynhap('giaNhap', parseFloat(e.target.value))}
                    min="0"
                    required
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormRow>
                <S.FormGroup>
                  <label>Giá bán *</label>
                  <input
                    type="number"
                    value={formdulieu.giaBan}
                    onChange={e => xulynhap('giaBan', parseFloat(e.target.value))}
                    min="0"
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>URL hình ảnh</label>
                  <input
                    type="text"
                    value={formdulieu.hinhAnh}
                    onChange={e => xulynhap('hinhAnh', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </S.FormGroup>
              </S.FormRow>

              <S.FormGroup>
                <label>Mô tả</label>
                <textarea
                  value={formdulieu.moTa}
                  onChange={e => xulynhap('moTa', e.target.value)}
                  placeholder="Nhập mô tả sản phẩm"
                  rows={4}
                />
              </S.FormGroup>

              <S.FormActions>
                <S.CancelButton type="button" onClick={dongform}>
                  Hủy
                </S.CancelButton>
                <S.SubmitButton type="submit" disabled={dangtai}>
                  {dangtai ? 'Đang lưu...' : 'Lưu'}
                </S.SubmitButton>
              </S.FormActions>
            </S.Form>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};
