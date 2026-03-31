import api from '../config/axios';
import { Category, CategoryCreateRequest, CategoryUpdateRequest } from '../types/category.type';

export const categoryService = {
  // GET /api/categories?taiKhoanId=2&loai=THU&status=Hoạt động&includeDeleted=false
  async getCategories(
    taiKhoanId: number,
    loai?: string,
    status?: string,
    includeDeleted = false
  ): Promise<Category[]> {
    const response = await api.get<Category[]>('/api/categories', {
      params: { taiKhoanId, loai, status, includeDeleted },
    });
    return response.data;
  },

  // GET /api/categories/{id}?taiKhoanId=2
  async getCategory(id: number, taiKhoanId: number, includeDeleted = false): Promise<Category> {
    const response = await api.get<Category>(`/api/categories/${id}`, {
      params: { taiKhoanId, includeDeleted },
    });
    return response.data;
  },

  // POST /api/categories
  async createCategory(data: CategoryCreateRequest): Promise<{ id: number }> {
    const response = await api.post<{ id: number }>('/api/categories', data);
    return response.data;
  },

  // PUT /api/categories/{id}
  async updateCategory(id: number, data: CategoryUpdateRequest): Promise<void> {
    await api.put(`/api/categories/${id}`, data);
  },

  // PATCH /api/categories/{id}/lock
  async lockCategory(id: number, taiKhoanId: number, isLocked: boolean): Promise<void> {
    await api.patch(`/api/categories/${id}/lock`, {
      TaiKhoanId: taiKhoanId,
      IsLocked: isLocked,
    });
  },

  // DELETE /api/categories/{id}?taiKhoanId=2
  async deleteCategory(id: number, taiKhoanId: number): Promise<void> {
    await api.delete(`/api/categories/${id}`, {
      params: { taiKhoanId },
    });
  },
};
