import { useEffect, useMemo, useState } from 'react';
import { dichVuApi } from '../../services/api';
import type { KhoTonKhoAPI, KhoCapNhatRequest, LichSuKhoAPI } from '../../types';
import * as S from './QuanLySanPham.styles.ts';

const formatCurrency = (value: number) => value.toLocaleString('vi-VN') + 'đ';
const formatDate = (value: string) => new Date(value).toLocaleString('vi-VN');

export const QuanLyKho = () => {
  const [danhSachKho, setDanhSachKho] = useState<KhoTonKhoAPI[]>([]);
  const [danhSachSapHet, setDanhSachSapHet] = useState<KhoTonKhoAPI[]>([]);
  const [danhSachLichSu, setDanhSachLichSu] = useState<LichSuKhoAPI[]>([]);
  const [dangTai, setDangTai] = useState(false);
  const [dangTaiLichSu, setDangTaiLichSu] = useState(false);
  const [loc, setLoc] = useState<'all' | 'low'>('all');
  const [dangChinhSua, setDangChinhSua] = useState<KhoTonKhoAPI | null>(null);
  const [hienThiForm, setHienThiForm] = useState(false);
  const [thongBao, setThongBao] = useState<{ loai: 'thanh_cong' | 'loi'; noidung: string } | null>(null);
  const [form, setForm] = useState<KhoCapNhatRequest>({
    soLuongTon: 0,
    soLuongToiThieu: 5,
    viTriKho: '',
  });

  const taiDuLieu = async () => {
    setDangTai(true);
    try {
      const [kho, sapHet] = await Promise.all([
        dichVuApi.layDanhSachTonKho(),
        dichVuApi.layDanhSachSapHetHang(),
      ]);
      setDanhSachKho(kho);
      setDanhSachSapHet(sapHet);
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể tải tồn kho' });
    } finally {
      setDangTai(false);
    }
  };

  const taiLichSu = async () => {
    setDangTaiLichSu(true);
    try {
      const data = await dichVuApi.layLichSuKho();
      setDanhSachLichSu(data);
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể tải lịch sử kho' });
    } finally {
      setDangTaiLichSu(false);
    }
  };

  useEffect(() => {
    taiDuLieu();
    taiLichSu();
  }, []);

  const danhSachHienThi = useMemo(() => {
    return loc === 'low' ? danhSachSapHet : danhSachKho;
  }, [danhSachKho, danhSachSapHet, loc]);

  const tongSanPham = danhSachKho.length;
  const tongSapHet = danhSachSapHet.length;
  const tongTon = danhSachKho.reduce((sum, item) => sum + item.soLuongTon, 0);

  const moForm = (item: KhoTonKhoAPI) => {
    setDangChinhSua(item);
    setForm({
      soLuongTon: item.soLuongTon,
      soLuongToiThieu: item.soLuongToiThieu,
      viTriKho: item.viTriKho || '',
    });
    setHienThiForm(true);
  };

  const dongForm = () => {
    setHienThiForm(false);
    setDangChinhSua(null);
  };

  const luuKho = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dangChinhSua) return;

    try {
      await dichVuApi.capNhatTonKho(dangChinhSua.sanPham_Id, form);
      setThongBao({ loai: 'thanh_cong', noidung: 'Cập nhật tồn kho thành công' });
      dongForm();
      await taiDuLieu();
      await taiLichSu();
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể cập nhật tồn kho' });
    }
  };

  const xuLyCongTru = async (item: KhoTonKhoAPI, soLuongThayDoi: number) => {
    try {
      await dichVuApi.capNhatSoLuongTon(item.sanPham_Id, soLuongThayDoi);
      setThongBao({ loai: 'thanh_cong', noidung: soLuongThayDoi > 0 ? 'Đã nhập thêm tồn kho' : 'Đã xuất trừ tồn kho' });
      await taiDuLieu();
      await taiLichSu();
    } catch (error: any) {
      setThongBao({ loai: 'loi', noidung: error.message || 'Không thể thay đổi tồn kho' });
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Quản lý kho</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select value={loc} onChange={(e) => setLoc(e.target.value as 'all' | 'low')} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd' }}>
            <option value="all">Tất cả tồn kho</option>
            <option value="low">Sắp hết hàng</option>
          </select>
          <S.Button onClick={taiDuLieu}>Tải lại</S.Button>
        </div>
      </S.Header>

      {thongBao && <S.Thongbao $loai={thongBao.loai}>{thongBao.noidung}</S.Thongbao>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Tổng sản phẩm</div>
          <strong style={{ fontSize: 28 }}>{tongSanPham}</strong>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Sắp hết hàng</div>
          <strong style={{ fontSize: 28, color: '#e31e24' }}>{tongSapHet}</strong>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ color: '#666', marginBottom: 8 }}>Tổng tồn</div>
          <strong style={{ fontSize: 28, color: '#2196f3' }}>{tongTon}</strong>
        </div>
      </div>

      {dangTai && <S.Loading>Đang tải...</S.Loading>}

      <S.Table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Mã SP</th>
            <th>Tồn kho</th>
            <th>Tối thiểu</th>
            <th>Vị trí kho</th>
            <th>Cập nhật</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhSachHienThi.map((item) => (
            <tr key={item.kho_Id}>
              <td>
                <S.ProductInfo>
                  {item.hinhAnh && <S.ProductImage src={item.hinhAnh} alt={item.tenSanPham} />}
                  <div>
                    <div>{item.tenSanPham}</div>
                    <small>{formatCurrency(item.giaBan)}</small>
                  </div>
                </S.ProductInfo>
              </td>
              <td>{item.maSanPham || `SP-${item.sanPham_Id}`}</td>
              <td>{item.soLuongTon}</td>
              <td>{item.soLuongToiThieu}</td>
              <td>{item.viTriKho || '-'}</td>
              <td>{formatDate(item.ngayCapNhat)}</td>
              <td>
                <S.Badge $active={!item.canhBaoSapHet}>{item.canhBaoSapHet ? 'Sắp hết' : 'Đủ hàng'}</S.Badge>
              </td>
              <td>
                <S.ActionButtons>
                  <S.EditButton onClick={() => moForm(item)}>Sửa</S.EditButton>
                  <S.Button onClick={() => xuLyCongTru(item, 1)}>+1</S.Button>
                  <S.DeleteButton onClick={() => xuLyCongTru(item, -1)}>-1</S.DeleteButton>
                </S.ActionButtons>
              </td>
            </tr>
          ))}
          {!dangTai && danhSachHienThi.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center', padding: '24px 12px', color: '#666' }}>
                Không có dữ liệu tồn kho.
              </td>
            </tr>
          )}
        </tbody>
      </S.Table>

      <div style={{ marginTop: 32 }}>
        <S.Header>
          <h2>Lịch sử nhập/xuất kho</h2>
          <S.Button onClick={taiLichSu}>Tải lại lịch sử</S.Button>
        </S.Header>

        {dangTaiLichSu ? (
          <S.Loading>Đang tải lịch sử...</S.Loading>
        ) : (
          <S.Table>
            <thead>
              <tr>
                <th>Loại</th>
                <th>Số chứng từ</th>
                <th>Ngày</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th>Đối tượng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {danhSachLichSu.map((item, index) => (
                <tr key={`${item.soChungTu}-${index}`}>
                  <td>{item.loaiGiaoDich}</td>
                  <td>{item.soChungTu}</td>
                  <td>{formatDate(item.ngayGiaoDich)}</td>
                  <td>{item.tenSanPham}</td>
                  <td>{item.soLuong}</td>
                  <td>{formatCurrency(item.donGia)}</td>
                  <td>{formatCurrency(item.thanhTien)}</td>
                  <td>{item.doiTuong || '-'}</td>
                  <td>{item.trangThai || '-'}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        )}
      </div>

      {hienThiForm && dangChinhSua && (
        <S.Modal onClick={dongForm}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h3>Cập nhật kho</h3>
              <S.CloseButton onClick={dongForm}>×</S.CloseButton>
            </S.ModalHeader>
            <S.Form onSubmit={luuKho}>
              <S.FormRow>
                <S.FormGroup>
                  <label>Số lượng tồn</label>
                  <input type="number" value={form.soLuongTon} onChange={(e) => setForm((prev) => ({ ...prev, soLuongTon: Number(e.target.value) }))} min={0} />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Số lượng tối thiểu</label>
                  <input type="number" value={form.soLuongToiThieu} onChange={(e) => setForm((prev) => ({ ...prev, soLuongToiThieu: Number(e.target.value) }))} min={0} />
                </S.FormGroup>
              </S.FormRow>
              <S.FormGroup>
                <label>Vị trí kho</label>
                <input type="text" value={form.viTriKho || ''} onChange={(e) => setForm((prev) => ({ ...prev, viTriKho: e.target.value }))} />
              </S.FormGroup>
              <S.FormActions>
                <S.CancelButton type="button" onClick={dongForm}>Hủy</S.CancelButton>
                <S.SubmitButton type="submit">Lưu</S.SubmitButton>
              </S.FormActions>
            </S.Form>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};
