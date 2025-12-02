import express from 'express'
import { query } from '../config/db.js'

const router = express.Router()

const safeParse = (value, fallback) => {
  try {
    return typeof value === 'string' ? JSON.parse(value) : value
  } catch (error) {
    return fallback
  }
}

router.get('/hero-banners', async (req, res) => {
  const [rows] = await query(
    'SELECT id, title, subtitle, link, cta, image_url AS imageUrl, background FROM hero_banners ORDER BY created_at DESC'
  )
  res.json(rows)
})

router.get('/categories', async (req, res) => {
  const [rows] = await query('SELECT id, name, image_url AS image FROM categories ORDER BY name ASC')
  res.json(rows)
})

router.get('/brands', async (req, res) => {
  const [rows] = await query('SELECT id, name, image_url AS imageUrl FROM brands ORDER BY name ASC')
  res.json(rows)
})

router.get('/flash-deals', async (req, res) => {
  const [rows] = await query(
    `SELECT fd.id,
            fd.claimed,
            fd.starts_at AS startsAt,
            fd.ends_at AS endsAt,
            p.id AS id,
            p.title,
            p.description,
            p.price,
            p.old_price AS oldPrice,
            p.rating,
            p.review_count AS reviewCount,
            p.category_id AS categoryId,
            p.brand_id AS brandId,
            p.image_url AS image,
            p.inventory_status AS inventoryStatus,
            p.discount,
            p.features,
            p.specs
     FROM flash_deals fd
     JOIN products p ON p.id = fd.product_id
     ORDER BY fd.id DESC`
  )
  res.json(
    rows.map((row) => ({
      ...row,
      features: safeParse(row.features, []),
      specs: safeParse(row.specs, {}),
    }))
  )
})

router.get('/recommendations', async (req, res) => {
  const [sections] = await query('SELECT id, title FROM recommendation_sections')
  const [items] = await query(
    `SELECT ri.section_id AS sectionId,
            ri.product_id AS productId,
            ri.position,
            p.id AS id,
            p.title,
            p.price,
            p.old_price AS oldPrice,
            p.rating,
            p.review_count AS reviewCount,
            p.category_id AS categoryId,
            p.brand_id AS brandId,
            p.image_url AS image,
            p.inventory_status AS inventoryStatus,
            p.discount,
            p.features,
            p.specs
     FROM recommendation_items ri
     JOIN products p ON p.id = ri.product_id
     ORDER BY ri.section_id, ri.position ASC`
  )

  const grouped = sections.map((section) => ({
    ...section,
    products: items
      .filter((item) => item.sectionId === section.id)
      .map((item) => ({
        ...item,
        features: safeParse(item.features, []),
        specs: safeParse(item.specs, {}),
      })),
  }))

  res.json(grouped)
})

router.get('/notification', async (req, res) => {
  const [rows] = await query(
    'SELECT content_value AS message FROM site_content WHERE content_key = ? LIMIT 1',
    ['notification']
  )
  res.json({ message: rows[0]?.message || '' })
})

export default router
