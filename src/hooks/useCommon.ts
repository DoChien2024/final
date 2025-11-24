// Custom hook for URL params management
import { useSearchParams } from 'react-router-dom'
import queryString from 'query-string'

export const useTableParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '25')
  const search = searchParams.get('search') || ''
  const sortField = searchParams.get('sort') || 'createdAt'
  const sortOrder = searchParams.get('order') || 'desc'

  const updateParams = (newParams: Record<string, string | number>) => {
    const current = Object.fromEntries(searchParams.entries())
    const updated = { ...current, ...newParams }
    setSearchParams(queryString.stringify(updated))
  }

  return {
    page,
    limit,
    search,
    sortField,
    sortOrder,
    updateParams,
  }
}

//password visibility toggle
import { useState } from 'react'

export const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword(prev => !prev)

  return {
    showPassword,
    togglePassword,
  }
}
