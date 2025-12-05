// PD Session Types
export interface PDSession {
  id: string
  title: string
  description?: string
  date: string
  duration: number // in minutes
  location?: string
  type: 'online' | 'offline'
  status: 'scheduled' | 'completed' | 'cancelled'
  maxParticipants?: number
  currentParticipants?: number
  createdAt: string
  updatedAt: string
}

export interface PDSessionFormData {
  title: string
  description?: string
  date: string
  duration: number
  location?: string
  type: 'online' | 'offline'
  maxParticipants?: number
}
