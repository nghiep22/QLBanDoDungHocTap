import api from '../config/axios';
import {
  Transaction,
  TransactionCreateRequest,
  TransactionUpdateRequest,
  TransactionQueryParams,
  TransactionListResponse,
} from '../types/transaction.type';

export const transactionService = {
  // GET /api/transactions?from=&to=&viId=&danhMucId=&loai=&q=&page=&pageSize=&sort=NgayGD_desc
  async getTransactions(params: TransactionQueryParams): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>('/api/transactions', {
      params: {
        taiKhoanId: params.taiKhoanId,
        from: params.from,
        to: params.to,
        viId: params.viId,
        danhMucId: params.danhMucId,
        loai: params.loai,
        q: params.q,
        page: params.page || 1,
        pageSize: params.pageSize || 20,
        sort: params.sort || 'NgayGD_desc',
        includeDeleted: params.includeDeleted || false,
      },
    });
    return response.data || [];
  },

  // GET /api/transactions/{id}?taiKhoanId=2
  async getTransaction(id: number, taiKhoanId: number, includeDeleted = false): Promise<Transaction> {
    const response = await api.get<Transaction>(`/api/transactions/${id}`, {
      params: { taiKhoanId, includeDeleted },
    });
    return response.data;
  },

  // POST /api/transactions
  async createTransaction(data: TransactionCreateRequest): Promise<{ id: number }> {
    const response = await api.post<{ id: number }>('/api/transactions', data);
    return response.data;
  },

  // PUT /api/transactions/{id}
  async updateTransaction(id: number, data: TransactionUpdateRequest): Promise<void> {
    await api.put(`/api/transactions/${id}`, data);
  },

  // DELETE /api/transactions/{id}?taiKhoanId=2
  async deleteTransaction(id: number, taiKhoanId: number): Promise<void> {
    await api.delete(`/api/transactions/${id}`, {
      params: { taiKhoanId },
    });
  },

  // PATCH /api/transactions/{id}/restore?taiKhoanId=2
  async restoreTransaction(id: number, taiKhoanId: number): Promise<void> {
    await api.patch(`/api/transactions/${id}/restore`, null, {
      params: { taiKhoanId },
    });
  },
};
