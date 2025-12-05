import { createColumnHelper } from '@tanstack/react-table'
import type { Voucher } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<Voucher>()

export const createVouchersColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => {
      const id = String(info.getValue())
      return <span className="text-truncate" style={{ maxWidth: '120px', display: 'inline-block' }} title={id}>{id}</span>
    },
  }),
  columnHelper.accessor('code', {
    header: 'Code',
    cell: info => <strong>{info.getValue()}</strong>,
  }),
  columnHelper.accessor('discountType', {
    header: 'Type',
    cell: info => {
      const type = info.getValue()
      return type === 'percentage' ? 'Percentage' : 'Fixed Amount'
    },
  }),
  columnHelper.accessor('discountValue', {
    header: 'Discount',
    cell: info => {
      const value = info.getValue()
      const type = info.row.original.discountType
      return type === 'percentage' ? `${value}%` : `$${value}`
    },
  }),
  columnHelper.accessor('maxUses', {
    header: 'Max Usage',
    cell: info => info.getValue() || 'Unlimited',
  }),
  columnHelper.accessor('usedCount', {
    header: 'Used',
    cell: info => info.getValue() || 0,
  }),
  columnHelper.accessor('expiresAt', {
    header: 'Expires At',
    cell: info => {
      const date = info.getValue()
      if (!date) return 'No expiry'
      return new Date(date).toLocaleDateString('en-GB')
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue()
      const isActive = status === 'active'
      return (
        <span className={`status-badge status-${isActive ? 'success' : 'secondary'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <DataTableActions
        id={row.original.id as any}
        editPath={`/vouchers/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
