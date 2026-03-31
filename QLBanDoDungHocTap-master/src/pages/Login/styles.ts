import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 440px;
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #e31e24;
    line-height: 1;
    margin-bottom: 4px;
  }
  
  span {
    font-size: 14px;
    color: #666;
  }
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #666;
  margin-bottom: 32px;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #fcc;
`;

export const Form = styled.form``;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  
  &:focus {
    border-color: #e31e24;
    outline: none;
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  font-size: 14px;
  color: #e31e24;
  margin-bottom: 24px;
  transition: color 0.3s;
  
  &:hover {
    color: #c41a1f;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #e31e24;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    background: #c41a1f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(227, 30, 36, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const InfoBox = styled.div`
  background: #fff3cd;
  border: 1px solid #ffc107;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 13px;
  
  strong {
    display: block;
    color: #856404;
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  p {
    margin: 4px 0;
    color: #555;
  }
  
  code {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
  }
  
  small {
    display: block;
    margin-top: 8px;
    color: #666;
    font-style: italic;
  }
  
  br {
    margin: 8px 0;
  }
`;

export const Footer = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #666;
  
  a {
    color: #e31e24;
    font-weight: 600;
    transition: color 0.3s;
    
    &:hover {
      color: #c41a1f;
    }
  }
`;

export const BackToHome = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #999;
  transition: color 0.3s;
  
  &:hover {
    color: #666;
  }
`;
