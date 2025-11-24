import { API_ENDPOINTS } from '../config/api'
import { createCrudService } from './base.service'
import type { StaticContent, StaticContentFormData } from '../types'

const baseService = createCrudService<StaticContent, StaticContentFormData>(API_ENDPOINTS.ADMIN_STATIC_CONTENT)

export const staticContentService = {
  getStaticContents: baseService.getAll,
  getStaticContentById: baseService.getById,
  createStaticContent: baseService.create,
  updateStaticContent: baseService.update,
  deleteStaticContent: baseService.delete,
  bulkDeleteStaticContents: baseService.bulkDelete,
}
