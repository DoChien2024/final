import { createColumnHelper } from '@tanstack/react-table'
import type { Subscription } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<Subscription>()

export const createSubscriptionsColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => {
      const id = String(info.getValue())
      return <span className="text-truncate" style={{ maxWidth: '120px', display: 'inline-block' }} title={id}>{id}</span>
    },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => <strong>{info.getValue()}</strong>,
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: info => `$${info.getValue()}`,
  }),
  columnHelper.accessor('duration', {
    header: 'Duration',
    cell: info => `${info.getValue()} days`,
  }),
  columnHelper.display({
    id: 'features',
    header: 'Features',
    cell: ({ row }) => {
      const features = row.original.features || []
      return features.length > 0 ? `${features.length} features` : '-'
    },
  }),
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: info => {
      const isActive = info.getValue()
      return (
        <span className={`status-badge status-${isActive ? 'success' : 'secondary'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created Date',
    cell: info => {
      const date = info.getValue()
      if (!date) return '-'
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <DataTableActions
        id={row.original.id as any}
        editPath={`/subscriptions/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
