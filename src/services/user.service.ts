import { API_ENDPOINTS } from '../config/api'
import { createCrudService } from './base.service'
import type { User, UserFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<User, UserFormData>(API_ENDPOINTS.ADMIN_USERS)

export const userService = {
  getUsers: baseService.getAll,
  getUserById: baseService.getById,
  createUser: baseService.create,
  updateUser: baseService.update,
  deleteUser: baseService.delete,
  bulkDeleteUsers: baseService.bulkDelete,
}
