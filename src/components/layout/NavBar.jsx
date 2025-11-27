import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import { api } from '../../services/api'

const NavBar = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api
      .getCategoryShortcuts()
      .then((data) => setCategories(data || []))
      .catch(() => setCategories([]))
  }, [])

  const fallbackLinks = [
    { path: '/', label: 'Home' },
    { path: '/cart', label: 'Cart' },
  ]

  const navLinks = categories.length
    ? categories.slice(0, 5).map((cat) => ({ path: `/category/${cat.id}`, label: cat.label }))
    : fallbackLinks

  return (
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
}

export default NavBar
