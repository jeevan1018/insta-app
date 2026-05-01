import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import './Register.css'

const RegisterPage = () => {
  const navigate = useNavigate()
  
  const {
    registerPayload,
    setRegisterPayload,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
    register,
  } = useAuthStore()

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        clearSuccess()
        navigate('/login')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [success, navigate, clearSuccess])

  const handleChange = (e) => {
    const { name, value } = e.target
    setRegisterPayload({ [name]: value })
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await register()
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={registerPayload.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerPayload.email}
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
              value={registerPayload.password}
              onChange={handleChange}
              placeholder="Enter password (min 8 chars, uppercase, number, special char)"
              required
              disabled={loading}
            />
            <small>Min 8 characters with uppercase, lowercase, number & special character</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={registerPayload.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
