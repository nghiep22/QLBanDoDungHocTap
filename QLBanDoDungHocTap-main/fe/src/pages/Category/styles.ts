import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 60vh;
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
