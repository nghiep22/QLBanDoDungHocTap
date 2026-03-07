import { useState, useEffect, type FormEvent } from 'react';
import { layTaiKhoanId } from '../tienich/luuTru';
import { layDanhSachVi, taoVi, suaVi, xoaVi, khoaMoVi } from '../dichvu/dichVuVi';
import { layDanhSachGiaoDich } from '../dichvu/dichVuGiaoDich';
import { chuyenTienGiuaVi } from '../dichvu/dichVuChuyenTien';
import { dinhDangTien } from '../tienich/dinhDangTien';
import { homNayISO } from '../tienich/dinhDangNgay';
import HopThoai from '../thanhphan/chung/HopThoai';
import type { Vi } from '../kieu/Vi';

export default function TrangVi() {
    const [danhSachVi, setDanhSachVi] = useState<Vi[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [thongBao, setThongBao] = useState('');
    const [timKiem, setTimKiem] = useState('');
    const [moModalTao, setMoModalTao] = useState(false);
    const [formTao, setFormTao] = useState({ tenVi: '', loaiVi: '', soDuBanDau: 0 });
    const [moModalSua, setMoModalSua] = useState(false);
    const [viDangSua, setViDangSua] = useState<Vi | null>(null);
    const [formSua, setFormSua] = useState({ tenVi: '', loaiVi: '', soDuBanDau: 0 });
    const [moModalChuyen, setMoModalChuyen] = useState(false);
    const [formChuyen, setFormChuyen] = useState({ viNguonId: 0, viDichId: 0, soTien: 0, ngay: homNayISO(), ghiChu: '' });
    const taiKhoanId = layTaiKhoanId();

    const taiDuLieu = async () => {
        if (!taiKhoanId) return;
        setDangTai(true);
        try {
            const [vi, gd] = await Promise.all([
                layDanhSachVi(taiKhoanId),
                layDanhSachGiaoDich({ taiKhoanId }).catch(() => []),
            ]);
            const dsVi = Array.isArray(vi) ? vi : [];
            const dsGD = Array.isArray(gd) ? gd : [];
            dsVi.forEach(v => {
                const thu = dsGD.filter((g: { viId: number; loaiGD: string }) => g.viId === v.id && g.loaiGD === 'THU').reduce((s: number, g: { soTien: number }) => s + g.soTien, 0);
                const chi = dsGD.filter((g: { viId: number; loaiGD: string }) => g.viId === v.id && g.loaiGD === 'CHI').reduce((s: number, g: { soTien: number }) => s + g.soTien, 0);
                v.soDuHienTai = v.soDuBanDau + thu - chi;
            });
            setDanhSachVi(dsVi);
        } catch (err) { console.error(err); }
        setDangTai(false);
    };

    useEffect(() => { taiDuLieu(); }, []);

    const xuLyTaoVi = async (e: FormEvent) => {
        e.preventDefault();
        try { await taoVi({ taiKhoanId, ...formTao }); setMoModalTao(false); setThongBao('Tạo ví thành công!'); taiDuLieu(); }
        catch (err) { alert('Lỗi: ' + (err as Error).message); }
    };

    const xuLySuaVi = async (e: FormEvent) => {
        e.preventDefault();
        if (!viDangSua) return;
        try { await suaVi(viDangSua.id, taiKhoanId, formSua); setMoModalSua(false); setThongBao('Sửa ví thành công!'); taiDuLieu(); }
        catch (err) { alert('Lỗi: ' + (err as Error).message); }
    };

    const xuLyXoaVi = async (vi: Vi) => {
        if (!confirm(`Xóa ví "${vi.tenVi}"?`)) return;
        try { await xoaVi(vi.id, taiKhoanId); taiDuLieu(); }
        catch (err) { alert('Lỗi: ' + (err as Error).message); }
    };

    const xuLyKhoaMo = async (vi: Vi) => {
        try { await khoaMoVi(vi.id, { taiKhoanId, isLocked: !vi.isLocked }); taiDuLieu(); }
        catch (err) { alert('Lỗi: ' + (err as Error).message); }
    };

    const xuLyChuyenTien = async (e: FormEvent) => {
        e.preventDefault();
        try { await chuyenTienGiuaVi({ taiKhoanId, ...formChuyen }); setMoModalChuyen(false); setThongBao('Chuyển tiền thành công!'); taiDuLieu(); }
        catch (err) { alert('Lỗi: ' + (err as Error).message); }
    };

    const viLocTheo = danhSachVi.filter(v => v.tenVi.toLowerCase().includes(timKiem.toLowerCase()));
    if (dangTai) return <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</div>;

    return (
        <div className="grid">
            <div className="left">
                <div className="card">
                    <div className="card-header">
                        <h2>Danh sách ví</h2>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-primary" onClick={() => setMoModalTao(true)}>+ Tạo ví</button>
                            <button className="btn btn-success" onClick={() => setMoModalChuyen(true)}>↔ Chuyển tiền</button>
                        </div>
                    </div>
                    {thongBao && <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.12)', borderRadius: '8px', marginBottom: '12px', color: '#065f46' }}>{thongBao}</div>}
                    <input type="text" placeholder="Tìm kiếm ví..." value={timKiem} onChange={(e) => setTimKiem(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Tên ví</th><th>Loại</th><th>Số dư ban đầu</th><th>Số dư hiện tại</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
                            <tbody>
                                {viLocTheo.map(vi => (
                                    <tr key={vi.id}>
                                        <td>{vi.tenVi}</td>
                                        <td>{vi.loaiVi}</td>
                                        <td>{dinhDangTien(vi.soDuBanDau)}</td>
                                        <td style={{ fontWeight: 700 }}>{dinhDangTien(vi.soDuHienTai || vi.soDuBanDau)}</td>
                                        <td><span className={`badge ${vi.isLocked ? 'badge-expense' : 'badge-income'}`}>{vi.isLocked ? '🔒 Khóa' : '✅ Hoạt động'}</span></td>
                                        <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                            <button className="btn btn-sm btn-outline" onClick={() => { setViDangSua(vi); setFormSua({ tenVi: vi.tenVi, loaiVi: vi.loaiVi, soDuBanDau: vi.soDuBanDau }); setMoModalSua(true); }}>Sửa</button>
                                            <button className="btn btn-sm btn-outline" onClick={() => xuLyKhoaMo(vi)}>{vi.isLocked ? 'Mở' : 'Khóa'}</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => xuLyXoaVi(vi)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                                {viLocTheo.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#64748b' }}>Chưa có ví</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="card">
                    <h2>Gợi ý</h2>
                    <p style={{ color: '#64748b' }}>Tạo ví riêng cho mỗi mục đích (Tiền mặt, Ngân hàng, Ví điện tử).</p>
                </div>
            </div>

            <HopThoai dangMo={moModalTao} dongLai={() => setMoModalTao(false)} tieuDe="Thêm ví mới">
                <form className="modal-form" onSubmit={xuLyTaoVi} style={{ padding: '20px' }}>
                    <div className="form-group"><label>Tên ví</label><input type="text" value={formTao.tenVi} onChange={e => setFormTao({ ...formTao, tenVi: e.target.value })} required /></div>
                    <div className="form-group">
                        <label>Loại ví</label>
                        <select value={formTao.loaiVi} onChange={e => setFormTao({ ...formTao, loaiVi: e.target.value })} required>
                            <option value="">-- Chọn --</option>
                            <option value="TIEN_MAT">Tiền mặt</option>
                            <option value="NGAN_HANG">Ngân hàng</option>
                            <option value="VI_DI_DONG">Ví điện tử</option>
                        </select>
                    </div>
                    <div className="form-group"><label>Số dư ban đầu</label><input type="number" value={formTao.soDuBanDau || ''} onChange={e => setFormTao({ ...formTao, soDuBanDau: Number(e.target.value) })} placeholder="0" /></div>
                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">Tạo ví</button>
                        <button type="button" className="btn btn-outline" onClick={() => setMoModalTao(false)}>Hủy</button>
                    </div>
                </form>
            </HopThoai>

            <HopThoai dangMo={moModalSua} dongLai={() => setMoModalSua(false)} tieuDe="Sửa ví">
                <form className="modal-form" onSubmit={xuLySuaVi} style={{ padding: '20px' }}>
                    <div className="form-group"><label>Tên ví</label><input type="text" value={formSua.tenVi} onChange={e => setFormSua({ ...formSua, tenVi: e.target.value })} required /></div>
                    <div className="form-group">
                        <label>Loại ví</label>
                        <select value={formSua.loaiVi} onChange={e => setFormSua({ ...formSua, loaiVi: e.target.value })}>
                            <option value="TIEN_MAT">Tiền mặt</option>
                            <option value="NGAN_HANG">Ngân hàng</option>
                            <option value="VI_DI_DONG">Ví điện tử</option>
                        </select>
                    </div>
                    <div className="form-group"><label>Số dư ban đầu</label><input type="number" value={formSua.soDuBanDau || ''} onChange={e => setFormSua({ ...formSua, soDuBanDau: Number(e.target.value) })} placeholder="0" /></div>
                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                        <button type="button" className="btn btn-outline" onClick={() => setMoModalSua(false)}>Hủy</button>
                    </div>
                </form>
            </HopThoai>

            <HopThoai dangMo={moModalChuyen} dongLai={() => setMoModalChuyen(false)} tieuDe="Chuyển tiền giữa ví">
                <form className="modal-form" onSubmit={xuLyChuyenTien} style={{ padding: '20px' }}>
                    <div className="form-group">
                        <label>Ví nguồn</label>
                        <select value={formChuyen.viNguonId} onChange={e => setFormChuyen({ ...formChuyen, viNguonId: Number(e.target.value) })} required>
                            <option value="">-- Chọn --</option>
                            {danhSachVi.map(v => <option key={v.id} value={v.id}>{v.tenVi}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ví đích</label>
                        <select value={formChuyen.viDichId} onChange={e => setFormChuyen({ ...formChuyen, viDichId: Number(e.target.value) })} required>
                            <option value="">-- Chọn --</option>
                            {danhSachVi.map(v => <option key={v.id} value={v.id}>{v.tenVi}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label>Số tiền</label><input type="number" value={formChuyen.soTien || ''} onChange={e => setFormChuyen({ ...formChuyen, soTien: Number(e.target.value) })} placeholder="0" required /></div>
                    <div className="form-group"><label>Ngày</label><input type="date" value={formChuyen.ngay} onChange={e => setFormChuyen({ ...formChuyen, ngay: e.target.value })} /></div>
                    <div className="form-group"><label>Ghi chú</label><textarea value={formChuyen.ghiChu} onChange={e => setFormChuyen({ ...formChuyen, ghiChu: e.target.value })} rows={2} /></div>
                    <div className="modal-actions">
                        <button type="submit" className="btn btn-success">Chuyển tiền</button>
                        <button type="button" className="btn btn-outline" onClick={() => setMoModalChuyen(false)}>Hủy</button>
                    </div>
                </form>
            </HopThoai>
        </div>
    );
}
