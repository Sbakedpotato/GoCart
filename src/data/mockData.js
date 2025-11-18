export const notificationCopy = 'Free delivery on orders over Rs. 2,000 across Pakistan.'

export const heroBanners = [
  {
    id: 'mega-sale',
    title: 'Mega AI Sale',
    subtitle: 'Handpicked deals based on your style & browsing history',
    cta: 'Shop Now',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=60',
    background: 'from-brand-orange/90 to-brand-yellow/80',
  },
  {
    id: 'flash-deal',
    title: 'Flash Deals Every 6 Hours',
    subtitle: 'Electronics, home, groceries & more with AI-curated bundles',
    cta: 'Explore Deals',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=60',
    background: 'from-brand-blue/90 to-slate-900/90',
  },
  {
    id: 'back-to-school',
    title: 'Back to School, Smarter',
    subtitle: 'Study gear selected by GoCart AI to fit every budget',
    cta: 'View Essentials',
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=60',
    background: 'from-slate-900/90 to-brand-blue/80',
  },
]

export const categoryShortcuts = [
  {
    id: 'electronics',
    label: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1510552776732-01acc9a4c059?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 'groceries',
    label: 'Groceries',
    image:
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 'home',
    label: 'Home & Living',
    image:
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 'sports',
    label: 'Sports',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=60',
  },
]

export const featuredBrands = [
  { id: 'samsung', name: 'Samsung', image: 'https://logo.clearbit.com/samsung.com' },
  { id: 'apple', name: 'Apple', image: 'https://logo.clearbit.com/apple.com' },
  { id: 'dawlance', name: 'Dawlance', image: 'https://logo.clearbit.com/dawlance.com.pk' },
  { id: 'gul-ahmed', name: 'Gul Ahmed', image: 'https://logo.clearbit.com/gulahmedshop.com' },
  { id: 'philips', name: 'Philips', image: 'https://logo.clearbit.com/philips.com' },
  { id: 'nike', name: 'Nike', image: 'https://logo.clearbit.com/nike.com' },
]

