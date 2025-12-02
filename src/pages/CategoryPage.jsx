import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterSidebar from '../components/catalog/FilterSidebar'
import ProductCard from '../components/common/ProductCard'
import { api } from '../services/api'

const pageSize = 8

const sortProducts = (products, sortKey) => {
  switch (sortKey) {
    case 'priceLow':
      return [...products].sort((a, b) => a.price - b.price)
    case 'priceHigh':
      return [...products].sort((a, b) => b.price - a.price)
    case 'bestselling':
      return [...products].sort((a, b) => b.reviewCount - a.reviewCount)
    case 'newest':
      return [...products].sort((a, b) => b.id.localeCompare(a.id))
    default:
      return products
  }
}

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [allProducts, setAllProducts] = useState([])
  const [error, setError] = useState('')
  const [sort, setSort] = useState('relevance')
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', brands: [], rating: null })
  const [page, setPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = categoryId
          ? await api.getProductsByCategory(categoryId)
          : await api.listProducts()
        setAllProducts(data || [])
      } catch (err) {
        setError('Unable to load products.')
      }
    }
    load()
  }, [categoryId])

  const brands = useMemo(() => [...new Set(allProducts.map((product) => product.brand))], [allProducts])

  const filteredProducts = useMemo(() => {
    let list = [...allProducts]
    if (filters.minPrice) list = list.filter((item) => item.price >= filters.minPrice)
    if (filters.maxPrice) list = list.filter((item) => item.price <= filters.maxPrice)
    if (filters.brands.length) list = list.filter((item) => filters.brands.includes(item.brand))
    if (filters.rating) list = list.filter((item) => item.rating >= filters.rating)
    return sortProducts(list, sort)
  }, [allProducts, filters, sort])

  const paginated = filteredProducts.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1

  useEffect(() => {
    setPage(1)
  }, [filters, sort, categoryId])

  return (
    <div className="flex flex-col gap-12 lg:flex-row">
      {/* Sidebar */}
      <div className="lg:w-64 lg:flex-shrink-0">
        <div className="sticky top-24">
          <button
            className="mb-6 flex w-full items-center justify-between rounded-xl border border-brand-light bg-white px-4 py-3 font-medium text-brand-black lg:hidden"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
          >
            <span>Filters</span>
            <span className="text-xs text-brand-gray">{mobileFiltersOpen ? 'Hide' : 'Show'}</span>
          </button>

          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar filters={filters} onChange={setFilters} brands={brands} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header & Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold capitalize tracking-tight text-brand-black">
              {categoryId || 'All Products'}
            </h1>
            <p className="mt-2 text-sm text-brand-gray">
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="appearance-none rounded-lg border-none bg-brand-light/30 py-2.5 pl-4 pr-10 text-sm font-medium text-brand-black focus:ring-0 cursor-pointer hover:bg-brand-light/50 transition-colors"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="bestselling">Best Selling</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl bg-red-50 p-12 text-center text-red-600">{error}</div>
        ) : paginated.length ? (
          <>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${page === index + 1
                        ? 'bg-brand-black text-white'
                        : 'bg-transparent text-brand-gray hover:bg-brand-light'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-light py-24 text-center">
            <p className="text-lg font-medium text-brand-black">No products found</p>
            <p className="text-sm text-brand-gray">Try adjusting your filters</p>
            <button
              onClick={() => setFilters({ minPrice: '', maxPrice: '', brands: [], rating: null })}
              className="mt-4 text-sm font-semibold text-brand-accent hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
