import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../screens/private/Home'
import AuthWrapper from '../screens/private/AuthWrapper'

const AppStack = () => {
  return (
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default AppStack
