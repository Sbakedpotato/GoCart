import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="mt-24 border-t border-brand-light bg-brand-white text-brand-gray">
    <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-brand-black">GoCart</h4>
        <p className="text-sm leading-relaxed">
          Smarter shopping, simplified. Experience the future of electronics retail.
        </p>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-black">Support</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/contact" className="hover:text-brand-black">Contact Us</Link></li>
          <li><Link to="/faqs" className="hover:text-brand-black">FAQs</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-black">Visit</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/locations" className="hover:text-brand-black">Store Locations</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-black">Legal</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/policies#terms" className="hover:text-brand-black">Terms of Service</Link></li>
          <li><Link to="/policies#privacy" className="hover:text-brand-black">Privacy Policy</Link></li>
          <li><Link to="/policies#shipping" className="hover:text-brand-black">Shipping & Returns</Link></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-brand-light py-8 text-center text-xs text-brand-gray">
      © {new Date().getFullYear()} GoCart. All rights reserved.
    </div>
  </footer>
)

export default Footer
