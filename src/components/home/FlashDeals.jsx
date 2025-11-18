import React from 'react'
import CountdownTimer from '../common/CountdownTimer'
import ProductCard from '../common/ProductCard'

const FlashDeals = ({ products = [] }) => {
  if (!products.length) return null

  return (
    <section className="mt-12 rounded-3xl bg-gradient-to-r from-brand-blue to-slate-900 p-6 text-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">Limited Time</p>
          <h2 className="text-3xl font-bold">Flash Deals</h2>
        </div>
        <CountdownTimer durationInHours={6} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl bg-white/10 p-2 backdrop-blur">
            <ProductCard product={product} />
            <div className="mt-2 px-2">
              <div className="mb-1 flex items-center justify-between text-xs text-white/80">
                <span>{product.claimed}% claimed</span>
                <span>Hurry!</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-brand-orange"
                  style={{ width: `${product.claimed}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FlashDeals

