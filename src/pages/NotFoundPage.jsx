import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
    <p className="text-sm uppercase tracking-[0.4em] text-slate-500">404</p>
    <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
    <p className="text-sm text-slate-500">
      The page you’re looking for moved or never existed. Head back to discover curated deals.
    </p>
    <Link to="/" className="rounded-full bg-brand-blue px-6 py-3 font-semibold text-white">
      Return Home
    </Link>
  </div>
)

export default NotFoundPage

