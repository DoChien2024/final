import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table'
import { FiEdit2, FiTrash2, FiChevronDown } from 'react-icons/fi'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import PageLoader from '../components/PageLoader'
import { articleService } from '../services/article.service'
import { useTableParams } from '../hooks/useCommon'
import type { Article } from '../types'

export default function Articles() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { page, limit, search, sortField, sortOrder, updateParams } = useTableParams()

  const [searchInput, setSearchInput] = useState(search)
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortField, desc: sortOrder === 'desc' }
  ])

  // Fetch articles with React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles', page, limit, search, sortField, sortOrder],
    queryFn: () => articleService.getArticles({
      page,
      limit,
      search,
      sort: sortField,
      order: sortOrder as 'asc' | 'desc',
    }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => articleService.deleteArticle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParams({ search: searchInput, page: 1 })
  }

  const handleSortChange = (columnId: string) => {
    const currentSort = sorting.find(s => s.id === columnId)
    const newOrder = currentSort?.desc ? 'asc' : 'desc'
    setSorting([{ id: columnId, desc: newOrder === 'desc' }])
    updateParams({ sort: columnId, order: newOrder, page: 1 })
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

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
