import express from 'express'
import { query } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/admin.js'

const router = express.Router()

// Protect all stats routes
router.use(authenticate, requireAdmin)

router.get('/dashboard', async (req, res) => {
    try {
        // 1. Total Users
        const [userCount] = await query('SELECT COUNT(*) as count FROM users WHERE role = "user"')

        // 2. Total Orders
        const [orderCount] = await query('SELECT COUNT(*) as count FROM orders')

        // 3. Total Revenue
        const [revenueTotal] = await query('SELECT SUM(total) as total FROM orders WHERE status != "Cancelled"')

        // 4. Recent Activity (Last 5 orders)
        const [recentOrders] = await query(`
      SELECT o.id, o.total, o.status, o.created_at, u.name as user_name 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC 
      LIMIT 5
    `)

        res.json({
            totalUsers: userCount[0].count,
            totalOrders: orderCount[0].count,
            totalRevenue: revenueTotal[0].total || 0,
            recentActivity: recentOrders
        })
    } catch (error) {
        console.error('Dashboard stats error:', error)
        res.status(500).json({ message: 'Unable to load dashboard stats' })
    }
})

export default router
