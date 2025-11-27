import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import catalogRoutes from './routes/catalog.js'
import productRoutes from './routes/products.js'
import accountRoutes from './routes/account.js'
import orderRoutes from './routes/orders.js'
import wishlistRoutes from './routes/wishlist.js'
import { loadEnv } from './config/env.js'

const env = loadEnv()
const app = express()
const PORT = env.PORT || 4000

app.use(cors({ origin: env.CLIENT_ORIGIN || '*' }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/catalog', catalogRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/wishlist', wishlistRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
