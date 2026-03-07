import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NhaCungCapXacThuc } from './ngucanh/NguCanhXacThuc';
import BoKhungChinh from './thanhphan/bokhung/BoKhungChinh';
import DuongDanBaoVe from './thanhphan/chung/DuongDanBaoVe';

import TrangDangNhap from './trang/TrangDangNhap';
import TrangDangKy from './trang/TrangDangKy';
import TrangTongQuan from './trang/TrangTongQuan';
import TrangVi from './trang/TrangVi';
import TrangDanhMuc from './trang/TrangDanhMuc';
import TrangGiaoDich from './trang/TrangGiaoDich';
import TrangNganSach from './trang/TrangNganSach';
import TrangMucTieu from './trang/TrangMucTieu';
import TrangQuanTri from './trang/TrangQuanTri';

import './styles/chung.css';
import './styles/xacthuc.css';

export default function App() {
  return (
    <NhaCungCapXacThuc>
      <BrowserRouter>
        <Routes>
          {/* Trang xac thuc - khong co layout */}
          <Route path="/dang-nhap" element={<TrangDangNhap />} />
          <Route path="/dang-ky" element={<TrangDangKy />} />

          {/* Trang admin - layout rieng */}
          <Route path="/quan-tri" element={
            <DuongDanBaoVe quyen="admin"><TrangQuanTri /></DuongDanBaoVe>
          } />

          {/* Cac trang co layout chung */}
          <Route element={<BoKhungChinh />}>
            <Route path="/" element={<TrangTongQuan />} />
            <Route path="/vi" element={<DuongDanBaoVe><TrangVi /></DuongDanBaoVe>} />
            <Route path="/danh-muc" element={<DuongDanBaoVe><TrangDanhMuc /></DuongDanBaoVe>} />
            <Route path="/giao-dich" element={<DuongDanBaoVe><TrangGiaoDich /></DuongDanBaoVe>} />
            <Route path="/ngan-sach" element={<DuongDanBaoVe><TrangNganSach /></DuongDanBaoVe>} />
            <Route path="/muc-tieu" element={<DuongDanBaoVe><TrangMucTieu /></DuongDanBaoVe>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NhaCungCapXacThuc>
  );
}
