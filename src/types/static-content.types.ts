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
