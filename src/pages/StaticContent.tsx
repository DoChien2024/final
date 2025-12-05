import { useNavigate, useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import { staticContentService } from '../services/static-content.service'
import { useTableManager } from '../hooks/useTableManager'
import { createStaticContentColumns } from '../columns/static-content.columns'
import type { StaticContent } from '../types'

export default function StaticContentPage() {
  const navigate = useNavigate()
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
  } = useTableManager<StaticContent>({
    queryKey: 'static-content',
    fetchFn: staticContentService.getStaticContents,
    deleteFn: staticContentService.deleteStaticContent,
    defaultSortField: 'updatedAt',
    defaultSortOrder: 'desc',
    defaultLimit: 10,
  })

  const columns = createStaticContentColumns(handleDelete)

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <div className="page-header">
          <h1 className="page-title">Static Content</h1>
          <div className="page-actions">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={handleSearch}
            />
            <button
              onClick={() => navigate('/static-content/create')}
              className="btn-primary"
            >
              Create Content
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
          emptyMessage="No static content found"
        />
      </div>
    </Layout>
  )
}
