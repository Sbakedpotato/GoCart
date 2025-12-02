import { Outlet, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/admin/AdminHeader'

export default function AdminLayout() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (!storedUser || !token) {
            navigate('/admin/login')
            return
        }

        try {
            const parsedUser = JSON.parse(storedUser)
            if (parsedUser.role !== 'admin') {
                navigate('/') // Redirect non-admins to home
                return
            }
            setUser(parsedUser)
        } catch (e) {
            navigate('/admin/login')
        }
    }, [navigate])

    if (!user) return null

    return (
        <div className="min-h-screen bg-white font-sans text-brand-black">
            <AdminHeader />
            <main className="mx-auto max-w-[1400px] px-6 py-8">
                <Outlet />
            </main>
        </div>
    )
}
