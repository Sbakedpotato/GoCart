import React from 'react'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { categoryShortcuts } from '../../data/mockData'

const SearchBar = () => {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect with actual search endpoint
    console.info('Search request', { keyword, category })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl rounded-full border border-slate-300 bg-white shadow-sm"
    >
      <select
        aria-label="Select category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="rounded-l-full border-r border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 focus:outline-none"
      >
        <option value="all">All Categories</option>
        {categoryShortcuts.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>

      <input
        type="search"
        className="flex-1 rounded-none border-none px-4 py-3 text-sm focus:outline-none"
        placeholder="Search GoCart for products, brands, and more..."
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />

      <button
        type="submit"
        className="flex items-center gap-2 rounded-r-full bg-brand-orange px-6 font-semibold text-white hover:bg-orange-500 transition"
      >
        <FiSearch />
        Search
      </button>
    </form>
  )
}

export default SearchBar

