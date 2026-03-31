import { useState, useEffect } from 'react';
import { layTaiKhoanId } from '../tienich/luuTru';
import { layDanhSachVi } from '../dichvu/dichVuVi';
import { layDanhSachGiaoDich } from '../dichvu/dichVuGiaoDich';
import { dinhDangTien, dinhDangTienCoDau } from '../tienich/dinhDangTien';
import { dinhDangNgay } from '../tienich/dinhDangNgay';
import type { Vi } from '../kieu/Vi';
import type { GiaoDich } from '../kieu/GiaoDich';

export default function TrangTongQuan() {
    const [danhSachVi, setDanhSachVi] = useState<Vi[]>([]);
    const [danhSachGD, setDanhSachGD] = useState<GiaoDich[]>([]);
    const [dangTai, setDangTai] = useState(true);

    useEffect(() => {
        const taiDuLieu = async () => {
            const taiKhoanId = layTaiKhoanId();
            if (!taiKhoanId) { setDangTai(false); return; }
            try {
                const [vi, gd] = await Promise.all([
                    layDanhSachVi(taiKhoanId),
                    layDanhSachGiaoDich({ taiKhoanId, pageSize: 5, sort: 'NgayGD_desc' }),
                ]);
                setDanhSachVi(Array.isArray(vi) ? vi : []);
                setDanhSachGD(Array.isArray(gd) ? gd : []);
            } catch (err) { console.error('Loi tai du lieu:', err); }
            setDangTai(false);
        };
        taiDuLieu();
    }, []);

    const tongThu = danhSachGD.filter(g => g.loaiGD === 'THU').reduce((s, g) => s + g.soTien, 0);
    const tongChi = danhSachGD.filter(g => g.loaiGD === 'CHI').reduce((s, g) => s + g.soTien, 0);

    if (dangTai) return <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải dữ liệu...</div>;

    return (
        <div className="grid">
            <div className="left">
                <div className="card">
                    <h2>Tổng quan tháng này</h2>
                    <div className="cards-mini">
                        <div className="stat">
                            <span className="stat-label">Thu</span>
                            <span className="stat-value stat-income">+{dinhDangTien(tongThu)}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Chi</span>
                            <span className="stat-value stat-expense">-{dinhDangTien(tongChi)}</span>
                        </div>
                    </div>
                    <div className="wallets-summary">
                        <h3>Số dư các ví:</h3>
                        <div className="wallets-list">
                            {danhSachVi.map(vi => (
                                <div className="wallet-item" key={vi.id}>
                                    <span className="wallet-name">{vi.tenVi}</span>
                                    <span className="wallet-balance">{dinhDangTien(vi.soDuBanDau)}</span>
                                </div>
                            ))}
                            {danhSachVi.length === 0 && <p style={{ color: '#64748b' }}>Chưa có ví nào</p>}
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><h2>Giao dịch gần đây</h2></div>
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Ngày</th><th>Loại</th><th>Danh mục</th><th>Ví</th><th>Số tiền</th><th>Ghi chú</th></tr></thead>
                            <tbody>
                                {danhSachGD.map((gd) => (
                                    <tr key={gd.id}>
                                        <td>{dinhDangNgay(gd.ngayGD)}</td>
                                        <td><span className={`badge ${gd.loaiGD === 'THU' ? 'badge-income' : 'badge-expense'}`}>{gd.loaiGD}</span></td>
                                        <td>{gd.tenDanhMuc || '-'}</td>
                                        <td>{gd.tenVi || '-'}</td>
                                        <td className={gd.loaiGD === 'THU' ? 'amount-income' : 'amount-expense'}>{dinhDangTienCoDau(gd.soTien, gd.loaiGD)}</td>
                                        <td>{gd.ghiChu || ''}</td>
                                    </tr>
                                ))}
                                {danhSachGD.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: '#64748b' }}>Chưa có giao dịch</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="card"><h2>Ngân sách</h2><p style={{ color: '#64748b' }}>Tính năng ngân sách sẽ hiển thị từ API.</p></div>
                <div className="card"><h2>Mục tiêu tiết kiệm</h2><p style={{ color: '#64748b' }}>Tính năng mục tiêu sẽ hiển thị từ API.</p></div>
            </div>
        </div>
    );
}
