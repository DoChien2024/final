import { API_ENDPOINTS } from '../api/api'
import { createCrudService } from './base.service'
import type { PDSession, PDSessionFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<PDSession, PDSessionFormData>(API_ENDPOINTS.ADMIN_PD_SESSIONS)

export const pdSessionService = {
  getPDSessions: baseService.getAll,
  getPDSessionById: baseService.getById,
  createPDSession: baseService.create,
  updatePDSession: baseService.update,
  deletePDSession: baseService.delete,
  bulkDeletePDSessions: baseService.bulkDelete,
}
