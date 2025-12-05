import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '../api/api'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken')
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request for debugging
    console.log('🔵 API Request:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      data: config.data,
      hasToken: !!token
    })
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    })
    console.log('📦 Full Response Data:', response.data)
    console.log('📋 Data Structure:', {
      hasData: !!response.data?.data,
      hasItems: !!response.data?.data?.items,
      itemsLength: response.data?.data?.items?.length,
      structure: Object.keys(response.data || {})
    })
    return response.data
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      const status = error.response.status
      
      console.error('❌ API Error Response:', {
        status,
        url: error.config?.url,
        data: error.response.data,
        message: error.message
      })
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          console.error('Token không hợp lệ hoặc hết hạn. Cần login lại.')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          break
        case 403:
          console.error('Forbidden access - Không có quyền truy cập')
          break
        case 404:
          console.error('Resource not found - API endpoint không tồn tại')
          break
        case 500:
          console.error('Internal server error - Lỗi server')
          break
        default:
          console.error('API Error:', error.response.data)
      }
    } else if (error.request) {
      console.error('Network error - Không kết nối được API:', error.message)
    } else {
      console.error('Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance
