import axiosInstance from '../utils/axios'

export interface Voucher {
  // Define your voucher fields here, e.g.:
  id: string
  code: string
  discount: number
  // Add other fields as needed
}

export const voucherService = {
  getAll: (params?: Record<string, any>) => axiosInstance.get('/vouchers', { params }),
  getById: (id: string) => axiosInstance.get(`/vouchers/${id}`),
  create: (data: Voucher) => axiosInstance.post('/vouchers', data),
  update: (id: string, data: Partial<Voucher>) => axiosInstance.put(`/vouchers/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/vouchers/${id}`),
}