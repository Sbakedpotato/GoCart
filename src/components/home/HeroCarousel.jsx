import React from 'react'
import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const HeroCarousel = ({ banners = [] }) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setActive((prev) => (prev + 1) % banners.length),
      5000
    )
    return () => clearInterval(interval)
  }, [banners.length])

  if (!banners.length) return null

  const goTo = (index) => {
    setActive((index + banners.length) % banners.length)
  }

  const current = banners[active]

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r shadow-card text-white">
      <img
        src={current.image}
        alt={current.title}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${current.background}`} />
      <div className="relative z-10 flex flex-col gap-4 px-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em]">GoCart Exclusive</p>
          <h1 className="text-4xl font-bold md:text-5xl">{current.title}</h1>
          <p className="text-lg text-slate-100">{current.subtitle}</p>
          <button className="rounded-full bg-white px-6 py-3 font-semibold text-brand-blue shadow-lg hover:scale-[1.02] transition">
            {current.cta}
          </button>
        </div>
      </div>

      <button
        onClick={() => goTo(active - 1)}
        aria-label="Previous banner"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-slate-800 shadow"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={() => goTo(active + 1)}
        aria-label="Next banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-slate-800 shadow"
      >
        <FiChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-8 rounded-full ${index === active ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel

