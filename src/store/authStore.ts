import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/auth.service'
import type { User, LoginRequest } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      login: async (credentials) => {
        console.log('🔐 Attempting admin login with:', credentials.username)
        
        const response = await authService.adminLogin({
          username: credentials.username,
          password: credentials.password
        })
        
        console.log('✅ Full login response:', JSON.stringify(response, null, 2))
        
        // API trả về: { message, data: { admin, tokens } }
        // admin object có: id, username, firstName, lastName, role, email, status
        const { admin, tokens } = response.data
        
        // Lưu tokens vào localStorage để axios interceptor sử dụng
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
        
        // Convert admin object sang User format
        const user: User = {
          id: admin!.id,
          fullName: `${admin!.firstName} ${admin!.lastName}`,
          firstName: admin!.firstName,
          lastName: admin!.lastName,
          email: admin!.email,
          role: admin!.role as 'admin' | 'user' | 'doula',
          status: admin!.status as 'active' | 'inactive',
          verifiedEmail: true,
          verifiedPhoneNumber: false,
          createdAt: admin!.createdAt,
          updatedAt: admin!.updatedAt,
        }
        
        set({
          user,
          isAuthenticated: true,
        })
        
        console.log('✅ Admin logged in:', user.fullName, 'Role:', user.role)
      },

      logout: async () => {
        try {
          // Call API logout - API sẽ tự clear tokens ở backend
          await authService.adminLogout()
          console.log('✅ Logged out successfully')
        } catch (error) {
          console.error('❌ Logout error:', error)
        } finally {
          // Clear local state và localStorage
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          set({ user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
