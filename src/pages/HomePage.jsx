import React from 'react'
import { useEffect, useState } from 'react'
import HeroCarousel from '../components/home/HeroCarousel'
import CategoryShortcuts from '../components/home/CategoryShortcuts'
import RecommendationSection from '../components/home/RecommendationSection'
import FlashDeals from '../components/home/FlashDeals'
import BrandsGrid from '../components/home/BrandsGrid'
import { api } from '../services/api'

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
      <div className="flex min-h-[50vh] items-center justify-center text-brand-blue">
        Loading personalized storefront...
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
    <div className="space-y-12">
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
