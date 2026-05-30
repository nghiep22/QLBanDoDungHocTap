import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #f1f5f9;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;

  &:hover {
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.14);
    transform: translateY(-4px);
    border-color: rgba(37, 99, 235, 0.18);
  }
`;

export const Badge = styled.span<{ color: string }>`
  position: absolute;
  top: 14px;
  left: 14px;
  background: ${props => props.color === 'success' ? '#2563eb' : '#e31e24'};
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  z-index: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const DiscountBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #111827;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  z-index: 1;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;

  ${Card}:hover & {
    transform: scale(1.06);
  }
`;

export const Content = styled.div`
  padding: 16px 16px 18px;
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
  line-height: 1.5;
  min-height: 42px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const SoldCount = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 10px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const Price = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #e31e24;
`;

export const OriginalPrice = styled.span`
  font-size: 14px;
  color: #9ca3af;
  text-decoration: line-through;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const QuickViewButton = styled.button`
  flex: 1;
  padding: 11px;
  background: white;
  color: #e31e24;
  border: 1px solid #fecaca;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  transition: all 0.25s ease;

  &:hover {
    background: #e31e24;
    border-color: #e31e24;
    color: white;
  }
`;

export const AddToCartButton = styled.button`
  padding: 11px 16px;
  background: linear-gradient(135deg, #e31e24 0%, #b8181d 100%);
  color: white;
  border-radius: 999px;
  font-weight: 800;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(227, 30, 36, 0.22);
  }
`;
