// API Response Types
export interface ApiResponse<T = any> {
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Auth Types
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  user?: User
  admin?: {
    id: string
    username: string
    firstName: string
    lastName: string
    role: string
    email: string
    status: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }
  tokens: {
    accessToken: string
    refreshToken: string
  }
  role?: 'admin' | 'user' | 'doula'
}

export interface User {
  id: string
  fullName: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phoneNumber?: string
  role?: 'admin' | 'user' | 'doula'
  status: 'active' | 'inactive'
  verifiedEmail: boolean
  verifiedPhoneNumber: boolean
  birthDate?: string
  picture?: Media
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  uri: string
  type: string
  metadata?: {
    thumbnail?: { uri: string; key: string }
    medium?: { uri: string; key: string }
  }
  createdAt: string
}

// Article Types
export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  status: 'draft' | 'published' | 'archived'
  type?: string
  featuredImage?: Media
  author: User
  category?: Category
  tags?: string[]
  viewCount?: number
  favoriteCount?: number
  isFavorite?: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ArticleFormData {
  title: string
  content: string
  excerpt?: string
  status: 'draft' | 'published' | 'archived'
  type?: string
  categoryId?: string
  featuredImageId?: string
  tags?: string[]
  publishedAt?: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  parentId?: string
  order?: number
  createdAt: string
  updatedAt: string
}

export interface CategoryFormData {
  name: string
  description?: string
  icon?: string
  parentId?: string
  order?: number
}

// User Management Types
export interface UserFormData {
  firstName: string
  lastName: string
  middleName?: string
  email: string
  phoneNumber?: string
  password?: string
  role?: 'user' | 'doula' | 'admin'
  status?: 'active' | 'inactive'
  birthDate?: string
}

// Query Parameters
export interface QueryParams {
  page?: number
  limit?: number
  offset?: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
  [key: string]: any
}

// Doula Types
export interface Doula {
  id: string
  userId: string
  user?: User
  title: string
  description?: string
  businessName?: string
  starAvg: number
  status: 'active' | 'inactive'
  qualifications?: string[]
  stripeCustomerId?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface DoulaFormData {
  userId: string
  title: string
  description?: string
  businessName?: string
  qualifications?: string[]
  status?: 'active' | 'inactive'
}

// Voucher Types
export interface Voucher {
  id: string
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  maxUses: number
  usedCount: number
  expiresAt: string
  status: 'active' | 'expired' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface VoucherFormData {
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  maxUses: number
  expiresAt: string
  status?: 'active' | 'inactive'
}

// Review Types
export interface Review {
  id: string
  rating: number
  comment: string
  status: 'approved' | 'pending' | 'rejected'
  userId: string
  user?: User
  doulaId: string
  doula?: Doula
  createdAt: string
  updatedAt: string
}

export interface ReviewFormData {
  rating: number
  comment: string
  status?: 'approved' | 'pending' | 'rejected'
  userId: string
  doulaId: string
}

// Static Content Types
export interface StaticContent {
  id: string
  key: string
  title: string
  content: string
  type?: 'page' | 'section' | 'footer' | 'header'
  status: 'active' | 'inactive'
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface StaticContentFormData {
  key: string
  title: string
  content: string
  type?: 'page' | 'section' | 'footer' | 'header'
  status?: 'active' | 'inactive'
  metadata?: Record<string, any>
}
