// Subscription Types
export interface Subscription {
  id: string
  name: string
  description?: string
  price: number
  duration: number // in days
  features?: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SubscriptionFormData {
  name: string
  description?: string
  price: number
  duration: number
  features?: string[]
  isActive: boolean
}
