import { API_ENDPOINTS } from '../api/api'
import { createCrudService } from './base.service'
import type { Voucher, VoucherFormData } from '../types'

// Sử dụng generic CRUD service factory
const baseService = createCrudService<Voucher, VoucherFormData>(API_ENDPOINTS.ADMIN_VOUCHERS)

export const voucherService = {
  getVouchers: baseService.getAll,
  getVoucherById: baseService.getById,
  createVoucher: baseService.create,
  updateVoucher: baseService.update,
  deleteVoucher: baseService.delete,
  bulkDeleteVouchers: baseService.bulkDelete,
}