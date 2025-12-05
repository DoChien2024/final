import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import { searchSettings } from '../services/settings.service'
import { useTableManager } from '../hooks/useTableManager'
import { createSearchSettingsColumns } from '../columns/search-settings.columns'
import type { Setting } from '../types'

export default function SearchSettings() {
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
  } = useTableManager<Setting>({
    queryKey: 'search-settings',
    fetchFn: searchSettings.getSearchSettings,
    deleteFn: searchSettings.deleteSearchSetting,
    defaultSortField: 'key',
    defaultSortOrder: 'asc',
    defaultLimit: 10,
  })

  const columns = createSearchSettingsColumns(handleDelete)

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <div className="page-header">
          <h1 className="page-title">Search Settings</h1>
          <div className="page-actions">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={handleSearch}
            />
            <button
              onClick={() => window.location.href = '/search-settings/create'}
              className="btn-primary"
            >
              Create Setting
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
          emptyMessage="No search settings found"
        />
      </div>
    </Layout>
  )
}
