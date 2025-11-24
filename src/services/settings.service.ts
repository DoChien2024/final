import axiosInstance from '../utils/axios'

export const settingsService = {
  getAll: (params?: Record<string, any>) => axiosInstance.get('/settings', { params }),
  getById: (id: string) => axiosInstance.get(`/settings/${id}`),
  create: (data: any) => axiosInstance.post('/settings', data),
  update: (id: string, data: any) => axiosInstance.put(`/settings/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/settings/${id}`),
}
