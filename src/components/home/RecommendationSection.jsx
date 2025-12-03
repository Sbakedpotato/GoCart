import React from 'react'
import ProductCard from '../common/ProductCard'

const RecommendationSection = ({ title, products = [], onSeeMore }) => {
  if (!products.length) return null

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-brand-black">{title}</h2>
        <button
          onClick={onSeeMore}
          className="text-sm font-medium text-brand-gray hover:text-brand-black"
        >
          See more
        </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RecommendationSection

