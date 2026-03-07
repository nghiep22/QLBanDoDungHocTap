export default function TrangMucTieu() {
    return (
        <div className="grid">
            <div className="left">
                <div className="card">
                    <div className="card-header">
                        <h2>Mục tiêu tiết kiệm</h2>
                        <button className="btn btn-primary">+ Tạo mục tiêu</button>
                    </div>
                    <div className="goal-list">
                        <div className="goal-item">
                            <div className="goal-header"><span className="goal-name">Du lịch Nhật Bản</span><span className="goal-deadline">Hạn: 06/2025</span></div>
                            <div className="goal-progress">
                                <div className="progress"><div className="progress-bar" style={{ width: '65%' }}></div></div>
                                <span className="goal-amount">65,000,000 / 100,000,000 ₫</span>
                            </div>
                            <button className="btn btn-outline btn-sm">Đóng góp</button>
                        </div>
                        <div className="goal-item">
                            <div className="goal-header"><span className="goal-name">Mua ô tô</span><span className="goal-deadline">Hạn: 12/2025</span></div>
                            <div className="goal-progress">
                                <div className="progress"><div className="progress-bar" style={{ width: '42%' }}></div></div>
                                <span className="goal-amount">210,000,000 / 500,000,000 ₫</span>
                            </div>
                            <button className="btn btn-outline btn-sm">Đóng góp</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="card">
                    <h2>Gợi ý</h2>
                    <p style={{ color: '#64748b' }}>Mỗi lần đóng góp mục tiêu sẽ tạo một giao dịch tương ứng.</p>
                </div>
            </div>
        </div>
    );
}
