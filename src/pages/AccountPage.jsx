import React from 'react'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'orders', label: 'Orders' },
  { id: 'addresses', label: 'Addresses' },
]

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [account, setAccount] = useState(null)
  const [error, setError] = useState('')
  const [newAddress, setNewAddress] = useState({
    label: '',
    recipient: '',
    line1: '',
    city: '',
    phone: '',
  })

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await api.getAccountOverview()
        if (data?.user) {
          setAccount({
            ...data.user,
            orders: data.orders || [],
            addresses: data.addresses || [],
          })
        } else {
          setAccount(data || { orders: [], addresses: [] })
        }
      } catch (err) {
        setError('Please sign in to view your account.')
      }
    }
    fetchAccount()
  }, [])

  if (error) {
    return <div className="rounded-3xl bg-white p-6 text-center text-slate-500">{error}</div>
  }

  if (!account) {
    return <div className="text-center text-slate-500">Loading account...</div>
  }

  const handleAddressChange = (event) => {
    const { name, value } = event.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()
    console.info('Address submission', newAddress)
  }

  const handleRemoveAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to remove this address?')) return

    try {
      await api.deleteAddress(addressId)
      setAccount((prev) => ({
        ...prev,
        addresses: prev.addresses.filter((addr) => addr.id !== addressId),
      }))
    } catch (err) {
      console.error('Failed to remove address:', err)
      alert('Failed to remove address. Please try again.')
    }
  }


  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === tab.id
                  ? 'bg-brand-black text-white'
                  : 'text-brand-gray hover:bg-brand-light/50 hover:text-brand-black'
                  }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => {
                // Logout logic would go here, but for now we just redirect or similar
                window.location.href = '/'
              }}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-[500px]">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-black">Overview</h2>
                <p className="mt-1 text-brand-gray">Manage your account details.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-brand-light p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-gray">Profile</p>
                  <div className="mt-4 space-y-1">
                    <p className="font-medium text-brand-black">{account.name}</p>
                    <p className="text-sm text-brand-gray">{account.email}</p>
                    <p className="text-sm text-brand-gray">{account.phone}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-brand-black p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/60">Member Status</p>
                  <p className="mt-4 text-2xl font-bold">Gold Member</p>
                  <p className="mt-1 text-sm text-white/60">You have 1,240 points</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-black">Order History</h2>
                <p className="mt-1 text-brand-gray">View and track your recent orders.</p>
              </div>

              <div className="space-y-4">
                {(account.orders || []).map((order) => (
                  <div key={order.id} className="group rounded-2xl border border-brand-light p-6 transition-all hover:border-brand-black/20 hover:shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-brand-gray">
                          {order.date || order.createdAt || 'Recent order'}
                        </p>
                        <h3 className="mt-1 font-bold text-brand-black">{order.id}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="rounded-full bg-brand-light/50 px-3 py-1 text-xs font-bold text-brand-black">
                          {order.status}
                        </span>
                        <p className="font-bold text-brand-black">
                          Rs. {(order.total ?? 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-brand-light pt-4">
                      <p className="text-sm text-brand-gray">
                        <span className="font-medium text-brand-black">Items:</span> {Array.isArray(order.items) ? order.items.join(', ') : ''}
                      </p>
                    </div>
                  </div>
                ))}
                {!(account.orders || []).length && (
                  <div className="rounded-2xl border border-dashed border-brand-light p-12 text-center">
                    <p className="text-brand-gray">No orders found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-brand-black">Addresses</h2>
                  <p className="mt-1 text-brand-gray">Manage your shipping addresses.</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {(account.addresses || []).map((address) => (
                  <div key={address.id} className="relative rounded-2xl border border-brand-light p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-lg bg-brand-light/30 px-2 py-1 text-xs font-bold uppercase tracking-wide text-brand-black">
                        {address.label}
                      </span>
                      <button
                        onClick={() => handleRemoveAddress(address.id)}
                        className="text-xs font-medium text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="font-bold text-brand-black">{address.recipient}</p>
                    <div className="mt-2 space-y-0.5 text-sm text-brand-gray">
                      <p>{address.line1}</p>
                      <p>{address.city}</p>
                      <p>{address.phone}</p>
                    </div>
                  </div>
                ))}

                <form
                  onSubmit={handleAddressSubmit}
                  className="rounded-2xl border border-dashed border-brand-light p-6"
                >
                  <h3 className="font-bold text-brand-black">Add New Address</h3>
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      name="label"
                      placeholder="Label (e.g. Home)"
                      value={newAddress.label}
                      onChange={handleAddressChange}
                      className="w-full rounded-lg border border-brand-light bg-brand-light/20 px-3 py-2 text-sm focus:border-brand-black focus:outline-none"
                    />
                    <input
                      type="text"
                      name="recipient"
                      placeholder="Full Name"
                      value={newAddress.recipient}
                      onChange={handleAddressChange}
                      className="w-full rounded-lg border border-brand-light bg-brand-light/20 px-3 py-2 text-sm focus:border-brand-black focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg border border-brand-light bg-brand-light/20 px-3 py-2 text-sm focus:border-brand-black focus:outline-none"
                      />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={newAddress.phone}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg border border-brand-light bg-brand-light/20 px-3 py-2 text-sm focus:border-brand-black focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      name="line1"
                      placeholder="Address Line 1"
                      value={newAddress.line1}
                      onChange={handleAddressChange}
                      className="w-full rounded-lg border border-brand-light bg-brand-light/20 px-3 py-2 text-sm focus:border-brand-black focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-brand-black py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountPage
