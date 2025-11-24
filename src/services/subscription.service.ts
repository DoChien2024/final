import axiosInstance from '../utils/axios'

export const subscriptionService = {
  getAll: (params?: Record<string, any>) => axiosInstance.get('/subscriptions', { params }),
  getById: (id: string) => axiosInstance.get(`/subscriptions/${id}`),
  create: (data: any) => axiosInstance.post('/subscriptions', data),
  update: (id: string, data: any) => axiosInstance.put(`/subscriptions/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/subscriptions/${id}`),
}
