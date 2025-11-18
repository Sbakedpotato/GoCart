import React from 'react'
const BrandsGrid = ({ brands = [] }) => (
  <section className="mt-12">
    <h2 className="mb-4 text-2xl font-semibold text-slate-900">Featured Brands</h2>
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="flex h-24 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <img src={brand.image} alt={brand.name} className="max-h-10" />
        </div>
      ))}
    </div>
  </section>
)

export default BrandsGrid

