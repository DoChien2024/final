import { API_ENDPOINTS } from '../api/api'
import { createCrudService } from './base.service'
import type { Subscription, SubscriptionFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<Subscription, SubscriptionFormData>(API_ENDPOINTS.ADMIN_SUBSCRIPTIONS)

export const subscriptionService = {
  getSubscriptions: baseService.getAll,
  getSubscriptionById: baseService.getById,
  createSubscription: baseService.create,
  updateSubscription: baseService.update,
  deleteSubscription: baseService.delete,
  bulkDeleteSubscriptions: baseService.bulkDelete,
}
