import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    transform: translateY(-4px);
  }
`;

export const Badge = styled.span<{ color: string }>`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${props => props.color === 'success' ? '#28a745' : '#e31e24'};
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1;
`;

export const DiscountBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e31e24;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  background: #f9f9f9;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const Content = styled.div`
  padding: 16px;
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const SoldCount = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #e31e24;
`;

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const QuickViewButton = styled.button`
  flex: 1;
  padding: 10px;
  background: white;
  color: #e31e24;
  border: 1px solid #e31e24;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    background: #e31e24;
    color: white;
  }
`;

export const AddToCartButton = styled.button`
  padding: 10px 16px;
  background: #e31e24;
  color: white;
  border-radius: 4px;
  transition: background 0.3s;
  
  &:hover {
    background: #c41a1f;
  }
`;
