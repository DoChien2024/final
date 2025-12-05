import type { Media } from './media.types'
import type { User } from './user.types'
import type { Category } from './category.types'

// Article Types
export interface Article {
  id: number
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
