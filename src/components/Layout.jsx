import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { token, user } = useAuth()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="border-b border-blue-500/20 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/flame-icon.svg" className="w-7 h-7" />
            <span className="font-semibold">Flames Blue</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-blue-200/90">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/test" className="hover:text-white">Test</Link>
            {token ? (
              <span className="text-blue-300/80">{user?.email}</span>
            ) : (
              <>
                <Link to="/login" className="hover:text-white">Sign In</Link>
                <Link to="/register" className="hover:text-white">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
