// Settings Types
export interface Setting {
  id: string
  key: string
  value: string
  type: 'string' | 'number' | 'boolean' | 'json'
  description?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface SettingFormData {
  key: string
  value: string
  type: 'string' | 'number' | 'boolean' | 'json'
  description?: string
  isPublic: boolean
}
