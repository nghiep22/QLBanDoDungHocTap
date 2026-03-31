export default function TrangNganSach() {
    return (
        <div className="grid">
            <div className="left">
                <div className="card">
                    <div className="card-header">
                        <h2>Ngân sách theo danh mục</h2>
                        <button className="btn btn-primary">+ Tạo ngân sách</button>
                    </div>
                    <div className="budget-list">
                        <div className="budget-item">
                            <div className="budget-header"><span className="budget-name">Ăn uống</span><span className="budget-used">3,500,000 / 5,000,000 ₫</span></div>
                            <div className="progress"><div className="progress-bar" style={{ width: '70%' }}></div></div>
                        </div>
                        <div className="budget-item">
                            <div className="budget-header"><span className="budget-name">Giao thông</span><span className="budget-used">450,000 / 1,000,000 ₫</span></div>
                            <div className="progress"><div className="progress-bar" style={{ width: '45%' }}></div></div>
                        </div>
                        <div className="budget-item">
                            <div className="budget-header"><span className="budget-name">Mua sắm</span><span className="budget-used">2,100,000 / 2,000,000 ₫</span></div>
                            <div className="progress"><div className="progress-bar warning" style={{ width: '100%' }}></div></div>
                            <div className="alert-warning">⚠️ Vượt ngân sách</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="card">
                    <h2>Mẹo</h2>
                    <p style={{ color: '#64748b' }}>Đặt ngân sách theo tháng để theo dõi sát hơn.</p>
                </div>
            </div>
        </div>
    );
}
