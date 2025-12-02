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
    <div className="pb-20">
      <h1 className="mb-12 text-3xl font-bold text-brand-black">My Wishlist</h1>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-light/20">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-brand-gray">
                  No image
                </div>
              )}
              <button
                onClick={() => remove(product.id)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-brand-black backdrop-blur-sm transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex flex-1 flex-col">
              <h3 className="text-base font-bold text-brand-black line-clamp-1">{product.title}</h3>
              <p className="text-sm text-brand-gray">{product.brand}</p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-brand-black">
                  Rs. {(product.price ?? 0).toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-brand-gray line-through">
                    Rs. {product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  addToCart(product)
                  remove(product.id)
                }}
                className="mt-4 w-full rounded-xl bg-brand-black py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
