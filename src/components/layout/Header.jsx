import React from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi'
import SearchBar from './SearchBar'

const Header = () => (
  <header className="bg-white px-4 py-4 shadow-sm">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Link to="/" className="flex items-center gap-2">
        <span className="rounded-full bg-brand-orange px-3 py-1 text-sm font-semibold text-white">
          AI
        </span>
        <div>
          <p className="text-2xl font-bold text-brand-blue">GoCart</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Smarter Shopping, Powered by AI.
          </p>
        </div>
      </Link>

      <SearchBar />

      <div className="flex items-center gap-4 text-slate-600">
        <Link to="/account" className="flex flex-col items-center text-xs font-semibold">
          <FiUser size={22} />
          Account
        </Link>
        <button
          type="button"
          className="flex flex-col items-center text-xs font-semibold text-slate-600"
          title="Wishlist coming soon"
        >
          <FiHeart size={22} />
          Wishlist
        </button>
        <Link to="/cart" className="flex flex-col items-center text-xs font-semibold">
          <FiShoppingCart size={22} />
          Cart
        </Link>
      </div>
    </div>
  </header>
)

export default Header

