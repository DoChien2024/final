import type { User } from './user.types'
import type { Doula } from './doula.types'

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
