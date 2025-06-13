import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  login: string
  password: string
  remember: boolean
  isAuthenticated: boolean
  setCredentials: (login: string, password: string, remember: boolean) => void
  clearCredentials: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      login: '',
      password: '',
      remember: false,
      isAuthenticated: false,
      setCredentials: (login, password, remember) =>
        set({ login, password, remember, isAuthenticated: true }),
      clearCredentials: () =>
        set({ login: '', password: '', remember: false, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) =>
        state.remember
          ? state
          : { remember: false },
    }
  )
)