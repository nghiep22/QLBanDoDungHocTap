import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #f9fafb;
`;

export const Sidebar = styled.aside`
  width: 270px;
  height: 100vh;
  position: fixed;
  inset: 0 auto 0 0;
  display: flex;
  flex-direction: column;
  color: #f8fafc;
  background: #1f2937;
  border-right: 1px solid #111827;
`;

export const Logo = styled.div`
  padding: 24px 22px;
  border-bottom: 1px solid #1e293b;

  h2 {
    margin: 0 0 4px;
    color: #ffffff;
    font-size: 24px;
    font-weight: 900;
  }

  span {
    color: #94a3b8;
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
  border: 1px solid #334155;
  border-radius: 12px;
  background: #111827;
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #2563eb;
  color: #f8fafc;
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 18px;
`;

export const UserName = styled.div`
  max-width: 150px;
  overflow: hidden;
  color: #f8fafc;
  font-weight: 800;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserRole = styled.div`
  margin-top: 3px;
  color: #94a3b8;
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
  border: 1px solid ${({ $active }) => ($active ? '#60a5fa' : 'transparent')};
  border-radius: 10px;
  background: ${({ $active }) => ($active ? '#1e3a8a' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ecfeff' : '#cbd5e1')};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 800 : 700)};
  text-align: left;
  transition: background 0.2s, color 0.2s, border-color 0.2s;

  &:hover {
    background: ${({ $active }) => ($active ? '#2563eb' : '#374151')};
    color: #ffffff;
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
  color: #fecaca;
  border: 1px solid #7f1d1d;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: #7f1d1d;
    border-color: #ef4444;
  }
`;

export const HomeButton = styled.button`
  min-height: 42px;
  margin: 0 18px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #2563eb;
  color: #ecfeff;
  border: 1px solid #3b82f6;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #3b82f6;
    color: #f8fafc;
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
  background: rgba(255, 255, 255, 0.96);
  padding: 20px 28px;
  border-bottom: 1px solid #e5e7eb;
  backdrop-filter: blur(12px);
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 26px;
  font-weight: 900;
`;

export const Content = styled.div`
  flex: 1;
  padding: 28px;

  h2,
  h3,
  strong {
    color: #111827;
  }

  p,
  span,
  small,
  label {
    color: #374151;
  }

  input,
  select,
  textarea {
    background: #ffffff;
    color: #111827;
    border-color: #d1d5db;
  }
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
  background: #ffffff;
  padding: 22px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);
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
  background: #eff6ff;
  border: 1px solid #bfdbfe;
`;

export const StatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatValue = styled.div`
  color: #111827;
  font-size: 28px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 5px;
`;

export const StatLabel = styled.div`
  color: #374151;
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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  color: #111827;
  font-size: 18px;
  font-weight: 900;
`;

export const ChartSubtitle = styled.p`
  margin: 6px 0 0;
  color: #374151;
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
  background: conic-gradient(#2563eb 0 35%, #059669 35% 62%, #f59e0b 62% 82%, #e5e7eb 82% 100%);
  display: grid;
  place-items: center;
  margin: 0 auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 24px;
    background: #ffffff;
    border-radius: 50%;
  }
`;

export const DonutCenter = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;

  strong {
    display: block;
    color: #111827;
    font-size: 32px;
    font-weight: 900;
  }

  span {
    color: #374151;
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
  background: ${({ $index }) => ['#dbeafe', '#d1fae5', '#fef3c7', '#f3f4f6'][$index % 4]};
  color: #111827;
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
    color: #374151;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: #111827;
    text-align: right;
  }
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 11px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  border-radius: inherit;
  background: linear-gradient(90deg, #2563eb, #059669);
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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const ReportTitle = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 28px;
  font-weight: 900;
`;

export const ReportSubTitle = styled.p`
  margin: 8px 0 0;
  color: #374151;
`;

export const ReportNote = styled.div`
  padding: 9px 13px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1e3a8a;
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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);
  display: grid;
  gap: 6px;

  span {
    color: #374151;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
  }

  strong {
    color: #111827;
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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);

  th,
  td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    background: #1f2937;
    color: #f8fafc;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  tbody tr:hover {
    background: #f3f4f6;
  }
`;

export const ComingSoon = styled.div`
  background: #ffffff;
  padding: 54px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);

  h2 {
    margin: 0 0 10px;
    color: #111827;
    font-size: 30px;
  }

  p {
    margin: 0;
    color: #374151;
  }
`;
