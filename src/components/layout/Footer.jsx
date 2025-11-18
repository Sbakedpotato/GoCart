import React from 'react'
const columns = [
  {
    title: 'Get to Know Us',
    links: ['About GoCart', 'Careers', 'Newsroom', 'Investor Relations'],
  },
  {
    title: 'Make Money with Us',
    links: ['Sell with GoCart', 'Affiliate Program', 'Supply Chain'],
  },
  {
    title: 'Customer Service',
    links: ['Help', 'Returns', 'Order Tracking', 'Accessibility'],
  },
  {
    title: 'Policy',
    links: ['Terms', 'Privacy', 'Cookies', 'Security'],
  },
]

const Footer = () => (
  <footer className="mt-16 bg-slate-900 text-slate-200">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title}>
          <h4 className="text-lg font-semibold text-white">{col.title}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {col.links.map((link) => (
              <li key={link} className="cursor-pointer hover:text-brand-orange">
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} GoCart. Smarter Shopping, Powered by AI.
    </div>
  </footer>
)

export default Footer

