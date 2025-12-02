import React, { useState } from 'react'
import { FiUserPlus, FiUser, FiMail, FiLock } from 'react-icons/fi'

export default function CreateAdmin() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

        try {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:4000/api/admin/create-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message)

            setMessage('Admin created successfully!')
            setFormData({ name: '', email: '', password: '' })
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-brand-accent/10 text-brand-accent mb-6">
                    <FiUserPlus className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-brand-black tracking-tight">Create New Admin</h1>
                <p className="text-brand-gray mt-2">Add a new administrator to the system</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-light">
                {message && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-100 font-medium text-center">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-brand-black ml-1">Full Name</label>
                        <div className="relative group">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                            <input
                                type="text"
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-brand-black ml-1">Email Address</label>
                        <div className="relative group">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                            <input
                                type="email"
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-brand-black ml-1">Password</label>
                        <div className="relative group">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                            <input
                                type="password"
                                required
                                minLength={8}
                                className="w-full pl-11 pr-4 py-3.5 bg-brand-light/30 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all font-medium"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-dark transform hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-black/20 mt-4"
                    >
                        Create Admin Account
                    </button>
                </form>
            </div>
        </div>
    )
}
