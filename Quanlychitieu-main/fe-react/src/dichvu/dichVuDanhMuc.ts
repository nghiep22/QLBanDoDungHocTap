import api from './caiDatApi';
import type { DanhMuc, YeuCauTaoDanhMuc } from '../kieu/DanhMuc';

const BASE = '/walletbudget/api/categories';

// Lay danh sach danh muc
export async function layDanhSachDanhMuc(
    taiKhoanId: number,
    loai?: string,
    trangThai = 'Hoạt động',
    includeDeleted = false
): Promise<DanhMuc[]> {
    const res = await api.get<DanhMuc[]>(BASE, {
        params: { taiKhoanId, loai: loai || undefined, status: trangThai, includeDeleted },
    });
    return res.data;
}

// Tao danh muc moi
export async function taoDanhMuc(duLieu: YeuCauTaoDanhMuc): Promise<DanhMuc> {
    const res = await api.post<DanhMuc>(BASE, {
        ...duLieu,
        trangThai: duLieu.trangThai || 'Hoạt động',
        mauSac: duLieu.mauSac || mauSacMacDinh(duLieu.loai),
    });
    return res.data;
}

// Mau sac mac dinh theo loai
function mauSacMacDinh(loai: string): string {
    if (loai === 'THU') return '#00AA00';
    if (loai === 'CHI') return '#FF6B6B';
    return '#3498DB';
}
