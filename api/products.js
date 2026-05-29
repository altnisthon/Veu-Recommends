// api/products.js
// GET  → returns the shared product database (all users see the same)
// POST → saves updated products (admin-only, password-protected)

const { kv } = require('@vercel/kv');

const KV_KEY = 'veu_products_v1';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET: return products ────────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const products = await kv.get(KV_KEY);
      return res.status(200).json({ ok: true, products: products || null });
    } catch (err) {
      console.error('KV get error:', err);
      // KV not configured yet — client falls back to built-in defaults
      return res.status(200).json({ ok: false, products: null, note: 'KV not configured' });
    }
  }

  // ── POST: save products (admin only) ───────────────────────────────────────
  if (req.method === 'POST') {
    const { password, products } = req.body || {};
    const correctPw = process.env.ADMIN_PASSWORD || 'veu2026';

    if (!password || password !== correctPw) {
      return res.status(401).json({ ok: false, error: 'Incorrect password' });
    }

    if (!products || typeof products !== 'object') {
      return res.status(400).json({ ok: false, error: 'Invalid products data' });
    }

    try {
      await kv.set(KV_KEY, products);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('KV set error:', err);
      return res.status(500).json({ ok: false, error: 'Failed to save — KV may not be configured. See README.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
