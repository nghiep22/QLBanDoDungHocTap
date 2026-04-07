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
              Facebook
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </S.SocialLinks>
        </S.FooterBottom>
      </S.Container>
    </S.FooterWrapper>
  );
};
