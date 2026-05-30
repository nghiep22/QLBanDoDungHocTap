import { useState, useEffect, useMemo } from 'react';
import { dichVuApi } from '../../services/api';
import type { SanPhamAPI, TaoSanPhamRequest, CapNhatSanPhamRequest, NhaCungCapAPI } from '../../types';
import { layDanhMucTheoLoaiId, timMauTheoHexHoacTen } from '../../data/categoryData';
import * as S from './QuanLySanPham.styles.ts';
import { DanhSachSanPham } from './QuanLySanPham/DanhSachSanPham';
import { ChiTietSanPham } from './QuanLySanPham/ChiTietSanPham';
import { FormSanPham } from './QuanLySanPham/FormSanPham';

const formatCurrency = (value: number | undefined | null) => {
  const soTien = typeof value === 'number' ? value : 0;
  return soTien.toLocaleString('vi-VN') + 'đ';
};

export const QuanLySanPham = () => {
  const [danhsachsanpham, setDanhsachsanpham] = useState<SanPhamAPI[]>([]);
  const [danhsachnhacungcap, setDanhsachnhacungcap] = useState<NhaCungCapAPI[]>([]);
  const [dangtai, setDangtai] = useState(false);
  const [hienthiform, setHienthiform] = useState(false);
  const [sanphamdangchinhsua, setSanphamdangchinhsua] = useState<SanPhamAPI | null>(null);
  const [thongbao, setThongbao] = useState<{ loai: 'thanh_cong' | 'loi'; noidung: string } | null>(null);
  const [tukhoaTimKiem, setTukhoaTimKiem] = useState('');
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState<SanPhamAPI | null>(null);
  const [dangTaiChiTiet] = useState(false);
  const [hienThiChiTiet, setHienThiChiTiet] = useState(false);

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

  
  const danhsachloai = [
    { id: 1, ten: 'Văn phòng phẩm' },
    { id: 2, ten: 'Sách & Vở' },
    { id: 3, ten: 'Dụng cụ vẽ' },
    { id: 4, ten: 'Ba lô & Túi' },
    { id: 5, ten: 'Điện tử học tập' },
  ];


  // tải dữ liệu
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

  useEffect(() => {
    taidulieu();
  }, []);

  // thông báo
  const hienthithongbao = (loai: 'thanh_cong' | 'loi', noidung: string) => {
    setThongbao({ loai, noidung });
    setTimeout(() => setThongbao(null), 3000);
  };

  // thêm , sửa sản phẩm 1 mở form
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

  // thêm sản phẩm / sửa sản phẩm - đóng form
  const dongform = () => {
    setHienthiform(false);
    setSanphamdangchinhsua(null);
  };

  // thêm, s sản phẩm 2 nhập liệu form
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

  // thêm sản phẩm / sửa sản phẩm - lưu dữ liệu
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
      // sửa sản phẩm
      if (sanphamdangchinhsua) {
        const dulieucapnhat: CapNhatSanPhamRequest = {
          ...formdulieu,
          trangThai: true,
        };
        await dichVuApi.capNhatSanPham(sanphamdangchinhsua.sanPham_Id, dulieucapnhat);
        hienthithongbao('thanh_cong', 'Cập nhật sản phẩm thành công');
      } else {
        // thêm sản phẩm
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

  // xóa sản phẩm
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

  const xuLyTimKiem = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const xuLyXemChiTiet = (sanPham: SanPhamAPI) => {
    setSanPhamChiTiet(sanPham);
    setHienThiChiTiet(true);
  };

  const dongChiTiet = () => {
    setHienThiChiTiet(false);
    setSanPhamChiTiet(null);
  };

  const danhSachHienThi = useMemo(() => {
    const tuKhoa = tukhoaTimKiem.trim().toLowerCase();
    if (!tuKhoa) return danhsachsanpham;

    return danhsachsanpham.filter((sp) => {
      const giaTriTimKiem = [sp.maSanPham, sp.tenSanPham, String(sp.sanPham_Id)]
        .filter((value): value is string => Boolean(value))
        .map((value) => value.toLowerCase());

      return giaTriTimKiem.some((giaTri) => giaTri.includes(tuKhoa));
    });
  }, [danhsachsanpham, tukhoaTimKiem]);

  return (
    <S.Container>
      {/* danh sách sản phẩm - tiêu đề và thao tác thêm */}
      <S.Header>
        <h2>Quản lý sản phẩm</h2>
        <S.Toolbar>
          <S.SearchForm onSubmit={xuLyTimKiem}>
            <S.SearchInput
              type="text"
              value={tukhoaTimKiem}
              onChange={(e) => setTukhoaTimKiem(e.target.value)}
              placeholder="Tìm theo tên hoặc mã SP..."
            />
            <S.Button type="submit">Tìm kiếm</S.Button>
          </S.SearchForm>
          <S.Button onClick={() => { setTukhoaTimKiem(''); 
            taidulieu(); }}>Tải lại</S.Button>
          <S.Button onClick={() => moform()}>+ Thêm sản phẩm</S.Button>
        </S.Toolbar>
      </S.Header>

      {/* thông báo */}
      {thongbao && (
        <S.Thongbao $loai={thongbao.loai}>
          {thongbao.noidung}
        </S.Thongbao>
      )}

      {/* trạng thái tải dữ liệu */}
      {dangtai && <S.Loading>Đang tải...</S.Loading>}

      <DanhSachSanPham
        danhSachHienThi={danhSachHienThi}
        danhsachloai={danhsachloai}
        formatCurrency={formatCurrency}
        moform={moform}
        xuLyXemChiTiet={xuLyXemChiTiet}
        xulyxoa={xulyxoa}
      />

      <ChiTietSanPham
        hienThiChiTiet={hienThiChiTiet}
        dangTaiChiTiet={dangTaiChiTiet}
        sanPhamChiTiet={sanPhamChiTiet}
        danhsachloai={danhsachloai}
        formatCurrency={formatCurrency}
        dongChiTiet={dongChiTiet}
      />

      <FormSanPham
        hienthiform={hienthiform}
        sanphamdangchinhsua={sanphamdangchinhsua}
        formdulieu={formdulieu}
        dangtai={dangtai}
        danhsachloai={danhsachloai}
        danhsachnhacungcap={danhsachnhacungcap}
        dongform={dongform}
        xulyluu={xulyluu}
        xulynhap={xulynhap}
      />    </S.Container>
  );
};
