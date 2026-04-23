export interface BoLocGia {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export interface MauSacDanhMuc {
  name: string;
  hex: string;
}

export interface DanhMucTinh {
  loaiId: number;
  title: string;
  bannerImage: string;
  productTypes: string[];
  brands: string[];
  priceRanges: BoLocGia[];
  colors: MauSacDanhMuc[];
}

export const danhMucTinhTheoSlug: Record<string, DanhMucTinh> = {
  'van-phong-pham': {
    loaiId: 1,
    title: 'Văn phòng phẩm',
    bannerImage: 'https://cdn.hstatic.net/files/1000230347/collection/1920x60_8a4beb298da74bd59095726b4717daeb.jpg',
    productTypes: ['Bút lông bảng - lông dầu', 'File bìa hồ sơ', 'Băng keo', 'Kéo văn phòng', 'Giấy ghi chú'],
    brands: ['Thiên Long', 'Flexoffice', 'Bizner', 'Colokit'],
    priceRanges: [
      { id: 'under-100', label: 'Giá dưới 100.000đ', max: 100000 },
      { id: '100-300', label: '100.000đ - 300.000đ', min: 100000, max: 300000 },
      { id: '300-500', label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
      { id: '500-700', label: '500.000đ - 700.000đ', min: 500000, max: 700000 },
      { id: '700-1000', label: '700.000đ - 1.000.000đ', min: 700000, max: 1000000 },
      { id: 'over-1000', label: 'Giá trên 1.000.000đ', min: 1000000 },
    ],
    colors: [
      { name: 'Đỏ', hex: '#d90429' },
      { name: 'Đen', hex: '#111111' },
      { name: 'Vàng', hex: '#ffd60a' },
      { name: 'Hồng', hex: '#ff8fab' },
      { name: 'Trắng', hex: '#f8f9fa' },
      { name: 'Xanh', hex: '#3a86ff' },
    ],
  },
  'sach-vo': {
    loaiId: 2,
    title: 'Sách & Vở',
    bannerImage: 'https://cdn.hstatic.net/files/1000230347/collection/1920x600_511a25c61c4f474a8f35c20ef6ee95dc.jpg',
    productTypes: ['Tập học sinh', 'Sổ tay', 'Nhãn vở', 'Bìa bao', 'Combo học tập'],
    brands: ['Thiên Long', 'Colokit', 'Flexoffice'],
    priceRanges: [
      { id: 'under-100', label: 'Giá dưới 100.000đ', max: 100000 },
      { id: '100-300', label: '100.000đ - 300.000đ', min: 100000, max: 300000 },
      { id: '300-500', label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
      { id: '500-700', label: '500.000đ - 700.000đ', min: 500000, max: 700000 },
      { id: '700-1000', label: '700.000đ - 1.000.000đ', min: 700000, max: 1000000 },
      { id: 'over-1000', label: 'Giá trên 1.000.000đ', min: 1000000 },
    ],
    colors: [
      { name: 'Đỏ', hex: '#d90429' },
      { name: 'Xanh', hex: '#2563eb' },
      { name: 'Vàng', hex: '#ffd60a' },
      { name: 'Xanh lá', hex: '#38b000' },
      { name: 'Tím', hex: '#8338ec' },
      { name: 'Cam', hex: '#f77f00' },
    ],
  },
  'dung-cu-ve': {
    loaiId: 3,
    title: 'Dụng cụ vẽ',
    bannerImage: 'https://cdn.hstatic.net/files/1000230347/collection/1920x600_58707374375e4b61b1f67558eb918335.png',
    productTypes: ['Bút lông màu', 'Bút chì màu', 'Màu nước', 'Sáp nặn', 'Acrylic Marker'],
    brands: ['Colokit', 'Thiên Long', 'Flexoffice'],
    priceRanges: [
      { id: 'under-100', label: 'Giá dưới 100.000đ', max: 100000 },
      { id: '100-300', label: '100.000đ - 300.000đ', min: 100000, max: 300000 },
      { id: '300-500', label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
      { id: '500-700', label: '500.000đ - 700.000đ', min: 500000, max: 700000 },
      { id: '700-1000', label: '700.000đ - 1.000.000đ', min: 700000, max: 1000000 },
      { id: 'over-1000', label: 'Giá trên 1.000.000đ', min: 1000000 },
    ],
    colors: [
      { name: 'Đỏ', hex: '#d90429' },
      { name: 'Đen', hex: '#111111' },
      { name: 'Vàng', hex: '#ffd60a' },
      { name: 'Hồng', hex: '#ff8fab' },
      { name: 'Trắng', hex: '#f8f9fa' },
      { name: 'Xanh', hex: '#3a86ff' },
      { name: 'Cam', hex: '#f77f00' },
      { name: 'Xanh lá', hex: '#0f9d58' },
      { name: 'Tím', hex: '#8338ec' },
      { name: 'Xám', hex: '#9ca3af' },
    ],
  },
  'ba-lo-tui': {
    loaiId: 4,
    title: 'Ba lô & Túi',
    bannerImage: 'https://cdn.hstatic.net/files/1000230347/collection/1920x600_511a25c61c4f474a8f35c20ef6ee95dc.jpg',
    productTypes: ['Ba lô học sinh', 'Cặp chống gù', 'Túi đựng dụng cụ', 'Hộp viết'],
    brands: ['Thiên Long', 'Flexoffice'],
    priceRanges: [
      { id: 'under-100', label: 'Giá dưới 100.000đ', max: 100000 },
      { id: '100-300', label: '100.000đ - 300.000đ', min: 100000, max: 300000 },
      { id: '300-500', label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
      { id: '500-700', label: '500.000đ - 700.000đ', min: 500000, max: 700000 },
      { id: '700-1000', label: '700.000đ - 1.000.000đ', min: 700000, max: 1000000 },
      { id: 'over-1000', label: 'Giá trên 1.000.000đ', min: 1000000 },
    ],
    colors: [
      { name: 'Đen', hex: '#111111' },
      { name: 'Xanh', hex: '#2563eb' },
      { name: 'Hồng', hex: '#ff8fab' },
      { name: 'Xám', hex: '#9ca3af' },
      { name: 'Xanh lá', hex: '#0f9d58' },
      { name: 'Tím', hex: '#8338ec' },
    ],
  },
  'dien-tu-hoc-tap': {
    loaiId: 5,
    title: 'Điện tử học tập',
    bannerImage: 'https://cdn.hstatic.net/files/1000230347/collection/1920x600_511a25c61c4f474a8f35c20ef6ee95dc.jpg',
    productTypes: ['Máy tính khoa học', 'Máy tính văn phòng', 'Phụ kiện học tập'],
    brands: ['Thiên Long', 'Flexoffice'],
    priceRanges: [
      { id: 'under-100', label: 'Giá dưới 100.000đ', max: 100000 },
      { id: '100-300', label: '100.000đ - 300.000đ', min: 100000, max: 300000 },
      { id: '300-500', label: '300.000đ - 500.000đ', min: 300000, max: 500000 },
      { id: '500-700', label: '500.000đ - 700.000đ', min: 500000, max: 700000 },
      { id: '700-1000', label: '700.000đ - 1.000.000đ', min: 700000, max: 1000000 },
      { id: 'over-1000', label: 'Giá trên 1.000.000đ', min: 1000000 },
    ],
    colors: [
      { name: 'Đen', hex: '#111111' },
      { name: 'Xanh', hex: '#2563eb' },
      { name: 'Trắng', hex: '#f8f9fa' },
      { name: 'Xám', hex: '#9ca3af' },
      { name: 'Hồng', hex: '#ff8fab' },
      { name: 'Xanh lá', hex: '#0f9d58' },
    ],
  },
};

export const danhSachThuocTinhLoc = {
  brands: Array.from(new Set(Object.values(danhMucTinhTheoSlug).flatMap((item) => item.brands))),
  colors: Array.from(
    new Map(
      Object.values(danhMucTinhTheoSlug)
        .flatMap((item) => item.colors)
        .map((color) => [color.name.toLowerCase(), color])
    ).values()
  ),
};

export const layDanhMucTheoLoaiId = (loaiId: number) => {
  return Object.values(danhMucTinhTheoSlug).find((item) => item.loaiId === loaiId);
};

export const timMauTheoHexHoacTen = (value?: string) => {
  if (!value) return undefined;
  const giaTri = value.trim().toLowerCase();
  return danhSachThuocTinhLoc.colors.find(
    (item) => item.name.toLowerCase() === giaTri || item.hex.toLowerCase() === giaTri
  );
};
