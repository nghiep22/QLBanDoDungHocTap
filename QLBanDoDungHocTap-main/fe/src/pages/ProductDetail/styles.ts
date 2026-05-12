import styled from 'styled-components';

export const PageWrap = styled.div`
  background: #f7fbff;
  min-height: 100vh;
  padding: 32px 0 56px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const BackButton = styled.button`
  border: none;
  background: transparent;
  color: #2563eb;
  font-weight: 700;
  margin-bottom: 18px;
  cursor: pointer;
`;

export const StatusText = styled.p`
  padding: 24px 0;
  color: #6b7280;
`;

export const ErrorBox = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: #fee2e2;
  color: #b91c1c;
  font-weight: 600;
`;

export const DetailCard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 28px;
  padding: 24px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageSection = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #f8fafc;
`;

export const DiscountBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  padding: 8px 12px;
  border-radius: 999px;
  background: #111827;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
`;

export const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
`;

export const InfoSection = styled.div`
  display: grid;
  gap: 18px;
`;

export const Brand = styled.p`
  color: #2563eb;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 13px;
`;

export const Title = styled.h1`
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.15;
  color: #111827;
`;

export const Sku = styled.p`
  color: #6b7280;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const Price = styled.span`
  font-size: 34px;
  font-weight: 800;
  color: #e31e24;
`;

export const OriginalPrice = styled.span`
  font-size: 18px;
  color: #9ca3af;
  text-decoration: line-through;
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  div {
    padding: 14px 16px;
    border-radius: 16px;
    background: #f8fafc;
  }

  span {
    display: block;
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 6px;
  }

  strong {
    color: #111827;
  }
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    color: #6b7280;
    font-weight: 600;
  }
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${props => props.$active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$active ? '#155724' : '#721c24'};
  font-weight: 700;
`;

export const DescriptionBox = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;

  h3 {
    margin-bottom: 8px;
    color: #111827;
  }

  p {
    color: #4b5563;
    line-height: 1.7;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #e31e24 0%, #b8181d 100%);
  color: #fff;
  font-weight: 700;
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #dbe3f0;
  color: #1f2937;
  font-weight: 700;
`;
