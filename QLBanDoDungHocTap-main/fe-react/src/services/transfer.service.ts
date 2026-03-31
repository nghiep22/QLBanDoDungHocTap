import api from '../config/axios';
import {
  WalletTransfer,
  WalletTransferCreateRequest,
  WalletTransferQueryParams,
} from '../types/transfer.type';

export const transferService = {
  // POST /api/wallet-transfers
  async createTransfer(data: WalletTransferCreateRequest): Promise<WalletTransfer> {
    const response = await api.post<WalletTransfer>('/api/wallet-transfers', data);
    return response.data;
  },

  // GET /api/wallet-transfers?...
  async getTransfers(params: WalletTransferQueryParams): Promise<WalletTransfer[]> {
    const response = await api.get<WalletTransfer[]>('/api/wallet-transfers', {
      params: {
        taiKhoanId: params.taiKhoanId,
        from: params.from,
        to: params.to,
        viNguonId: params.viNguonId,
        viDichId: params.viDichId,
        page: params.page || 1,
        pageSize: params.pageSize || 20,
        includeDeleted: params.includeDeleted || false,
      },
    });
    return response.data;
  },

  // GET /api/wallet-transfers/{id}?taiKhoanId=...
  async getTransfer(id: number, taiKhoanId: number): Promise<WalletTransfer> {
    const response = await api.get<WalletTransfer>(`/api/wallet-transfers/${id}`, {
      params: { taiKhoanId },
    });
    return response.data;
  },

  // DELETE /api/wallet-transfers/{id}?taiKhoanId=...
  async deleteTransfer(id: number, taiKhoanId: number): Promise<void> {
    await api.delete(`/api/wallet-transfers/${id}`, {
      params: { taiKhoanId },
    });
  },
};
