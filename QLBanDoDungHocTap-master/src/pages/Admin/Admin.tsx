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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
            </svg>
            Dashboard
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" fill="currentColor"/>
            </svg>
            Sản phẩm
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
            Đơn hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'customers'} onClick={() => setActiveTab('customers')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
            </svg>
            Khách hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z" fill="currentColor"/>
            </svg>
            Kho hàng
          </S.MenuItem>

          <S.MenuItem $active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
            </svg>
            Báo cáo
          </S.MenuItem>
        </S.Menu>

        <S.LogoutButton onClick={handleLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
          </svg>
          Đăng xuất
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
