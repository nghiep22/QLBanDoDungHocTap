import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageWrap = styled.div`
  background: #cfe8fb;
  min-height: 100vh;
  padding: 10px 0 40px;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 60vh;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 0 18px;
  color: #334155;
  font-size: 14px;

  strong {
    color: #2563eb;
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 18px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  display: grid;
  gap: 14px;
`;

export const FilterCard = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  padding: 18px 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
`;

export const FilterTitle = styled.h3`
  font-size: 15px;
  font-weight: 800;
  color: #2563eb;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

export const FilterList = styled.div`
  display: grid;
  gap: 10px;
`;

export const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #374151;
  font-size: 14px;

  input {
    width: 18px;
    height: 18px;
  }
`;

export const MoreText = styled.button`
  margin-top: 12px;
  background: none;
  color: #374151;
  font-weight: 600;
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

export const ColorSwatch = styled.button<{ $color: string; $active?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 0;
  border: 2px solid ${({ $active }) => ($active ? '#2563eb' : '#d1d5db')};
  background: ${({ $color }) => $color};
  box-shadow: ${({ $active }) => ($active ? '0 0 0 2px rgba(37, 99, 235, 0.18)' : 'none')};
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const FilterActionButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  background: ${({ $primary }) => ($primary ? '#2563eb' : '#eef2ff')};
  color: ${({ $primary }) => ($primary ? 'white' : '#2563eb')};
`;

export const MainContent = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border-radius: 22px;
  padding: 20px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.07);
`;

export const Banner = styled.div`
  width: 100%;
  min-height: 470px;
  border-radius: 18px;
  background-image: url('https://cdn.hstatic.net/files/1000230347/collection/1920_x_600___cta__2a720bce889b45bf8cdc72b3bc53f623.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 22px;

  @media (max-width: 768px) {
    min-height: 220px;
  }
`;

export const Section = styled.section`
  margin-top: 10px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CategoryTitle = styled.h1`
  font-size: 42px;
  font-weight: 800;
  color: #111827;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

export const ProductCount = styled.p`
  color: #6b7280;
  font-size: 15px;
`;

export const SortBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  color: #6b7280;
  font-size: 14px;

  button {
    background: none;
    color: #6b7280;
    font-size: 14px;
    padding: 0;
  }
`;

export const SortButton = styled.button<{ $active?: boolean }>`
  background: none;
  color: ${({ $active }) => ($active ? '#2563eb' : '#6b7280')};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  padding: 0;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
`;

export const BottomLinks = styled.div`
  margin-top: 20px;
`;

export const ViewAllLink = styled(Link)`
  color: #e31e24;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s;

  &:hover {
    color: #c41a1f;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #e31e24;
  font-size: 18px;
  font-weight: 500;
`;
