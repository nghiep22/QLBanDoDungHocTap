import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #f7fbff;
`;

export const Sidebar = styled.aside`
  width: 270px;
  height: 100vh;
  position: fixed;
  inset: 0 auto 0 0;
  display: flex;
  flex-direction: column;
  color: #17415f;
  background: #eaf6ff;
  border-right: 1px solid #cfe7f7;
`;

export const Logo = styled.div`
  padding: 24px 22px;
  border-bottom: 1px solid #cfe7f7;

  h2 {
    margin: 0 0 4px;
    color: #17415f;
    font-size: 24px;
    font-weight: 900;
  }

  span {
    color: #5f7f96;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px;
  padding: 14px;
  border: 1px solid #cfe7f7;
  border-radius: 12px;
  background: #f8fcff;
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #cfe7f7;
  color: #17415f;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 18px;
`;

export const UserName = styled.div`
  max-width: 150px;
  overflow: hidden;
  color: #17415f;
  font-weight: 800;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserRole = styled.div`
  margin-top: 3px;
  color: #5f7f96;
  font-size: 12px;
`;

export const Menu = styled.nav`
  flex: 1;
  display: grid;
  align-content: start;
  gap: 4px;
  padding: 10px 12px;
  overflow-y: auto;
`;

export const MenuItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  min-height: 42px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ $active }) => ($active ? '#b8d9ee' : 'transparent')};
  border-radius: 10px;
  background: ${({ $active }) => ($active ? '#dff1fb' : 'transparent')};
  color: ${({ $active }) => ($active ? '#17415f' : '#40657d')};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 800 : 700)};
  text-align: left;
  transition: background 0.2s, color 0.2s, border-color 0.2s;

  &:hover {
    background: ${({ $active }) => ($active ? '#d6edf9' : '#f4fbff')};
    color: #17415f;
  }
`;

export const LogoutButton = styled.button`
  min-height: 42px;
  margin: 0 18px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: #8a3a3a;
  border: 1px solid #f2caca;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: #fff4f4;
    border-color: #e9b5b5;
  }
`;

export const HomeButton = styled.button`
  min-height: 42px;
  margin: 0 18px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #dff1fb;
  color: #17415f;
  border: 1px solid #b8d9ee;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #cfe7f7;
    transform: translateY(-1px);
  }
`;

export const MainContent = styled.main`
  min-height: 100vh;
  margin-left: 270px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.92);
  padding: 20px 28px;
  border-bottom: 1px solid #e8eef7;
  backdrop-filter: blur(12px);
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: #17415f;
  font-size: 26px;
  font-weight: 900;
`;

export const Content = styled.div`
  flex: 1;
  padding: 28px;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div<{ color: string }>`
  background: #fff;
  padding: 22px;
  border-radius: 12px;
  border: 1px solid #e8eef7;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: ${({ color }) => color};
  }
`;

export const StatIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #eef2f7;
`;

export const StatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatValue = styled.div`
  color: #0f3f5f;
  font-size: 28px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 5px;
`;

export const StatLabel = styled.div`
  color: #64748b;
  font-size: 14px;
  font-weight: 700;
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  min-height: 318px;
  background: #fff;
  border: 1px solid #e8eef7;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  color: #0f3f5f;
  font-size: 18px;
  font-weight: 900;
`;

export const ChartSubtitle = styled.p`
  margin: 6px 0 0;
  color: #64748b;
  font-size: 13px;
`;

export const DonutWrap = styled.div`
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  gap: 18px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DonutRing = styled.div`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: conic-gradient(#7fb9de 0 35%, #9fcce8 35% 62%, #c8e3f4 62% 82%, #edf7fc 82% 100%);
  display: grid;
  place-items: center;
  margin: 0 auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 24px;
    background: #fff;
    border-radius: 50%;
  }
`;

export const DonutCenter = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;

  strong {
    display: block;
    color: #0f3f5f;
    font-size: 32px;
    font-weight: 900;
  }

  span {
    color: #64748b;
    font-size: 13px;
    font-weight: 700;
  }
`;

export const LegendList = styled.div`
  display: grid;
  gap: 10px;
`;

export const LegendItem = styled.div<{ $index: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 11px 13px;
  border-radius: 10px;
  background: ${({ $index }) => ['#e0f2fe', '#f0f9ff', '#ecfeff', '#f8fafc'][$index % 4]};
  color: #1f2937;
  font-weight: 700;
`;

export const BarChart = styled.div`
  display: grid;
  gap: 13px;
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 120px minmax(120px, 1fr) 88px;
  gap: 12px;
  align-items: center;
  font-size: 13px;

  span {
    color: #334155;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: #0f3f5f;
    text-align: right;
  }
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 11px;
  border-radius: 999px;
  background: #eef2f7;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  border-radius: inherit;
  background: linear-gradient(90deg, #d9edf8, #9fcce8, #6caed8);
`;

export const ReportPanel = styled.div`
  display: grid;
  gap: 20px;
`;

export const ReportHero = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border: 1px solid #e8eef7;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const ReportTitle = styled.h2`
  margin: 0;
  color: #0f3f5f;
  font-size: 28px;
  font-weight: 900;
`;

export const ReportSubTitle = styled.p`
  margin: 8px 0 0;
  color: #64748b;
`;

export const ReportNote = styled.div`
  padding: 9px 13px;
  border-radius: 999px;
  background: #edf7fc;
  color: #42769a;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
`;

export const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ReportMiniCard = styled.div`
  background: #fff;
  border: 1px solid #e8eef7;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  display: grid;
  gap: 6px;

  span {
    color: #64748b;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    color: #0f3f5f;
    font-size: 22px;
    font-weight: 900;
  }

  small {
    color: #94a3b8;
  }
`;

export const ReportTable = styled.table`
  width: 100%;
  min-width: 720px;
  background: #fff;
  border: 1px solid #e8eef7;
  border-radius: 12px;
  overflow: hidden;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);

  th,
  td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid #eef2f7;
  }

  th {
    background: #f8fafc;
    color: #475569;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  tbody tr:hover {
    background: #fbfdff;
  }
`;

export const ComingSoon = styled.div`
  background: #fff;
  padding: 54px 24px;
  border: 1px solid #e8eef7;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);

  h2 {
    margin: 0 0 10px;
    color: #0f3f5f;
    font-size: 30px;
  }

  p {
    margin: 0;
    color: #64748b;
  }
`;
