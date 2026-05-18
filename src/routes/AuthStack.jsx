import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../screens/public/login'
import RegisterPage from '../screens/public/Register'

const AuthStack = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AuthStack
