import { goiNhieuEndpoint } from './caiDatApi';
import type { Vi, YeuCauTaoVi, YeuCauSuaVi } from '../kieu/Vi';

const BASE = '/walletbudget/api';

// Lay danh sach vi
export function layDanhSachVi(taiKhoanId: number, includeDeleted = false): Promise<Vi[]> {
    const qs = `?taiKhoanId=${taiKhoanId}&includeDeleted=${includeDeleted}`;
    return goiNhieuEndpoint<Vi[]>(
        [`${BASE}/wallets${qs}`, `${BASE}/vi${qs}`, `${BASE}/wallet${qs}`],
        { method: 'GET' }
    );
}

// Tao vi moi
export function taoVi(duLieu: YeuCauTaoVi): Promise<Vi> {
    return goiNhieuEndpoint<Vi>(
        [`${BASE}/wallets`, `${BASE}/vi`, `${BASE}/wallet`],
        { method: 'POST', data: duLieu }
    );
}

// Sua vi
export function suaVi(id: number, taiKhoanId: number, duLieu: YeuCauSuaVi): Promise<Vi> {
    const qs = `?taiKhoanId=${taiKhoanId}`;
    return goiNhieuEndpoint<Vi>(
        [`${BASE}/wallets/${id}${qs}`, `${BASE}/vi/${id}${qs}`, `${BASE}/wallet/${id}${qs}`],
        { method: 'PUT', data: duLieu }
    );
}

// Khoa/mo vi
export function khoaMoVi(id: number, duLieu: { taiKhoanId: number; isLocked: boolean }): Promise<unknown> {
    return goiNhieuEndpoint(
        [`${BASE}/wallets/${id}/lock`, `${BASE}/vi/${id}/lock`, `${BASE}/wallet/${id}/lock`],
        { method: 'PATCH', data: duLieu }
    );
}

// Xoa vi (xoa mem)
export function xoaVi(id: number, taiKhoanId: number): Promise<unknown> {
    const qs = `?taiKhoanId=${taiKhoanId}`;
    return goiNhieuEndpoint(
        [`${BASE}/wallets/${id}${qs}`, `${BASE}/vi/${id}${qs}`, `${BASE}/wallet/${id}${qs}`],
        { method: 'DELETE' }
    );
}
