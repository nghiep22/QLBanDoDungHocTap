import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const TopBar = styled.div`
  background: #1a1a1a;
  color: white;
  font-size: 13px;
  padding: 8px 0;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopBarLeft = styled.div``;

export const TopBarRight = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    color: white;
    transition: color 0.3s;
    
    &:hover {
      color: #e31e24;
    }
  }
`;

export const MainHeader = styled.div`
  padding: 20px 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  color: #e31e24;
  
  h1 {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }
  
  span {
    font-size: 14px;
    color: #666;
  }
`;

export const SearchForm = styled.form`
  flex: 1;
  display: flex;
  max-width: 600px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-right: none;
  border-radius: 25px 0 0 25px;
  font-size: 14px;
  
  &:focus {
    border-color: #e31e24;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 24px;
  background: #e31e24;
  color: white;
  border-radius: 0 25px 25px 0;
  transition: background 0.3s;
  
  &:hover {
    background: #c41a1f;
  }
`;

export const CartButton = styled(Link)`
  position: relative;
  padding: 12px;
  color: #333;
  transition: color 0.3s;
  
  &:hover {
    color: #e31e24;
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #e31e24;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

export const NavBar = styled.nav`
  background: #f5f5f5;
  border-top: 1px solid #e0e0e0;
`;

export const NavContent = styled.div`
  display: flex;
  gap: 40px;
  padding: 15px 0;
`;

export const NavLink = styled(Link)`
  color: #333;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s;
  
  &:hover {
    color: #e31e24;
  }
`;
