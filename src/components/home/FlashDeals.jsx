import React from 'react'
import CountdownTimer from '../common/CountdownTimer'
import ProductCard from '../common/ProductCard'

const FlashDeals = ({ products = [] }) => {
  if (!products.length) return null

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between rounded-2xl bg-brand-black px-8 py-6 text-white">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold">Flash Deals</h2>
          <div className="hidden h-6 w-px bg-white/20 md:block" />
          <p className="hidden text-sm text-white/70 md:block">Limited time offers on selected items</p>
        </div>
        <CountdownTimer durationInHours={6} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <ProductCard product={product}>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-medium text-brand-gray">
                  <span>{product.claimed ?? 0}% Claimed</span>
                  <span className="text-brand-accent">Selling Fast</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-brand-light">
                  <div
                    className="h-full rounded-full bg-brand-accent"
                    style={{ width: `${product.claimed ?? 0}%` }}
                  />
                </div>
              </div>
            </ProductCard>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FlashDeals
