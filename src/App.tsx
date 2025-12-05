import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import Categories from './pages/Categories'
import Users from './pages/Users'
import DoulaManagement from './pages/DoulaManagement'
import ClientManagement from './pages/ClientManagement'
import StaticContent from './pages/StaticContent'
import Vouchers from './pages/Vouchers'
import Subscriptions from './pages/Subscriptions'
import PDSession from './pages/PDSession'
import HelpDocuments from './pages/HelpDocuments'
import SearchSettings from './pages/SearchSettings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<PublicRoute />} />
      
      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        {/* Root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Content Management */}
        <Route path="/articles" element={<Articles />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/static-content" element={<StaticContent />} />
        <Route path="/help-documents" element={<HelpDocuments />} />
        
        {/* User Management */}
        <Route path="/users" element={<Users />} />
        <Route path="/admin-management" element={<Users />} />
        <Route path="/doula-management" element={<DoulaManagement />} />
        <Route path="/client-management" element={<ClientManagement />} />
        
        {/* Business Management */}
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/pd-session" element={<PDSession />} />
        
        {/* System Settings */}
        <Route path="/search-settings" element={<SearchSettings />} />
      </Route>
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App