import React from 'react'

const ContactPage = () => (
  <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Contact Us</h1>
      <p className="mt-2 text-sm text-slate-600">
        We are here to help with orders, returns, and product questions. Reach us using the options
        below.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-900">Email</h2>
        <p className="mt-1 text-sm text-slate-600">support@gocart.example</p>
      </div>
      <div className="rounded-2xl border border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-900">Phone</h2>
        <p className="mt-1 text-sm text-slate-600">+92 300 0000000</p>
      </div>
      <div className="rounded-2xl border border-slate-200 p-4 md:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">Hours</h2>
        <p className="mt-1 text-sm text-slate-600">Mon–Sat, 9:00 AM – 6:00 PM PKT</p>
      </div>
    </div>
  </div>
)

export default ContactPage
