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

    <div className="mx-auto max-w-md pt-20 pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-brand-black">Create an account</h1>
        <p className="mt-3 text-brand-gray">
          Join GoCart for a personalized shopping experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-brand-black">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-brand-light bg-brand-light/20 px-4 py-3 text-sm font-medium focus:border-brand-black focus:outline-none focus:ring-1 focus:ring-brand-black"
            placeholder="John Doe"
            required
          />
        </div>

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
          <label className="text-xs font-bold uppercase tracking-wide text-brand-black">Password</label>
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

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-brand-black">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
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
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-brand-gray">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-brand-black hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
