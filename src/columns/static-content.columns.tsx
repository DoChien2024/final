import { createColumnHelper } from '@tanstack/react-table'
import type { StaticContent } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<StaticContent>()

export const createStaticContentColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('key', {
    header: 'Slug',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Category',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.display({
    id: 'required',
    header: 'Required',
    cell: ({ row }) => {
      // Check if this content is required (you may need to add this field to StaticContent type)
      const isRequired = row.original.metadata?.required || false
      return isRequired ? 'Yes' : 'No'
    },
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue()
      const isActive = status === 'active'
      const displayText = isActive ? 'Show' : 'Hide'
      return (
        <span className={`status-badge status-${isActive ? 'success' : 'secondary'}`}>
          {displayText}
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
        editPath={`/static-content/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
