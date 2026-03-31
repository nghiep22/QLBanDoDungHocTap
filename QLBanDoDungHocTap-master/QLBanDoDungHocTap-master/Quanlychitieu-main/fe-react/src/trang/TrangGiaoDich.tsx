import { useState, useEffect, type FormEvent } from 'react';
import { layTaiKhoanId } from '../tienich/luuTru';
import { layDanhSachGiaoDich, taoGiaoDich } from '../dichvu/dichVuGiaoDich';
import { layDanhSachVi } from '../dichvu/dichVuVi';
import { layDanhSachDanhMuc } from '../dichvu/dichVuDanhMuc';
import { dinhDangTienCoDau } from '../tienich/dinhDangTien';
import { dinhDangNgay, homNayISO } from '../tienich/dinhDangNgay';
import HopThoai from '../thanhphan/chung/HopThoai';
import type { GiaoDich } from '../kieu/GiaoDich';
import type { Vi } from '../kieu/Vi';
import type { DanhMuc } from '../kieu/DanhMuc';

export default function TrangGiaoDich() {
    const [danhSachGD, setDanhSachGD] = useState<GiaoDich[]>([]);
    const [danhSachVi, setDanhSachVi] = useState<Vi[]>([]);
    const [danhSachDM, setDanhSachDM] = useState<DanhMuc[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [locTuNgay, setLocTuNgay] = useState('');
    const [locDenNgay, setLocDenNgay] = useState('');
    const [locLoai, setLocLoai] = useState('');
    const [locViId, setLocViId] = useState('');
    const [locDanhMucId, setLocDanhMucId] = useState('');
    const [moModal, setMoModal] = useState(false);
    const [form, setForm] = useState({ loaiGD: '' as 'THU' | 'CHI' | '', danhMucId: 0, viId: 0, soTien: 0, ngayGD: homNayISO(), ghiChu: '' });
    const taiKhoanId = layTaiKhoanId();

    const taiDuLieu = async () => {
        if (!taiKhoanId) return;
        setDangTai(true);
        try {
            const [gd, vi, dm] = await Promise.all([
                layDanhSachGiaoDich({ taiKhoanId, from: locTuNgay || undefined, to: locDenNgay || undefined, loai: locLoai || undefined, viId: locViId ? Number(locViId) : undefined, danhMucId: locDanhMucId ? Number(locDanhMucId) : undefined }),
                layDanhSachVi(taiKhoanId),
                layDanhSachDanhMuc(taiKhoanId),
            ]);
            setDanhSachGD(Array.isArray(gd) ? gd : []);
            setDanhSachVi(Array.isArray(vi) ? vi : []);
            setDanhSachDM(Array.isArray(dm) ? dm : []);
        } catch (err) { console.error(err); }
        setDangTai(false);
    };

    useEffect(() => { taiDuLieu(); }, []);

    const xuLyTao = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.loaiGD) return alert('Chọn loại giao dịch.');
        try {
            await taoGiaoDich({ taiKhoanId, viId: form.viId, danhMucId: form.danhMucId, soTien: form.soTien, loaiGD: form.loaiGD as 'THU' | 'CHI', ngayGD: form.ngayGD, ghiChu: form.ghiChu });
            setMoModal(false);
            taiDuLieu();
        } catch (err) { alert('Lỗi: ' + (err as Error).message); }
    };

    const tongThu = danhSachGD.filter(g => g.loaiGD === 'THU').reduce((s, g) => s + g.soTien, 0);
    const tongChi = danhSachGD.filter(g => g.loaiGD === 'CHI').reduce((s, g) => s + g.soTien, 0);
    const danhMucTheoLoai = form.loaiGD ? danhSachDM.filter(dm => dm.loai === form.loaiGD) : danhSachDM;

    return (
        <div className="grid">
            <div className="left">
                <div className="card">
                    <div className="card-header">
                        <h2>Danh sách giao dịch</h2>
                        <button className="btn btn-primary" onClick={() => setMoModal(true)}>+ Thêm giao dịch</button>
                    </div>
                    <div className="filters" style={{ margin: '12px 0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input type="date" value={locTuNgay} onChange={e => setLocTuNgay(e.target.value)} />
                        <input type="date" value={locDenNgay} onChange={e => setLocDenNgay(e.target.value)} />
                        <select value={locLoai} onChange={e => setLocLoai(e.target.value)}>
                            <option value="">-- Loại --</option>
                            <option value="THU">THU</option>
                            <option value="CHI">CHI</option>
                        </select>
                        <select value={locViId} onChange={e => setLocViId(e.target.value)}>
                            <option value="">-- Ví --</option>
                            {danhSachVi.map(v => <option key={v.id} value={v.id}>{v.tenVi}</option>)}
                        </select>
                        <select value={locDanhMucId} onChange={e => setLocDanhMucId(e.target.value)}>
                            <option value="">-- Danh mục --</option>
                            {danhSachDM.map(dm => <option key={dm.id} value={dm.id}>{dm.tenDanhMuc}</option>)}
                        </select>
                        <button className="btn btn-outline" onClick={() => taiDuLieu()}>Lọc</button>
                    </div>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Ngày</th><th>Loại</th><th>Danh mục</th><th>Ví</th><th>Số tiền</th><th>Ghi chú</th></tr></thead>
                            <tbody>
                                {dangTai ? <tr><td colSpan={6} style={{ textAlign: 'center' }}>Đang tải...</td></tr> :
                                    danhSachGD.length === 0 ? <tr><td colSpan={6} style={{ textAlign: 'center', color: '#64748b' }}>Chưa có giao dịch</td></tr> :
                                        danhSachGD.map(gd => (
                                            <tr key={gd.id}>
                                                <td>{dinhDangNgay(gd.ngayGD)}</td>
                                                <td><span className={`badge ${gd.loaiGD === 'THU' ? 'badge-income' : 'badge-expense'}`}>{gd.loaiGD}</span></td>
                                                <td>{gd.tenDanhMuc || danhSachDM.find(d => d.id === gd.danhMucId)?.tenDanhMuc || '-'}</td>
                                                <td>{gd.tenVi || danhSachVi.find(v => v.id === gd.viId)?.tenVi || '-'}</td>
                                                <td className={gd.loaiGD === 'THU' ? 'amount-income' : 'amount-expense'}>{dinhDangTienCoDau(gd.soTien, gd.loaiGD)}</td>
                                                <td>{gd.ghiChu}</td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="card">
                    <h2>Tóm tắt</h2>
                    <div className="cards-mini">
                        <div className="stat"><span className="stat-label">Tổng THU</span><span className="stat-value stat-income">{dinhDangTienCoDau(tongThu, 'THU')}</span></div>
                        <div className="stat"><span className="stat-label">Tổng CHI</span><span className="stat-value stat-expense">{dinhDangTienCoDau(tongChi, 'CHI')}</span></div>
                    </div>
                </div>
            </div>
            <HopThoai dangMo={moModal} dongLai={() => setMoModal(false)} tieuDe="Thêm giao dịch">
                <form className="modal-form" onSubmit={xuLyTao} style={{ padding: '20px' }}>
                    <div className="form-group">
                        <label>Loại</label>
                        <select value={form.loaiGD} onChange={e => setForm({ ...form, loaiGD: e.target.value as 'THU' | 'CHI' })} required>
                            <option value="">-- Chọn --</option>
                            <option value="THU">Thu</option>
                            <option value="CHI">Chi</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Danh mục</label>
                        <select value={form.danhMucId} onChange={e => setForm({ ...form, danhMucId: Number(e.target.value) })} required>
                            <option value="">-- Chọn --</option>
                            {danhMucTheoLoai.map(dm => <option key={dm.id} value={dm.id}>{dm.tenDanhMuc}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ví</label>
                        <select value={form.viId} onChange={e => setForm({ ...form, viId: Number(e.target.value) })} required>
                            <option value="">-- Chọn --</option>
                            {danhSachVi.map(v => <option key={v.id} value={v.id}>{v.tenVi}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Số tiền</label>
                        <input type="number" value={form.soTien || ''} onChange={e => setForm({ ...form, soTien: Number(e.target.value) })} placeholder="0" required />
                    </div>
                    <div className="form-group">
                        <label>Ngày</label>
                        <input type="date" value={form.ngayGD} onChange={e => setForm({ ...form, ngayGD: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú</label>
                        <textarea value={form.ghiChu} onChange={e => setForm({ ...form, ghiChu: e.target.value })} rows={3} />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                        <button type="button" className="btn btn-outline" onClick={() => setMoModal(false)}>Hủy</button>
                    </div>
                </form>
            </HopThoai>
        </div>
    );
}
