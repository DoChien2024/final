import { STATUS_LABELS } from '../constants'

export const getStatusDisplay = (status: string): string => {
  return STATUS_LABELS[status] || status
}

export const formatPaginationInfo = (page: number, limit: number, total: number): string => {
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)
  return `Showing ${from} to ${to} of ${total} entries.`
}
