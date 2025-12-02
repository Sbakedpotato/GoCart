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
    <header className="glass sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-brand-black">GoCart</span>
        </Link>

        {/* Search Bar - Centered & Minimal */}
        <div className="hidden flex-1 px-12 md:block">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="group relative flex items-center gap-2">
              <Link to="/account" className="text-sm font-medium text-brand-dark hover:text-brand-black">
                {user.name?.split(' ')[0] || 'Account'}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-brand-gray hover:text-brand-black"
              >
                (Logout)
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-brand-dark hover:text-brand-black">
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className="text-brand-dark transition-colors hover:text-brand-accent"
            aria-label="Wishlist"
          >
            <FiHeart size={20} />
          </button>

          <Link to="/cart" className="relative text-brand-dark transition-colors hover:text-brand-accent" aria-label="Cart">
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-black text-[10px] font-bold text-white">
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
