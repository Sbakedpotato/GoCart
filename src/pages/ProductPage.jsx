import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiStar, FiTruck, FiHeart } from 'react-icons/fi'
import { api } from '../services/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'

const ProductPage = () => {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const { toggle, items } = useWishlist()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [related, setRelated] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const detail = await api.getProductDetail(productId)
        setProduct(detail)
        if (detail?.categoryId) {
          const similar = await api.getProductsByCategory(detail.categoryId)
          setRelated(similar.filter((item) => item.id !== productId))
        }
      } catch (err) {
        setError('Product not found or unavailable.')
      }
    }
    load()
    window.scrollTo(0, 0)
  }, [productId])

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">{error}</div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading product...
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const inWishlist = items.some((item) => item.id === product.id)

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    await toggle(product)
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 lg:col-span-5">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-96 w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-96 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              No image
            </div>
          )}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[product.image, product.image, product.image, product.image]
              .filter(Boolean)
              .map((thumb, index) => (
                <img key={index} src={thumb} alt="thumb" className="h-20 rounded-xl object-cover" />
              ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-blue">
              {product.categoryLabel}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{product.title}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-amber-500">
              <FiStar />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount} reviews)</span>
            </div>
            <p className="mt-4 text-slate-600">{product.description}</p>

            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {product.features?.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">{product.inventoryStatus}</p>
              <p className="mt-1 flex items-center gap-2">
                <FiTruck /> Ships in 2-4 business days via GoCart Fulfilled
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-brand-blue/20 bg-white p-6 shadow-card">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-brand-blue">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.discount && (
              <span className="mt-2 inline-block rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-semibold text-brand-orange">
                -{product.discount}% off
              </span>
            )}

            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">Quantity</label>
              <div className="mt-2 flex items-center rounded-full border border-slate-200">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 rounded-l-full text-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                  className="w-full border-x border-slate-200 text-center"
                />
                <button onClick={() => setQuantity((prev) => prev + 1)} className="w-10 text-lg">
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-full bg-brand-blue py-3 font-semibold text-white hover:bg-slate-900"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`mt-3 w-full rounded-full border py-3 font-semibold ${
                inWishlist
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-brand-blue text-brand-blue'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiHeart />
                {inWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h3 className="text-xl font-semibold text-slate-900">Specifications</h3>
          <dl className="mt-4 space-y-3">
            {Object.entries(product.specs || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <dt className="capitalize text-slate-500">{key}</dt>
                <dd className="font-semibold text-slate-800">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h3 className="text-xl font-semibold text-slate-900">Customer Reviews</h3>
          <p className="mt-2 text-4xl font-bold text-brand-orange">{product.rating}</p>
          <p className="text-sm text-slate-500">{product.reviewCount} verified ratings</p>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>“Amazing quality and performance for the price.”</p>
            <p>“Delivery was fast and packaging was premium.”</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h3 className="mb-4 text-2xl font-semibold text-slate-900">Customers also viewed</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductPage
