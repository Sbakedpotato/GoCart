import express from 'express'
import { authenticate } from '../middleware/auth.js'
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
FROM wishlists w
JOIN products p ON p.id = w.product_id
LEFT JOIN categories c ON c.id = p.category_id
LEFT JOIN brands b ON b.id = p.brand_id
WHERE w.user_id = ?`

router.get('/', authenticate, async (req, res) => {
  const [rows] = await query(`${baseSelect} ORDER BY w.created_at DESC`, [req.user.id])
  res.json(rows)
})

router.post('/', authenticate, async (req, res) => {
  const productId = req.body?.productId
  if (!productId) return res.status(400).json({ message: 'productId required' })

  try {
    await query(
      'INSERT IGNORE INTO wishlists (user_id, product_id) VALUES (?, ?)',
      [req.user.id, productId]
    )
    res.status(201).json({ message: 'Added to wishlist' })
  } catch (error) {
    console.error('Wishlist add error:', error)
    res.status(500).json({ message: 'Unable to add to wishlist' })
  }
})

router.delete('/:productId', authenticate, async (req, res) => {
  const { productId } = req.params
  await query('DELETE FROM wishlists WHERE user_id = ? AND product_id = ?', [
    req.user.id,
    productId,
  ])
  res.status(204).send()
})

export default router
