import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

let loaded = false
let cachedEnv = null

export function loadEnv(requiredKeys = []) {
  if (!loaded) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    dotenv.config({ path: path.join(__dirname, '../.env') })
    loaded = true
    cachedEnv = process.env
  }

  for (const key of requiredKeys) {
    if (cachedEnv[key] === undefined) {
      const message = [
        `Missing required environment variable: ${key}`,
        'Create server/.env (cp server/.env.example server/.env) and fill in your MySQL + JWT settings.',
      ].join(' | ')
      console.error(message)
      process.exit(1)
    }
  }

  return cachedEnv
}
