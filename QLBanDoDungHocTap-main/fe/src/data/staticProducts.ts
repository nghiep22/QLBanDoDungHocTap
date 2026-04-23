import type { SanPhamAPI } from '../types';
import { danhMucTinhTheoSlug } from './categoryData';

const nhaCungCapTheoThuongHieu: Record<string, number> = {
  'Thiên Long': 1,
  Flexoffice: 1,
  Bizner: 1,
  Colokit: 1,
  'Hồng Hà': 2,
  Deli: 3,
};

const anhMacDinh = {
  'van-phong-pham': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
  'sach-vo': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400',
  'dung-cu-ve': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400',
  'ba-lo-tui': 'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=400',
  'dien-tu-hoc-tap': 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400',
} as const;

const tenMau = (slug: keyof typeof danhMucTinhTheoSlug, index: number) => {
  const mau = danhMucTinhTheoSlug[slug].colors[index % danhMucTinhTheoSlug[slug].colors.length];
  return mau.name;
};

const taoSanPham = (
  id: number,
  slug: keyof typeof anhMacDinh,
  ten: string,
  loaiCon: string,
  thuongHieu: string,
  giaBan: number,
  giaNhap: number,
  index: number,
): SanPhamAPI => ({
  sanPham_Id: id,
  loai_Id: danhMucTinhTheoSlug[slug].loaiId,
  nhaCungCap_Id: nhaCungCapTheoThuongHieu[thuongHieu] || 1,
  maSanPham: `STATIC-${id}`,
  tenSanPham: ten,
  moTa: `${loaiCon} ${thuongHieu} phù hợp cho học tập và văn phòng.`,
  giaBan,
  giaNhap,
  hinhAnh: anhMacDinh[slug],
  loaiCon,
  thuongHieu,
  mauSac: tenMau(slug, index),
  trangThai: true,
  ngayTao: `2026-04-${String((index % 28) + 1).padStart(2, '0')}T00:00:00`,
});

