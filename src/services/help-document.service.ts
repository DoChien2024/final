import axiosInstance from '../utils/axios'

export const helpDocumentService = {
  getAll: (params?: Record<string, any>) => axiosInstance.get('/help-documents', { params }),
  getById: (id: string) => axiosInstance.get(`/help-documents/${id}`),
  create: (data: any) => axiosInstance.post('/help-documents', data),
  update: (id: string, data: any) => axiosInstance.put(`/help-documents/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/help-documents/${id}`),
}
