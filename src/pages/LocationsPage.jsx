import React from 'react'

const locations = [
  {
    name: 'Karachi Experience Center',
    address: '123 Clifton Block, Karachi',
    hours: 'Mon–Sat, 10:00 AM – 8:00 PM',
  },
  {
    name: 'Lahore Pickup Hub',
    address: '45 MM Alam Road, Lahore',
    hours: 'Mon–Sat, 11:00 AM – 7:00 PM',
  },
]

const LocationsPage = () => (
  <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Store Locations</h1>
      <p className="mt-2 text-sm text-slate-600">
        Visit us for pickups, returns, and in-person support at the locations below.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {locations.map((loc) => (
        <div key={loc.name} className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-lg font-semibold text-slate-900">{loc.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{loc.address}</p>
          <p className="mt-1 text-sm text-slate-600">{loc.hours}</p>
        </div>
      ))}
    </div>
  </div>
)

export default LocationsPage
