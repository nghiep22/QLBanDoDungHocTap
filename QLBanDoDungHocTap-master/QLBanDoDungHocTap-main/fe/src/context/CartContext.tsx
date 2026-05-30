import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SanPham, GioHang } from '../types';

interface CartContextType {
  gioHang: GioHang[];
  themVaoGio: (sanPham: SanPham, soLuong?: number) => void;
  xoaKhoiGio: (sanPhamId: number) => void;
  capNhatSoLuong: (sanPhamId: number, soLuong: number) => void;
  xoaToanBoGio: () => void;
  tongSoLuong: number;
  tongTien: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [gioHang, setGioHang] = useState<GioHang[]>(() => {
    const saved = localStorage.getItem('gioHang');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gioHang', JSON.stringify(gioHang));
  }, [gioHang]);

  const themVaoGio = (sanPham: SanPham, soLuong = 1) => {
    setGioHang(prev => {
      const existing = prev.find(item => item.sanPham.id === sanPham.id);
      if (existing) {
        return prev.map(item =>
          item.sanPham.id === sanPham.id
            ? { ...item, soLuong: item.soLuong + soLuong }
            : item
        );
      }
      return [...prev, { sanPham, soLuong }];
    });
  };

  const xoaKhoiGio = (sanPhamId: number) => {
    setGioHang(prev => prev.filter(item => item.sanPham.id !== sanPhamId));
  };

  const capNhatSoLuong = (sanPhamId: number, soLuong: number) => {
    if (soLuong <= 0) {
      xoaKhoiGio(sanPhamId);
      return;
    }
    setGioHang(prev =>
      prev.map(item =>
        item.sanPham.id === sanPhamId ? { ...item, soLuong } : item
      )
    );
  };

  const xoaToanBoGio = () => {
    setGioHang([]);
  };

  const tongSoLuong = gioHang.reduce((sum, item) => sum + item.soLuong, 0);
  const tongTien = gioHang.reduce((sum, item) => sum + item.sanPham.giaBan * item.soLuong, 0);

  return (
    <CartContext.Provider
      value={{
        gioHang,
        themVaoGio,
        xoaKhoiGio,
        capNhatSoLuong,
        xoaToanBoGio,
        tongSoLuong,
        tongTien,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
