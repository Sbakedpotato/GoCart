import React, { useEffect, useState } from 'react'
import { FiUsers, FiShoppingBag, FiDollarSign, FiActivity } from 'react-icons/fi'

export default function Dashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await fetch('http://localhost:4000/api/stats/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (!res.ok) throw new Error('Failed to load stats')
                const data = await res.json()
                setStats(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="text-center py-12 text-brand-gray">Loading dashboard...</div>
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-brand-black tracking-tight">Dashboard Overview</h1>
                <span className="text-sm font-medium text-brand-gray bg-brand-light px-3 py-1 rounded-full">
                    Last updated: {new Date().toLocaleTimeString()}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<FiUsers className="w-6 h-6 text-white" />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={<FiShoppingBag className="w-6 h-6 text-white" />}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Total Revenue"
                    value={`Rs. ${stats.totalRevenue.toLocaleString()}`}
                    icon={<FiDollarSign className="w-6 h-6 text-white" />}
                    color="bg-green-500"
                />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-brand-light p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-brand-light rounded-full">
                        <FiActivity className="w-5 h-5 text-brand-black" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-black">Recent Activity</h2>
                </div>

                {stats.recentActivity.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-brand-light text-sm font-semibold text-brand-gray">
                                    <th className="pb-4 pl-4">Order ID</th>
                                    <th className="pb-4">Customer</th>
                                    <th className="pb-4">Date</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4 pr-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-light">
                                {stats.recentActivity.map((order) => (
                                    <tr key={order.id} className="group hover:bg-brand-light/30 transition-colors">
                                        <td className="py-4 pl-4 text-sm font-bold text-brand-black">#{order.id}</td>
                                        <td className="py-4 text-sm text-brand-gray font-medium">{order.user_name}</td>
                                        <td className="py-4 text-sm text-brand-gray">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-4 text-sm font-bold text-brand-black text-right">
                                            Rs. {Number(order.total).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-brand-gray text-center py-8">No recent activity to show.</p>
                )}
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-light hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-semibold text-brand-gray uppercase tracking-wider">{title}</h3>
                <div className={`p-3 rounded-2xl ${color} shadow-lg shadow-${color}/30 group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-brand-black tracking-tight">{value}</span>
            </div>
        </div>
    )
}
