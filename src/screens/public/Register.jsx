import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AlertTriangle, CheckCircle, Eye, EyeOff, Instagram, Lock, Mail, Moon, Sun, User } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { useTheme } from '../../context/ThemeContext'
import styles from './auth.module.css'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
          <div className={styles.subtitle}>Sign up to share your moments</div>
        </div>

        {/* Alerts */}
        {error && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <AlertTriangle size={18} className={styles.alertIcon} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <CheckCircle size={18} className={styles.alertIcon} />
            <span>{success} — Redirecting to login…</span>
          </div>
        )}

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Full Name */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-name">Full Name</label>
            <div className={styles.inputWrap}>
              <User size={18} className={styles.inputIcon} />
              <input
                className={styles.input}
                id="reg-name"
                type="text"
                name="name"
                value={registerPayload.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-email">Email</label>
            <div className={styles.inputWrap}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                className={styles.input}
                id="reg-email"
                type="email"
                name="email"
                value={registerPayload.email}
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
            <label className={styles.label} htmlFor="reg-password">Password</label>
            <div className={styles.inputWrap}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                className={styles.input}
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={registerPayload.password}
                onChange={handleChange}
                placeholder="Min 8 chars, uppercase, number & symbol"
                autoComplete="new-password"
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
            <span className={styles.hint}>
              At least 8 characters with uppercase, lowercase, number &amp; special character
            </span>
          </div>

          {/* Confirm Password */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="reg-confirm">Confirm Password</label>
            <div className={styles.inputWrap}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                className={styles.input}
                id="reg-confirm"
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={registerPayload.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm((p) => !p)}
                tabIndex={-1}
                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="register-submit-btn"
            type="submit"
            className={styles.submitBtn}
            disabled={loading || !!success}
          >
            {loading && <span className={styles.spinner} />}
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <p className={styles.bottomText}>
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
