import type { User } from './user.types'

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
