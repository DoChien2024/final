import { useNavigate, useLocation } from 'react-router-dom'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import { FiEdit2, FiTrash2, FiChevronDown } from 'react-icons/fi'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import PageLoader from '../components/PageLoader'
import { articleService } from '../services/article.service'
import { useTableManager } from '../hooks/useTableManager'
import type { Article } from '../types'

export default function Articles() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    page,
    limit,
    searchInput,
    setSearchInput,
    sorting,
    setSorting,
    data,
    isLoading,
    error,
    updateParams,
    handleSearch,
    handleSortChange,
    handleDelete,
  } = useTableManager<Article>({
    queryKey: 'articles',
    fetchFn: articleService.getArticles,
    deleteFn: articleService.deleteArticle,
    defaultSortField: 'createdAt',
    defaultSortOrder: 'desc',
    defaultLimit: 10,
  })

  // Table columns
  const columnHelper = createColumnHelper<Article>()
  const columns = [
    columnHelper.accessor('slug', {
      header: 'Slug',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('category.name', {
      header: 'Category',
      cell: info => info.getValue() || '-',
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue()
        const displayStatus = status === 'published' ? 'Show' : status === 'draft' ? 'Hide' : status
        return (
          <span className={`status-badge status-${status}`}>
            {displayStatus}
          </span>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="action-buttons">
          <button
            onClick={() => navigate(`/articles/${row.original.id}/edit`)}
            className="btn-icon btn-edit"
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="btn-icon btn-delete"
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data: data?.data?.items || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
  })

  const totalPages = data?.data?.totalPages || 1
  const total = data?.data?.total || 0

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <div className="page-header">
          <h1 className="page-title">Article</h1>
          <div className="page-actions">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={handleSearch}
            />
            <button
              onClick={() => navigate('/articles/create')}
              className="btn-primary"
            >
              Create Article
            </button>
          </div>
        </div>

        <div className="table-container">
          <PageLoader isLoading={isLoading}>
            {error ? (
              <div className="error">Error loading articles</div>
            ) : (
              <>
              <table className="data-table">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          onClick={() => header.column.getCanSort() && handleSortChange(header.id)}
                          className={header.column.getCanSort() ? 'sortable' : ''}
                        >
                          <div className="th-content">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <FiChevronDown className="sort-icon" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                total={total}
                limit={limit}
                onPageChange={(newPage) => updateParams({ page: newPage })}
                onLimitChange={(newLimit) => updateParams({ limit: newLimit, page: 1 })}
              />
              </>
            )}
          </PageLoader>
        </div>
      </div>
    </Layout>
  )
}
