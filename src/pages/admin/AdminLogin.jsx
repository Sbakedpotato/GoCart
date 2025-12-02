import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Login failed')
            }

            if (data.user.role !== 'admin') {
                throw new Error('Access denied: Admin privileges required')
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate('/admin/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-brand-white rounded-2xl shadow-float p-8 border border-brand-light">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-black tracking-tight">Admin Login</h1>
                    <p className="text-brand-gray mt-2">Sign in to access the dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-brand-light/30 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all placeholder:text-brand-gray/50"
                            placeholder="admin@gocart.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-brand-light/30 border border-brand-light rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all placeholder:text-brand-gray/50"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-black hover:bg-brand-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-brand-black/10 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}
