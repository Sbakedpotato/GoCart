import React from 'react'
import { Link } from 'react-router-dom'
import { FiStar } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  if (!product) return null

  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full rounded-xl object-cover"
        />
        <p className="mt-4 line-clamp-2 text-sm font-semibold text-slate-800">{product.title}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
          <FiStar />
          <span>{product.rating}</span>
          <span className="text-slate-500">({product.reviewCount})</span>
        </div>
      </Link>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-lg font-bold text-brand-blue">Rs. {product.price.toLocaleString()}</span>
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

      <button
        onClick={() => addToCart(product)}
        className="mt-4 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard

