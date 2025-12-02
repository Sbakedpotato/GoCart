import React from 'react'

const faqs = [
  {
    q: 'How do I track my order?',
    a: 'After checkout, open your Account > Orders page to see live status and history.',
  },
  {
    q: 'What is your return policy?',
    a: 'Most items can be returned within 14 days in original condition. See the Policies page for details.',
  },
  {
    q: 'Which payment methods are supported?',
    a: 'We accept major cards and COD in supported regions.',
  },
  {
    q: 'How do I contact support?',
    a: 'Email support@gocart.example or call +92 300 0000000 during support hours.',
  },
]

const FAQPage = () => (
  <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">FAQs</h1>
      <p className="mt-2 text-sm text-slate-600">
        Quick answers to the questions we hear most often.
      </p>
    </div>
    <div className="divide-y divide-slate-200">
      {faqs.map((item) => (
        <div key={item.q} className="py-4">
          <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
          <p className="mt-1 text-sm text-slate-600">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
)

export default FAQPage
