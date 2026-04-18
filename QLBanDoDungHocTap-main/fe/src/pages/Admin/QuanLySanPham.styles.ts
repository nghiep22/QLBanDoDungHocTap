import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    color: #333;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #45a049;
  }
`;

export const Thongbao = styled.div<{ $loai: 'thanh_cong' | 'loi' }>`
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  background: ${props => props.$loai === 'thanh_cong' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$loai === 'thanh_cong' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.$loai === 'thanh_cong' ? '#c3e6cb' : '#f5c6cb'};
`;

export const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;

  thead {
    background: #f5f5f5;
    
    th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #ddd;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #eee;

      &:hover {
        background: #f9f9f9;
      }

      td {
        padding: 12px;
        color: #666;
      }
    }
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
`;

export const Badge = styled.span<{ $active: boolean }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.$active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$active ? '#155724' : '#721c24'};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  padding: 6px 12px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #1976d2;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #d32f2f;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  h3 {
    margin: 0;
    color: #333;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

export const Form = styled.form`
  padding: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    margin-bottom: 5px;
    color: #333;
    font-weight: 500;
    font-size: 14px;
  }

  input, select, textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }

  textarea {
    resize: vertical;
  }
`;

export const HelperText = styled.small`
  margin-top: 4px;
  font-size: 12px;
  color: #666;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #e0e0e0;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
