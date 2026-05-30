import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 38px 20px 56px;
  min-height: 60vh;
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  margin-bottom: 26px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px;
  color: #111827;
`;

export const Subtitle = styled.p`
  color: #6b7280;
  font-size: 15px;
`;

export const Alert = styled.div<{ $type: 'thanh_cong' | 'loi' }>`
  margin-bottom: 20px;
  padding: 15px 18px;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid ${({ $type }) => ($type === 'thanh_cong' ? '#86efac' : '#fca5a5')};
  background: ${({ $type }) => ($type === 'thanh_cong' ? '#f0fdf4' : '#fef2f2')};
  color: ${({ $type }) => ($type === 'thanh_cong' ? '#166534' : '#991b1b')};
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 72px 20px;
  background: #fff;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;
  background: #e31e24;
  color: white;
  border-radius: 999px;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(227, 30, 36, 0.2);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    background: #c41a1f;
    transform: translateY(-1px);
    box-shadow: 0 16px 30px rgba(227, 30, 36, 0.25);
  }
`;

export const CartContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr) auto 142px 40px;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eef2f7;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);

  @media (max-width: 900px) {
    grid-template-columns: 92px minmax(0, 1fr) 40px;
    align-items: start;
  }

  @media (max-width: 560px) {
    grid-template-columns: 76px minmax(0, 1fr);
    gap: 12px;
    padding: 14px;
  }
`;

export const ItemImage = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #eef2f7;

  @media (max-width: 900px) {
    width: 92px;
    height: 92px;
  }

  @media (max-width: 560px) {
    width: 76px;
    height: 76px;
  }
`;

export const ItemInfo = styled.div`
  min-width: 0;
`;

export const ItemName = styled.h3`
  font-size: 18px;
  line-height: 1.35;
  font-weight: 800;
  margin: 0 0 7px;
  color: #111827;
`;

export const ItemMeta = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0 0 9px;
`;

export const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: 800;
  color: #e31e24;
  margin: 0;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
  border-radius: 999px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;

  @media (max-width: 900px) {
    grid-column: 2;
    width: fit-content;
    margin-top: 10px;
  }
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  background: #fff;
  font-size: 18px;
  color: #475569;
  transition: all 0.2s;
  
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
  min-width: 132px;
  text-align: right;

  @media (max-width: 900px) {
    grid-column: 2;
    text-align: left;
    min-width: 0;
    margin-top: 8px;
  }
`;

export const RemoveButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f8fafc;
  color: #94a3b8;
  font-size: 24px;
  transition: all 0.2s;
  
  &:hover {
    background: #e31e24;
    color: white;
  }

  @media (max-width: 560px) {
    grid-column: 2;
    justify-self: end;
  }
`;

export const CartSummary = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #eef2f7;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.07);
  height: fit-content;
  position: sticky;
  top: 20px;
  
  h3 {
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 18px;
    color: #111827;
  }
`;

export const HighlightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 15px;
  border-radius: 10px;
  background: #fff5f5;
  border: 1px solid #fee2e2;
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
  gap: 16px;
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
  min-height: 48px;
  padding: 0 16px;
  margin-top: 24px;
  background: #e31e24;
  color: white;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 800;
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
  border-radius: 12px;
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
    font-size: 24px;
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
    border-radius: 10px;
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
  border-radius: 10px;
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
  border-radius: 999px;
  background: #f8fafc;
  color: #334155;
  border: 1px solid #dbe3ee;
  font-weight: 600;
`;

export const SubmitButton = styled.button`
  min-width: 180px;
  padding: 14px 20px;
  border-radius: 999px;
  background: #e31e24;
  color: white;
  font-weight: 700;
  box-shadow: 0 14px 30px rgba(220, 38, 38, 0.25);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
