import React from 'react'
import { Link } from 'react-router-dom'

const CategoryShortcuts = ({ categories = [] }) => (
  <section className="mt-10">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-slate-900">Shop by Category</h2>
      <Link to="/categories" className="text-sm font-semibold text-brand-blue">
        View all
      </Link>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card"
        >
          <img
            src={category.image}
            alt={category.label}
            className="h-32 w-full object-cover"
          />
          <div className="p-4 text-center font-semibold text-slate-700 group-hover:text-brand-blue">
            {category.label}
          </div>
        </Link>
      ))}
    </div>
  </section>
)

export default CategoryShortcuts

