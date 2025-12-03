import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/account')
    } catch (err) {
      setError(err.message || 'Unable to login')
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="mx-auto max-w-md pt-20 pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-brand-black">Welcome back</h1>
        <p className="mt-3 text-brand-gray">
          Sign in to access your saved items and orders.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-brand-black">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-brand-light bg-brand-light/20 px-4 py-3 text-sm font-medium focus:border-brand-black focus:outline-none focus:ring-1 focus:ring-brand-black"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wide text-brand-black">Password</label>
          </div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-brand-light bg-brand-light/20 px-4 py-3 text-sm font-medium focus:border-brand-black focus:outline-none focus:ring-1 focus:ring-brand-black"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-black py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-brand-gray">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-brand-black hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
