import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import './Login.css'

const LoginPage = () => {
  const navigate = useNavigate()
  
  const {
    loginPayload,
    setLoginPayload,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
    login,
  } = useAuthStore()

  useEffect(() => {
    if (success) {
      clearSuccess()
      navigate('/home')
    }
  }, [success, navigate, clearSuccess])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginPayload({ [name]: value })
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login()
    if (success) {
      navigate('/home')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginPayload.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginPayload.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage