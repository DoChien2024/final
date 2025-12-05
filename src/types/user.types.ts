import type { Media } from './media.types'

// User Types
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
  dateOfBirth?: string
  address?: string
  avatarUrl?: string
  picture?: Media
  createdAt: string
  updatedAt: string
}

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
