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

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-1 shadow-sm">
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-3xl px-4 py-3 text-sm font-semibold ${
                activeTab === tab.id ? 'bg-brand-blue text-white' : 'text-slate-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Account Overview</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-semibold">Name:</span> {account.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {account.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {account.phone}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {(account.orders || []).map((order) => (
            <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-slate-500">
                    {order.date || order.createdAt || 'Recent order'}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">{order.id}</h3>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {order.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Items: {Array.isArray(order.items) ? order.items.join(', ') : ''}
              </p>
              <p className="mt-2 text-xl font-bold text-brand-blue">
                Rs. {(order.total ?? 0).toLocaleString()}
              </p>
            </div>
          ))}
          {!(account.orders || []).length && (
            <p className="text-center text-slate-500">No orders yet.</p>
          )}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {(account.addresses || []).map((address) => (
              <div key={address.id} className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{address.label}</p>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">{address.recipient}</h4>
                <p className="text-sm text-slate-600">{address.line1}</p>
                <p className="text-sm text-slate-600">{address.city}</p>
                <p className="text-sm text-slate-600">{address.phone}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleAddressSubmit}
            className="rounded-3xl border border-dashed border-brand-blue/40 bg-white p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">Add new address</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {['label', 'recipient', 'line1', 'city', 'phone'].map((field) => (
                <div key={field} className="sm:col-span-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={newAddress[field]}
                    onChange={handleAddressChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white"
            >
              Save Address
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AccountPage
