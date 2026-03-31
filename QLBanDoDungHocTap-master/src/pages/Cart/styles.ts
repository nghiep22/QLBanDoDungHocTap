import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1280px;
  margin: 40px auto;
  padding: 0 20px;
  min-height: 60vh;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
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
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.h3`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

export const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #e31e24;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 18px;
  color: #666;
  transition: all 0.3s;
  
  &:hover {
    border-color: #e31e24;
    color: #e31e24;
  }
`;

export const Quantity = styled.span`
  font-size: 16px;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

export const ItemTotal = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  min-width: 120px;
  text-align: right;
`;

export const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  color: #999;
  font-size: 24px;
  transition: all 0.3s;
  
  &:hover {
    background: #e31e24;
    color: white;
  }
`;

export const CartSummary = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  height: fit-content;
  position: sticky;
  top: 100px;
  
  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
  color: #666;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 2px solid #f0f0f0;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  
  span:last-child {
    color: #e31e24;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  background: #e31e24;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
  
  &:hover {
    background: #c41a1f;
  }
`;
