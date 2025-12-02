import React from 'react'
import { useEffect, useState } from 'react'
import HeroCarousel from '../components/home/HeroCarousel'
import CategoryShortcuts from '../components/home/CategoryShortcuts'
import RecommendationSection from '../components/home/RecommendationSection'
import FlashDeals from '../components/home/FlashDeals'
import BrandsGrid from '../components/home/BrandsGrid'
import { api } from '../services/api'
import Skeleton from '../components/common/Skeleton'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [banners, setBanners] = useState([])
  const [categories, setCategories] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [deals, setDeals] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerData, categoryData, recData, dealsData, brandData] = await Promise.all([
          api.getHeroBanners(),
          api.getCategoryShortcuts(),
          api.getRecommendations(),
          api.getFlashDeals(),
          api.getFeaturedBrands(),
        ])
        setBanners(bannerData)
        setCategories(categoryData)
        setRecommendations(recData)
        setDeals(dealsData)
        setBrands(brandData)
      } catch (err) {
        setError('Unable to load storefront data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-72 rounded-3xl" />
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <Skeleton className="mb-3 h-28 rounded-2xl" />
              <Skeleton className="mb-2 h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-20">
      <HeroCarousel banners={banners} />
      <CategoryShortcuts categories={categories} />
      <FlashDeals products={deals} />
      {recommendations.map((section) => (
        <RecommendationSection
          key={section.id}
          title={section.title}
          products={section.products}
        />
      ))}
      <BrandsGrid brands={brands} />
    </div>
  )
}

export default HomePage
