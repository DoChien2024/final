import { createColumnHelper } from '@tanstack/react-table'
import type { Doula } from '@/types'
import DataTableActions from '@/components/DataTableActions'

const columnHelper = createColumnHelper<Doula>()

export const createDoulasColumns = (handleDelete: (id: number) => void) => [
  columnHelper.display({
    id: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const avatarUrl = row.original.user?.avatarUrl
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
      const firstName = row.original.user?.firstName || ''
      const lastName = row.original.user?.lastName || ''
      return `${firstName} ${lastName}`.trim() || '-'
    },
  }),
  columnHelper.accessor('user.email', {
    header: 'Email',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('user.phoneNumber', {
    header: 'Phone number',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.display({
    id: 'dateOfBirth',
    header: 'Birthday',
    cell: ({ row }) => {
      const date = row.original.user?.dateOfBirth
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
    cell: ({ row }) => row.original.user?.address || '-',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => (
      <DataTableActions
        id={row.original.id as any}
        viewPath={`/doula-management/${row.original.id}/view`}
        editPath={`/doula-management/${row.original.id}/edit`}
        onDelete={handleDelete}
        showView={true}
        showEdit={true}
        showDelete={true}
      />
    ),
  }),
]
