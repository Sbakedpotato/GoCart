import express from 'express'
import { query } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/admin.js'

const router = express.Router()

router.use(authenticate, requireAdmin)

// List orders with pagination, filtering, and search
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query
        const offset = (page - 1) * limit

        let baseSql = `
      FROM orders o
      JOIN users u ON o.user_id = u.id
    `
        const params = []
        const conditions = []

        if (status && status !== 'All') {
            conditions.push('o.status = ?')
            params.push(status)
        }

        if (search) {
            conditions.push('(o.id LIKE ? OR u.name LIKE ? OR u.email LIKE ?)')
            params.push(`%${search}%`, `%${search}%`, `%${search}%`)
        }

        if (conditions.length) {
            baseSql += ' WHERE ' + conditions.join(' AND ')
        }

        // Count total for pagination
        const countSql = `SELECT COUNT(*) as total ${baseSql}`
        const [countRows] = await query(countSql, params)
        const totalOrders = countRows[0].total

        // Fetch data
        const dataSql = `
      SELECT o.id, o.total, o.status, o.created_at, u.name as user_name, u.email as user_email
      ${baseSql}
      ORDER BY o.created_at DESC 
      LIMIT ? OFFSET ?
    `
        params.push(Number(limit), Number(offset))

        const [rows] = await query(dataSql, params)

        res.json({
            orders: rows,
            total: totalOrders,
            page: Number(page),
            totalPages: Math.ceil(totalOrders / limit)
        })
    } catch (error) {
        console.error('List orders error:', error)
        res.status(500).json({ message: 'Failed to list orders' })
    }
})

// Get order details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const [orders] = await query(`
      SELECT o.*, u.name as user_name, u.email as user_email,
             a.recipient, a.line1, a.city, a.phone
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN addresses a ON o.shipping_address_id = a.id
      WHERE o.id = ?
    `, [id])

        if (!orders.length) return res.status(404).json({ message: 'Order not found' })

        const [items] = await query(`
      SELECT oi.*, p.title, p.image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [id])

        res.json({ ...orders[0], items })
    } catch (error) {
        console.error('Get order error:', error)
        res.status(500).json({ message: 'Failed to get order details' })
    }
})

// Update status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        await query('UPDATE orders SET status = ? WHERE id = ?', [status, id])
        res.json({ message: 'Status updated' })
    } catch (error) {
        console.error('Update status error:', error)
        res.status(500).json({ message: 'Failed to update status' })
    }
})

export default router
