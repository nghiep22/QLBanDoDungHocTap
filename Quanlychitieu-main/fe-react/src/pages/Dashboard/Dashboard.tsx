import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { walletService } from '../../services/wallet.service';
import { transactionService } from '../../services/transaction.service';
import { getUserId } from '../../utils/storage';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalWallets: 0,
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      
      // Load wallets
      const wallets = await walletService.getWallets(userId);
      const totalBalance = (wallets || []).reduce((sum, w) => sum + w.soDuBanDau, 0);
      
      // Load transactions for current month
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      const transactions = await transactionService.getTransactions({
        taiKhoanId: userId,
        from: firstDay.toISOString().split('T')[0],
        to: lastDay.toISOString().split('T')[0],
        page: 1,
        pageSize: 1000,
      });

      const totalIncome = (transactions || [])
        .filter(t => t.loaiGD === 'THU')
        .reduce((sum, t) => sum + t.soTien, 0);
      
      const totalExpense = (transactions || [])
        .filter(t => t.loaiGD === 'CHI')
        .reduce((sum, t) => sum + t.soTien, 0);

      setStats({
        totalWallets: (wallets || []).length,
        totalBalance,
        totalIncome,
        totalExpense,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setStats({
        totalWallets: 0,
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Tổng quan</h1>
      <p>Xin chào, {user?.tenDangNhap || user?.email}!</p>
      
      <div className="dashboard-grid">
        <div className="dashboard-card income">
          <h3>Tổng thu nhập (tháng này)</h3>
          <p className="amount">{stats.totalIncome.toLocaleString('vi-VN')} đ</p>
        </div>
        
        <div className="dashboard-card expense">
          <h3>Tổng chi tiêu (tháng này)</h3>
          <p className="amount">{stats.totalExpense.toLocaleString('vi-VN')} đ</p>
        </div>
        
        <div className="dashboard-card balance">
          <h3>Số dư ví</h3>
          <p className="amount">{stats.totalBalance.toLocaleString('vi-VN')} đ</p>
        </div>
        
        <div className="dashboard-card wallets">
          <h3>Số ví</h3>
          <p className="amount">{stats.totalWallets}</p>
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="summary-section">
          <h2>Chênh lệch tháng này</h2>
          <p className={`summary-value ${stats.totalIncome - stats.totalExpense >= 0 ? 'positive' : 'negative'}`}>
            {(stats.totalIncome - stats.totalExpense).toLocaleString('vi-VN')} đ
          </p>
        </div>
      </div>
    </div>
  );
}
