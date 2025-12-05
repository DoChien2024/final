// Voucher Types
export interface Voucher {
  id: string
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  maxUses: number
  usedCount: number
  expiresAt: string
  status: 'active' | 'expired' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface VoucherFormData {
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  maxUses: number
  expiresAt: string
  status?: 'active' | 'inactive'
}
