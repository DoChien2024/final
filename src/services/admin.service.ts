// import axiosInstance from '../utils/axios'

// export const adminService = {
//   login: (data) => axiosInstance.post('/admins/auth/login', data),
//   logout: () => axiosInstance.post('/admins/auth/logout'),
//   getUsers: (params) => axiosInstance.get('/admins/users', { params }),
//   getArticles: (params) => axiosInstance.get('/admins/articles', { params }),
//   getCategories: (params) => axiosInstance.get('/admins/categories', { params }),
//   getStaticContents: (params) => axiosInstance.get('/admins/static-contents', { params }),
//   getDoulas: (params) => axiosInstance.get('/admins/doulas', { params }),
//   getVouchers: (params) => axiosInstance.get('/admins/vouchers', { params }),
//   getReviews: (params) => axiosInstance.get('/admins/reviews', { params }),
//   getSubscriptions: (params) => axiosInstance.get('/admins/subscriptions', { params }),
//   getHelpDocuments: (params) => axiosInstance.get('/admins/help-documents', { params }),
//   getSettings: (params) => axiosInstance.get('/admins/settings', { params }),
//   getNotifications: (params) => axiosInstance.get('/admins/notifications', { params }),
//   getDashboard: (params) => axiosInstance.get('/admins/dashboard', { params }),
//   getRoles: (params) => axiosInstance.get('/admins/roles', { params }),
//   getPermissions: (params) => axiosInstance.get('/admins/permissions', { params }),
// }

import axiosInstance from '../utils/axios'

export interface AdminLoginData {
  username: string
  password: string
}

export type Params = Record<string, any>

export const adminService = {
  login: (data: AdminLoginData) => axiosInstance.post('/admins/auth/login', data),
  logout: () => axiosInstance.post('/admins/auth/logout'),
  getUsers: (params?: Params) => axiosInstance.get('/admins/users', { params }),
  getArticles: (params?: Params) => axiosInstance.get('/admins/articles', { params }),
  getCategories: (params?: Params) => axiosInstance.get('/admins/categories', { params }),
  getStaticContents: (params?: Params) => axiosInstance.get('/admins/static-contents', { params }),
  getDoulas: (params?: Params) => axiosInstance.get('/admins/doulas', { params }),
  getVouchers: (params?: Params) => axiosInstance.get('/admins/vouchers', { params }),
  getReviews: (params?: Params) => axiosInstance.get('/admins/reviews', { params }),
  getSubscriptions: (params?: Params) => axiosInstance.get('/admins/subscriptions', { params }),
  getHelpDocuments: (params?: Params) => axiosInstance.get('/admins/help-documents', { params }),
  getSettings: (params?: Params) => axiosInstance.get('/admins/settings', { params }),
  getNotifications: (params?: Params) => axiosInstance.get('/admins/notifications', { params }),
  getDashboard: (params?: Params) => axiosInstance.get('/admins/dashboard', { params }),
  getRoles: (params?: Params) => axiosInstance.get('/admins/roles', { params }),
  getPermissions: (params?: Params) => axiosInstance.get('/admins/permissions', { params }),
}
