import { create } from 'zustand'
import { registerUser, loginUser } from '../api/axios/authApi'

const useAuthStore = create((set, get) => ({
  // State
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  success: null,

  // Payload for register
  registerPayload: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },

  // Payload for login
  loginPayload: {
    email: '',
    password: '',
  },

  // Update register payload
  setRegisterPayload: (payload) =>
    set((state) => ({
      registerPayload: { ...state.registerPayload, ...payload },
    })),

  // Update login payload
  setLoginPayload: (payload) =>
    set((state) => ({
      loginPayload: { ...state.loginPayload, ...payload },
    })),

  // Clear error
  clearError: () => set({ error: null }),

  // Clear success
  clearSuccess: () => set({ success: null }),

  // Register user
  register: async () => {
    const { registerPayload } = get()

    set({ loading: true, error: null })

    try {
      const response = await registerUser(registerPayload)

      if (response.data.success) {
        set({
          success: response.data.message,
          registerPayload: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          },
        })
        return true
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors ||
        'Registration failed'

      set({
        error:
          typeof errorMessage === 'object'
            ? Object.values(errorMessage).join(', ')
            : errorMessage,
      })
      return false
    } finally {
      set({ loading: false })
    }
  },

  // Login user
  login: async () => {
    const { loginPayload } = get()

    set({ loading: true, error: null })

    try {
      const response = await loginUser(loginPayload)

      if (response.data.success) {
        const { token, user } = response.data.data

        // Store in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        set({
          user,
          token,
          success: response.data.message,
          loginPayload: {
            email: '',
            password: '',
          },
        })
        return true
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors ||
        'Login failed'

      set({
        error:
          typeof errorMessage === 'object'
            ? Object.values(errorMessage).join(', ')
            : errorMessage,
      })
      return false
    } finally {
      set({ loading: false })
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({
      user: null,
      token: null,
      registerPayload: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      loginPayload: {
        email: '',
        password: '',
      },
    })
  },

  // Check if authenticated
  isAuthenticated: () => !!get().token,
}))

export default useAuthStore
