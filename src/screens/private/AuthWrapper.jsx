import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

/**
 * AuthWrapper — protects private routes.
 * If the user is not authenticated, redirects to /login.
 * Usage: wrap private <Route> elements with <AuthWrapper />
 */
const AuthWrapper = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default AuthWrapper
