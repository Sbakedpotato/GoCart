import express from 'express'
import { authenticate } from '../middleware/auth.js'
import { getConnection } from '../config/db.js'

const router = express.Router()

const parseItems = (items) =>
  Array.isArray(items)
    ? items
        .filter((item) => item?.productId && Number(item.quantity) > 0)
        .map((item) => ({ productId: item.productId, quantity: Number(item.quantity) }))
    : []

router.post('/checkout', authenticate, async (req, res) => {
  const items = parseItems(req.body?.items)
  const shipping = req.body?.shipping || {}
  const { label = 'Home', recipient, line1, city, phone, addressId } = shipping

  if (!items.length) {
    return res.status(400).json({ message: 'No items to checkout.' })
  }
  if (!addressId && (!recipient || !line1 || !city || !phone)) {
    return res
      .status(400)
      .json({ message: 'Shipping recipient, line1, city, and phone are required.' })
  }

  const conn = await getConnection()
  try {
    await conn.beginTransaction()

    const productIds = items.map((item) => item.productId)
    const [productRows] = await conn.query(
      `SELECT id, price, title FROM products WHERE id IN (${productIds.map(() => '?').join(',')})`,
      productIds
    )

    if (productRows.length !== items.length) {
      throw new Error('One or more products are unavailable.')
    }

    const productMap = new Map(productRows.map((p) => [p.id, p]))
    const lineItems = items.map((item) => {
      const product = productMap.get(item.productId)
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: Number(product.price),
        title: product.title,
        lineTotal: Number(product.price) * item.quantity,
      }
    })

    const total = lineItems.reduce((sum, li) => sum + li.lineTotal, 0)

    let addressRow = null
    if (addressId) {
      const [rows] = await conn.query(
        'SELECT id, user_id FROM addresses WHERE id = ? AND user_id = ? LIMIT 1',
        [addressId, req.user.id]
      )
      addressRow = rows[0]
      if (!addressRow) throw new Error('Address not found for user.')
    } else {
      const [result] = await conn.query(
        `INSERT INTO addresses (user_id, label, recipient, line1, city, phone)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.id, label, recipient, line1, city, phone]
      )
      addressRow = { id: result.insertId }
    }

    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, status, total, shipping_address_id) VALUES (?, 'Processing', ?, ?)`,
      [req.user.id, total, addressRow.id]
    )
    const orderId = orderResult.insertId

    const orderItemValues = lineItems.map((li) => [
      orderId,
      li.productId,
      li.quantity,
      li.price,
    ])

    await conn.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES ${orderItemValues.map(() => '(?, ?, ?, ?)').join(',')}`,
      orderItemValues.flat()
    )

    await conn.commit()

    res.status(201).json({
      orderId,
      total,
      items: lineItems.map(({ title, ...rest }) => rest),
      addressId: addressRow.id,
      status: 'Processing',
    })
  } catch (error) {
    await conn.rollback()
    console.error('Checkout error:', error)
    res.status(400).json({ message: error.message || 'Unable to complete checkout.' })
  } finally {
    conn.release()
  }
})

export default router
