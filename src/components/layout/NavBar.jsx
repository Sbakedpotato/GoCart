import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
    ? categories.map((cat) => ({ path: `/category/${cat.id}`, label: cat.label }))
    : fallbackLinks

  return (
    <nav className="border-b border-brand-light bg-white/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-8 px-6 py-3 text-sm font-medium text-brand-gray">
        <Link
          to="/categories"
          className="flex items-center gap-2 text-brand-dark hover:text-brand-black"
        >
          All Categories
        </Link>
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `whitespace-nowrap transition-colors hover:text-brand-black ${isActive ? 'text-brand-black font-semibold' : ''
                }`
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
