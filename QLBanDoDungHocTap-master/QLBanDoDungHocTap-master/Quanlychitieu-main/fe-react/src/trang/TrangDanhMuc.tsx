import { useState, useEffect, type FormEvent } from 'react';
import { layTaiKhoanId } from '../tienich/luuTru';
import { layDanhSachDanhMuc, taoDanhMuc } from '../dichvu/dichVuDanhMuc';
import HopThoai from '../thanhphan/chung/HopThoai';
import type { DanhMuc } from '../kieu/DanhMuc';

export default function TrangDanhMuc() {
    const [danhSach, setDanhSach] = useState<DanhMuc[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const [locLoai, setLocLoai] = useState('');
    const [timKiem, setTimKiem] = useState('');
    const [moModal, setMoModal] = useState(false);
    const [form, setForm] = useState({ tenDanhMuc: '', loai: '' as 'THU' | 'CHI' | '', icon: '', ghiChu: '' });
    const taiKhoanId = layTaiKhoanId();

    const taiDanhSach = async () => {
        if (!taiKhoanId) return;
        setDangTai(true);
        try {
            const ds = await layDanhSachDanhMuc(taiKhoanId, locLoai || undefined);
            setDanhSach(Array.isArray(ds) ? ds : []);
        } catch (err) { console.error(err); }
        setDangTai(false);
    };

    useEffect(() => { taiDanhSach(); }, [locLoai]);

    const xuLyTao = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.loai) return alert('Vui lòng chọn loại.');
        try {
            await taoDanhMuc({ taiKhoanId, tenDanhMuc: form.tenDanhMuc, loai: form.loai as 'THU' | 'CHI', icon: form.icon, ghiChu: form.ghiChu });
            setMoModal(false);
            setForm({ tenDanhMuc: '', loai: '', icon: '', ghiChu: '' });
            taiDanhSach();
        } catch (err: unknown) { alert('Lỗi: ' + (err as Error).message); }
    };

    const danhSachLoc = danhSach.filter(dm => (dm.tenDanhMuc || '').toLowerCase().includes(timKiem.toLowerCase()));

    return (
        <div className="grid">
            <div className="left">
                <div className="card">
                    <div className="card-header">
                        <h2>Danh mục thu/chi</h2>
                        <button className="btn btn-primary" onClick={() => setMoModal(true)}>+ Thêm danh mục</button>
                    </div>
                    <div className="filters" style={{ margin: '12px 0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <select value={locLoai} onChange={(e) => setLocLoai(e.target.value)}>
                            <option value="">-- Lọc theo loại --</option>
                            <option value="THU">THU</option>
                            <option value="CHI">CHI</option>
                        </select>
                        <input type="text" placeholder="Tìm kiếm..." value={timKiem} onChange={(e) => setTimKiem(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    </div>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Tên danh mục</th><th>Loại</th><th>Icon</th><th>Ghi chú</th></tr></thead>
                            <tbody>
                                {dangTai ? (
                                    <tr><td colSpan={4} style={{ textAlign: 'center' }}>Đang tải...</td></tr>
                                ) : danhSachLoc.length === 0 ? (
                                    <tr><td colSpan={4} style={{ textAlign: 'center', color: '#64748b' }}>Chưa có danh mục</td></tr>
                                ) : danhSachLoc.map(dm => (
                                    <tr key={dm.id}>
                                        <td>{dm.tenDanhMuc}</td>
                                        <td><span className={`badge ${dm.loai === 'THU' ? 'badge-income' : 'badge-expense'}`}>{dm.loai}</span></td>
                                        <td>{dm.icon}</td>
                                        <td>{dm.ghiChu}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="card">
                    <h2>Gợi ý</h2>
                    <p style={{ color: '#64748b' }}>Tách danh mục để thống kê dễ hơn.</p>
                </div>
            </div>
            <HopThoai dangMo={moModal} dongLai={() => setMoModal(false)} tieuDe="Thêm danh mục">
                <form className="modal-form" onSubmit={xuLyTao} style={{ padding: '20px' }}>
                    <div className="form-group">
                        <label>Tên danh mục</label>
                        <input type="text" value={form.tenDanhMuc} onChange={e => setForm({ ...form, tenDanhMuc: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Loại</label>
                        <select value={form.loai} onChange={e => setForm({ ...form, loai: e.target.value as 'THU' | 'CHI' })} required>
                            <option value="">-- Chọn --</option>
                            <option value="THU">THU</option>
                            <option value="CHI">CHI</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ghi chú</label>
                        <input type="text" value={form.ghiChu} onChange={e => setForm({ ...form, ghiChu: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Icon</label>
                        <input type="text" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="🍽️" />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn btn-primary">Tạo danh mục</button>
                        <button type="button" className="btn btn-outline" onClick={() => setMoModal(false)}>Hủy</button>
                    </div>
                </form>
            </HopThoai>
        </div>
    );
}
