import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
`;

export const TopBar = styled.div`
  background: linear-gradient(90deg, #111827 0%, #1f2937 100%);
  color: white;
  font-size: 13px;
  padding: 10px 0;
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
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TopBarLeft = styled.div`
  opacity: 0.9;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;

  a,
  button,
  span {
    color: white;
    transition: color 0.25s ease, opacity 0.25s ease;
  }

  a:hover,
  button:hover {
    color: #ffd7d8;
  }
`;

export const MainHeader = styled.div`
  padding: 18px 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  color: #e31e24;

  h1 {
    font-size: 30px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 1px;
  }

  span {
    margin-top: 4px;
    font-size: 13px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const SearchForm = styled.form`
  flex: 1;
  display: flex;
  max-width: 640px;
  min-width: 280px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: 1px solid #e5e7eb;
  border-right: none;
  border-radius: 999px 0 0 999px;
  font-size: 14px;
  background: #f8fafc;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;

  &:focus {
    border-color: #e31e24;
    background: white;
    box-shadow: inset 0 0 0 1px #e31e24;
  }
`;

export const SearchButton = styled.button`
  padding: 14px 26px;
  background: linear-gradient(135deg, #e31e24 0%, #b8181d 100%);
  color: white;
  border-radius: 0 999px 999px 0;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(227, 30, 36, 0.22);
  }
`;

export const CartButton = styled(Link)`
  position: relative;
  padding: 12px 18px;
  border-radius: 999px;
  background: #fff5f5;
  color: #b8181d;
  font-weight: 600;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;

  &:hover {
    background: #e31e24;
    color: white;
    transform: translateY(-1px);
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -2px;
  background: #111827;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 999px;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 8px 18px rgba(17, 24, 39, 0.22);
`;

export const NavBar = styled.nav`
  background: rgba(248, 250, 252, 0.92);
  border-top: 1px solid #eef2f7;
`;

export const NavContent = styled.div`
  display: flex;
  gap: 14px;
  padding: 14px 0 16px;
  flex-wrap: wrap;
`;

export const NavLink = styled(Link)`
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 999px;
  background: transparent;
  transition: color 0.25s ease, background 0.25s ease, transform 0.25s ease;

  &:hover {
    color: #b8181d;
    background: #fff1f1;
    transform: translateY(-1px);
  }
`;
