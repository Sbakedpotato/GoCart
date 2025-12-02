import React, { useState, useEffect } from 'react'
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

  const [savedAddresses, setSavedAddresses] = useState([])
  const [useSavedAddress, setUseSavedAddress] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      api.getAccountOverview()
        .then((data) => {
          if (data.addresses && data.addresses.length > 0) {
            setSavedAddresses(data.addresses)
            setUseSavedAddress(true)
            // Don't auto-select, let user choose
          }
        })
        .catch(() => {
          // Ignore error
        })
    }
  }, [isAuthenticated])

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr.id)
    setShipping({
      recipient: addr.recipient,
      line1: addr.line1,
      city: addr.city,
      phone: addr.phone,
      label: addr.label,
    })
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-light/30">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-gray">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-brand-black">Your cart is empty</h2>
        <p className="mt-2 text-brand-gray">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-brand-black px-8 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95"
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
    <div className="pb-20">
      <h1 className="mb-12 text-3xl font-bold text-brand-black">Shopping Cart</h1>

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 border-b border-brand-light pb-6 last:border-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-32 rounded-2xl object-cover bg-brand-light/20"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-brand-black">{item.title}</h3>
                      <p className="font-bold text-brand-black">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-brand-gray">{item.brand}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center rounded-lg border border-brand-light bg-white px-2">
                        <button
                          className="px-2 py-1 text-brand-gray hover:text-brand-black"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-brand-gray hover:text-brand-black"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-brand-gray hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl bg-brand-light/20 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-xl font-bold text-brand-black">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-brand-gray">
                <span>Subtotal</span>
                <span className="font-medium text-brand-black">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-brand-gray">
                <span>Shipping</span>
                <span className="font-medium text-brand-black">Free</span>
              </div>
              <div className="border-t border-brand-black/5 pt-4 flex justify-between text-lg font-bold text-brand-black">
                <span>Total</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wide text-brand-gray">Shipping Details</h3>

              {savedAddresses.length > 0 && (
                <div className="flex rounded-xl bg-brand-light/30 p-1">
                  <button
                    onClick={() => setUseSavedAddress(true)}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${useSavedAddress ? 'bg-white shadow-sm text-brand-black' : 'text-brand-gray hover:text-brand-black'
                      }`}
                  >
                    Saved Address
                  </button>
                  <button
                    onClick={() => setUseSavedAddress(false)}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${!useSavedAddress ? 'bg-white shadow-sm text-brand-black' : 'text-brand-gray hover:text-brand-black'
                      }`}
                  >
                    New Address
                  </button>
                </div>
              )}

              {useSavedAddress && savedAddresses.length > 0 ? (
                <div className="space-y-3">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => handleSelectAddress(addr)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all ${selectedAddressId === addr.id
                        ? 'border-brand-black bg-white shadow-sm'
                        : 'border-transparent bg-white/50 hover:bg-white'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase tracking-wide text-brand-black">{addr.label}</span>
                        {selectedAddressId === addr.id && (
                          <div className="h-2 w-2 rounded-full bg-brand-black" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-brand-black">{addr.recipient}</p>
                      <p className="text-xs text-brand-gray">{addr.line1}, {addr.city}</p>
                      <p className="text-xs text-brand-gray">{addr.phone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <input
                    name="recipient"
                    value={shipping.recipient}
                    onChange={handleShippingChange}
                    className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm font-medium placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-black"
                    placeholder="Full Name"
                  />
                  <input
                    name="phone"
                    value={shipping.phone}
                    onChange={handleShippingChange}
                    className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm font-medium placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-black"
                    placeholder="Phone Number"
                  />
                  <input
                    name="line1"
                    value={shipping.line1}
                    onChange={handleShippingChange}
                    className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm font-medium placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-black"
                    placeholder="Address"
                  />
                  <input
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    className="w-full rounded-xl border-0 bg-white px-4 py-3 text-sm font-medium placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-black"
                    placeholder="City"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-brand-black py-4 font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : isAuthenticated ? 'Checkout' : 'Sign in to Checkout'}
            </button>

            {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}

            <p className="mt-6 text-center text-xs text-brand-gray">
              Secure Checkout. 30-day returns.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CartPage
