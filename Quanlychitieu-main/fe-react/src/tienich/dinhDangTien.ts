// dinh dang tien VND
export function dinhDangTien(soTien: number): string {
    return soTien.toLocaleString('vi-VN') + ' ₫';
}

// dinh dang tien co dau + hoac -
export function dinhDangTienCoDau(soTien: number, loai: 'THU' | 'CHI'): string {
    const dau = loai === 'THU' ? '+' : '-';
    return `${dau}${Math.abs(soTien).toLocaleString('vi-VN')} ₫`;
}
