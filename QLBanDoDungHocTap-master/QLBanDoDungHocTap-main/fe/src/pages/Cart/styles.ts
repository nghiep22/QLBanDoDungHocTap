import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1280px;
  margin: 40px auto;
  padding: 0 20px;
  min-height: 60vh;
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #1f2937;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  font-size: 15px;
`;

export const Alert = styled.div<{ $type: 'thanh_cong' | 'loi' }>`
  margin-bottom: 20px;
  padding: 14px 16px;
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid ${({ $type }) => ($type === 'thanh_cong' ? '#86efac' : '#fca5a5')};
  background: ${({ $type }) => ($type === 'thanh_cong' ? '#f0fdf4' : '#fef2f2')};
  color: ${({ $type }) => ($type === 'thanh_cong' ? '#166534' : '#991b1b')};
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 80px 20px;
  
  h2 {
    font-size: 24px;
    margin-bottom: 12px;
    color: #666;
  }
  
  p {
    color: #999;
    margin-bottom: 24px;
  }
`;

export const ContinueButton = styled(Link)`
  display: inline-block;
  padding: 12px 32px;
  background: #e31e24;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  transition: background 0.3s;
  
  &:hover {
    background: #c41a1f;
  }
`;

export const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #fffaf9 100%);
  border-radius: 18px;
  border: 1px solid #f3e8e8;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const ItemImage = styled.img`
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 14px;
  background: #f8fafc;
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 220px;
`;

export const ItemName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1f2937;
`;

export const ItemMeta = styled.p`
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 10px;
`;

export const ItemPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #e31e24;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e5e7eb;
`;

export const QuantityButton = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  background: #f8fafc;
  font-size: 18px;
  color: #475569;
  transition: all 0.3s;
  
  &:hover {
    border-color: #e31e24;
    color: #e31e24;
    background: #fff5f5;
  }
`;

export const Quantity = styled.span`
  font-size: 16px;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
  color: #111827;
`;

export const ItemTotal = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  min-width: 140px;
  text-align: right;
`;

export const RemoveButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8fafc;
  color: #94a3b8;
  font-size: 24px;
  transition: all 0.3s;
  
  &:hover {
    background: #e31e24;
    color: white;
  }
`;

export const CartSummary = styled.div`
  background: white;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
  height: fit-content;
  position: sticky;
  top: 100px;
  
  h3 {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 20px;
    color: #111827;
  }
`;

export const HighlightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #fff5f5;
  color: #7f1d1d;
  margin-bottom: 18px;

  strong {
    text-transform: capitalize;
    font-size: 14px;
  }

  span {
    font-size: 13px;
    line-height: 1.5;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  font-size: 15px;
  color: #64748b;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 18px;
  margin-top: 18px;
  border-top: 2px solid #f1f5f9;
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  
  span:last-child {
    color: #e31e24;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 24px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 14px 30px rgba(220, 38, 38, 0.25);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 36px rgba(220, 38, 38, 0.3);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1200;
`;

export const ModalContent = styled.div`
  width: min(720px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.24);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  h3 {
    margin: 0 0 6px;
    font-size: 26px;
    color: #111827;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 14px;
  }
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8fafc;
  color: #64748b;
  font-size: 28px;

  &:hover {
    background: #fee2e2;
    color: #dc2626;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #dbe3ee;
    border-radius: 14px;
    font-size: 15px;
    color: #111827;
    background: #fff;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: #ef4444;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
    }
  }

  textarea {
    resize: vertical;
    min-height: 96px;
  }
`;

export const OrderPreview = styled.div`
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;

  h4 {
    margin: 0 0 10px;
    font-size: 16px;
    color: #0f172a;
  }

  p {
    margin: 0 0 10px;
    color: #475569;
    line-height: 1.6;
  }

  strong {
    color: #dc2626;
    font-size: 20px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const SecondaryButton = styled.button`
  min-width: 120px;
  padding: 14px 20px;
  border-radius: 14px;
  background: #f8fafc;
  color: #334155;
  border: 1px solid #dbe3ee;
  font-weight: 600;
`;

export const SubmitButton = styled.button`
  min-width: 180px;
  padding: 14px 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  font-weight: 700;
  box-shadow: 0 14px 30px rgba(220, 38, 38, 0.25);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
