import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src="/flame-icon.svg"
                alt="Flames"
                className="w-24 h-24 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              />
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Flames Blue
            </h1>

            <p className="text-xl text-blue-200 mb-6">
              Build applications through conversation
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 shadow-xl mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/login" className="block text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Sign In</Link>
              <Link to="/register" className="block text-center py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition">Create Account</Link>
              <Link to="/dashboard" className="block text-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition sm:col-span-2">Go to Dashboard</Link>
              <a href="/test" className="block text-center py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition sm:col-span-2">Connection Test</a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-blue-300/60">
              No coding required • Just describe what you want
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App