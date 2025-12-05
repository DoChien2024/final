import { createColumnHelper } from '@tanstack/react-table'
import type { Article } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<Article>()

export const createArticlesColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => {
      const id = String(info.getValue())
      return <span className="text-truncate" style={{ maxWidth: '150px', display: 'inline-block' }} title={id}>{id}</span>
    },
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('author.firstName', {
    header: 'Author',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('category.name', {
    header: 'Category',
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
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue()
      const displayStatus = status === 'published' ? 'Published' : status === 'draft' ? 'Draft' : status === 'archived' ? 'Unpublished' : status
      const colorClass = status === 'published' ? 'success' : status === 'draft' ? 'warning' : 'secondary'
      return (
        <span className={`status-badge status-${colorClass}`}>
          {displayStatus}
        </span>
      )
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <DataTableActions
        id={row.original.id}
        editPath={`/articles/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
