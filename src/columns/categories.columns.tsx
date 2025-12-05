import { createColumnHelper } from '@tanstack/react-table'
import type { Category } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<Category>()

export const createCategoriesColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => {
      const id = String(info.getValue())
      return <span className="text-truncate" style={{ maxWidth: '150px', display: 'inline-block' }} title={id}>{id}</span>
    },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('slug', {
    header: 'Slug',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created Date',
    cell: info => {
      const date = info.getValue()
      if (!date) return '-'
      return new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <DataTableActions
        id={row.original.id as any}
        editPath={`/categories/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
