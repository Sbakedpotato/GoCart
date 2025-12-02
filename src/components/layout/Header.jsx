import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi'
import SearchBar from './SearchBar'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
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
          {user ? (
            <>
              <Link to="/account" className="flex flex-col items-center text-xs font-semibold">
                <FiUser size={22} />
                {user.name?.split(' ')[0] || 'Account'}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex flex-col items-center text-xs font-semibold text-slate-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex flex-col items-center text-xs font-semibold">
              <FiUser size={22} />
              Sign In
            </Link>
          )}
          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className="flex flex-col items-center text-xs font-semibold text-slate-600"
          >
            <FiHeart size={22} />
            Wishlist
          </button>
          <Link to="/cart" className="relative flex flex-col items-center text-xs font-semibold">
            <FiShoppingCart size={22} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
