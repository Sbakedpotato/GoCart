import jwt from 'jsonwebtoken'
import { loadEnv } from '../config/env.js'

const { JWT_SECRET } = loadEnv(['JWT_SECRET'])

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
