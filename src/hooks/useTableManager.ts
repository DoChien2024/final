import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams, useNavigate } from 'react-router-dom'

export interface TableManagerOptions<T> {
  queryKey: string
  fetchFn: (params: any) => Promise<any>
  deleteFn?: (id: string) => Promise<any>
  defaultSortField?: string
  defaultSortOrder?: 'asc' | 'desc'
  defaultLimit?: number
}

export function useTableManager<T = any>(options: TableManagerOptions<T>) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  // State from URL params
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || options.defaultLimit || 10
  const search = searchParams.get('search') || ''
  const sortField = searchParams.get('sort') || options.defaultSortField || 'createdAt'
  const sortOrder = (searchParams.get('order') as 'asc' | 'desc') || options.defaultSortOrder || 'desc'

  const [searchInput, setSearchInput] = useState(search)
  const [sorting, setSorting] = useState([{ id: sortField, desc: sortOrder === 'desc' }])

  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: [options.queryKey, page, limit, search, sortField, sortOrder],
    queryFn: () => options.fetchFn({ page, limit, search, sort: sortField, order: sortOrder }),
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: options.deleteFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [options.queryKey] }),
  })

  // Update params to URL
  const updateParams = (params: Record<string, any>) => {
    setSearchParams({
      page: params.page?.toString() || page.toString(),
      limit: params.limit?.toString() || limit.toString(),
      search: params.search ?? search,
      sort: params.sort || sortField,
      order: params.order || sortOrder,
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

  const handleDelete = async (id: string) => {
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
    isLoading,
    error,
    updateParams,
    handleSearch,
    handleSortChange,
    handleDelete,
    deleteMutation,
  }
}
