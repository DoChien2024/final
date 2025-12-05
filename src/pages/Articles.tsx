import { useNavigate, useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import { articleService } from '../services/article.service'
import { useTableManager } from '../hooks/useTableManager'
import { createArticlesColumns } from '../columns/articles.columns'
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
  const columns = createArticlesColumns(handleDelete)

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
          emptyMessage="No articles found"
        />
      </div>
    </Layout>
  )
}
