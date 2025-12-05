import { createColumnHelper } from '@tanstack/react-table'
import type { Setting } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<Setting>()

export const createSearchSettingsColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => {
      const id = String(info.getValue())
      return <span className="text-truncate" style={{ maxWidth: '120px', display: 'inline-block' }} title={id}>{id}</span>
    },
  }),
  columnHelper.accessor('key', {
    header: 'Key',
    cell: info => <strong>{info.getValue()}</strong>,
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: info => {
      const value = info.getValue()
      const truncated = value.length > 50 ? value.substring(0, 50) + '...' : value
      return <span title={value}>{truncated}</span>
    },
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => <span className={`type-badge type-${info.getValue()}`}>{info.getValue()}</span>,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('isPublic', {
    header: 'Public',
    cell: info => info.getValue() ? 'Yes' : 'No',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <DataTableActions
        id={row.original.id as any}
        editPath={`/search-settings/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
