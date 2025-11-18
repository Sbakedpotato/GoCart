import React from 'react'
const ratingOptions = [
  { value: 4.5, label: '4.5 ★ & up' },
  { value: 4, label: '4 ★ & up' },
  { value: 3, label: '3 ★ & up' },
]

const FilterSidebar = ({ filters, onChange, brands }) => {
  const toggleBrand = (brand) => {
    const set = new Set(filters.brands)
    set.has(brand) ? set.delete(brand) : set.add(brand)
    onChange({ ...filters, brands: [...set] })
  }

  return (
    <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <h4 className="font-semibold text-slate-800">Price (Rs.)</h4>
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(event) => onChange({ ...filters, minPrice: Number(event.target.value) })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-800">Brand</h4>
        <div className="mt-3 space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-800">Rating</h4>
        <div className="mt-3 space-y-2">
          {ratingOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                value={option.value}
                checked={filters.rating === option.value}
                onChange={() => onChange({ ...filters, rating: option.value })}
              />
              {option.label}
            </label>
          ))}
          <button
            onClick={() => onChange({ ...filters, rating: null })}
            className="text-xs text-brand-blue"
          >
            Clear rating
          </button>
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar

