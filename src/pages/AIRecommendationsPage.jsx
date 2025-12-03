import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import ProductCard from '../components/common/ProductCard'
import Skeleton from '../components/common/Skeleton'

const AIRecommendationsPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await api.getAIRecommendations(20)
                setProducts(data)
            } catch (err) {
                setError('Unable to load recommendations.')
            } finally {
                setLoading(false)
            }
        }
        fetchRecommendations()
    }, [])

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="h-10 w-64 rounded-xl bg-slate-100" />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(8)].map((_, idx) => (
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
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-brand-black">
                    Recommended For You
                </h1>
                <p className="mt-2 text-brand-gray">
                    Curated picks based on your style and preferences
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default AIRecommendationsPage
