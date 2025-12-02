import React from 'react'
const BrandsGrid = ({ brands = [] }) => {
  if (!brands.length) return null
  return (
    <section className="mt-20 border-t border-brand-light pt-12">
      <h2 className="mb-8 text-center text-lg font-medium text-brand-gray">Trusted by Leading Brands</h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center justify-center opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          >
            {brand.image || brand.imageUrl ? (
              <img src={brand.image || brand.imageUrl} alt={brand.name} className="h-8 object-contain" />
            ) : (
              <span className="text-lg font-bold text-brand-black">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default BrandsGrid
