import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import { pdSessionService } from '../services/pd-session.service'
import { useTableManager } from '../hooks/useTableManager'
import { createPDSessionsColumns } from '../columns/pd-sessions.columns'
import type { PDSession } from '../types'

export default function PDSession() {
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
  } = useTableManager<PDSession>({
    queryKey: 'pd-sessions',
    fetchFn: pdSessionService.getPDSessions,
    deleteFn: pdSessionService.deletePDSession,
    defaultSortField: 'date',
    defaultSortOrder: 'desc',
    defaultLimit: 10,
  })

  const columns = createPDSessionsColumns(handleDelete)

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <div className="page-header">
          <h1 className="page-title">PD Session</h1>
          <div className="page-actions">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={handleSearch}
            />
            <button
              onClick={() => window.location.href = '/pd-session/create'}
              className="btn-primary"
            >
              Create Session
            </button>
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
          emptyMessage="No PD sessions found"
        />
      </div>
    </Layout>
  )
}
