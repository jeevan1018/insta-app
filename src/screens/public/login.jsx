import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AlertTriangle, CheckCircle, Eye, EyeOff, Instagram, Lock, Mail, Moon, Sun } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { useTheme } from '../../context/ThemeContext'
import styles from './auth.module.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)

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
    const ok = await login()
    if (ok) navigate('/home')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Theme toggle */}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Instagram size={40} />
          </div>
          <div className={styles.logoText}>Instagram</div>
          <div className={styles.subtitle}>Sign in to see photos & videos</div>
        </div>

        {/* Error alert */}
        {error && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <AlertTriangle size={18} className={styles.alertIcon} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">Email</label>
            <div className={styles.inputWrap}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                className={styles.input}
                id="login-email"
                type="email"
                name="email"
                value={loginPayload.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">Password</label>
            <div className={styles.inputWrap}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                className={styles.input}
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={loginPayload.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="login-submit-btn"
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading && <span className={styles.spinner} />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <p className={styles.bottomText}>
          Don't have an account?{' '}
          <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage