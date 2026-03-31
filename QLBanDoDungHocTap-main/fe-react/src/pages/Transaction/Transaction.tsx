import { useState, useEffect } from 'react';
import { transactionService } from '../../services/transaction.service';
import { walletService } from '../../services/wallet.service';
import { categoryService } from '../../services/category.service';
import { Transaction as TransactionType, TransactionCreateRequest } from '../../types/transaction.type';
import { Wallet } from '../../types/wallet.type';
import { Category } from '../../types/category.type';
import { getUserId } from '../../utils/storage';
import { Modal } from '../../components/Modal/Modal';
import './Transaction.css';

export default function Transaction() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionType | null>(null);
  
  // Filters
  const [filterLoai, setFilterLoai] = useState<'THU' | 'CHI' | ''>('');
  const [filterViId, setFilterViId] = useState<number | ''>('');
  const [filterDanhMucId, setFilterDanhMucId] = useState<number | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState<TransactionCreateRequest>({
    taiKhoanId: getUserId(),
    viId: 0,
    danhMucId: 0,
    soTien: 0,
    loaiGD: 'CHI',
    ngayGD: new Date().toISOString().split('T')[0],
    ghiChu: '',
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [filterLoai, filterViId, filterDanhMucId, searchQuery]);

  const loadInitialData = async () => {
    try {
      const userId = getUserId();
      const [walletsData, categoriesData] = await Promise.all([
        walletService.getWallets(userId),
        categoryService.getCategories(userId),
      ]);
      setWallets(walletsData || []);
      setCategories(categoriesData || []);
    } catch (err: any) {
      console.error('Load initial data error:', err);
      setError('Không thể tải dữ liệu');
      setWallets([]);
      setCategories([]);
    }
  };

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const data = await transactionService.getTransactions({
        taiKhoanId: userId,
        loai: filterLoai || undefined,
        viId: filterViId || undefined,
        danhMucId: filterDanhMucId || undefined,
        q: searchQuery || undefined,
        page: 1,
        pageSize: 50,
        sort: 'NgayGD_desc',
      });
      setTransactions(data || []);
      setError('');
    } catch (err: any) {
      console.error('Load transactions error:', err);
      setError(err.response?.data?.message || 'Không thể tải danh sách giao dịch');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await transactionService.updateTransaction(editingTransaction.id, formData);
      } else {
        await transactionService.createTransaction(formData);
      }
      setShowModal(false);
      resetForm();
      loadTransactions();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (transaction: TransactionType) => {
    setEditingTransaction(transaction);
    setFormData({
      taiKhoanId: transaction.taiKhoanId,
      viId: transaction.viId,
      danhMucId: transaction.danhMucId,
      soTien: transaction.soTien,
      loaiGD: transaction.loaiGD,
      ngayGD: transaction.ngayGD.split('T')[0],
      ghiChu: transaction.ghiChu || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa giao dịch này?')) return;
    try {
      await transactionService.deleteTransaction(id, getUserId());
      loadTransactions();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể xóa giao dịch');
    }
  };

  const resetForm = () => {
    setFormData({
      taiKhoanId: getUserId(),
      viId: wallets[0]?.id || 0,
      danhMucId: categories[0]?.id || 0,
      soTien: 0,
      loaiGD: 'CHI',
      ngayGD: new Date().toISOString().split('T')[0],
      ghiChu: '',
    });
    setEditingTransaction(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const getWalletName = (viId: number) => {
    return wallets.find(w => w.id === viId)?.tenVi || 'N/A';
  };

  const getCategoryName = (danhMucId: number) => {
    return categories.find(c => c.id === danhMucId)?.tenDanhMuc || 'N/A';
  };

  const filteredCategories = (categories || []).filter(c => c.loai === formData.loaiGD);

  const totalIncome = (transactions || [])
    .filter(t => t.loaiGD === 'THU')
    .reduce((sum, t) => sum + t.soTien, 0);

  const totalExpense = (transactions || [])
    .filter(t => t.loaiGD === 'CHI')
    .reduce((sum, t) => sum + t.soTien, 0);

  if (loading && transactions.length === 0) {
    return <div className="transaction-container"><p>Đang tải...</p></div>;
  }

  return (
    <div className="transaction-container">
      <div className="transaction-header">
        <div>
          <h1>Giao dịch</h1>
          <p>Quản lý các giao dịch thu chi của bạn</p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          + Thêm giao dịch
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="transaction-summary">
        <div className="summary-card income">
          <span className="summary-label">Tổng thu</span>
          <span className="summary-amount">{totalIncome.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="summary-card expense">
          <span className="summary-label">Tổng chi</span>
          <span className="summary-amount">{totalExpense.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="summary-card balance">
          <span className="summary-label">Chênh lệch</span>
          <span className="summary-amount">{(totalIncome - totalExpense).toLocaleString('vi-VN')} đ</span>
        </div>
      </div>

      <div className="transaction-filters">
        <input
          type="text"
          placeholder="Tìm kiếm giao dịch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        <select value={filterLoai} onChange={(e) => setFilterLoai(e.target.value as any)}>
          <option value="">Tất cả loại</option>
          <option value="THU">Thu nhập</option>
          <option value="CHI">Chi tiêu</option>
        </select>

        <select value={filterViId} onChange={(e) => setFilterViId(e.target.value ? Number(e.target.value) : '')}>
          <option value="">Tất cả ví</option>
          {(wallets || []).map(w => (
            <option key={w.id} value={w.id}>{w.tenVi}</option>
          ))}
        </select>

        <select value={filterDanhMucId} onChange={(e) => setFilterDanhMucId(e.target.value ? Number(e.target.value) : '')}>
          <option value="">Tất cả danh mục</option>
          {(categories || []).map(c => (
            <option key={c.id} value={c.id}>{c.tenDanhMuc}</option>
          ))}
        </select>
      </div>

      <div className="transaction-list">
        {!transactions || transactions.length === 0 ? (
          <p className="empty-message">Chưa có giao dịch nào</p>
        ) : (
          (transactions || []).map((transaction) => (
            <div key={transaction.id} className={`transaction-item ${transaction.loaiGD.toLowerCase()}`}>
              <div className="transaction-info">
                <div className="transaction-main">
                  <span className="transaction-category">{getCategoryName(transaction.danhMucId)}</span>
                  <span className="transaction-wallet">📁 {getWalletName(transaction.viId)}</span>
                </div>
                {transaction.ghiChu && <p className="transaction-note">{transaction.ghiChu}</p>}
                <span className="transaction-date">
                  {new Date(transaction.ngayGD).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <div className="transaction-amount-section">
                <span className={`transaction-amount ${transaction.loaiGD.toLowerCase()}`}>
                  {transaction.loaiGD === 'THU' ? '+' : '-'}{transaction.soTien.toLocaleString('vi-VN')} đ
                </span>
                <div className="transaction-actions">
                  <button onClick={() => handleEdit(transaction)} title="Sửa">✏️</button>
                  <button onClick={() => handleDelete(transaction.id)} title="Xóa">🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingTransaction ? 'Sửa giao dịch' : 'Thêm giao dịch mới'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Loại giao dịch *</label>
            <select
              value={formData.loaiGD}
              onChange={(e) => setFormData({ ...formData, loaiGD: e.target.value as 'THU' | 'CHI' })}
              required
            >
              <option value="THU">Thu nhập</option>
              <option value="CHI">Chi tiêu</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ví *</label>
            <select
              value={formData.viId}
              onChange={(e) => setFormData({ ...formData, viId: Number(e.target.value) })}
              required
            >
              <option value="">Chọn ví</option>
              {(wallets || []).map(w => (
                <option key={w.id} value={w.id}>{w.tenVi}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Danh mục *</label>
            <select
              value={formData.danhMucId}
              onChange={(e) => setFormData({ ...formData, danhMucId: Number(e.target.value) })}
              required
            >
              <option value="">Chọn danh mục</option>
              {(filteredCategories || []).map(c => (
                <option key={c.id} value={c.id}>{c.tenDanhMuc}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Số tiền *</label>
            <input
              type="number"
              value={formData.soTien}
              onChange={(e) => setFormData({ ...formData, soTien: Number(e.target.value) })}
              required
              min="0"
              step="1000"
            />
          </div>

          <div className="form-group">
            <label>Ngày giao dịch *</label>
            <input
              type="date"
              value={formData.ngayGD}
              onChange={(e) => setFormData({ ...formData, ngayGD: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Ghi chú</label>
            <textarea
              value={formData.ghiChu}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              rows={3}
              placeholder="Ghi chú về giao dịch..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {editingTransaction ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
