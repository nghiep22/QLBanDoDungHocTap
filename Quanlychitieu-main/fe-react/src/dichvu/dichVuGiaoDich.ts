import { goiNhieuEndpoint } from './caiDatApi';
import type { GiaoDich, YeuCauTaoGiaoDich, BoLocGiaoDich } from '../kieu/GiaoDich';

const BASE = '/walletbudget/api';

// Lay danh sach giao dich
export function layDanhSachGiaoDich(boLoc: BoLocGiaoDich): Promise<GiaoDich[]> {
    const params = new URLSearchParams();

    const them = (k: string, v: unknown) => {
        if (v !== undefined && v !== null && v !== '') params.append(k, String(v));
    };

    them('taiKhoanId', boLoc.taiKhoanId);
    them('from', boLoc.from);
    them('to', boLoc.to);
    them('viId', boLoc.viId);
    them('danhMucId', boLoc.danhMucId);
    them('loai', boLoc.loai);
    them('q', boLoc.q);
    them('page', boLoc.page || 1);
    them('pageSize', boLoc.pageSize || 1000);
    them('sort', boLoc.sort || 'NgayGD_desc');
    them('includeDeleted', boLoc.includeDeleted ? 'true' : 'false');

    const qs = params.toString() ? `?${params.toString()}` : '';

    return goiNhieuEndpoint<GiaoDich[]>(
        [`${BASE}/transactions${qs}`, `${BASE}/giaodich${qs}`, `${BASE}/transaction${qs}`],
        { method: 'GET' }
    );
}

// Tao giao dich moi
export function taoGiaoDich(duLieu: YeuCauTaoGiaoDich): Promise<GiaoDich> {
    return goiNhieuEndpoint<GiaoDich>(
        [`${BASE}/transactions`, `${BASE}/giaodich`, `${BASE}/transaction`],
        { method: 'POST', data: duLieu }
    );
}
