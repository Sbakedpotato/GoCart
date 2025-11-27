import express from 'express'
import { query } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.get('/me', authenticate, async (req, res) => {
  const userId = req.user.id

  const [[userRows], [addressRows], [orderRows], [itemRows]] = await Promise.all([
    query('SELECT id, name, email, created_at AS createdAt FROM users WHERE id = ? LIMIT 1', [
      userId,
    ]),
    query(
      'SELECT id, label, recipient, line1, city, phone FROM addresses WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    ),
    query(
      `SELECT id, status, total, created_at AS createdAt
       FROM orders
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    ),
    query(
      `SELECT oi.order_id AS orderId,
              oi.product_id AS productId,
              oi.quantity,
              oi.price,
              p.title
       FROM order_items oi
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id IN (SELECT id FROM orders WHERE user_id = ?)`,
      [userId]
    ),
  ])

  const orders = orderRows.map((order) => ({
    ...order,
    items: itemRows
      .filter((item) => item.orderId === order.id)
      .map((item) => item.title || item.productId || `Item x${item.quantity}`),
  }))

  const user = userRows?.[0]
  if (!user) return res.status(404).json({ message: 'User not found' })

  res.json({
    user,
    addresses: addressRows,
    orders,
  })
})

export default router
