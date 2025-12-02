import express from 'express'
import { query } from '../config/db.js'

const router = express.Router()

const baseSelect = `SELECT
  p.id,
  p.title,
  p.description,
  p.price,
  p.old_price AS oldPrice,
  p.rating,
  p.review_count AS reviewCount,
  p.category_id AS categoryId,
  p.brand_id AS brandId,
  p.image_url AS image,
  p.inventory_status AS inventoryStatus,
  p.discount,
  p.features,
  p.specs,
  c.name AS categoryLabel,
  b.name AS brand
FROM products p
LEFT JOIN categories c ON c.id = p.category_id
LEFT JOIN brands b ON b.id = p.brand_id`

const mapProduct = (row) => ({
  ...row,
  features: typeof row.features === 'string' ? safeParse(row.features, []) : row.features,
  specs: typeof row.specs === 'string' ? safeParse(row.specs, {}) : row.specs,
})

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

router.get('/', async (req, res) => {
  const { q, category } = req.query
  let sql = baseSelect
  const params = []
  const conditions = []

  if (q) {
    conditions.push('(p.title LIKE ? OR p.description LIKE ?)')
    params.push(`%${q}%`, `%${q}%`)
  }

  if (category && category !== 'all') {
    conditions.push('p.category_id = ?')
    params.push(category)
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ')
  }

  sql += ' ORDER BY p.created_at DESC'

  const [rows] = await query(sql, params)
  res.json(rows.map(mapProduct))
})

router.get('/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params
  const [rows] = await query(`${baseSelect} WHERE p.category_id = ?`, [categoryId])
  res.json(rows.map(mapProduct))
})

router.get('/:productId', async (req, res) => {
  const { productId } = req.params
  const [rows] = await query(`${baseSelect} WHERE p.id = ? LIMIT 1`, [productId])
  const product = rows[0]
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(mapProduct(product))
})

export default router
