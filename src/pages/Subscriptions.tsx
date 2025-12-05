import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import { subscriptionService } from '../services/subscription.service'
import { useTableManager } from '../hooks/useTableManager'
import { createSubscriptionsColumns } from '../columns/subscriptions.columns'
import type { Subscription } from '../types'

export default function Subscriptions() {
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
  } = useTableManager<Subscription>({
    queryKey: 'subscriptions',
    fetchFn: subscriptionService.getSubscriptions,
    deleteFn: subscriptionService.deleteSubscription,
    defaultSortField: 'createdAt',
    defaultSortOrder: 'desc',
    defaultLimit: 10,
  })

  const columns = createSubscriptionsColumns(handleDelete)

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <div className="page-header">
          <h1 className="page-title">Subscriptions</h1>
          <div className="page-actions">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSubmit={handleSearch}
            />
            <button
              onClick={() => window.location.href = '/subscriptions/create'}
              className="btn-primary"
            >
              Create Subscription
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
          emptyMessage="No subscriptions found"
        />
      </div>
    </Layout>
  )
}
