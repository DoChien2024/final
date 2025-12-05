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

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (credentials) => {
        const { data } = await authService.adminLogin(credentials)
        const { admin, tokens } = data
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
        if (admin) {
          set({
            user: {
              id: admin.id,
              fullName: `${admin.firstName} ${admin.lastName}`,
              firstName: admin.firstName,
              lastName: admin.lastName,
              email: admin.email,
              role: admin.role as 'admin' | 'user' | 'doula',
              status: admin.status as 'active' | 'inactive',
              verifiedEmail: true,
              verifiedPhoneNumber: false,
              createdAt: admin.createdAt,
              updatedAt: admin.updatedAt,
            },
            isAuthenticated: true,
          })
        } else {
          set({ user: null, isAuthenticated: false })
        }
      },
// đã call API logout ở authService rồi nên ko cần call nữa
      logout: async () => {
        try {
          await authService.adminLogout()
        } catch {}
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        set({ user: null, isAuthenticated: false })
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
