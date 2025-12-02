import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiLogOut, FiUser } from 'react-icons/fi'

const AdminHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/admin/login')
    }

    const navLinks = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/products', label: 'Products' },
        { path: '/admin/orders', label: 'Orders' },
        { path: '/admin/create-admin', label: 'Create Admin' },
    ]

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-brand-light">
            <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/admin/dashboard" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight text-brand-black">GoCart <span className="text-brand-accent">Admin</span></span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium transition-colors ${location.pathname.startsWith(link.path)
                                ? 'text-brand-accent'
                                : 'text-brand-gray hover:text-brand-black'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* User & Actions */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-brand-light flex items-center justify-center text-brand-gray">
                            <FiUser />
                        </div>
                        <span className="text-sm font-medium text-brand-black hidden sm:block">{user.name}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-medium text-brand-gray hover:text-red-600 transition-colors"
                        title="Sign Out"
                    >
                        <FiLogOut className="w-4 h-4" />
                        <span className="hidden sm:block">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader
