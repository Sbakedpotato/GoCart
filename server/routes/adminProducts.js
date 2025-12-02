import express from 'express'
import { query } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/admin.js'
import { randomUUID } from 'crypto'

const router = express.Router()

router.use(authenticate, requireAdmin)

// List products
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query
        const offset = (page - 1) * limit

        let baseSql = `FROM products p 
                   LEFT JOIN categories c ON p.category_id = c.id
                   LEFT JOIN brands b ON p.brand_id = b.id`
        const params = []
        const conditions = []

        if (search) {
            conditions.push('(p.title LIKE ? OR p.description LIKE ?)')
            params.push(`%${search}%`, `%${search}%`)
        }

        if (conditions.length) {
            baseSql += ' WHERE ' + conditions.join(' AND ')
        }

        // Count
        const [countRows] = await query(`SELECT COUNT(*) as total ${baseSql}`, params)
        const total = countRows[0].total

        // Fetch
        const [rows] = await query(`
      SELECT p.*, c.name as category_name, b.name as brand_name 
      ${baseSql}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, Number(limit), Number(offset)])

        res.json({
            products: rows,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        })
    } catch (error) {
        console.error('List products error:', error)
        res.status(500).json({ message: 'Failed to list products' })
    }
})

// Create product
router.post('/', async (req, res) => {
    try {
        const { title, description, price, category_id, brand_id, image_url, inventory_status, features, specs } = req.body

        if (!title || !price || !category_id) {
            return res.status(400).json({ message: 'Title, price, and category are required' })
        }

        const id = randomUUID()

        await query(`
      INSERT INTO products (id, title, description, price, category_id, brand_id, image_url, inventory_status, features, specs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, title, description, price, category_id, brand_id || null, image_url, inventory_status || 'In Stock', JSON.stringify(features || []), JSON.stringify(specs || {})])

        res.status(201).json({ message: 'Product created', id })
    } catch (error) {
        console.error('Create product error:', error)
        res.status(500).json({ message: 'Failed to create product' })
    }
})

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await query('DELETE FROM products WHERE id = ?', [id])
        res.json({ message: 'Product deleted' })
    } catch (error) {
        console.error('Delete product error:', error)
        res.status(500).json({ message: 'Failed to delete product' })
    }
})



// Get single product
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await query('SELECT * FROM products WHERE id = ?', [id])
        if (!rows.length) return res.status(404).json({ message: 'Product not found' })

        const product = rows[0]
        // Parse JSON fields
        if (typeof product.features === 'string') product.features = JSON.parse(product.features)
        if (typeof product.specs === 'string') product.specs = JSON.parse(product.specs)

        res.json(product)
    } catch (error) {
        console.error('Get product error:', error)
        res.status(500).json({ message: 'Failed to fetch product' })
    }
})

// Update product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, price, category_id, brand_id, image_url, inventory_status, features, specs } = req.body

        if (!title || !price || !category_id) {
            return res.status(400).json({ message: 'Title, price, and category are required' })
        }

        await query(`
      UPDATE products 
      SET title = ?, description = ?, price = ?, category_id = ?, brand_id = ?, 
          image_url = ?, inventory_status = ?, features = ?, specs = ?
      WHERE id = ?
    `, [title, description, price, category_id, brand_id || null, image_url, inventory_status, JSON.stringify(features || []), JSON.stringify(specs || {}), id])

        res.json({ message: 'Product updated' })
    } catch (error) {
        console.error('Update product error:', error)
        res.status(500).json({ message: 'Failed to update product' })
    }
})

export default router
