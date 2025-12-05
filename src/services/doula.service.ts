import { API_ENDPOINTS } from '../api/api'
import { createCrudService } from './base.service'
import type { Doula, DoulaFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<Doula, DoulaFormData>(API_ENDPOINTS.ADMIN_DOULAS)

export const doulaService = {
  getDoulas: baseService.getAll,
  getDoulaById: baseService.getById,
  createDoula: baseService.create,
  updateDoula: baseService.update,
  deleteDoula: baseService.delete,
  bulkDeleteDoulas: baseService.bulkDelete,
}
