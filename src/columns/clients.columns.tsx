import { createColumnHelper } from '@tanstack/react-table'
import type { User } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<User>()

export const createClientsColumns = (handleDelete: (id: number) => void) => [
  columnHelper.display({
    id: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const avatarUrl = row.original.avatarUrl
      return (
        <div className="avatar-cell">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="avatar-img" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div className="avatar-placeholder" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '14px', color: '#757575' }}>👤</span>
            </div>
          )}
        </div>
      )
    },
  }),
  columnHelper.display({
    id: 'fullName',
    header: 'Full name',
    cell: ({ row }) => {
      const firstName = row.original.firstName || ''
      const lastName = row.original.lastName || ''
      return `${firstName} ${lastName}`.trim() || '-'
    },
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone number',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.display({
    id: 'dateOfBirth',
    header: 'Birthday',
    cell: ({ row }) => {
      const date = row.original.dateOfBirth
      if (!date) return '-'
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
  }),
  columnHelper.display({
    id: 'address',
    header: 'Address',
    cell: ({ row }) => row.original.address || '-',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <DataTableActions
        id={row.original.id as any}
        viewPath={`/client-management/${row.original.id}/view`}
        editPath={`/client-management/${row.original.id}/edit`}
        onDelete={handleDelete}
        showView={true}
        showEdit={true}
        showDelete={true}
      />
    ),
  }),
]
