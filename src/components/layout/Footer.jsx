import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="mt-16 bg-slate-900 text-slate-200">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <h4 className="text-lg font-semibold text-white">Support</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link to="/contact" className="hover:text-brand-orange">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/faqs" className="hover:text-brand-orange">
              FAQs
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">Visit</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link to="/locations" className="hover:text-brand-orange">
              Store Locations
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">Policies</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link to="/policies#terms" className="hover:text-brand-orange">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/policies#privacy" className="hover:text-brand-orange">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/policies#shipping" className="hover:text-brand-orange">
              Shipping & Returns
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-sm text-slate-400">
        <p className="font-semibold text-white">GoCart</p>
        <p className="mt-2 leading-relaxed">
          Smarter shopping, simplified. Reach out any time with questions about your orders or our
          policies.
        </p>
      </div>
    </div>
    <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} GoCart. Smarter Shopping, Powered by AI.
    </div>
  </footer>
)

export default Footer