export const products = [
  {
    id: 'p1',
    title: 'Samsung Galaxy S24 Ultra 5G',
    description:
      'AI-powered flagship phone with 200MP camera, 5,000mAh battery, and S-Pen support.',
    price: 529999,
    oldPrice: 589999,
    rating: 4.9,
    reviewCount: 245,
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    brand: 'Samsung',
    image:
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'In stock',
    discount: 10,
    features: [
      'Snapdragon 8 Gen 3 for Galaxy',
      '200MP Adaptive Pixel camera',
      'S-Pen with low latency',
      '5,000mAh intelligent battery',
    ],
    specs: {
      storage: '512GB',
      color: 'Titanium Gray',
      warranty: '12 months official warranty',
    },
  },
  {
    id: 'p2',
    title: 'GoCart Smart Blender Pro',
    description: 'AI blending presets for smoothies, dals, chutneys, and protein shakes.',
    price: 18999,
    oldPrice: 24999,
    rating: 4.6,
    reviewCount: 112,
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    brand: 'GoCart Home',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'Only 5 left',
    discount: 24,
    features: ['8 smart presets', 'Self-clean cycle', 'Borosil glass jar', '2-year warranty'],
    specs: {
      power: '1000W',
      jarCapacity: '1.8L',
      voltage: '220V',
    },
  },
  {
    id: 'p3',
    title: 'AI-Optimized Ergonomic Chair',
    description: 'Adaptive lumbar support with breathable mesh and adjustable headrest.',
    price: 74999,
    oldPrice: 89999,
    rating: 4.7,
    reviewCount: 88,
    categoryId: 'home',
    categoryLabel: 'Home & Living',
    brand: 'FlexiWork',
    image:
      'https://images.unsplash.com/photo-1580480054278-3130f36f9d04?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'In stock',
    discount: 17,
    features: [
      'Dynamic lumbar grid',
      '4D armrests',
      'Seat depth control',
      'Reinforced steel base',
    ],
    specs: {
      material: 'Mesh + Steel',
      weightCapacity: '150 kg',
      color: 'Shadow Black',
    },
  },
  {
    id: 'p4',
    title: 'FreshCart Organic Grocery Bundle',
    description: 'Weekly essentials curated for family of four with AI freshness scoring.',
    price: 12999,
    oldPrice: 14999,
    rating: 4.4,
    reviewCount: 57,
    categoryId: 'groceries',
    categoryLabel: 'Groceries',
    brand: 'FreshCart',
    image:
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'In stock',
    discount: 13,
    features: ['24-hour cold chain', 'Farm-to-table selection', 'Seasonal swaps'],
    specs: {
      weight: '12 kg',
      delivery: 'Same day in Karachi, Lahore, Islamabad',
    },
  },
  {
    id: 'p5',
    title: 'Darzee Smart Kurta Set',
    description: 'Modern cut cotton kurta with auto-size recommendations.',
    price: 5999,
    oldPrice: 7999,
    rating: 4.5,
    reviewCount: 134,
    categoryId: 'fashion',
    categoryLabel: 'Fashion',
    brand: 'Darzee',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'In stock',
    discount: 25,
    features: ['Soft lawn cotton', 'Wrinkle resistant', 'AI size finder'],
    specs: {
      fabric: '100% cotton',
      sizes: 'S-XXL',
      colorways: 'Cloud white, midnight blue, sage',
    },
  },
  {
    id: 'p6',
    title: 'Lenovo LOQ RTX 4060 Gaming Laptop',
    description: 'AI-tuned performance profiles for gaming, editing, and battery saver modes.',
    price: 289999,
    oldPrice: 319999,
    rating: 4.8,
    reviewCount: 93,
    categoryId: 'electronics',
    categoryLabel: 'Electronics',
    brand: 'Lenovo',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'In stock',
    discount: 9,
    features: ['RTX 4060 8GB', '13th Gen Intel i7', '165Hz 15.6" display'],
    specs: {
      ram: '16GB DDR5',
      storage: '1TB SSD',
      os: 'Windows 11',
    },
  },
  {
    id: 'p7',
    title: 'AI SmartFit Running Shoes',
    description: 'Adaptive cushioning that responds to gait & terrain for daily runs.',
    price: 19999,
    oldPrice: 23999,
    rating: 4.3,
    reviewCount: 76,
    categoryId: 'sports',
    categoryLabel: 'Sports',
    brand: 'Stride',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'Only 3 left',
    discount: 17,
    features: ['Cloud foam midsole', 'Reflective tape', 'AI stride guide'],
    specs: {
      sizes: '40-45 EU',
      weight: '210g',
      warranty: '6 months outsole guarantee',
    },
  },
  {
    id: 'p8',
    title: 'GoCart Essential Makeup Kit',
    description: 'Everyday glam palette curated with dermatologist-approved picks.',
    price: 9999,
    oldPrice: 13999,
    rating: 4.5,
    reviewCount: 58,
    categoryId: 'beauty',
    categoryLabel: 'Beauty',
    brand: 'GoCart Beauty',
    image:
      'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=800&q=60',
    inventoryStatus: 'In stock',
    discount: 29,
    features: ['Vegan formulas', '12-hour wear', 'Skin tone matching'],
    specs: {
      shades: '18 custom shades',
      included: 'Palette, liner, mascara, lip oil',
    },
  },
]

export const flashDeals = products
  .filter((product) => ['p1', 'p2', 'p5', 'p6', 'p7'].includes(product.id))
  .map((product, index) => ({
    ...product,
    claimed: [65, 32, 80, 54, 44][index],
  }))

export const recommendationSections = [
  {
    id: 'rec-you',
    title: 'Recommended for You',
    products: ['p1', 'p2', 'p8', 'p5'],
  },
  {
    id: 'rec-browsing',
    title: 'Inspired by Your Browsing',
    products: ['p3', 'p4', 'p6', 'p7'],
  },
  {
    id: 'rec-electronics',
    title: 'Top Picks in Electronics',
    products: ['p1', 'p6'],
  },
]

export const mockOrders = [
  {
    id: 'INV-1045',
    date: 'Oct 22, 2025',
    total: 74999,
    status: 'Delivered',
    items: ['AI Chair', 'Desk Mat'],
  },
  {
    id: 'INV-1048',
    date: 'Nov 3, 2025',
    total: 18999,
    status: 'In Transit',
    items: ['Smart Blender Pro'],
  },
]

export const mockAddresses = [
  {
    id: 'addr-1',
    label: 'Home',
    recipient: 'Reyya Khan',
    line1: 'House 14, Street 8',
    city: 'Lahore',
    phone: '+92 300 1234567',
  },
  {
    id: 'addr-2',
    label: 'Office',
    recipient: 'Reyya Khan',
    line1: 'Plot 22, Tech Park, Gulberg',
    city: 'Lahore',
    phone: '+92 301 2223344',
  },
]

export const getProductById = (id) => products.find((product) => product.id === id)

export const getProductsByCategory = (categoryId) =>
  products.filter((product) => product.categoryId === categoryId)

