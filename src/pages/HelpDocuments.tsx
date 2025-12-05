import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import { helpDocumentService } from '../services/help-document.service'
import { useTableManager } from '../hooks/useTableManager'
import { createHelpDocumentsColumns } from '../columns/help-documents.columns'
import type { HelpDocument } from '../types'

export default function HelpDocuments() {
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
  } = useTableManager<HelpDocument>({
    queryKey: 'help-documents',
    fetchFn: helpDocumentService.getHelpDocuments,
    deleteFn: helpDocumentService.deleteHelpDocument,
    defaultSortField: 'order',
    defaultSortOrder: 'asc',
    defaultLimit: 10,
  })

  const columns = createHelpDocumentsColumns(handleDelete)

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <div className="page-header">
          <h1 className="page-title">Help Documents</h1>
          <div className="page-actions">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={handleSearch}
            />
            <button
              onClick={() => window.location.href = '/help-documents/create'}
              className="btn-primary"
            >
              Create Document
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
          emptyMessage="No help documents found"
        />
      </div>
    </Layout>
  )
}
