import React from 'react'

const FilterSidebar = ({ filters, onChange, brands = [] }) => {
  const handleChange = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }))
  }

  const handleBrandToggle = (brand) => {
    const current = filters.brands || []
    const next = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand]
    handleChange('brands', next)
  }

  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-black">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brand-gray">Rs.</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="w-full rounded-lg border border-brand-light bg-brand-light/20 py-2 pl-8 pr-3 text-sm font-medium focus:border-brand-black focus:outline-none"
            />
          </div>
          <span className="text-brand-gray">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brand-gray">Rs.</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="w-full rounded-lg border border-brand-light bg-brand-light/20 py-2 pl-8 pr-3 text-sm font-medium focus:border-brand-black focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-black">Brands</h3>
        <div className="space-y-2.5">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-3 group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="peer h-4 w-4 appearance-none rounded border border-brand-gray/40 checked:border-brand-black checked:bg-brand-black transition-all"
                />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-brand-gray transition-colors group-hover:text-brand-black">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-black">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleChange('rating', filters.rating === rating ? null : rating)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${filters.rating === rating
                  ? 'bg-brand-black text-white'
                  : 'text-brand-gray hover:bg-brand-light/30'
                }`}
            >
              <div className="flex items-center gap-1">
                <span className="font-medium">{rating}+ Stars</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
