import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.info('Login request', form)
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-500">Sign in to access personalized AI deals.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="••••••••"
            required
          />
          <button type="button" className="mt-2 text-xs font-semibold text-brand-blue">
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-blue py-3 font-semibold text-white hover:bg-slate-900"
        >
          Continue
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-slate-500">
        New to GoCart?{' '}
        <Link to="/register" className="font-semibold text-brand-blue">
          Create your GoCart account
        </Link>
      </p>
    </div>
  )
}

export default LoginPage

