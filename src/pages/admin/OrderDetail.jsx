import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiMapPin, FiPackage, FiUser, FiCreditCard } from 'react-icons/fi'
import { api } from '../../services/api'

export default function OrderDetail() {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await api.getAdminOrderDetail(orderId)
                setOrder(data)
            } catch (err) {
                setError('Failed to load order details')
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [orderId])

    if (loading) return <div className="p-8 text-center text-brand-gray">Loading details...</div>
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>
    if (!order) return <div className="p-8 text-center text-brand-gray">Order not found</div>

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link to="/admin/orders" className="p-2 hover:bg-brand-light rounded-full transition-colors">
                    <FiArrowLeft className="w-5 h-5 text-brand-gray" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-brand-black">Order #{order.id}</h1>
                    <p className="text-sm text-brand-gray">
                        Placed on {new Date(order.created_at).toLocaleString()}
                    </p>
                </div>
                <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {order.status}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-light">
                    <div className="flex items-center gap-2 mb-4 text-brand-gray">
                        <FiUser className="w-5 h-5" />
                        <h2 className="font-semibold text-brand-black">Customer Details</h2>
                    </div>
                    <div className="space-y-1">
                        <p className="font-medium text-brand-black">{order.user_name}</p>
                        <p className="text-sm text-brand-gray">{order.user_email}</p>
                    </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-light">
                    <div className="flex items-center gap-2 mb-4 text-brand-gray">
                        <FiMapPin className="w-5 h-5" />
                        <h2 className="font-semibold text-brand-black">Shipping Address</h2>
                    </div>
                    <div className="space-y-1 text-sm text-brand-black">
                        <p className="font-medium">{order.recipient}</p>
                        <p>{order.line1}</p>
                        <p>{order.city}</p>
                        <p className="text-brand-gray mt-2">{order.phone}</p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-brand-light overflow-hidden">
                <div className="p-6 border-b border-brand-light flex items-center gap-2">
                    <FiPackage className="w-5 h-5 text-brand-gray" />
                    <h2 className="font-semibold text-brand-black">Order Items</h2>
                </div>
                <div className="divide-y divide-brand-light">
                    {order.items.map((item) => (
                        <div key={item.id} className="p-6 flex items-center gap-4">
                            <div className="w-16 h-16 bg-brand-light/30 rounded-lg overflow-hidden flex-shrink-0">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-brand-gray text-xs">No img</div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-brand-black">{item.title}</h3>
                                <p className="text-sm text-brand-gray">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-brand-black">Rs. {Number(item.price).toLocaleString()}</p>
                                <p className="text-sm text-brand-gray">Total: Rs. {(Number(item.price) * item.quantity).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 bg-brand-light/10 border-t border-brand-light flex justify-between items-center">
                    <span className="font-medium text-brand-gray">Total Amount</span>
                    <span className="text-2xl font-bold text-brand-black">Rs. {Number(order.total).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}
