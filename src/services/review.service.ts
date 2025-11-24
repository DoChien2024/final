import axiosInstance from '../utils/axios'

export const reviewService = {
  getAll: (params?: Record<string, any>) => axiosInstance.get('/reviews', { params }),
  getById: (id: string) => axiosInstance.get(`/reviews/${id}`),
  create: (data: any) => axiosInstance.post('/reviews', data),
  update: (id: string, data: any) => axiosInstance.put(`/reviews/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/reviews/${id}`),
}
