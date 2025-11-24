import axiosInstance from '../utils/axios'

export const doulaService = {
  getAll: (params?: Record<string, any>) => axiosInstance.get('/doulas', { params }),
  getById: (id: string) => axiosInstance.get(`/doulas/${id}`),
  create: (data: any) => axiosInstance.post('/doulas', data),
  update: (id: string, data: any) => axiosInstance.put(`/doulas/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/doulas/${id}`),
}
