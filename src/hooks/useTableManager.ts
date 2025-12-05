import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from './useParams'
import type { ApiResponse, PaginatedResponse, QueryParams } from '../types'

export interface FetchParams {
  page: number
  limit: number
  search: string
  sort: string
  order: 'asc' | 'desc'
}

export interface TableManagerOptions<T> {
  queryKey: string
  fetchFn: (params?: QueryParams) => Promise<ApiResponse<PaginatedResponse<T>>>
  deleteFn?: (id: number | string) => Promise<ApiResponse>
  defaultSortField?: string
  defaultSortOrder?: 'asc' | 'desc'
  defaultLimit?: number
}

export function useTableManager<T = unknown>(options: TableManagerOptions<T>) {
  const queryClient = useQueryClient()
  
  // Use useParams hook for URL parameter management
  const { params, updateParams: setParams } = useParams({
    page: 1,
    limit: options.defaultLimit || 10,
    search: '',
    sort: options.defaultSortField || 'createdAt',
    order: options.defaultSortOrder || 'desc',
  })

  const { page, limit, search, sort: sortField, order: sortOrder } = params

  const [searchInput, setSearchInput] = useState(search)
  const [sorting, setSorting] = useState([{ id: sortField, desc: sortOrder === 'desc' }])

  // Fetch data
  const { data: response, isLoading, error } = useQuery({
    queryKey: [options.queryKey, page, limit, search, sortField, sortOrder],
    queryFn: () => options.fetchFn({ page, limit, search, sort: sortField, order: sortOrder }),
  })
  
  const items = Array.isArray(response?.data) ? response.data : []
  const metadata = response?.metadata
  
  const data: PaginatedResponse<T> = {
    items: items as T[],
    total: metadata?.totalCount || 0,
    totalPages: metadata?.totalPages || 1,
    page: metadata?.page || 1,
    limit: metadata?.limit || 10,
  }
  
  // Debug logs
  console.log('🔍 useTableManager Debug:', {
    response,
    items,
    metadata,
    data,
    hasItems: Array.isArray(items),
    itemsCount: items.length,
    isLoading,
    error
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: options.deleteFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [options.queryKey] }),
  })

  // Update params to URL
  const updateParams = (newParams: Partial<FetchParams>) => {
    setParams({
      page: newParams.page ?? page,
      limit: newParams.limit ?? limit,
      search: newParams.search ?? search,
      sort: newParams.sort || sortField,
      order: newParams.order || sortOrder,
    })
  }

  // Handlers
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

  const handleDelete = async (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  return {
    page,
    limit,
    search,
    sortField,
    sortOrder,
    searchInput,
    setSearchInput,
    sorting,
    setSorting,
    data,
    response,
    isLoading,
    error,
    updateParams,
    handleSearch,
    handleSortChange,
    handleDelete,
    deleteMutation,
  }
}
