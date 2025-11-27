import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

const WishlistPage = () => {
  const { items, loading } = useWishlist()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-xl font-semibold text-slate-700">Sign in to view your wishlist</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white"
        >
          Sign In
        </button>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center text-slate-500">Loading wishlist...</div>
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-xl font-semibold text-slate-700">Your wishlist is empty</p>
        <p className="mt-2 text-sm text-slate-500">Browse products and save your favorites.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-brand-blue px-6 py-3 font-semibold text-white"
        >
          Discover products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">Wishlist</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
