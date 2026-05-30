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

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  min-height: 320px;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #1a1a1a;
`;

export const ChartSubtitle = styled.p`
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 13px;
`;

export const DonutWrap = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DonutRing = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: conic-gradient(#2196f3 0 35%, #4caf50 35% 62%, #ff9800 62% 82%, #e91e63 82% 100%);
  display: grid;
  place-items: center;
  margin: 0 auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 26px;
    background: white;
    border-radius: 50%;
  }
`;

export const DonutCenter = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;

  strong {
    display: block;
    font-size: 34px;
    color: #1a1a1a;
  }

  span {
    color: #6b7280;
    font-size: 13px;
  }
`;

export const LegendList = styled.div`
  display: grid;
  gap: 12px;
`;

export const LegendItem = styled.div<{ $index: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({ $index }) => ['#eff6ff', '#ecfdf5', '#fff7ed', '#fdf2f8'][$index % 4]};
  color: #1f2937;
`;

export const BarChart = styled.div`
  display: grid;
  gap: 14px;
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr 90px;
  gap: 12px;
  align-items: center;
  font-size: 13px;

  span {
    color: #374151;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    text-align: right;
    color: #111827;
  }
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: #eef2f7;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  border-radius: inherit;
  background: linear-gradient(90deg, #4caf50, #2196f3);
`;

export const ReportPanel = styled.div`
  display: grid;
  gap: 24px;
`;

export const ReportHero = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  background: linear-gradient(135deg, #fff 0%, #f8fbff 100%);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

export const ReportTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  color: #111827;
`;

export const ReportSubTitle = styled.p`
  margin: 8px 0 0;
  color: #6b7280;
`;

export const ReportNote = styled.div`
  background: #e0f2fe;
  color: #0369a1;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  white-space: nowrap;
`;

export const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ReportMiniCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 6px;

  span {
    font-size: 13px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: .04em;
  }

  strong {
    font-size: 22px;
    color: #111827;
  }

  small {
    color: #9ca3af;
  }
`;

export const ReportTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  border-collapse: collapse;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);

  th, td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid #eef2f7;
  }

  th {
    background: #f8fafc;
    color: #111827;
  }

  tbody tr:hover {
    background: #f9fbff;
  }
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
