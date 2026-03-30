import { useState, useEffect } from 'react';
import { categoryService } from '../../services/category.service';
import { Category as CategoryType, CategoryCreateRequest } from '../../types/category.type';
import { getUserId } from '../../utils/storage';
import { Modal } from '../../components/Modal/Modal';
import './Category.css';

export default function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);
  const [filterLoai, setFilterLoai] = useState<'THU' | 'CHI' | ''>('');
  
  const [formData, setFormData] = useState<CategoryCreateRequest>({
    taiKhoanId: getUserId(),
    tenDanhMuc: '',
    loai: 'CHI',
    icon: '',
    mauSac: '#3b82f6',
    ghiChu: '',
  });

  useEffect(() => {
    loadCategories();
  }, [filterLoai]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const data = await categoryService.getCategories(
        userId,
        filterLoai || undefined
      );
      setCategories(data || []);
      setError('');
    } catch (err: any) {
      console.error('Load categories error:', err);
      setError(err.response?.data?.message || 'Không thể tải danh sách danh mục');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      setShowModal(false);
      resetForm();
      loadCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (category: CategoryType) => {
    setEditingCategory(category);
    setFormData({
      taiKhoanId: category.taiKhoanId,
      tenDanhMuc: category.tenDanhMuc,
      loai: category.loai,
      icon: category.icon || '',
      mauSac: category.mauSac || '#3b82f6',
      ghiChu: category.ghiChu || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;
    try {
      await categoryService.deleteCategory(id, getUserId());
      loadCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể xóa danh mục');
    }
  };

  const handleLock = async (id: number, isLocked: boolean) => {
    try {
      await categoryService.lockCategory(id, getUserId(), isLocked);
      loadCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể khóa/mở danh mục');
    }
  };

  const resetForm = () => {
    setFormData({
      taiKhoanId: getUserId(),
      tenDanhMuc: '',
      loai: 'CHI',
      icon: '',
      mauSac: '#3b82f6',
      ghiChu: '',
    });
    setEditingCategory(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const thuCategories = (categories || []).filter(c => c.loai === 'THU');
  const chiCategories = (categories || []).filter(c => c.loai === 'CHI');

  if (loading) return <div className="category-container"><p>Đang tải...</p></div>;

  return (
    <div className="category-container">
      <div className="category-header">
        <div>
          <h1>Danh mục</h1>
          <p>Quản lý danh mục thu chi</p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          + Thêm danh mục
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="category-filters">
        <button 
          className={`filter-btn ${filterLoai === '' ? 'active' : ''}`}
          onClick={() => setFilterLoai('')}
        >
          Tất cả ({(categories || []).length})
        </button>
        <button 
          className={`filter-btn ${filterLoai === 'THU' ? 'active' : ''}`}
          onClick={() => setFilterLoai('THU')}
        >
          Thu ({thuCategories.length})
        </button>
        <button 
          className={`filter-btn ${filterLoai === 'CHI' ? 'active' : ''}`}
          onClick={() => setFilterLoai('CHI')}
        >
          Chi ({chiCategories.length})
        </button>
      </div>

      {!categories || categories.length === 0 ? (
        <p className="empty-message">Chưa có danh mục nào. Hãy tạo danh mục đầu tiên!</p>
      ) : (
        <>
          {(!filterLoai || filterLoai === 'THU') && thuCategories.length > 0 && (
            <div className="category-section">
              <h2 className="section-title income">Danh mục Thu</h2>
              <div className="category-list">
                {thuCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onLock={handleLock}
                  />
                ))}
              </div>
            </div>
          )}

          {(!filterLoai || filterLoai === 'CHI') && chiCategories.length > 0 && (
            <div className="category-section">
              <h2 className="section-title expense">Danh mục Chi</h2>
              <div className="category-list">
                {chiCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onLock={handleLock}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên danh mục *</label>
            <input
              type="text"
              value={formData.tenDanhMuc}
              onChange={(e) => setFormData({ ...formData, tenDanhMuc: e.target.value })}
              required
              placeholder="VD: Lương, Ăn uống, Di chuyển..."
            />
          </div>

          <div className="form-group">
            <label>Loại *</label>
            <select
              value={formData.loai}
              onChange={(e) => setFormData({ ...formData, loai: e.target.value as 'THU' | 'CHI' })}
              required
            >
              <option value="THU">Thu nhập</option>
              <option value="CHI">Chi tiêu</option>
            </select>
          </div>

          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="VD: 💰, 🍔, 🚗, 🏠..."
            />
          </div>

          <div className="form-group">
            <label>Màu sắc</label>
            <input
              type="color"
              value={formData.mauSac}
              onChange={(e) => setFormData({ ...formData, mauSac: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Ghi chú</label>
            <textarea
              value={formData.ghiChu}
              onChange={(e) => setFormData({ ...formData, ghiChu: e.target.value })}
              rows={3}
              placeholder="Ghi chú về danh mục..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {editingCategory ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

interface CategoryCardProps {
  category: CategoryType;
  onEdit: (category: CategoryType) => void;
  onDelete: (id: number) => void;
  onLock: (id: number, isLocked: boolean) => void;
}

function CategoryCard({ category, onEdit, onDelete, onLock }: CategoryCardProps) {
  return (
    <div className={`category-card ${category.trangThai === 'Khóa' ? 'locked' : ''}`}>
      <div className="category-icon" style={{ backgroundColor: category.mauSac }}>
        {category.icon || '📁'}
      </div>
      <div className="category-info">
        <h3>{category.tenDanhMuc}</h3>
        <span className={`category-type ${category.loai === 'THU' ? 'income' : 'expense'}`}>
          {category.loai === 'THU' ? 'Thu nhập' : 'Chi tiêu'}
        </span>
        {category.ghiChu && <p className="category-note">{category.ghiChu}</p>}
      </div>
      <div className="category-actions">
        <button className="btn-icon" onClick={() => onEdit(category)} title="Sửa">
          ✏️
        </button>
        <button 
          className="btn-icon" 
          onClick={() => onLock(category.id, category.trangThai !== 'Khóa')}
          title={category.trangThai === 'Khóa' ? 'Mở' : 'Khóa'}
        >
          {category.trangThai === 'Khóa' ? '🔓' : '🔒'}
        </button>
        <button className="btn-icon" onClick={() => onDelete(category.id)} title="Xóa">
          🗑️
        </button>
      </div>
    </div>
  );
}
