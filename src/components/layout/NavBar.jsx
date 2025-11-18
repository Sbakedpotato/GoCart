import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'

const navLinks = [
  { path: '/', label: "Home" },
  { path: '/category/electronics', label: "Today's Deals" },
  { path: '/category/fashion', label: 'Best Sellers' },
  { path: '/category/new-arrivals', label: 'New Arrivals' },
  { path: '/customer-service', label: 'Customer Service' },
]

const NavBar = () => (
  <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center gap-8 px-4 py-3 text-sm font-semibold text-slate-600">
      <Link
        to="/categories"
        className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-700"
      >
        <FiChevronDown />
        All Categories
      </Link>
      <div className="flex flex-1 flex-wrap gap-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `hover:text-brand-blue ${isActive ? 'text-brand-blue' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
)

export default NavBar

