import { createColumnHelper } from '@tanstack/react-table'
import type { User } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<User>()

export const createUsersColumns = (handleDelete: (id: number) => void) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => {
      const id = String(info.getValue())
      return <span className="text-truncate" style={{ maxWidth: '150px', display: 'inline-block' }} title={id}>{id}</span>
    },
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: info => {
      const role = info.getValue()
      return <span className={`role-badge role-${role}`}>{role}</span>
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue()
      const displayStatus = status === 'active' ? 'Active' : 'Inactive'
      const colorClass = status === 'active' ? 'success' : 'secondary'
      return (
        <span className={`status-badge status-${colorClass}`}>
          {displayStatus}
        </span>
      )
    },
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
        editPath={`/users/${row.original.id}/edit`}
        onDelete={handleDelete}
      />
    ),
  }),
]
