import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from '../App'
import Test from '../Test'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from './Dashboard'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}
