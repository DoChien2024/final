import axiosInstance from '../utils/axios'

export const searchSettingsService = {
  getAll: (params?: Record<string, any>) => axiosInstance.get('/search-settings', { params }),
  getById: (id: string) => axiosInstance.get(`/search-settings/${id}`),
  create: (data: any) => axiosInstance.post('/search-settings', data),
  update: (id: string, data: any) => axiosInstance.put(`/search-settings/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/search-settings/${id}`),
}
