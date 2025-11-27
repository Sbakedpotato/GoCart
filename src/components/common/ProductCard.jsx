import React from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiHeart } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { toggle, items } = useWishlist()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!product) return null

  const inWishlist = items.some((item) => item.id === product.id)

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    await toggle(product)
  }

  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      <Link to={`/product/${product.id}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            No image
          </div>
        )}
        <p className="mt-4 line-clamp-2 text-sm font-semibold text-slate-800">{product.title}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
          <FiStar />
          <span>{product.rating ?? 'N/A'}</span>
          <span className="text-slate-500">({product.reviewCount ?? 0})</span>
        </div>
      </Link>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-lg font-bold text-brand-blue">
          Rs. {(product.price ?? 0).toLocaleString()}
        </span>
        {product.oldPrice && (
          <span className="text-sm text-slate-400 line-through">
            Rs. {product.oldPrice.toLocaleString()}
          </span>
        )}
      </div>

      {product.discount && (
        <span className="mt-1 w-fit rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-semibold text-brand-orange">
          -{product.discount}%
        </span>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={handleWishlist}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-slate-600 ${
            inWishlist ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-slate-200'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
