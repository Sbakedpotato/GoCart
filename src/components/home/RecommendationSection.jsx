import React from 'react'
import ProductCard from '../common/ProductCard'

const RecommendationSection = ({ title, products = [] }) => {
  if (!products.length) return null

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button className="text-sm font-semibold text-brand-blue">See more</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RecommendationSection

