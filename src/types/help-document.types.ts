// Help Document Types
export interface HelpDocument {
  id: string
  title: string
  slug: string
  content: string
  category?: string
  tags?: string[]
  order?: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface HelpDocumentFormData {
  title: string
  slug: string
  content: string
  category?: string
  tags?: string[]
  order?: number
  isPublished: boolean
}
