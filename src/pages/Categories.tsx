import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'

export default function Categories() {
  const location = useLocation()

  return (
    <Layout>
      <div key={location.pathname} className="page-container">
        <h1 className="page-title">Category Management</h1>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginTop: '24px' }}>
          <p style={{ color: '#757575' }}>Category management coming soon...</p>
        </div>
      </div>
    </Layout>
  )
}
