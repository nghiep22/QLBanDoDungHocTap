import { Navigate } from 'react-router-dom';
import { useDangNhap } from '../../ngucanh/NguCanhXacThuc';

interface Props {
    children: React.ReactNode;
    quyen?: string;  // vd: "admin"
}

export default function DuongDanBaoVe({ children, quyen }: Props) {
    const { token, nguoiDung, dangDangNhap } = useDangNhap();

    if (dangDangNhap) return <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</div>;

    if (!token) return <Navigate to="/dang-nhap" replace />;

    if (quyen && nguoiDung?.quyen?.toLowerCase() !== quyen.toLowerCase()) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
