import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Banner = styled.div`
  background: linear-gradient(135deg, #e31e24 0%, #c41a1f 100%);
  border-radius: 12px;
  padding: 60px 40px;
  margin: 30px 0;
  color: white;
  text-align: center;
`;

export const BannerContent = styled.div`
  h1 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  
  p {
    font-size: 18px;
    opacity: 0.9;
  }
`;

export const FilterSection = styled.div`
  margin: 40px 0;
`;

export const FilterTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 10px 24px;
  background: ${props => props.active ? '#e31e24' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 2px solid ${props => props.active ? '#e31e24' : '#e0e0e0'};
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    background: ${props => props.active ? '#c41a1f' : '#f5f5f5'};
    border-color: #e31e24;
  }
`;

export const Section = styled.section`
  margin: 50px 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

export const ViewAllLink = styled(Link)`
  color: #e31e24;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s;
  
  &:hover {
    color: #c41a1f;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;
