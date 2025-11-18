import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { token, user, logout, baseUrl } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', description: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchProjects()
  }, [token])

  const authHeader = useMemo(() => ({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }), [token])

  async function fetchProjects() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/projects`, { headers: authHeader })
      if (!res.ok) throw new Error('Failed to load projects')
      const data = await res.json()
      setProjects(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function createProject(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const res = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: authHeader,
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to create project')
      const data = await res.json()
      setProjects([data, ...projects])
      setForm({ name: '', description: '' })
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function deleteProject(id) {
    if (!confirm('Delete this project?')) return
    const res = await fetch(`${baseUrl}/projects/${id}`, {
      method: 'DELETE',
      headers: authHeader
    })
    if (res.ok) {
      setProjects(projects.filter(p => p._id !== id))
    }
  }

  async function updateProject(p) {
    const name = prompt('Project name', p.name)
    if (name === null) return
    const description = prompt('Description', p.description || '')
    const res = await fetch(`${baseUrl}/projects/${p._id}`, {
      method: 'PUT',
      headers: authHeader,
      body: JSON.stringify({ name, description })
    })
    if (res.ok) {
      const updated = await res.json()
      setProjects(projects.map(x => x._id === p._id ? updated : x))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-blue-200/80">Welcome{user?.name ? `, ${user.name}` : ''}</p>
          </div>
          <button onClick={() => { logout(); navigate('/login') }} className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white">Sign out</button>
        </div>

        <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-xl text-white font-semibold mb-4">Create a project</h2>
          <form onSubmit={createProject} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input name="name" value={form.name} onChange={onChange} placeholder="Project name" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="description" value={form.description} onChange={onChange} placeholder="Short description" className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button disabled={saving} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold">{saving ? 'Creating...' : 'Add Project'}</button>
          </form>
        </div>

        {error && <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 p-3 rounded">{error}</div>}

        <div className="grid gap-4 md:grid-cols-2">
          {loading ? (
            <div className="text-blue-200">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-blue-200/80">No projects yet. Create your first one above.</div>
          ) : (
            projects.map(p => (
              <div key={p._id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{p.name}</h3>
                    {p.description && <p className="text-blue-200/80 mt-1 text-sm">{p.description}</p>}
                    <p className="text-blue-200/60 mt-2 text-xs">Created {new Date(p.created_at || p.created || Date.now()).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateProject(p)} className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm">Edit</button>
                    <button onClick={() => deleteProject(p._id)} className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
