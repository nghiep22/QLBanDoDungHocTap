import { useEffect, useMemo, useState } from 'react';
import { dichVuApi } from '../../services/api';
import type { HoaDonNhapAPI, NhaCungCapAPI, SanPhamAPI, TaoHoaDonNhapRequest } from '../../types';
import * as S from './QuanLySanPham.styles.ts';

interface ChiTietNhapForm {
  sanPham_Id: number;
  soLuong: number;
  giaNhap: number;
}

const formatCurrency = (value: number) => value.toLocaleString('vi-VN') + 'đ';
const formatDate = (value?: string | null) => value ? new Date(value).toLocaleString('vi-VN') : '-';

export const QuanLyNhapHang = () => {
  const [danhSachHoaDon, setDanhSachHoaDon] = useState<HoaDonNhapAPI[]>([]);
  const [danhSachNhaCungCap, setDanhSachNhaCungCap] = useState<NhaCungCapAPI[]>([]);
  const [danhSachSanPham, setDanhSachSanPham] = useState<SanPhamAPI[]>([]);
  const [dangTai, setDangTai] = useState(false);
  const [dangLuu, setDangLuu] = useState(false);
  const [hienThiForm, setHienThiForm] = useState(false);
  const [hoaDonDangXem, setHoaDonDangXem] = useState<HoaDonNhapAPI | null>(null);
  const [thongBao, setThongBao] = useState<{ loai: 'thanh_cong' | 'loi'; noidung: string } | null>(null);
  const [form, setForm] = useState<TaoHoaDonNhapRequest>({
    nhaCungCap_Id: 0,
    nhanVien_Id: 1,
    ghiChu: '',
    chiTiet: [],
  });

  const taiDuLieu = async () => {
    setDangTai(true);
    try {
      const [hoaDon, ncc, sp] = await Promise.all([
        dichVuApi.layDanhSachHoaDonNhap(),
        dichVuApi.layDanhSachNhaCungCap(),
        dichVuApi.layDanhSachSanPham(),
      ]);
      setDanhSachHoaDon(hoaDon);
      setDanhSachNhaCungCap(ncc);
      setDanhSachSanPham(sp);
      if (ncc.length > 0 && form.nhaCungCap_Id === 0) {
        setForm((prev) => ({ ...prev, nhaCungCap_Id: ncc[0].nhaCungCap_Id }));
      }
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể tải dữ liệu nhập hàng' });
    } finally {
      setDangTai(false);
    }
  };

  useEffect(() => {
    taiDuLieu();
  }, []);

  const tongTienNhap = useMemo(() => {
    return form.chiTiet.reduce((sum, item) => sum + item.soLuong * item.giaNhap, 0);
  }, [form.chiTiet]);

  const themChiTiet = () => {
    const sanPhamMacDinh = danhSachSanPham[0];
    if (!sanPhamMacDinh) return;
    setForm((prev) => ({
      ...prev,
      chiTiet: [...prev.chiTiet, { sanPham_Id: sanPhamMacDinh.sanPham_Id, soLuong: 1, giaNhap: sanPhamMacDinh.giaNhap }],
    }));
  };

  const capNhatChiTiet = (index: number, field: keyof ChiTietNhapForm, value: number) => {
    setForm((prev) => ({
      ...prev,
      chiTiet: prev.chiTiet.map((item, idx) => {
        if (idx !== index) return item;
        const updated = { ...item, [field]: value } as ChiTietNhapForm;
        return updated;
      }),
    }));
  };

  const xoaChiTiet = (index: number) => {
    setForm((prev) => ({
      ...prev,
      chiTiet: prev.chiTiet.filter((_, idx) => idx !== index),
    }));
  };

  const moForm = () => {
    setForm({
      nhaCungCap_Id: danhSachNhaCungCap[0]?.nhaCungCap_Id || 0,
      nhanVien_Id: 1,
      ghiChu: '',
      chiTiet: danhSachSanPham[0]
        ? [{ sanPham_Id: danhSachSanPham[0].sanPham_Id, soLuong: 1, giaNhap: danhSachSanPham[0].giaNhap }]
        : [],
    });
    setHienThiForm(true);
  };

  const dongForm = () => {
    if (dangLuu) return;
    setHienThiForm(false);
  };

  const luuHoaDon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nhaCungCap_Id) {
      setThongBao({ loai: 'loi', noidung: 'Vui lòng chọn nhà cung cấp' });
      return;
    }
    if (form.chiTiet.length === 0) {
      setThongBao({ loai: 'loi', noidung: 'Vui lòng thêm ít nhất 1 sản phẩm' });
      return;
    }
    if (form.chiTiet.some((item) => item.soLuong <= 0 || item.giaNhap <= 0)) {
      setThongBao({ loai: 'loi', noidung: 'Số lượng và đơn giá phải lớn hơn 0' });
      return;
    }

    setDangLuu(true);
    try {
      await dichVuApi.taoHoaDonNhap(form);
      setThongBao({ loai: 'thanh_cong', noidung: 'Tạo hóa đơn nhập thành công' });
      setHienThiForm(false);
      await taiDuLieu();
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể tạo hóa đơn nhập' });
    } finally {
      setDangLuu(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Quản lý nhập hàng</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <S.Button onClick={taiDuLieu}>Tải lại</S.Button>
          <S.Button onClick={moForm}>+ Tạo phiếu nhập</S.Button>
        </div>
      </S.Header>

      {thongBao && <S.Thongbao $loai={thongBao.loai}>{thongBao.noidung}</S.Thongbao>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Tổng hóa đơn nhập</div>
          <strong style={{ fontSize: 28 }}>{danhSachHoaDon.length}</strong>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Tổng tiền phiếu đang tạo</div>
          <strong style={{ fontSize: 28, color: '#2196f3' }}>{formatCurrency(tongTienNhap)}</strong>
        </div>
      </div>

      {dangTai && <S.Loading>Đang tải...</S.Loading>}

      <S.Table>
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Ngày nhập</th>
            <th>Nhà cung cấp</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ghi chú</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhSachHoaDon.map((hoaDon) => {
            const nhaCungCap = danhSachNhaCungCap.find((ncc) => ncc.nhaCungCap_Id === hoaDon.nhaCungCap_Id);
            return (
              <tr key={hoaDon.hdNhap_Id}>
                <td>{hoaDon.maHDNhap || `HDN-${hoaDon.hdNhap_Id}`}</td>
                <td>{formatDate(hoaDon.ngayNhap)}</td>
                <td>{nhaCungCap?.tenNCC || `#${hoaDon.nhaCungCap_Id}`}</td>
                <td>{formatCurrency(hoaDon.tongTien)}</td>
                <td>
                  <S.Badge $active={hoaDon.trangThai === 'da_nhap'}>{hoaDon.trangThai.replace(/_/g, ' ')}</S.Badge>
                </td>
                <td>{hoaDon.ghiChu || '-'}</td>
                <td>
                  <S.ActionButtons>
                    <S.EditButton onClick={() => setHoaDonDangXem(hoaDon)}>Xem chi tiết</S.EditButton>
                  </S.ActionButtons>
                </td>
              </tr>
            );
          })}
          {!dangTai && danhSachHoaDon.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '24px 12px', color: '#666' }}>
                Chưa có hóa đơn nhập nào.
              </td>
            </tr>
          )}
        </tbody>
      </S.Table>

      {hienThiForm && (
        <S.Modal onClick={dongForm}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h3>Tạo phiếu nhập hàng</h3>
              <S.CloseButton onClick={dongForm}>×</S.CloseButton>
            </S.ModalHeader>

            <S.Form onSubmit={luuHoaDon}>
              <S.FormRow>
                <S.FormGroup>
                  <label>Nhà cung cấp</label>
                  <select value={form.nhaCungCap_Id} onChange={(e) => setForm((prev) => ({ ...prev, nhaCungCap_Id: Number(e.target.value) }))} required>
                    {danhSachNhaCungCap.map((ncc) => (
                      <option key={ncc.nhaCungCap_Id} value={ncc.nhaCungCap_Id}>{ncc.tenNCC}</option>
                    ))}
                  </select>
                </S.FormGroup>
                <S.FormGroup>
                  <label>Nhân viên tạo</label>
                  <input type="number" value={form.nhanVien_Id} onChange={(e) => setForm((prev) => ({ ...prev, nhanVien_Id: Number(e.target.value) }))} min={1} />
                </S.FormGroup>
              </S.FormRow>

              <S.FormGroup>
                <label>Ghi chú</label>
                <textarea value={form.ghiChu || ''} onChange={(e) => setForm((prev) => ({ ...prev, ghiChu: e.target.value }))} rows={3} />
              </S.FormGroup>

              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0 }}>Chi tiết nhập</h4>
                <S.Button type="button" onClick={themChiTiet}>+ Thêm dòng</S.Button>
              </div>

              {form.chiTiet.map((item, index) => (
                <S.FormRow key={index}>
                  <S.FormGroup>
                    <label>Sản phẩm</label>
                    <select value={item.sanPham_Id} onChange={(e) => capNhatChiTiet(index, 'sanPham_Id', Number(e.target.value))} required>
                      {danhSachSanPham.map((sp) => (
                        <option key={sp.sanPham_Id} value={sp.sanPham_Id}>{sp.tenSanPham}</option>
                      ))}
                    </select>
                  </S.FormGroup>
                  <S.FormGroup>
                    <label>Số lượng</label>
                    <input type="number" value={item.soLuong} onChange={(e) => capNhatChiTiet(index, 'soLuong', Number(e.target.value))} min={1} required />
                  </S.FormGroup>
                  <S.FormGroup>
                    <label>Đơn giá nhập</label>
                    <input type="number" value={item.giaNhap} onChange={(e) => capNhatChiTiet(index, 'giaNhap', Number(e.target.value))} min={1} required />
                  </S.FormGroup>
                  <S.FormGroup>
                    <label>&nbsp;</label>
                    <S.DeleteButton type="button" onClick={() => xoaChiTiet(index)}>Xóa</S.DeleteButton>
                  </S.FormGroup>
                </S.FormRow>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <strong>Tổng tiền: {formatCurrency(tongTienNhap)}</strong>
              </div>

              <S.FormActions>
                <S.CancelButton type="button" onClick={dongForm}>Hủy</S.CancelButton>
                <S.SubmitButton type="submit" disabled={dangLuu}>{dangLuu ? 'Đang lưu...' : 'Lưu phiếu nhập'}</S.SubmitButton>
              </S.FormActions>
            </S.Form>
          </S.ModalContent>
        </S.Modal>
      )}

      {hoaDonDangXem && (
        <S.Modal onClick={() => setHoaDonDangXem(null)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h3>Chi tiết hóa đơn nhập</h3>
              <S.CloseButton onClick={() => setHoaDonDangXem(null)}>×</S.CloseButton>
            </S.ModalHeader>
            <div style={{ padding: 20 }}>
              <p><strong>Mã phiếu:</strong> {hoaDonDangXem.maHDNhap || `HDN-${hoaDonDangXem.hdNhap_Id}`}</p>
              <p><strong>Ngày nhập:</strong> {formatDate(hoaDonDangXem.ngayNhap)}</p>
              <p><strong>Tổng tiền:</strong> {formatCurrency(hoaDonDangXem.tongTien)}</p>
              <p><strong>Trạng thái:</strong> {hoaDonDangXem.trangThai.replace(/_/g, ' ')}</p>
              <p><strong>Ghi chú:</strong> {hoaDonDangXem.ghiChu || '-'}</p>
            </div>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};
