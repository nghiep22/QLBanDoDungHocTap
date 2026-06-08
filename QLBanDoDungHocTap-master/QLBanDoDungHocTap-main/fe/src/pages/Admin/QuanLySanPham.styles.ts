import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 22px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  h2 {
    margin: 0;
    color: #111827;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 0;
  }

  > div {
    flex-wrap: wrap;
  }

  @media (max-width: 820px) {
    flex-direction: column;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  min-width: 280px;
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  color: #111827;
  background: #ffffff;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.16);
  }

  @media (max-width: 640px) {
    min-width: 0;
    width: 100%;
  }
`;

export const Button = styled.button`
  min-height: 42px;
  padding: 0 16px;
  background: #2563eb;
  color: #ffffff;
  border: 1px solid #2563eb;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;

  &:hover:not(:disabled) {
    background: #1d4ed8;
    border-color: #1d4ed8;
    color: #fff;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const Thongbao = styled.div<{ $loai: 'thanh_cong' | 'loi' }>`
  padding: 14px 16px;
  border-radius: 10px;
  background: ${props => props.$loai === 'thanh_cong' ? '#ecfdf5' : '#fef2f2'};
  color: ${props => props.$loai === 'thanh_cong' ? '#047857' : '#b91c1c'};
  border: 1px solid ${props => props.$loai === 'thanh_cong' ? '#86efac' : '#fecaca'};
  font-weight: 600;
`;

export const Loading = styled.div`
  padding: 20px;
  color: #374151;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 860px;
  border-collapse: separate;
  border-spacing: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.08);

  thead {
    background: #1f2937;

    th {
      padding: 14px 16px;
      text-align: left;
      font-size: 12px;
      font-weight: 800;
      color: #f8fafc;
      text-transform: uppercase;
      white-space: nowrap;
      border-bottom: 1px solid #1f2937;
    }
  }

  tbody {
    tr {
      transition: background 0.2s;

      &:hover {
        background: #f3f4f6;
      }

      &:not(:last-child) td {
        border-bottom: 1px solid #e5e7eb;
      }

      td {
        padding: 14px 16px;
        color: #374151;
        vertical-align: middle;
        font-size: 14px;
      }
    }
  }

  @media (max-width: 1024px) {
    display: block;
    overflow-x: auto;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;

  strong {
    color: #111827;
  }
`;

export const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
`;

export const Badge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 92px;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
  line-height: 1;
  background: ${props => props.$active ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.$active ? '#166534' : '#991b1b'};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const SmallActionButton = styled.button`
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 9px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
`;

export const EditButton = styled(SmallActionButton)`
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #bfdbfe;

  &:hover {
    background: #1d4ed8;
    color: #fff;
    border-color: #1d4ed8;
  }
`;

export const DeleteButton = styled(SmallActionButton)`
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;

  &:hover {
    background: #ef4444;
    color: #fff;
    border-color: #ef4444;
  }
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.68);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: min(780px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.24);
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
  background: #1f2937;
  border-bottom: 1px solid #1f2937;

  h3 {
    margin: 0;
    color: #f8fafc;
    font-size: 20px;
    font-weight: 800;
  }
`;

export const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background: #fff7ed;
    border-color: #fecaca;
    color: #ef4444;
  }
`;

export const Form = styled.form`
  padding: 22px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    margin-bottom: 7px;
    color: #374151;
    font-weight: 700;
    font-size: 13px;
  }

  input,
  select,
  textarea {
    min-height: 42px;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    color: #111827;
    background: #ffffff;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.16);
    }
  }

  textarea {
    resize: vertical;
    min-height: 90px;
  }
`;

export const HelperText = styled.small`
  margin-top: 5px;
  font-size: 12px;
  color: #6b7280;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  min-height: 42px;
  padding: 0 18px;
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;

  &:hover {
    background: #f3f4f6;
  }
`;

export const SubmitButton = styled.button`
  min-height: 42px;
  padding: 0 20px;
  background: #059669;
  color: #ffffff;
  border: 1px solid #059669;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(5, 150, 105, 0.22);

  &:hover:not(:disabled) {
    background: #047857;
    border-color: #047857;
    color: #fff;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
