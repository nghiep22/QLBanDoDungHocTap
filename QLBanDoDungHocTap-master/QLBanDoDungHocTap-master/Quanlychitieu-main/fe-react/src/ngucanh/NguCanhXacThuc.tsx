import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { TaiKhoan } from '../kieu/TaiKhoan';
import { layToken, layNguoiDung, xoaPhienDangNhap } from '../tienich/luuTru';

interface NguCanhXacThucGiaTri {
    nguoiDung: TaiKhoan | null;
    token: string | null;
    dangDangNhap: boolean;
    capNhatPhien: () => void;
    dangXuat: () => void;
}

const NguCanhXacThuc = createContext<NguCanhXacThucGiaTri>({
    nguoiDung: null,
    token: null,
    dangDangNhap: false,
    capNhatPhien: () => { },
    dangXuat: () => { },
});

export function NhaCungCapXacThuc({ children }: { children: ReactNode }) {
    const [nguoiDung, setNguoiDung] = useState<TaiKhoan | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [dangDangNhap, setDangDangNhap] = useState(true);

    const capNhatPhien = () => {
        const t = layToken();
        const u = layNguoiDung<TaiKhoan>();
        setToken(t);
        setNguoiDung(u);
        setDangDangNhap(false);
    };

    const dangXuat = () => {
        xoaPhienDangNhap();
        setToken(null);
        setNguoiDung(null);
    };

    useEffect(() => {
        capNhatPhien();
    }, []);

    return (
        <NguCanhXacThuc.Provider value={{ nguoiDung, token, dangDangNhap, capNhatPhien, dangXuat }}>
            {children}
        </NguCanhXacThuc.Provider>
    );
}

export function useDangNhap() {
    return useContext(NguCanhXacThuc);
}
