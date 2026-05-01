import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../screens/private/Home'

const AppStack = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default AppStack
