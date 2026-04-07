import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
`;

export const Logo = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
    margin: 0 0 4px 0;
  }

  span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const UserInfo = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

export const UserRole = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

export const Menu = styled.nav`
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
`;

export const MenuItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'rgba(255, 255, 255, 0.1)')};
  }

  svg {
    opacity: 0.8;
  }
`;

export const LogoutButton = styled.button`
  margin: 20px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const HomeButton = styled.button`
  margin: 0 20px 10px 20px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #e0e0e0;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const Content = styled.div`
  padding: 32px;
  flex: 1;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div<{ color: string }>`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  border-left: 4px solid ${({ color }) => color};
`;

export const StatIcon = styled.div`
  font-size: 32px;
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

export const ComingSoon = styled.div`
  background: white;
  padding: 60px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h2 {
    font-size: 32px;
    margin: 0 0 12px 0;
    color: #1a1a1a;
  }

  p {
    font-size: 16px;
    color: #666;
    margin: 0;
  }
`;
