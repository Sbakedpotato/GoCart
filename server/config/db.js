import mysql from 'mysql2/promise'
import { loadEnv } from './env.js'

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306,
} = loadEnv([
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
])

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export const getConnection = () => pool.getConnection()

export const query = (sql, params = []) => pool.execute(sql, params)
