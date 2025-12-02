import React from 'react'
import { Link } from 'react-router-dom'

const CategoryShortcuts = ({ categories = [] }) => {
  if (!categories.length) return null

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-brand-black">Shop by Category</h2>
        <Link to="/categories" className="text-sm font-medium text-brand-gray hover:text-brand-black">
          View all categories
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group flex flex-col items-center gap-4 rounded-2xl bg-brand-light/30 p-6 transition-colors hover:bg-brand-light/60"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white p-4 shadow-soft transition-transform group-hover:scale-110">
              {category.image || category.imageUrl ? (
                <img
                  src={category.image || category.imageUrl}
                  alt={category.label || category.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="h-full w-full bg-brand-light" />
              )}
            </div>
            <span className="text-sm font-medium text-brand-dark group-hover:text-brand-black">
              {category.label || category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryShortcuts
