import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'
import { loadEnv } from '../config/env.js'

const router = express.Router()
const { JWT_SECRET, JWT_EXPIRES_IN = '7d' } = loadEnv(['JWT_SECRET'])

const userColumns = 'id, name, email, password_hash AS passwordHash, created_at AS createdAt'

router.post('/register', async (req, res) => {
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
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    )

    const userId = result.insertId
    const token = signToken({ id: userId, email })
    return res.status(201).json({
      token,
      user: { id: userId, name, email },
    })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({ message: 'Unable to register at this time' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const [rows] = await query(
      `SELECT ${userColumns} FROM users WHERE email = ? LIMIT 1`,
      [email]
    )

    const user = rows[0]
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const matches = await bcrypt.compare(password, user.passwordHash)
    if (!matches) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = signToken({ id: user.id, email: user.email })
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Unable to login at this time' })
  }
})

router.get('/me', authenticate, async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT id, name, email, created_at AS createdAt FROM users WHERE id = ? LIMIT 1`,
      [req.user.id]
    )
    const user = rows[0]
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json({ user })
  } catch (error) {
    console.error('Me error:', error)
    return res.status(500).json({ message: 'Unable to fetch profile' })
  }
})

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export default router
