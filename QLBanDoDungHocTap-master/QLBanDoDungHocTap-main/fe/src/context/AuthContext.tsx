import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { dichVuApi } from '../services/api';
import { KetQuaDangNhap, NguoiDung, YeuCauDangNhap } from '../types';

interface KieuAuthContext {
  nguoiDung: NguoiDung | null;
  token: string | null;
  dangNhap: (duLieu: YeuCauDangNhap) => Promise<KetQuaDangNhap>;
  capNhatNguoiDung: (ketQua: KetQuaDangNhap) => void;
  dangXuat: () => void;
  daDangNhap: boolean;
  dangTai: boolean;
}

const AuthContext = createContext<KieuAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [dangTai, setDangTai] = useState(true);

  useEffect(() => {
    const tokenDaLuu = localStorage.getItem('token');
    const nguoiDungDaLuu = localStorage.getItem('user');

    if (tokenDaLuu && nguoiDungDaLuu) {
      setToken(tokenDaLuu);
      setNguoiDung(JSON.parse(nguoiDungDaLuu));
    }

    setDangTai(false);
  }, []);

  const luuPhienDangNhap = (ketQua: KetQuaDangNhap) => {
    setToken(ketQua.token);
    setNguoiDung(ketQua.user);
    localStorage.setItem('token', ketQua.token);
    localStorage.setItem('user', JSON.stringify(ketQua.user));
  };

  const dangNhap = async (duLieu: YeuCauDangNhap): Promise<KetQuaDangNhap> => {
    const ketQua = await dichVuApi.dangNhap(duLieu);
    luuPhienDangNhap(ketQua);
    return ketQua;
  };

  const dangXuat = () => {
    setToken(null);
    setNguoiDung(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        nguoiDung,
        token,
        dangNhap,
        capNhatNguoiDung: luuPhienDangNhap,
        dangXuat,
        daDangNhap: !!token,
        dangTai,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useDangNhap = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useDangNhap phải được sử dụng trong AuthProvider');
  }

  return context;
};

export const useAuth = useDangNhap;
