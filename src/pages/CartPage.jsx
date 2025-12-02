import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [shipping, setShipping] = useState({
    recipient: '',
    line1: '',
    city: '',
    phone: '',
    label: 'Home',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!items.length) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div className="mx-auto mb-4 h-24 w-24">
          <div className="h-full w-full rounded-2xl bg-slate-100 bg-[url('https://static-00.iconduck.com/assets.00/empty-box-illustration-512x460-gyrm69i8.png')] bg-contain bg-center bg-no-repeat" />
        </div>
        <p className="text-xl font-semibold text-slate-800">Your cart is empty</p>
        <p className="mt-2 text-sm text-slate-500">
          Discover deals curated by GoCart AI and add items to your bag.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-2xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:-translate-y-0.5"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  const handleShippingChange = (event) => {
    const { name, value } = event.target
    setShipping((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const payload = {
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        shipping,
      }
      const result = await api.checkout(payload)
      clearCart()
      setMessage(`Order ${result.orderId} placed! Total Rs. ${result.total.toLocaleString()}`)
    } catch (err) {
      setError(err.message || 'Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:flex-row"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-36 w-36 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.brand}</p>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="font-bold text-brand-blue">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
                {item.oldPrice && (
                  <span className="text-slate-400 line-through">
                    Rs. {(item.oldPrice * item.quantity).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border border-slate-200">
                  <button
                    className="w-8 text-lg"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                    className="w-12 border-x border-slate-200 text-center"
                  />
                  <button
                    className="w-8 text-lg"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-red-500"
                  aria-label="Remove item"
                >
                  <FiTrash2 />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="relative rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span className="text-emerald-500">Free</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900">
            <span>Total</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-6 space-y-3 text-sm">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Recipient</label>
            <input
              name="recipient"
              value={shipping.recipient}
              onChange={handleShippingChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Phone</label>
            <input
              name="phone"
              value={shipping.phone}
              onChange={handleShippingChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              placeholder="+92 ..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">Address</label>
            <input
              name="line1"
              value={shipping.line1}
              onChange={handleShippingChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              placeholder="Street, house no."
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500">City</label>
            <input
              name="city"
              value={shipping.city}
              onChange={handleShippingChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-inner focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
              placeholder="City"
            />
          </div>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 py-3 font-semibold text-white shadow-lg shadow-brand-orange/30 transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? 'Placing order...' : isAuthenticated ? 'Place Order' : 'Sign in to checkout'}
        </button>
        {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}
        {message && <p className="mt-2 text-center text-xs text-emerald-600">{message}</p>}
        <p className="mt-2 text-center text-xs text-slate-400">
          Secured by GoCart Pay. Taxes calculated at checkout.
        </p>
        <div className="pointer-events-none fixed inset-x-0 bottom-0 block bg-gradient-to-t from-white via-white/70 to-transparent pb-4 pt-8 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] sm:hidden" />
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="fixed inset-x-4 bottom-4 z-10 block rounded-2xl bg-brand-blue py-3 text-center text-sm font-semibold text-white shadow-xl shadow-brand-blue/30 transition hover:-translate-y-0.5 disabled:opacity-50 sm:hidden"
        >
          {loading ? 'Placing order...' : isAuthenticated ? 'Checkout Securely' : 'Sign in to checkout'}
        </button>
      </aside>
    </div>
  )
}

export default CartPage
