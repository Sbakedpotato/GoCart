import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setItems([])
      return
    }
    const load = async () => {
      setLoading(true)
      try {
        const data = await api.getWishlist()
        setItems(data || [])
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isAuthenticated])

  const add = async (product) => {
    if (!product?.id) return
    await api.addToWishlist(product.id)
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      return exists ? prev : [...prev, product]
    })
  }

  const remove = async (productId) => {
    await api.removeFromWishlist(productId)
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggle = async (product) => {
    if (items.find((item) => item.id === product.id)) {
      await remove(product.id)
    } else {
      await add(product)
    }
  }

  return (
    <WishlistContext.Provider value={{ items, add, remove, toggle, loading }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
