import { Link } from 'react-router-dom';
import * as S from './styles';

export const Footer = () => {
  return (
    <S.FooterWrapper>
      <S.Container>
        <S.FooterContent>
          <S.FooterColumn>
            <S.Logo>
              <h2>THIÊN LONG</h2>
              <span>Shop</span>
            </S.Logo>
            <S.Description>
              Website thương mại điện tử chuyên cung cấp đồ dùng học tập chất lượng cao
            </S.Description>
            <S.Contact>
              <p>Hotline: <strong>1900 866 819</strong></p>
              <p>Email: salesonline@thienlongvn.com</p>
              <p>Thứ 2 - Thứ 6 (8h - 17h)</p>
            </S.Contact>
          </S.FooterColumn>

          <S.FooterColumn>
            <S.ColumnTitle>Hỗ trợ khách hàng</S.ColumnTitle>
            <S.LinkList>
              <li><Link to="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link></li>
              <li><Link to="/huong-dan-thanh-toan">Hướng dẫn thanh toán</Link></li>
              <li><Link to="/chinh-sach-giao-hang">Chính sách giao hàng</Link></li>
              <li><Link to="/chinh-sach-doi-tra">Chính sách đổi trả</Link></li>
              <li><Link to="/kiem-tra-don-hang">Kiểm tra đơn hàng</Link></li>
            </S.LinkList>
          </S.FooterColumn>

          <S.FooterColumn>
            <S.ColumnTitle>Về Thiên Long</S.ColumnTitle>
            <S.LinkList>
              <li><Link to="/gioi-thieu">Giới thiệu</Link></li>
              <li><Link to="/lien-he">Liên hệ</Link></li>
              <li><Link to="/tuyen-dung">Tuyển dụng</Link></li>
              <li><Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
              <li><Link to="/dieu-khoan-su-dung">Điều khoản sử dụng</Link></li>
            </S.LinkList>
          </S.FooterColumn>

          <S.FooterColumn>
            <S.ColumnTitle>Danh mục sản phẩm</S.ColumnTitle>
            <S.LinkList>
              <li><Link to="/danh-muc/but-viet">Bút viết</Link></li>
              <li><Link to="/danh-muc/van-phong-pham">Văn phòng phẩm</Link></li>
              <li><Link to="/danh-muc/dung-cu-hoc-tap">Dụng cụ học tập</Link></li>
              <li><Link to="/danh-muc/my-thuat">Mỹ thuật</Link></li>
              <li><Link to="/danh-muc/giay-in">Giấy in</Link></li>
            </S.LinkList>
          </S.FooterColumn>
        </S.FooterContent>

        <S.FooterBottom>
          <p>© 2026 Thiên Long Shop. Bản quyền thuộc về Công ty TNHH MTV TM-DV Thiên Long Hoàn Cầu</p>
          <S.SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </S.SocialLinks>
        </S.FooterBottom>
      </S.Container>
    </S.FooterWrapper>
  );
};
