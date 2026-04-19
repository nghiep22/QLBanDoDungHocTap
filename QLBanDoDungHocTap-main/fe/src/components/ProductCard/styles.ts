import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    box-shadow: 0 22px 50px rgba(15, 23, 42, 0.14);
    transform: translateY(-6px);
    border-color: rgba(227, 30, 36, 0.2);
  }
`;

export const Badge = styled.span<{ color: string }>`
  position: absolute;
  top: 16px;
  left: 16px;
  background: ${props => props.color === 'success' ? '#22c55e' : '#e31e24'};
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
  padding: 20px;
`;

export const Title = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
  line-height: 1.5;
  min-height: 46px;
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
  font-size: 22px;
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
  padding: 12px;
  background: #fff5f5;
  color: #b8181d;
  border: 1px solid #ffd7d8;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.25s ease;

  &:hover {
    background: #e31e24;
    border-color: #e31e24;
    color: white;
  }
`;

export const AddToCartButton = styled.button`
  padding: 12px 18px;
  background: linear-gradient(135deg, #e31e24 0%, #b8181d 100%);
  color: white;
  border-radius: 14px;
  font-weight: 700;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(227, 30, 36, 0.22);
  }
`;
