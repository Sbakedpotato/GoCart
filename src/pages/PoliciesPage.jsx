import React from 'react'

const PoliciesPage = () => (
  <div className="space-y-8 rounded-3xl bg-white p-6 shadow-sm">
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Policies</h1>
      <p className="mt-2 text-sm text-slate-600">
        The essentials on how we handle your orders, data, and deliveries.
      </p>
    </div>

    <section id="terms" className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900">Terms of Service</h2>
      <p className="text-sm text-slate-600">
        By using GoCart, you agree to place authentic orders, provide accurate information, and
        follow our acceptable use guidelines. Orders may be cancelled if payment fails or fraud is
        suspected.
      </p>
    </section>

    <section id="privacy" className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900">Privacy Policy</h2>
      <p className="text-sm text-slate-600">
        We collect only the data needed to process orders and improve the experience. Personal data
        is never sold and can be deleted on request. Authentication tokens are stored securely in
        your browser.
      </p>
    </section>

    <section id="shipping" className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900">Shipping & Returns</h2>
      <p className="text-sm text-slate-600">
        Most in-stock items ship within 2 business days. Returns are accepted within 14 days in
        original condition; refunds are issued to the original payment method once inspected.
      </p>
    </section>
  </div>
)

export default PoliciesPage
