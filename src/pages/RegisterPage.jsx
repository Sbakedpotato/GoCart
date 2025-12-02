import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/account')
    } catch (err) {
      setError(err.message || 'Unable to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900">Create your GoCart account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Unlock personalized recommendations and AI-powered shopping tools.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="peer w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-4 text-sm text-slate-900 shadow-inner focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20"
            placeholder=" "
            required
          />
          <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
            Full Name
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="peer w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-4 text-sm text-slate-900 shadow-inner focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20"
            placeholder=" "
            required
          />
          <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
            Email
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="peer w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-4 text-sm text-slate-900 shadow-inner focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20"
            placeholder=" "
            required
          />
          <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
            Password
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="peer w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-4 text-sm text-slate-900 shadow-inner focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/20"
            placeholder=" "
            required
          />
          <label className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-wide text-slate-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
            Confirm Password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-orange/30 transition hover:translate-y-[-1px] hover:shadow-xl disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-blue hover:text-slate-900">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
