import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.info('Register request', form)
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Create your GoCart account</h1>
      <p className="mt-2 text-sm text-slate-500">
        Unlock personalized recommendations and AI-powered shopping tools.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Reyya Khan"
            required
          />
        </div>
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
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-orange py-3 font-semibold text-white hover:bg-orange-500"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-blue">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage

