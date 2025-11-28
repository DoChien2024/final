import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import Users from './pages/Users'
import Categories from './pages/Categories'
import StaticContent from './pages/StaticContent'
import Vouchers from './pages/Vouchers'
import NotFound from './pages/NotFound'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/static-content" element={isAuthenticated ? <StaticContent /> : <Navigate to="/login" replace />} />
      <Route path="/articles" element={isAuthenticated ? <Articles /> : <Navigate to="/login" replace />} />
      <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />} />
      <Route path="/categories" element={isAuthenticated ? <Categories /> : <Navigate to="/login" replace />} />
      <Route path="/admin-management" element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />} />
      <Route path="/doula-management" element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />} />
      <Route path="/client-management" element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />} />
      <Route path="/pd-session" element={isAuthenticated ? <StaticContent /> : <Navigate to="/login" replace />} />
      <Route path="/subscriptions" element={isAuthenticated ? <StaticContent /> : <Navigate to="/login" replace />} />
      <Route path="/vouchers" element={isAuthenticated ? <Vouchers /> : <Navigate to="/login" replace />} />
      <Route path="/help-documents" element={isAuthenticated ? <StaticContent /> : <Navigate to="/login" replace />} />
      <Route path="/search-settings" element={isAuthenticated ? <StaticContent /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App