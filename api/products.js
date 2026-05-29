// api/products.js
// Uses Upstash REST API directly — no @vercel/kv package needed.
// Env vars needed: KV_REST_API_URL, KV_REST_API_TOKEN (auto-added by Vercel when you connect Upstash)

const KEY = 'veu_products_v1';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const BASE = process.env.KV_REST_API_URL;
  const TOKEN = process.env.KV_REST_API_TOKEN;

  // KV not configured yet — tell client to use built-in defaults
  if (!BASE || !TOKEN) {
    if (req.method === 'GET') {
      return res.status(200).json({ ok: false, products: null, note: 'Upstash KV not connected. Using built-in defaults.' });
    }
    return res.status(500).json({ ok: false, error: 'Upstash KV not connected. Go to Vercel → Storage → connect Upstash, then redeploy.' });
  }

  const headers = { Authorization: `Bearer ${TOKEN}` };

  // ── GET: read products ───────────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const r = await fetch(`${BASE}/get/${KEY}`, { headers });
      if (!r.ok) return res.status(200).json({ ok: false, products: null });
      const data = await r.json();
      const products = data.result ? JSON.parse(data.result) : null;
      return res.status(200).json({ ok: true, products });
    } catch (err) {
      console.error('GET error:', err);
      return res.status(200).json({ ok: false, products: null, error: String(err) });
    }
  }

  // ── POST: save products (admin only) ─────────────────────────────────────────
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
      const value = JSON.stringify(products);
      const r = await fetch(`${BASE}/set/${KEY}`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'text/plain' },
        body: value,
      });
      if (!r.ok) {
        const errText = await r.text();
        return res.status(500).json({ ok: false, error: `Upstash error: ${errText}` });
      }
      const data = await r.json();
      if (data.result === 'OK') return res.status(200).json({ ok: true });
      return res.status(500).json({ ok: false, error: JSON.stringify(data) });
    } catch (err) {
      console.error('SET error:', err);
      return res.status(500).json({ ok: false, error: String(err) });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
