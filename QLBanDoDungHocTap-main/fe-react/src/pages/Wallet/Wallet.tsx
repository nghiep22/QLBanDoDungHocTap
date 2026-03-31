import { useState, useEffect } from 'react';
import { walletService } from '../../services/wallet.service';
import { Wallet as WalletType, WalletCreateRequest } from '../../types/wallet.type';
import { getUserId } from '../../utils/storage';
import { Modal } from '../../components/Modal/Modal';
import './Wallet.css';

export default function Wallet() {
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState<WalletType | null>(null);
  
  const [formData, setFormData] = useState<WalletCreateRequest>({
    taiKhoanId: getUserId(),
    tenVi: '',
    loaiVi: 'Tiền mặt',
    soDuBanDau: 0,
    ghiChu: '',
  });

  useEffect(() => {
    loadWallets();
  }, []);

  const loadWallets = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const data = await walletService.getWallets(userId);
      setWallets(data || []);
      setError('');
    } catch (err: any) {
      console.error('Load wallets error:', err);
      setError(err.response?.data?.message || 'Không thể tải danh sách ví');
      setWallets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingWallet) {
        await walletService.updateWallet(editingWallet.id, getUserId(), formData);
      } else {
        await walletService.createWallet(formData);
      }
      setShowModal(false);
      resetForm();
      loadWallets();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (wallet: WalletType) => {
    setEditingWallet(wallet);
    setFormData({
      taiKhoanId: wallet.taiKhoanId,
      tenVi: wallet.tenVi,
      loaiVi: wallet.loaiVi,
      soDuBanDau: wallet.soDuBanDau,
      ghiChu: wallet.ghiChu || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa ví này?')) return;
    try {
      await walletService.deleteWallet(id, getUserId());
      loadWallets();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể xóa ví');
    }
  };

  const handleLock = async (id: number, isLocked: boolean) => {
    try {
      await walletService.lockWallet(id, getUserId(), isLocked);
      loadWallets();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể khóa/mở ví');
    }
  };

  const resetForm = () => {
    setFormData({
      taiKhoanId: getUserId(),
      tenVi: '',
      loaiVi: 'Tiền mặt',
      soDuBanDau: 0,
      ghiChu: '',
    });
    setEditingWallet(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) return <div className="wallet-container"><p>Đang tải...</p></div>;

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <div>
          <h1>Ví của tôi</h1>
          <p>Quản lý các ví tiền của bạn</p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          + Thêm ví mới
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="wallet-grid">
        {!wallets || wallets.length === 0 ? (
          <p className="empty-message">Chưa có ví nào. Hãy tạo ví đầu tiên!</p>
        ) : (
          (wallets || []).map((wallet) => (
            <div key={wallet.id} className={`wallet-card ${wallet.trangThai === 'Khóa' ? 'locked' : ''}`}>
              <div className="wallet-card-header">
                <h3>{wallet.tenVi}</h3>
                <span className={`wallet-status ${wallet.trangThai === 'Khóa' ? 'locked' : 'active'}`}>
                  {wallet.trangThai}
                </span>
              </div>
              
              <div className="wallet-card-body">
                <p className="wallet-type">{wallet.loaiVi}</p>
                <p className="wallet-balance">
                  {wallet.soDuBanDau.toLocaleString('vi-VN')} đ
                </p>
                {wallet.ghiChu && <p className="wallet-note">{wallet.ghiChu}</p>}
              </div>

              <div className="wallet-card-actions">
                <button className="btn-edit" onClick={() => handleEdit(wallet)}>
                  Sửa
                </button>
                <button 
                  className="btn-lock" 
                  onClick={() => handleLock(wallet.id, wallet.trangThai !== 'Khóa')}
                >
                  {wallet.trangThai === 'Khóa' ? 'Mở' : 'Khóa'}
                </button>
                <button className="btn-delete" onClick={() => handleDelete(wallet.id)}>
                  Xóa
                </button>
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
        title={editingWallet ? 'Sửa ví' : 'Thêm ví mới'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên ví *</label>
            <input
              type="text"
              value={formData.tenVi}
              onChange={(e) => setFormData({ ...formData, tenVi: e.target.value })}
              required
              placeholder="VD: Ví tiền mặt"
            />
          </div>

          <div className="form-group">
            <label>Loại ví *</label>
            <select
              value={formData.loaiVi}
              onChange={(e) => setFormData({ ...formData, loaiVi: e.target.value })}
              required
            >
              <option value="Tiền mặt">Tiền mặt</option>
              <option value="Ngân hàng">Ngân hàng</option>
              <option value="Ví điện tử">Ví điện tử</option>
            </select>
          </div>

          <div className="form-group">
            <label>Số dư ban đầu *</label>
            <input
              type="number"
              value={formData.soDuBanDau}
              onChange={(e) => setFormData({ ...formData, soDuBanDau: Number(e.target.value) })}
              required
              min="0"
              step="1000"
            />
          </div>

          <div className="form-group">
            <label>Ghi chú</label>
            <textarea
              value={formData.ghiChu}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              rows={3}
              placeholder="Ghi chú về ví..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {editingWallet ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
