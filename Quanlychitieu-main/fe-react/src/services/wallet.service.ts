import api from '../config/axios';
import { Wallet, WalletCreateRequest, WalletUpdateRequest } from '../types/wallet.type';

export const walletService = {
  // GET /api/wallets?taiKhoanId=1&includeDeleted=false
  async getWallets(taiKhoanId: number, includeDeleted = false): Promise<Wallet[]> {
    const response = await api.get<Wallet[]>('/api/wallets', {
      params: { taiKhoanId, includeDeleted },
    });
    return response.data;
  },

  // GET /api/wallets/{id}?taiKhoanId=1
  async getWallet(id: number, taiKhoanId: number, includeDeleted = false): Promise<Wallet> {
    const response = await api.get<Wallet>(`/api/wallets/${id}`, {
      params: { taiKhoanId, includeDeleted },
    });
    return response.data;
  },

  // POST /api/wallets
  async createWallet(data: WalletCreateRequest): Promise<{ id: number }> {
    const response = await api.post<{ id: number }>('/api/wallets', data);
    return response.data;
  },

  // PUT /api/wallets/{id}?taiKhoanId=1
  async updateWallet(id: number, taiKhoanId: number, data: WalletUpdateRequest): Promise<void> {
    await api.put(`/api/wallets/${id}`, data, {
      params: { taiKhoanId },
    });
  },

  // PATCH /api/wallets/{id}/lock
  async lockWallet(id: number, taiKhoanId: number, isLocked: boolean): Promise<void> {
    await api.patch(`/api/wallets/${id}/lock`, {
      TaiKhoanId: taiKhoanId,
      IsLocked: isLocked,
    });
  },

  // DELETE /api/wallets/{id}?taiKhoanId=1
  async deleteWallet(id: number, taiKhoanId: number): Promise<void> {
    await api.delete(`/api/wallets/${id}`, {
      params: { taiKhoanId },
    });
  },
};