export const duLieuSanPhamTinh: SanPhamAPI[] = [
  taoSanPham(1001, 'van-phong-pham', 'Bút lông bảng Thiên Long WB-01', 'Bút lông bảng - lông dầu', 'Thiên Long', 18000, 12000, 0),
  taoSanPham(1002, 'van-phong-pham', 'Bút lông dầu Flexoffice FO-WB02', 'Bút lông bảng - lông dầu', 'Flexoffice', 22000, 15000, 1),
  taoSanPham(1003, 'van-phong-pham', 'File bìa hồ sơ Bizner A4', 'File bìa hồ sơ', 'Bizner', 35000, 22000, 2),
  taoSanPham(1004, 'van-phong-pham', 'File hồ sơ Colokit nhiều ngăn', 'File bìa hồ sơ', 'Colokit', 42000, 28000, 3),
  taoSanPham(1005, 'van-phong-pham', 'Băng keo văn phòng Thiên Long 2cm', 'Băng keo', 'Thiên Long', 12000, 7000, 4),
  taoSanPham(1006, 'van-phong-pham', 'Băng keo Flexoffice trong suốt', 'Băng keo', 'Flexoffice', 15000, 9000, 5),
  taoSanPham(1007, 'van-phong-pham', 'Kéo văn phòng Bizner 170mm', 'Kéo văn phòng', 'Bizner', 28000, 18000, 6),
  taoSanPham(1008, 'van-phong-pham', 'Kéo Colokit tay cầm mềm', 'Kéo văn phòng', 'Colokit', 32000, 21000, 7),
  taoSanPham(1009, 'van-phong-pham', 'Giấy ghi chú Thiên Long Sticky Note', 'Giấy ghi chú', 'Thiên Long', 25000, 16000, 8),
  taoSanPham(1010, 'van-phong-pham', 'Giấy note Flexoffice 5 màu', 'Giấy ghi chú', 'Flexoffice', 30000, 19000, 9),

  taoSanPham(2001, 'sach-vo', 'Tập học sinh Thiên Long 96 trang', 'Tập học sinh', 'Thiên Long', 14000, 9000, 0),
  taoSanPham(2002, 'sach-vo', 'Tập học sinh Colokit 120 trang', 'Tập học sinh', 'Colokit', 18000, 12000, 1),
  taoSanPham(2003, 'sach-vo', 'Sổ tay Flexoffice bìa cứng', 'Sổ tay', 'Flexoffice', 45000, 30000, 2),
  taoSanPham(2004, 'sach-vo', 'Sổ tay Thiên Long planner mini', 'Sổ tay', 'Thiên Long', 52000, 35000, 3),
  taoSanPham(2005, 'sach-vo', 'Nhãn vở Colokit chống nước', 'Nhãn vở', 'Colokit', 10000, 6000, 4),
  taoSanPham(2006, 'sach-vo', 'Nhãn vở Thiên Long dễ bóc', 'Nhãn vở', 'Thiên Long', 12000, 7000, 5),
  taoSanPham(2007, 'sach-vo', 'Bìa bao sách Flexoffice khổ lớn', 'Bìa bao', 'Flexoffice', 22000, 14000, 6),
  taoSanPham(2008, 'sach-vo', 'Bìa bao tập Colokit 10 cái', 'Bìa bao', 'Colokit', 24000, 15000, 7),
  taoSanPham(2009, 'sach-vo', 'Combo học tập Thiên Long đầu năm', 'Combo học tập', 'Thiên Long', 99000, 70000, 8),
  taoSanPham(2010, 'sach-vo', 'Combo học tập Flexoffice cơ bản', 'Combo học tập', 'Flexoffice', 119000, 85000, 9),

  taoSanPham(3001, 'dung-cu-ve', 'Bút lông màu Colokit 12 màu', 'Bút lông màu', 'Colokit', 48000, 32000, 0),
  taoSanPham(3002, 'dung-cu-ve', 'Bút lông màu Thiên Long 24 màu', 'Bút lông màu', 'Thiên Long', 78000, 52000, 1),
  taoSanPham(3003, 'dung-cu-ve', 'Bút chì màu Colokit hộp thiếc', 'Bút chì màu', 'Colokit', 65000, 43000, 2),
  taoSanPham(3004, 'dung-cu-ve', 'Bút chì màu Flexoffice artist', 'Bút chì màu', 'Flexoffice', 89000, 60000, 3),
  taoSanPham(3005, 'dung-cu-ve', 'Màu nước Colokit 18 tuýp', 'Màu nước', 'Colokit', 110000, 76000, 4),
  taoSanPham(3006, 'dung-cu-ve', 'Màu nước Thiên Long basic set', 'Màu nước', 'Thiên Long', 125000, 84000, 5),
  taoSanPham(3007, 'dung-cu-ve', 'Sáp nặn Colokit 12 màu', 'Sáp nặn', 'Colokit', 36000, 23000, 6),
  taoSanPham(3008, 'dung-cu-ve', 'Sáp nặn Flexoffice an toàn', 'Sáp nặn', 'Flexoffice', 42000, 27000, 7),
  taoSanPham(3009, 'dung-cu-ve', 'Acrylic Marker Colokit 6 cây', 'Acrylic Marker', 'Colokit', 96000, 66000, 8),
  taoSanPham(3010, 'dung-cu-ve', 'Acrylic Marker Thiên Long pro', 'Acrylic Marker', 'Thiên Long', 135000, 92000, 9),

  taoSanPham(4001, 'ba-lo-tui', 'Ba lô học sinh Thiên Long tiểu học', 'Ba lô học sinh', 'Thiên Long', 285000, 210000, 0),
  taoSanPham(4002, 'ba-lo-tui', 'Ba lô học sinh Flexoffice năng động', 'Ba lô học sinh', 'Flexoffice', 320000, 235000, 1),
  taoSanPham(4003, 'ba-lo-tui', 'Cặp chống gù Thiên Long Air', 'Cặp chống gù', 'Thiên Long', 560000, 420000, 2),
  taoSanPham(4004, 'ba-lo-tui', 'Cặp chống gù Flexoffice Premium', 'Cặp chống gù', 'Flexoffice', 610000, 460000, 3),
  taoSanPham(4005, 'ba-lo-tui', 'Túi đựng dụng cụ Thiên Long mini', 'Túi đựng dụng cụ', 'Thiên Long', 69000, 45000, 4),
  taoSanPham(4006, 'ba-lo-tui', 'Túi đựng dụng cụ Flexoffice zipper', 'Túi đựng dụng cụ', 'Flexoffice', 82000, 55000, 5),
  taoSanPham(4007, 'ba-lo-tui', 'Hộp viết Thiên Long 2 ngăn', 'Hộp viết', 'Thiên Long', 58000, 37000, 6),
  taoSanPham(4008, 'ba-lo-tui', 'Hộp viết Flexoffice canvas', 'Hộp viết', 'Flexoffice', 73000, 48000, 7),
  taoSanPham(4009, 'ba-lo-tui', 'Ba lô học sinh Thiên Long chống thấm', 'Ba lô học sinh', 'Thiên Long', 355000, 260000, 8),
  taoSanPham(4010, 'ba-lo-tui', 'Túi đựng dụng cụ Flexoffice pastel', 'Túi đựng dụng cụ', 'Flexoffice', 99000, 67000, 9),

  taoSanPham(5001, 'dien-tu-hoc-tap', 'Máy tính khoa học Thiên Long FX-580VN', 'Máy tính khoa học', 'Thiên Long', 620000, 510000, 0),
  taoSanPham(5002, 'dien-tu-hoc-tap', 'Máy tính khoa học Flexoffice SC-991', 'Máy tính khoa học', 'Flexoffice', 580000, 470000, 1),
  taoSanPham(5003, 'dien-tu-hoc-tap', 'Máy tính văn phòng Thiên Long CAL-01', 'Máy tính văn phòng', 'Thiên Long', 165000, 120000, 2),
  taoSanPham(5004, 'dien-tu-hoc-tap', 'Máy tính văn phòng Flexoffice Desk', 'Máy tính văn phòng', 'Flexoffice', 189000, 138000, 3),
  taoSanPham(5005, 'dien-tu-hoc-tap', 'Phụ kiện học tập Thiên Long đèn đọc sách', 'Phụ kiện học tập', 'Thiên Long', 145000, 102000, 4),
  taoSanPham(5006, 'dien-tu-hoc-tap', 'Phụ kiện học tập Flexoffice quạt mini', 'Phụ kiện học tập', 'Flexoffice', 128000, 90000, 5),
  taoSanPham(5007, 'dien-tu-hoc-tap', 'Máy tính khoa học Thiên Long học sinh', 'Máy tính khoa học', 'Thiên Long', 540000, 430000, 6),
  taoSanPham(5008, 'dien-tu-hoc-tap', 'Máy tính văn phòng Flexoffice slim', 'Máy tính văn phòng', 'Flexoffice', 210000, 158000, 7),
  taoSanPham(5009, 'dien-tu-hoc-tap', 'Phụ kiện học tập Thiên Long giá đỡ tablet', 'Phụ kiện học tập', 'Thiên Long', 175000, 126000, 8),
  taoSanPham(5010, 'dien-tu-hoc-tap', 'Phụ kiện học tập Flexoffice bảng điện tử mini', 'Phụ kiện học tập', 'Flexoffice', 690000, 540000, 9),
];
