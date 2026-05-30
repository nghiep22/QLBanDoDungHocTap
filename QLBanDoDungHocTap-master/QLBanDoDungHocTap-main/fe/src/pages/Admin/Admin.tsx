import { useState, useEffect, useMemo } from 'react';
import { useDangNhap } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { QuanLySanPham } from './QuanLySanPham';
import { QuanLyDonHang } from './QuanLyDonHang';
import { QuanLyKho } from './QuanLyKho';
import { QuanLyNhapHang } from './QuanLyNhapHang';
import { QuanLyKhachHang } from './QuanLyKhachHang';
import { dichVuApi } from '../../services/api';
import * as S from './styles';

interface DashboardStats {
  tongSanPham: number;
  tongDonHang: number;
  tongKhachHang: number;
  tongDoanhThu: number;
}

interface DonHangTrangThaiChart {
  trangThai: string;
  soLuong: number;
}

interface DoanhThuNgayChart {
  ngay: string;
  doanhThu: number;
}

interface TopSanPhamChart {
  tenSanPham: string;
  soLuong: number;
  doanhThu: number;
}

export const Admin = () => {
  const { nguoiDung, dangXuat } = useDangNhap();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    tongSanPham: 0,
    tongDonHang: 0,
    tongKhachHang: 0,
    tongDoanhThu: 0,
  });
  const [loading, setLoading] = useState(false);
  const [donHangTrangThai, setDonHangTrangThai] = useState<DonHangTrangThaiChart[]>([]);
  const [doanhThuNgay, setDoanhThuNgay] = useState<DoanhThuNgayChart[]>([]);
  const [topSanPham, setTopSanPham] = useState<TopSanPhamChart[]>([]);

  // Lấy dữ liệu thống kê khi vào dashboard
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardStats();
    }
  }, [activeTab]);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const [stats, donHangTT, doanhThu, topSp] = await Promise.all([
        dichVuApi.layThongKeDashboard(),
        dichVuApi.layDonHangTheoTrangThai(),
        dichVuApi.layDoanhThuTheoNgay(),
        dichVuApi.layTopSanPham(5),
      ]);
      setDashboardStats(stats);
      setDonHangTrangThai(donHangTT.map((x: any) => ({ trangThai: x.trangThai || x.TrangThai || x.trangThaiDH || 'khác', soLuong: x.soLuong || x.SoLuong || x.tong || 0 })));
      setDoanhThuNgay(doanhThu.map((x: any) => ({ ngay: x.ngay || x.Ngay || x.date || '', doanhThu: x.doanhThu || x.DoanhThu || x.tongDoanhThu || 0 })));
      setTopSanPham(topSp.map((x: any) => ({ tenSanPham: x.tenSanPham || x.TenSanPham || x.ten || 'SP', soLuong: x.soLuong || x.SoLuong || x.tongSoLuongBan || x.tong || 0, doanhThu: x.tongDoanhThu || x.doanhThu || 0 })));
    } catch (error) {
      console.error('Lỗi khi tải thống kê:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format số tiền
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  };

  const handleLogout = () => {
    dangXuat();
    navigate('/dang-nhap');
  };

  const maxDoanhThu = useMemo(() => Math.max(...doanhThuNgay.map(i => i.doanhThu), 1), [doanhThuNgay]);
  const maxTopSp = useMemo(() => Math.max(...topSanPham.map(i => i.soLuong), 1), [topSanPham]);

  return (
    <S.Container>
      <S.Sidebar>
        <S.Logo>
          <h2>StudyHub</h2>
          <span>Admin Panel</span>
        </S.Logo>

        <S.UserInfo>
          <S.Avatar>{nguoiDung?.tenDangNhap.charAt(0).toUpperCase()}</S.Avatar>
          <div>
            <S.UserName>{nguoiDung?.tenDangNhap}</S.UserName>
            <S.UserRole>Quản trị viên</S.UserRole>
          </div>
        </S.UserInfo>

        <S.Menu>
          <S.MenuItem $active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            Sản phẩm
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
            Đơn hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'imports'} onClick={() => setActiveTab('imports')}>
            Nhập hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')}>
            Kho hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>
            Báo cáo
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'customers'} onClick={() => setActiveTab('customers')}>
            Khách hàng
          </S.MenuItem>
        </S.Menu>

        <S.HomeButton onClick={() => navigate('/')}>
          Quay lại trang chủ
        </S.HomeButton>

        <S.LogoutButton onClick={handleLogout}>
          Đăng xuất
        </S.LogoutButton>
      </S.Sidebar>

      <S.MainContent>
        <S.Header>
          <S.PageTitle>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'products' && 'Quản lý sản phẩm'}
            {activeTab === 'orders' && 'Quản lý đơn hàng'}
            {activeTab === 'imports' && 'Quản lý nhập hàng'}
            {activeTab === 'inventory' && 'Quản lý kho'}
            {activeTab === 'reports' && 'Báo cáo thống kê'}
            {activeTab === 'customers' && 'Quản lý khách hàng'}
          </S.PageTitle>
        </S.Header>

        <S.Content>
          {activeTab === 'dashboard' && (
            <>
              <S.DashboardGrid>
                <S.StatCard color="#4caf50">
                <S.StatIcon />
                <S.StatInfo>
                  <S.StatValue>
                    {loading ? '...' : dashboardStats.tongSanPham.toLocaleString()}
                  </S.StatValue>
                  <S.StatLabel>Tổng sản phẩm</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard color="#2196f3">
                <S.StatIcon />
                <S.StatInfo>
                  <S.StatValue>
                    {loading ? '...' : dashboardStats.tongDonHang.toLocaleString()}
                  </S.StatValue>
                  <S.StatLabel>Đơn hàng</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard color="#ff9800">
                <S.StatIcon />
                <S.StatInfo>
                  <S.StatValue>
                    {loading ? '...' : dashboardStats.tongKhachHang.toLocaleString()}
                  </S.StatValue>
                  <S.StatLabel>Khách hàng</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard color="#e91e63">
                <S.StatIcon />
                <S.StatInfo>
                  <S.StatValue>
                    {loading ? '...' : formatCurrency(dashboardStats.tongDoanhThu)}
                  </S.StatValue>
                  <S.StatLabel>Doanh thu</S.StatLabel>
                </S.StatInfo>
                </S.StatCard>
              </S.DashboardGrid>

              <S.ChartGrid>
                <S.ChartCard>
                  <S.ChartHeader>
                    <div>
                      <S.ChartTitle>Đơn hàng theo trạng thái</S.ChartTitle>
                      <S.ChartSubtitle>Phân bổ đơn hiện tại</S.ChartSubtitle>
                    </div>
                  </S.ChartHeader>
                  <S.DonutWrap>
                    <S.DonutRing>
                      <S.DonutCenter>
                        <strong>{dashboardStats.tongDonHang}</strong>
                        <span>Đơn</span>
                      </S.DonutCenter>
                    </S.DonutRing>
                    <S.LegendList>
                      {donHangTrangThai.map((item, idx) => (
                        <S.LegendItem key={item.trangThai} $index={idx}>
                          <span>{item.trangThai.replace(/_/g, ' ')}</span>
                          <strong>{item.soLuong}</strong>
                        </S.LegendItem>
                      ))}
                    </S.LegendList>
                  </S.DonutWrap>
                </S.ChartCard>

                <S.ChartCard>
                  <S.ChartHeader>
                    <div>
                      <S.ChartTitle>Doanh thu theo ngày</S.ChartTitle>
                      <S.ChartSubtitle>7 mốc gần nhất</S.ChartSubtitle>
                    </div>
                  </S.ChartHeader>
                  <S.BarChart>
                    {doanhThuNgay.map(item => (
                      <S.BarRow key={item.ngay}>
                        <span>{item.ngay}</span>
                        <S.BarTrack>
                          <S.BarFill $width={Math.max((item.doanhThu / maxDoanhThu) * 100, 6)} />
                        </S.BarTrack>
                        <strong>{formatCurrency(item.doanhThu)}</strong>
                      </S.BarRow>
                    ))}
                  </S.BarChart>
                </S.ChartCard>

                <S.ChartCard>
                  <S.ChartHeader>
                    <div>
                      <S.ChartTitle>Top sản phẩm</S.ChartTitle>
                      <S.ChartSubtitle>Bán chạy nhất</S.ChartSubtitle>
                    </div>
                  </S.ChartHeader>
                  <S.BarChart>
                    {topSanPham.map(item => (
                      <S.BarRow key={item.tenSanPham}>
                        <span>{item.tenSanPham}</span>
                        <S.BarTrack>
                          <S.BarFill $width={Math.max((item.soLuong / maxTopSp) * 100, 6)} />
                        </S.BarTrack>
                        <strong>{item.soLuong}</strong>
                      </S.BarRow>
                    ))}
                  </S.BarChart>
                </S.ChartCard>
              </S.ChartGrid>
            </>
          )}

          {activeTab === 'products' && <QuanLySanPham />}
          {activeTab === 'orders' && <QuanLyDonHang />}
          {activeTab === 'imports' && <QuanLyNhapHang />}
          {activeTab === 'inventory' && <QuanLyKho />}
          {activeTab === 'customers' && <QuanLyKhachHang />}
          {activeTab === 'reports' && (
            <S.ReportPanel>
              <S.ReportHero>
                <div>
                  <S.ReportTitle>Báo cáo vận hành</S.ReportTitle>
                  <S.ReportSubTitle>Tổng hợp doanh thu, trạng thái đơn và top bán chạy</S.ReportSubTitle>
                </div>
                <S.ReportNote>Auto refresh khi vào tab báo cáo</S.ReportNote>
              </S.ReportHero>

              <S.ReportGrid>
                <S.ReportMiniCard>
                  <span>Doanh thu</span>
                  <strong>{formatCurrency(dashboardStats.tongDoanhThu)}</strong>
                  <small>Đơn đã giao</small>
                </S.ReportMiniCard>
                <S.ReportMiniCard>
                  <span>Đơn hoàn tất</span>
                  <strong>{donHangTrangThai.find(i => i.trangThai === 'da_giao')?.soLuong ?? 0}</strong>
                  <small>Trạng thái `da_giao`</small>
                </S.ReportMiniCard>
                <S.ReportMiniCard>
                  <span>Đơn chờ</span>
                  <strong>{donHangTrangThai.find(i => i.trangThai === 'cho_xac_nhan')?.soLuong ?? 0}</strong>
                  <small>Trạng thái xử lý</small>
                </S.ReportMiniCard>
                <S.ReportMiniCard>
                  <span>Sản phẩm top 1</span>
                  <strong>{topSanPham[0]?.tenSanPham || '-'}</strong>
                  <small>{topSanPham[0]?.soLuong || 0} bán ra</small>
                </S.ReportMiniCard>
              </S.ReportGrid>

              <S.ReportTable>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {topSanPham.map(item => (
                    <tr key={item.tenSanPham}>
                      <td>{item.tenSanPham}</td>
                      <td>{item.soLuong}</td>
                      <td>{formatCurrency(item.doanhThu)}</td>
                    </tr>
                  ))}
                </tbody>
              </S.ReportTable>
            </S.ReportPanel>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'products' && activeTab !== 'orders' && activeTab !== 'imports' && activeTab !== 'inventory' && activeTab !== 'customers' && activeTab !== 'reports' && (
            <S.ComingSoon>
              <h2>Đang phát triển</h2>
              <p>Chức năng {activeTab} đang được xây dựng</p>
            </S.ComingSoon>
          )}
        </S.Content>
      </S.MainContent>
    </S.Container>
  );
};
