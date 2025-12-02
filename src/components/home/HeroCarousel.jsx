import React from 'react'
import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom' // 1. Import this hook

const HeroCarousel = ({ banners = [] }) => {
  const [active, setActive] = useState(0)
  const navigate = useNavigate() // 2. Initialize the hook

  useEffect(() => {
    // Prevent interval if banners is empty to avoid errors
    if (banners.length === 0) return 

    const interval = setInterval(
      () => setActive((prev) => (prev + 1) % banners.length),
      6000
    )
    return () => clearInterval(interval)
  }, [banners.length])

  if (!banners.length) return null

  const goTo = (index) => {
    setActive((index + banners.length) % banners.length)
  }

  const current = banners[active]

  // 3. Helper function to handle the click
  const handleBannerClick = () => {
    if (current.link) {
      navigate(current.link)
    } else {
      console.warn("No link defined for this banner")
    }
  }

  return (
    <section className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-brand-light">
      {/* Background Image with Fade Transition */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <img
          key={current.id || active}
          src={current.image || current.imageUrl}
          alt={current.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" /> 
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-12 md:px-24">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md">
            Featured Collection
          </span>
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
            {current.title}
          </h1>
          <p className="text-lg text-white/90 md:text-xl font-light">
            {current.subtitle}
          </p>
          
          {/* 4. The Button with functionality added */}
          <button 
            onClick={handleBannerClick}
            className="group mt-4 flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-black transition-transform hover:scale-105 cursor-pointer z-20 relative"
          >
            {current.cta}
            <FiChevronRight className="transition-transform group-hover:translate-x-1" />
          </button>

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-12 flex gap-4 z-20">
        <button
          onClick={() => goTo(active - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-black cursor-pointer"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => goTo(active + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-black cursor-pointer"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}

export default HeroCarousel