const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const getAuthHeaders = () => {
  if (typeof localStorage === 'undefined') return {}
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.auth ? getAuthHeaders() : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed: ${response.status}`)
  }

  // Gracefully handle empty/204 responses from endpoints like DELETE wishlist
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }
  const text = await response.text()
  return text ? text : null
}

export const api = {
  getHeroBanners: async () => {
    const data = await request('/catalog/hero-banners')
    return (data || []).map((item) => ({ ...item, image: item.image || item.imageUrl }))
  },
  getCategoryShortcuts: async () => {
    const data = await request('/catalog/categories')
    return (data || []).map((item) => ({ ...item, label: item.label || item.name }))
  },
  getRecommendations: () => request('/catalog/recommendations'),
  getFlashDeals: () => request('/catalog/flash-deals'),
  getFeaturedBrands: async () => {
    const data = await request('/catalog/brands')
    return (data || []).map((item) => ({ ...item, image: item.image || item.imageUrl }))
  },
  listProducts: () => request('/products'),
  searchProducts: (keyword, categoryId) => {
    const params = new URLSearchParams()
    if (keyword) params.append('q', keyword)
    if (categoryId && categoryId !== 'all') params.append('category', categoryId)
    return request(`/products?${params.toString()}`)
  },
  getProductsByCategory: (categoryId) => request(`/products/category/${categoryId}`),
  getProductDetail: (productId) => request(`/products/${productId}`),
  getAccountOverview: () => request('/account/me', { auth: true }),
  getNotification: () => request('/catalog/notification'),
  checkout: (payload) => request('/orders/checkout', { method: 'POST', body: JSON.stringify(payload), auth: true }),
  getWishlist: () => request('/wishlist', { auth: true }),
  addToWishlist: (productId) =>
    request('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
      auth: true,
    }),
  removeFromWishlist: (productId) =>
    request(`/wishlist/${productId}`, {
      method: 'DELETE',
      auth: true,
    }),
  getAdminOrders: (params) => {
    const query = new URLSearchParams(params).toString()
    return request(`/admin/orders?${query}`, { auth: true })
  },
  getAdminOrderDetail: (id) => request(`/admin/orders/${id}`, { auth: true }),
  updateOrderStatus: (id, status) =>
    request(`/admin/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      auth: true,
    }),
  getAdminProducts: (params) => {
    const query = new URLSearchParams(params).toString()
    return request(`/admin/products?${query}`, { auth: true })
  },
  createProduct: (data) =>
    request('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data),
      auth: true,
    }),
  deleteProduct: (id) =>
    request(`/admin/products/${id}`, {
      method: 'DELETE',
      auth: true,
    }),
  getAdminProduct: (id) => request(`/admin/products/${id}`, { auth: true }),
  updateProduct: (id, data) =>
    request(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      auth: true,
    }),
}

export async function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function register(name, email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}
