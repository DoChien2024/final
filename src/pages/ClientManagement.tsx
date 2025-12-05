import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import { userService } from '../services/user.service'
import { useTableManager } from '../hooks/useTableManager'
import { createClientsColumns } from '../columns/clients.columns'
import type { User } from '../types'

export default function ClientManagement() {
  const location = useLocation()
  const {
    page,
    limit,
    searchInput,
    setSearchInput,
    sorting,
    data,
    isLoading,
    error,
    updateParams,
    handleSearch,
    handleSortChange,
    handleDelete,
  } = useTableManager<User>({
    queryKey: 'clients',
    fetchFn: userService.getUsers, // This should be clientService but using userService for now
    deleteFn: userService.deleteUser,
    defaultSortField: 'createdAt',
    defaultSortOrder: 'desc',
    defaultLimit: 25,
  })

  const columns = createClientsColumns(handleDelete)

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <div className="page-header">
          <h1 className="page-title">Account / Client Management</h1>
          <div className="page-actions">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={handleSearch}
            />
          </div>
        </div>

        <DataTable
          data={data?.items || []}
          columns={columns}
          sorting={sorting}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          error={error}
          pagination={{
            currentPage: page,
            totalPages: data?.totalPages || 1,
            total: data?.total || 0,
            limit,
            onPageChange: (newPage) => updateParams({ page: newPage }),
            onLimitChange: (newLimit) => updateParams({ limit: newLimit, page: 1 }),
          }}
          emptyMessage="No clients found"
        />
      </div>
    </Layout>
  )
}
