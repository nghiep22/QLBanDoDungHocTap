// dinh dang ngay tu ISO sang dd/MM/yyyy
export function dinhDangNgay(raw: string): string {
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    const ngay = String(d.getDate()).padStart(2, '0');
    const thang = String(d.getMonth() + 1).padStart(2, '0');
    const nam = d.getFullYear();
    return `${ngay}/${thang}/${nam}`;
}

// lay ngay hom nay dang ISO (yyyy-MM-dd)
export function homNayISO(): string {
    const d = new Date();
    const nam = d.getFullYear();
    const thang = String(d.getMonth() + 1).padStart(2, '0');
    const ngay = String(d.getDate()).padStart(2, '0');
    return `${nam}-${thang}-${ngay}`;
}
