import { createColumnHelper } from '@tanstack/react-table'
import type { HelpDocument } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<HelpDocument>()

export const createHelpDocumentsColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => {
      const id = String(info.getValue())
      return <span className="text-truncate" style={{ maxWidth: '120px', display: 'inline-block' }} title={id}>{id}</span>
    },
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('slug', {
    header: 'Slug',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('order', {
    header: 'Order',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('isPublished', {
    header: 'Status',
    cell: info => {
      const isPublished = info.getValue()
      return (
        <span className={`status-badge status-${isPublished ? 'success' : 'secondary'}`}>
          {isPublished ? 'Published' : 'Draft'}
        </span>
      )
    },
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Last Updated',
    cell: info => {
      const date = info.getValue()
      if (!date) return '-'
      return new Date(date).toLocaleString('en-GB', {
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
        editPath={`/help-documents/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
