import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiStar, FiHeart } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'

const ProductCard = ({ product, children }) => {
  const { addToCart } = useCart()
  const { toggle, items } = useWishlist()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timer = setTimeout(() => setJustAdded(false), 1500)
    return () => clearTimeout(timer)
  }, [justAdded])

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
    <div className="group flex flex-col rounded-xl bg-white p-3 transition-all hover:shadow-soft">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden rounded-lg bg-brand-light/30">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center text-brand-gray">
            No image
          </div>
        )}

        {/* Badges */}
        {product.discount && (
          <span className="absolute left-2 top-2 rounded bg-brand-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            -{product.discount}%
          </span>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-white/90 p-3 backdrop-blur transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
              setJustAdded(true)
            }}
            className="flex h-10 w-full items-center justify-center rounded bg-brand-black text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-accent"
          >
            {justAdded ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </Link>

      <div className="mt-4 space-y-1">
        <div className="flex items-start justify-between gap-4">
          <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-medium text-brand-dark hover:text-brand-black">
            {product.title}
          </Link>
          <button
            type="button"
            onClick={handleWishlist}
            className={`transition-colors ${inWishlist ? 'text-red-500' : 'text-brand-gray hover:text-brand-black'}`}
          >
            <FiHeart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-brand-black">
            Rs. {(product.price ?? 0).toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-brand-gray line-through">
              Rs. {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-brand-gray">
          <FiStar className="fill-current text-yellow-400" />
          <span>{product.rating ?? 'N/A'}</span>
          <span>({product.reviewCount ?? 0})</span>
        </div>

        {children}
      </div>
    </div>
  )
}

export default ProductCard
