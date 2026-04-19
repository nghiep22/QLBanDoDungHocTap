import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px 48px;
`;

export const HeroGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 24px;
  margin: 32px 0 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const Banner = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 35%, #e31e24 100%);
  border-radius: 28px;
  padding: 84px 40px;
  color: white;
  box-shadow: 0 28px 60px rgba(37, 99, 235, 0.20);

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  &::before {
    width: 220px;
    height: 220px;
    top: -70px;
    left: -50px;
  }

  &::after {
    width: 260px;
    height: 260px;
    bottom: -120px;
    right: -40px;
  }

  @media (max-width: 768px) {
    padding: 64px 24px;
    border-radius: 22px;
  }
`;

export const BannerContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 760px;

  h1 {
    font-size: clamp(32px, 5vw, 54px);
    font-weight: 800;
    line-height: 1.08;
    margin-bottom: 16px;
  }

  p {
    font-size: clamp(16px, 2vw, 20px);
    opacity: 0.92;
    max-width: 620px;
  }
`;

export const BadgeLabel = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 18px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

export const PrimaryAction = styled.button`
  padding: 14px 22px;
  border-radius: 999px;
  background: white;
  color: #1d4ed8;
  font-weight: 700;
  box-shadow: 0 16px 30px rgba(255, 255, 255, 0.18);
`;

export const SecondaryAction = styled.button`
  padding: 14px 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 700;
`;

export const SideHighlights = styled.div`
  display: grid;
  gap: 18px;
`;

export const HighlightCard = styled.div`
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(10px);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);

  h3 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #111827;
  }

  p {
    color: #6b7280;
    line-height: 1.6;
  }
`;

export const FilterSection = styled.div`
  margin: 20px 0 48px;
  padding: 28px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
`;

export const FilterTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #1f2937;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 11px 22px;
  background: ${props => props.active ? 'linear-gradient(135deg, #e31e24 0%, #b8181d 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  border: 1px solid ${props => props.active ? '#e31e24' : '#e5e7eb'};
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: ${props => props.active ? '0 12px 24px rgba(227, 30, 36, 0.18)' : 'none'};
  transition: all 0.25s ease;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #e31e24 0%, #b8181d 100%)' : '#fff5f5'};
    border-color: #e31e24;
    color: ${props => props.active ? 'white' : '#b8181d'};
    transform: translateY(-1px);
  }
`;

export const Section = styled.section`
  margin: 56px 0;
`;

export const QuickCategorySection = styled.section`
  margin: 56px 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
`;

export const SectionText = styled.p`
  margin-top: 8px;
  color: #6b7280;
  line-height: 1.6;
`;

export const ViewAllLink = styled(Link)`
  color: #e31e24;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.25s ease;

  &:hover {
    color: #b8181d;
  }
`;

export const QuickCategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
`;

export const QuickCategoryCard = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid #eef2f7;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.06);

  h3 {
    margin-bottom: 6px;
    font-size: 18px;
    color: #111827;
  }

  p {
    color: #6b7280;
    line-height: 1.5;
    font-size: 14px;
  }
`;

export const QuickCategoryIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #1d4ed8;
  background: #eff6ff;
  flex-shrink: 0;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
`;

export const ShowcaseSection = styled.section`
  margin: 56px 0;
`;

export const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const ShowcaseCard = styled.div<{ $accent: 'blue' | 'red' | 'yellow' | 'green' }>`
  padding: 28px;
  border-radius: 26px;
  color: white;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: ${({ $accent }) =>
    $accent === 'blue'
      ? 'linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)'
      : $accent === 'red'
      ? 'linear-gradient(135deg, #e31e24 0%, #fb7185 100%)'
      : $accent === 'yellow'
      ? 'linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%)'
      : 'linear-gradient(135deg, #059669 0%, #34d399 100%)'};
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.10);

  span {
    display: inline-block;
    margin-bottom: 12px;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    opacity: 0.88;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    line-height: 1.6;
    opacity: 0.92;
  }
`;

export const InfoSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 24px;
  margin: 56px 0;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturePanel = styled.div`
  padding: 28px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.07);
`;

export const FeatureList = styled.div`
  display: grid;
  gap: 14px;
`;

export const FeatureItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  padding: 18px 20px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #eef2f7;

  h4 {
    margin-bottom: 6px;
    color: #111827;
    font-size: 16px;
  }

  p {
    color: #6b7280;
    font-size: 14px;
  }

  strong {
    color: #e31e24;
    font-size: 18px;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BlogPanel = styled.div`
  padding: 28px;
  border-radius: 26px;
  background: linear-gradient(180deg, #ffffff 0%, #eff6ff 100%);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.07);
`;

export const BlogList = styled.div`
  display: grid;
  gap: 16px;
`;

export const BlogCard = styled.article`
  padding: 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #dbeafe;

  span {
    font-size: 13px;
    font-weight: 700;
    color: #2563eb;
  }

  h3 {
    margin: 10px 0 8px;
    font-size: 18px;
    color: #111827;
    line-height: 1.4;
  }

  p {
    color: #6b7280;
    line-height: 1.6;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  padding: 52px;
  color: #6b7280;
  font-size: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
`;
