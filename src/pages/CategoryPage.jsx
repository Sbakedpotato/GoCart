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
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="lg:w-1/4">
        <button
          className="mb-4 w-full rounded-xl border border-brand-blue/40 bg-white py-3 font-semibold text-brand-blue lg:hidden"
          onClick={() => setMobileFiltersOpen((prev) => !prev)}
        >
          {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
          <FilterSidebar filters={filters} onChange={setFilters} brands={brands} />
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Showing {filteredProducts.length} products</p>
            <h1 className="text-2xl font-semibold capitalize">{categoryId || 'All Products'}</h1>
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="bestselling">Best Selling</option>
          </select>
        </div>

        {error ? (
          <div className="rounded-2xl bg-white p-10 text-center text-red-500">{error}</div>
        ) : paginated.length ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    page === index + 1 ? 'bg-brand-blue text-white' : 'bg-white text-brand-blue'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
            No products match your filters yet. Try resetting filters.
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
