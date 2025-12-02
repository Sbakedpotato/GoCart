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
import Skeleton from '../components/common/Skeleton'

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
  const [activeImage, setActiveImage] = useState(0)

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
      <div className="flex min-h-[50vh] items-center justify-center text-brand-gray">{error}</div>
    )
  }

  if (!product) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-40 bg-brand-light/50 rounded-lg" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="h-[500px] bg-brand-light/50 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-12 w-3/4 bg-brand-light/50 rounded-xl" />
            <div className="h-6 w-1/2 bg-brand-light/50 rounded-lg" />
            <div className="h-32 bg-brand-light/50 rounded-2xl" />
          </div>
        </div>
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

  const images = [product.image, product.image, product.image, product.image].filter(Boolean)

  return (
    <div className="space-y-24 pb-20">
      {/* Product Hero */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-light/30">
            {product.image ? (
              <img
                src={images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover transition-all duration-500"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-brand-gray">
                No image
              </div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${activeImage === idx ? 'border-brand-black' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-8 pt-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-accent">
              {product.categoryLabel}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-black md:text-5xl">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-medium">
                <FiStar className="fill-current text-yellow-400" />
                <span>{product.rating}</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-brand-gray" />
              <span className="text-sm text-brand-gray underline decoration-brand-light underline-offset-4">
                {product.reviewCount} Reviews
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-brand-black">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-brand-gray line-through">
                Rs. {product.oldPrice.toLocaleString()}
              </span>
            )}
            {product.discount && (
              <span className="rounded-full bg-brand-black px-3 py-1 text-xs font-bold text-white">
                Save {product.discount}%
              </span>
            )}
          </div>

          <p className="text-lg leading-relaxed text-brand-gray">
            {product.description}
          </p>

          <div className="space-y-6 border-t border-brand-light pt-8">
            <div className="flex items-center gap-6">
              <div className="flex h-12 items-center rounded-full border border-brand-light bg-white px-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-xl text-brand-gray hover:text-brand-black"
                >-</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-xl text-brand-gray hover:text-brand-black"
                >+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="h-12 flex-1 rounded-full bg-brand-black px-8 font-bold text-white transition-transform hover:scale-105 active:scale-95"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${inWishlist
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-brand-light text-brand-black hover:border-brand-black'
                  }`}
              >
                <FiHeart className={inWishlist ? 'fill-current' : ''} />
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm text-brand-gray">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light/50">
                <FiTruck size={14} />
              </div>
              <span>Free shipping on orders over Rs. 5,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Reviews */}
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="mb-6 text-2xl font-bold text-brand-black">Specifications</h3>
          <dl className="grid gap-4 sm:grid-cols-2">
            {Object.entries(product.specs || {}).map(([key, value]) => (
              <div key={key} className="rounded-xl bg-brand-light/20 p-4">
                <dt className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-gray">{key}</dt>
                <dd className="font-medium text-brand-black">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <h3 className="mb-6 text-2xl font-bold text-brand-black">Reviews</h3>
          <div className="rounded-3xl bg-brand-black p-8 text-white">
            <div className="mb-8 flex items-end gap-4">
              <span className="text-6xl font-bold">{product.rating}</span>
              <div className="mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-white/20'} />
                  ))}
                </div>
                <p className="mt-1 text-sm text-white/60">Based on {product.reviewCount} reviews</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="mb-2 text-sm leading-relaxed">"Absolutely love this product! The quality is outstanding and it arrived much faster than expected."</p>
                <p className="text-xs font-bold text-white/60">- Sarah J.</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="mb-2 text-sm leading-relaxed">"Great value for money. Minimalist design fits perfectly with my setup."</p>
                <p className="text-xs font-bold text-white/60">- Mike T.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-brand-light pt-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-brand-black">You might also like</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
