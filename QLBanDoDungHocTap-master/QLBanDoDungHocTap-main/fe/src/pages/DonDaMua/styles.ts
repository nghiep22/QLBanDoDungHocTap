import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 38px 20px 56px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 24px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 32px;
  font-weight: 800;
`;

export const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #64748b;
  font-size: 15px;
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  background: #e31e24;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(227, 30, 36, 0.2);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background: #c91b20;
    transform: translateY(-1px);
    box-shadow: 0 16px 30px rgba(227, 30, 36, 0.25);
  }
`;

export const Message = styled.div<{ $type: 'success' | 'error' }>`
  margin-bottom: 18px;
  padding: 15px 18px;
  border-radius: 12px;
  border: 1px solid ${({ $type }) => ($type === 'success' ? '#bbf7d0' : '#fecaca')};
  background: ${({ $type }) => ($type === 'success' ? '#ecfdf5' : '#fef2f2')};
  color: ${({ $type }) => ($type === 'success' ? '#047857' : '#b91c1c')};
  font-weight: 600;
`;

export const Loading = styled.div`
  padding: 22px 0;
  color: #475569;
  font-weight: 600;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.div`
  background: #fff;
  border: 1px solid #eef2f7;
  border-radius: 12px;
  padding: 22px 24px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);
`;

export const SummaryLabel = styled.div`
  color: #64748b;
  font-size: 15px;
  margin-bottom: 10px;
`;

export const SummaryValue = styled.strong<{ $danger?: boolean }>`
  display: block;
  color: ${({ $danger }) => ($danger ? '#e31e24' : '#111827')};
  font-size: 30px;
  line-height: 1.1;
`;

export const EmptyState = styled.div`
  padding: 34px 24px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  background: #fff;
  color: #64748b;
  text-align: center;
  font-weight: 600;
`;

export const OrderList = styled.div`
  display: grid;
  gap: 18px;
`;

export const OrderCard = styled.article`
  background: #fff;
  border: 1px solid #eef2f7;
  border-radius: 12px;
  padding: 22px 24px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);
`;

export const OrderHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const OrderCode = styled.strong`
  display: block;
  color: #111827;
  font-size: 18px;
  margin-bottom: 5px;
`;

export const OrderDate = styled.div`
  color: #64748b;
  font-size: 14px;
`;

export const StatusBadge = styled.div<{ $color: string; $background: string }>`
  justify-self: end;
  min-width: 112px;
  padding: 9px 14px;
  border-radius: 999px;
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  font-weight: 800;
  text-align: center;

  @media (max-width: 640px) {
    justify-self: start;
  }
`;

export const OrderMeta = styled.div`
  display: grid;
  gap: 7px;
  color: #334155;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 16px;

  strong {
    color: #111827;
  }
`;

export const ProductList = styled.div`
  border-top: 1px solid #eef2f7;
  border-bottom: 1px solid #eef2f7;
`;

export const ProductRow = styled.div`
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr) 132px;
  gap: 14px;
  align-items: center;
  padding: 14px 0;

  & + & {
    border-top: 1px solid #eef2f7;
  }

  @media (max-width: 640px) {
    grid-template-columns: 64px minmax(0, 1fr);
  }
`;

export const ProductImage = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 10px;
  object-fit: cover;
  background: #f8fafc;
  border: 1px solid #eef2f7;

  @media (max-width: 640px) {
    width: 64px;
    height: 64px;
  }
`;

export const ProductInfo = styled.div`
  min-width: 0;
`;

export const ProductName = styled.div`
  color: #111827;
  font-weight: 800;
  margin-bottom: 5px;
`;

export const ProductMeta = styled.div`
  color: #64748b;
  font-size: 14px;
  line-height: 1.45;
`;

export const ProductAmount = styled.div`
  text-align: right;

  span {
    display: block;
    color: #64748b;
    font-size: 14px;
    margin-bottom: 4px;
  }

  strong {
    color: #e31e24;
    font-size: 16px;
  }

  @media (max-width: 640px) {
    grid-column: 2;
    text-align: left;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 40px;
  margin-top: 16px;

  @media (max-width: 640px) {
    justify-content: stretch;
  }
`;

export const CancelButton = styled.button`
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid #e31e24;
  border-radius: 999px;
  background: #fff;
  color: #e31e24;
  font-weight: 800;
  transition: background 0.2s, color 0.2s, border-color 0.2s;

  &:hover:not(:disabled) {
    background: #e31e24;
    color: #fff;
  }

  &:disabled {
    border-color: #e5e7eb;
    background: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const MutedActionText = styled.span`
  color: #64748b;
  font-size: 14px;
`;
