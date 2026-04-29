import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 60px 0 20px;
  margin-top: 80px;
`;

export const Container = styled.div`


  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const FooterColumn = styled.div``;

export const Logo = styled.div`
  margin-bottom: 16px;
  
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #e31e24;
    line-height: 1;
  }
  
  span {
    font-size: 14px;
    color: #999;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 20px;
`;

export const Contact = styled.div`
  font-size: 14px;
  line-height: 1.8;
  color: #ccc;
  
  strong {
    color: #e31e24;
    font-weight: 600;
  }
`;

export const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: white;
`;

export const LinkList = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    font-size: 14px;
    color: #ccc;
    transition: color 0.3s;
    
    &:hover {
      color: #e31e24;
    }
  }
`;

export const FooterBottom = styled.div`
  padding-top: 30px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p {
    font-size: 13px;
    color: #999;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  
  a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s;
    
    &:hover {
      background: #e31e24;
      transform: translateY(-2px);
    }
  }
`;
