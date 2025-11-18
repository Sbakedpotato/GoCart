import {
  heroBanners,
  categoryShortcuts,
  recommendationSections,
  flashDeals,
  featuredBrands,
  mockOrders,
  mockAddresses,
  getProductById,
  getProductsByCategory,
  products,
} from '../data/mockData'

const clone = (data) => JSON.parse(JSON.stringify(data))

const simulateNetwork = (data, delay = 150) =>
  new Promise((resolve) => setTimeout(() => resolve(clone(data)), delay))

const listByCategoryOrAll = (categoryId) => {
  const data = getProductsByCategory(categoryId)
  return data.length ? data : products
}

export const api = {
  getHeroBanners: () => simulateNetwork(heroBanners),
  getCategoryShortcuts: () => simulateNetwork(categoryShortcuts),
  getRecommendations: () =>
    simulateNetwork(
      recommendationSections.map((section) => ({
        ...section,
        products: section.products.map((id) => getProductById(id)).filter(Boolean),
      }))
    ),
  getFlashDeals: () => simulateNetwork(flashDeals),
  getFeaturedBrands: () => simulateNetwork(featuredBrands),
  listProducts: () => simulateNetwork(products),
  getProductsByCategory: (categoryId) => simulateNetwork(listByCategoryOrAll(categoryId)),
  getProductDetail: (productId) => simulateNetwork(getProductById(productId)),
  getAccountOverview: () =>
    simulateNetwork({
      name: 'Reyya Khan',
      email: 'reyya@example.com',
      phone: '+92 300 1234567',
      orders: mockOrders,
      addresses: mockAddresses,
    }),
}

