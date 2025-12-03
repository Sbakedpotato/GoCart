import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiFilter, FiEye } from 'react-icons/fi'
import { api } from '../../services/api'
import ConfirmationModal from '../../components/common/ConfirmationModal'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState({ status: 'All', search: '' })
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [statusModal, setStatusModal] = useState({ isOpen: false, orderId: null, newStatus: '' })

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(filters.search), 500)
        return () => clearTimeout(timer)
    }, [filters.search])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const data = await api.getAdminOrders({
                page,
                limit: 10,
                status: filters.status,
                search: debouncedSearch
            })
            setOrders(data.orders)
            setTotalPages(data.totalPages)
            setError('')
        } catch (err) {
            setError('Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [page, filters.status, debouncedSearch])

    const handleStatusChange = (id, newStatus) => {
        if (newStatus === 'Cancelled') {
            setStatusModal({ isOpen: true, orderId: id, newStatus })
        } else {
            updateStatus(id, newStatus)
        }
    }

    const updateStatus = async (id, status) => {
        try {
            await api.updateOrderStatus(id, status)
            fetchOrders()
        } catch (err) {
            alert('Failed to update status')
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700'
            case 'Processing': return 'bg-blue-100 text-blue-700'
            case 'Cancelled': return 'bg-red-100 text-red-700'
            case 'Shipped': return 'bg-purple-100 text-purple-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <>
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-black tracking-tight">Orders</h1>
                        <p className="text-brand-gray mt-1">Manage and track customer orders</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative group">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                className="pl-11 pr-4 py-3 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none w-full sm:w-72 transition-all shadow-sm"
                            />
                        </div>

                        <div className="relative">
                            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" />
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                className="pl-11 pr-10 py-3 border border-brand-light rounded-2xl focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none bg-white cursor-pointer shadow-sm font-medium text-brand-black"
                            >
                                <option value="All">All Status</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-medium">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-brand-light overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-brand-light/30 border-b border-brand-light text-sm font-semibold text-brand-gray">
                                    <th className="px-8 py-5">Order ID</th>
                                    <th className="px-8 py-5">Customer</th>
                                    <th className="px-8 py-5">Date</th>
                                    <th className="px-8 py-5">Total</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-light">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center text-brand-gray">Loading orders...</td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center text-brand-gray">No orders found.</td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-brand-light/30 transition-colors">
                                            <td className="px-8 py-5 font-bold text-brand-black">#{order.id}</td>
                                            <td className="px-8 py-5">
                                                <div className="font-semibold text-brand-black">{order.user_name}</div>
                                                <div className="text-xs text-brand-gray mt-0.5">{order.user_email}</div>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-brand-gray font-medium">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-8 py-5 font-bold text-brand-black">
                                                Rs. {Number(order.total).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-5">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={`text-xs font-bold px-3 py-1.5 rounded-full border-none outline-none cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <Link
                                                    to={`/admin/orders/${order.id}`}
                                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-brand-light text-brand-gray hover:text-brand-accent transition-all"
                                                    title="View Details"
                                                >
                                                    <FiEye className="w-5 h-5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="px-8 py-5 border-t border-brand-light flex items-center justify-between bg-brand-light/10">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="px-5 py-2.5 text-sm font-semibold text-brand-black bg-white border border-brand-light rounded-xl hover:bg-brand-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                Previous
                            </button>
                            <span className="text-sm font-medium text-brand-gray">
                                Page <span className="text-brand-black font-bold">{page}</span> of {totalPages}
                            </span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className="px-5 py-2.5 text-sm font-semibold text-brand-black bg-white border border-brand-light rounded-xl hover:bg-brand-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>


            <ConfirmationModal
                isOpen={statusModal.isOpen}
                onClose={() => setStatusModal({ ...statusModal, isOpen: false })}
                onConfirm={() => updateStatus(statusModal.orderId, statusModal.newStatus)}
                title="Cancel Order"
                message="Are you sure you want to cancel this order? This action may trigger a refund process."
                confirmText="Cancel Order"
                isDangerous={true}
            />
        </>
    )
}
