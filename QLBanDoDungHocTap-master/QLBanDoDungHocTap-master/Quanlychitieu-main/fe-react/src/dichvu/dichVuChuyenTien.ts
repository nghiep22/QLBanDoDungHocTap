import { goiNhieuEndpoint } from './caiDatApi';
import type { YeuCauChuyenTien } from '../kieu/ChuyenTien';

const BASE = '/walletbudget/api';

// Chuyen tien giua cac vi
export function chuyenTienGiuaVi(duLieu: YeuCauChuyenTien): Promise<unknown> {
    return goiNhieuEndpoint(
        [`${BASE}/wallettransfer/transfer`, `${BASE}/wallettransfer`, `${BASE}/transfer`],
        { method: 'POST', data: duLieu }
    );
}
