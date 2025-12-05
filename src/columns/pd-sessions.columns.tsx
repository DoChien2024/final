import { createColumnHelper } from '@tanstack/react-table'
import type { PDSession } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<PDSession>()

export const createPDSessionsColumns = (handleDelete: (id: number) => void) => [
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
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => {
      const type = info.getValue()
      return <span className={`type-badge type-${type}`}>{type}</span>
    },
  }),
  columnHelper.accessor('date', {
    header: 'Date',
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
  columnHelper.accessor('duration', {
    header: 'Duration',
    cell: info => `${info.getValue()} min`,
  }),
  columnHelper.display({
    id: 'participants',
    header: 'Participants',
    cell: ({ row }) => {
      const current = row.original.currentParticipants || 0
      const max = row.original.maxParticipants || 0
      return max ? `${current}/${max}` : `${current}`
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue()
      const colorClass = status === 'completed' ? 'success' : status === 'scheduled' ? 'info' : 'secondary'
      return (
        <span className={`status-badge status-${colorClass}`}>
          {status}
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
        editPath={`/pd-session/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
