import { Outlet } from 'react-router-dom';
import ThanhTieuDe, { ThanhDieuHuong, ChanTrang } from './ThanhTieuDe';

export default function BoKhungChinh() {
    return (
        <>
            <ThanhTieuDe />
            <ThanhDieuHuong />
            <main className="container">
                <Outlet />
            </main>
            <ChanTrang />
        </>
    );
}
