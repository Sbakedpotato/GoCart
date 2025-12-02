import express from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/admin.js'

const router = express.Router()

// Protect all admin routes
router.use(authenticate, requireAdmin)

router.post('/create-admin', async (req, res) => {
    const { name, email, password } = req.body || {}

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    try {
        const [existing] = await query('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
        if (existing.length) {
            return res.status(409).json({ message: 'Account with that email already exists' })
        }

        const passwordHash = await bcrypt.hash(password, 12)
        const [result] = await query(
            'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [name, email, passwordHash, 'admin']
        )

        return res.status(201).json({
            message: 'Admin created successfully',
            admin: { id: result.insertId, name, email, role: 'admin' },
        })
    } catch (error) {
        console.error('Create admin error:', error)
        return res.status(500).json({ message: 'Unable to create admin' })
    }
})

export default router
