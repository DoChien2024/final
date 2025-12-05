import { API_ENDPOINTS } from '../api/api'
import { createCrudService } from './base.service'
import type { Setting, SettingFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<Setting, SettingFormData>(API_ENDPOINTS.ADMIN_SETTINGS)

export const settingsService = {
  getSettings: baseService.getAll,
  getSettingById: baseService.getById,
  createSetting: baseService.create,
  updateSetting: baseService.update,
  deleteSetting: baseService.delete,
  bulkDeleteSettings: baseService.bulkDelete,
}

// Search Settings Service (reusing settings service with different endpoint)
const searchSettingsService = createCrudService<Setting, SettingFormData>(API_ENDPOINTS.ADMIN_SEARCH_SETTINGS)

export const searchSettings = {
  getSearchSettings: searchSettingsService.getAll,
  getSearchSettingById: searchSettingsService.getById,
  createSearchSetting: searchSettingsService.create,
  updateSearchSetting: searchSettingsService.update,
  deleteSearchSetting: searchSettingsService.delete,
}
