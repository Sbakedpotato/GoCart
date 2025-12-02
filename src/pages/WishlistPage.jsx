import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const WishlistPage = () => {
  const { items, loading, remove } = useWishlist()
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <p className="text-xl font-semibold text-slate-800">Sign in to view your wishlist</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 rounded-2xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-lg shadow-brand-blue/30"
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
      <div className="rounded-3xl bg-white p-12 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div className="mx-auto mb-4 h-24 w-24">
          <div className="h-full w-full rounded-2xl bg-slate-100 bg-[url('https://static-00.iconduck.com/assets.00/empty-box-illustration-512x460-gyrm69i8.png')] bg-contain bg-center bg-no-repeat" />
        </div>
        <p className="text-xl font-semibold text-slate-800">Your wishlist is empty</p>
        <p className="mt-2 text-sm text-slate-500">Browse products and save your favorites.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-2xl bg-brand-blue px-6 py-3 font-semibold text-white shadow-lg shadow-brand-blue/30 transition hover:-translate-y-0.5"
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
          <div
            key={product.id}
            className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-44 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-44 w-full items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                No image
              </div>
            )}
            <p className="mt-4 line-clamp-2 text-sm font-semibold text-slate-900">
              {product.title}
            </p>
            <p className="text-xs text-slate-500">{product.brand}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-bold text-brand-blue">
                Rs. {(product.price ?? 0).toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-slate-400 line-through">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  addToCart(product)
                  remove(product.id)
                }}
                className="w-full rounded-2xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Move to Cart
              </button>
              <button
                onClick={() => remove(product.id)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
