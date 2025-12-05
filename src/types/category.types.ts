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
