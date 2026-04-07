import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/dang-nhap');
  };

  return (
    <S.Container>
      <S.Sidebar>
        <S.Logo>
          <h2>THIÊN LONG</h2>
          <span>Admin Panel</span>
        </S.Logo>

        <S.UserInfo>
          <S.Avatar>{user?.tenDangNhap.charAt(0).toUpperCase()}</S.Avatar>
          <div>
            <S.UserName>{user?.tenDangNhap}</S.UserName>
            <S.UserRole>Quản trị viên</S.UserRole>
          </div>
        </S.UserInfo>

        <S.Menu>
          <S.MenuItem $active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            📦 Sản phẩm
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
            ✅ Đơn hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'customers'} onClick={() => setActiveTab('customers')}>
            👥 Khách hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')}>
            📋 Kho hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>
            📈 Báo cáo
          </S.MenuItem>
        </S.Menu>

        <S.LogoutButton onClick={handleLogout}>
          🚪 Đăng xuất
        </S.LogoutButton>
      </S.Sidebar>

      <S.MainContent>
        <S.Header>
          <S.PageTitle>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'products' && 'Quản lý sản phẩm'}
            {activeTab === 'orders' && 'Quản lý đơn hàng'}
            {activeTab === 'customers' && 'Quản lý khách hàng'}
            {activeTab === 'inventory' && 'Quản lý kho'}
            {activeTab === 'reports' && 'Báo cáo thống kê'}
          </S.PageTitle>
        </S.Header>

        <S.Content>
          {activeTab === 'dashboard' && (
            <S.DashboardGrid>
              <S.StatCard color="#4caf50">
                <S.StatIcon>📦</S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>1,234</S.StatValue>
                  <S.StatLabel>Tổng sản phẩm</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard color="#2196f3">
                <S.StatIcon>🛒</S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>567</S.StatValue>
                  <S.StatLabel>Đơn hàng</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard color="#ff9800">
                <S.StatIcon>👥</S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>890</S.StatValue>
                  <S.StatLabel>Khách hàng</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>

              <S.StatCard color="#e91e63">
                <S.StatIcon>💰</S.StatIcon>
                <S.StatInfo>
                  <S.StatValue>125M</S.StatValue>
                  <S.StatLabel>Doanh thu</S.StatLabel>
                </S.StatInfo>
              </S.StatCard>
            </S.DashboardGrid>
          )}

          {activeTab !== 'dashboard' && (
            <S.ComingSoon>
              <h2>🚧 Đang phát triển</h2>
              <p>Chức năng {activeTab} đang được xây dựng</p>
            </S.ComingSoon>
          )}
        </S.Content>
      </S.MainContent>
    </S.Container>
  );
};
