import api from './caiDatApi';

const BASE = '/api/dohoctap';

// === DO HOC TAP (San pham) ===

// Lay danh sach do hoc tap
export async function layDanhSachDoHocTap(loaiId?: number, trangThai?: boolean) {
    const params: Record<string, unknown> = {};
    if (loaiId !== undefined) params.loaiId = loaiId;
    if (trangThai !== undefined) params.trangThai = trangThai;
    const res = await api.get(BASE, { params });
    return res.data;
}

// Lay chi tiet do hoc tap theo ID
export async function layDoHocTapTheoId(id: number) {
    const res = await api.get(`${BASE}/${id}`);
    return res.data;
}

// Tao do hoc tap moi
export async function taoDoHocTap(duLieu: unknown) {
    const res = await api.post(BASE, duLieu);
    return res.data;
}

// Cap nhat do hoc tap
export async function capNhatDoHocTap(id: number, duLieu: unknown) {
    const res = await api.put(`${BASE}/${id}`, duLieu);
    return res.data;
}

// Xoa do hoc tap
export async function xoaDoHocTap(id: number) {
    const res = await api.delete(`${BASE}/${id}`);
    return res.data;
}
