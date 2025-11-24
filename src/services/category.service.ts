import { API_ENDPOINTS } from '../config/api'
import { createCrudService } from './base.service'
import type { Category, CategoryFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<Category, CategoryFormData>(API_ENDPOINTS.ADMIN_CATEGORIES)

export const categoryService = {
  getCategories: baseService.getAll,
  getCategoryById: baseService.getById,
  createCategory: baseService.create,
  updateCategory: baseService.update,
  deleteCategory: baseService.delete,
  bulkDeleteCategories: baseService.bulkDelete,
}
