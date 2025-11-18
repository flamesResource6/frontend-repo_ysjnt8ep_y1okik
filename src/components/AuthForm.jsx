import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function AuthForm({ mode = 'login' }) {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        await register(form.name, form.email, form.password)
        await login(form.email, form.password)
      } else {
        await login(form.email, form.password)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/60 backdrop-blur border border-blue-500/20 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>

        {error && (
          <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-blue-200 mb-1">Name</label>
              <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          )}
          <div>
            <label className="block text-sm text-blue-200 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@company.com" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} placeholder="••••••••" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button disabled={loading} className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold transition">
            {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center text-blue-200/80">
          {mode === 'login' ? (
            <p>Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300">Sign up</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link></p>
          )}
        </div>
      </div>
    </div>
  )
}
