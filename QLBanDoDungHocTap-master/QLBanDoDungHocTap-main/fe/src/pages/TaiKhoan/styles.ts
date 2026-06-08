import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 42px 20px 64px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 30px;
  color: #111827;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  color: #6b7280;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: #eef2ff;
  color: #3730a3;
  font-weight: 700;
  font-size: 13px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.06);
`;

export const PanelTitle = styled.h2`
  font-size: 20px;
  color: #111827;
  margin-bottom: 6px;
`;

export const PanelDescription = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 22px;
`;

export const Form = styled.form`
  display: grid;
  gap: 18px;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #111827;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #e31e24;
    box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.12);
  }

  &:disabled {
    background: #f9fafb;
    color: #6b7280;
  }
`;

export const InfoList = styled.dl`
  display: grid;
  gap: 12px;
  margin-bottom: 22px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;

  dt {
    color: #6b7280;
  }

  dd {
    color: #111827;
    font-weight: 700;
    text-align: right;
  }
`;

export const Button = styled.button`
  justify-self: start;
  padding: 12px 18px;
  border: 0;
  border-radius: 8px;
  background: #e31e24;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background: #c41a1f;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const Message = styled.div<{ $type: 'success' | 'error' }>`
  padding: 12px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  background: ${({ $type }) => ($type === 'success' ? '#ecfdf5' : '#fef2f2')};
  color: ${({ $type }) => ($type === 'success' ? '#047857' : '#b91c1c')};
  border: 1px solid ${({ $type }) => ($type === 'success' ? '#a7f3d0' : '#fecaca')};
`;
