import { useState, useEffect, useRef } from "react";
import { PRODUCTS_DEFAULT } from "./products";

// ─── Constants ───────────────────────────────────────────
const SEASONS = [
  'Spring Light','Spring Bright','Summer Light','Summer Mute',
  'Autumn Mute','Autumn Deep','Winter Bright','Winter Dark'
];
const CATEGORIES = ['Base','Concealer','Blush','Highlight','Eye','Mascara','Brow','Lip','Setting'];
const SEASON_EMOJI = {
  'Spring Light':'🌼','Spring Bright':'🌸','Summer Light':'🌊','Summer Mute':'🌫️',
  'Autumn Mute':'🍂','Autumn Deep':'🌰','Winter Bright':'✨','Winter Dark':'❄️'
};

const C = {
  crimson:'#932D28', crimsonLight:'#d75c61', cream:'#FDF8F5',
  border:'#EDE8E0', sand:'#F5F0EB', textDark:'#1a1a1a',
  textMid:'#666', textLight:'#A0988F', textPale:'#C0B8B0',
  green:'#154327',
};

const BASE_INPUT = {
  width:'100%', border:`1px solid ${C.border}`, borderRadius:6,
  padding:'9px 12px', fontSize:12, boxSizing:'border-box',
  outline:'none', color:C.textDark, fontFamily:'inherit',
  background:'#fff', transition:'border-color 0.15s',
};

const emptyProduct = () => ({
  id:'', season:'Spring Light', c:'Lip', b:'', n:'', s:'',
  p:'', w:'', l:'', no:'', img:'', trend:''
});

// ─── Helpers ─────────────────────────────────────────────
function newId(season) {
  const prefix = season.replace(/\s/g,'').slice(0,3).toLowerCase();
  return `${prefix}_${Date.now()}`;
}

// ─── Sub-components ──────────────────────────────────────
function Label({ children, required }) {
  return (
    <div style={{ fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', color:C.textPale, marginBottom:5, fontWeight:700, display:'flex', gap:4 }}>
      {children}{required && <span style={{ color:C.crimson }}>*</span>}
    </div>
  );
}

function Input({ value, onChange, placeholder, style={}, ...rest }) {
  return (
    <input
      value={value} onChange={onChange} placeholder={placeholder}
      style={{ ...BASE_INPUT, ...style }}
      onFocus={e => e.target.style.borderColor = C.crimsonLight}
      onBlur={e => e.target.style.borderColor = C.border}
      {...rest}
    />
  );
}

function Select({ value, onChange, children, style={} }) {
  return (
    <select value={value} onChange={onChange}
      style={{ ...BASE_INPUT, cursor:'pointer', ...style }}
      onFocus={e => e.target.style.borderColor = C.crimsonLight}
      onBlur={e => e.target.style.borderColor = C.border}>
      {children}
    </select>
  );
}

function Tag({ children, color='#EDE8E0', text='#666' }) {
  return (
    <span style={{ background:color, color:text, fontSize:8.5, padding:'2px 7px', borderRadius:3, letterSpacing:'0.08em', fontWeight:700, textTransform:'uppercase', whiteSpace:'nowrap' }}>
      {children}
    </span>
  );
}

// ─── Image URL Preview ───────────────────────────────────
function ImgPreview({ url }) {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [url]);
  if (!url) return (
    <div style={{ width:64, height:64, borderRadius:6, background:C.sand, border:`1px dashed ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <span style={{ fontSize:20, opacity:0.35 }}>📷</span>
    </div>
  );
  if (err) return (
    <div style={{ width:64, height:64, borderRadius:6, background:'#FFF0EE', border:`1px solid #F5C0BC`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <span style={{ fontSize:9, color:C.crimson, textAlign:'center', letterSpacing:'0.04em' }}>URL<br/>error</span>
    </div>
  );
  return (
    <img src={url} alt="preview" onError={() => setErr(true)}
      style={{ width:64, height:64, borderRadius:6, objectFit:'cover', border:`1px solid ${C.border}`, flexShrink:0 }} />
  );
}

// ─── Product Edit Modal ──────────────────────────────────
function ProductModal({ product, onSave, onClose, isNew }) {
  const [form, setForm] = useState({ ...product });
  const [imgInput, setImgInput] = useState(product.img || '');
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canSave = form.b.trim() && form.n.trim() && form.s.trim() && form.season && form.c;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    const payload = { ...form, img: imgInput.trim(), id: form.id || newId(form.season) };
    await onSave(payload);
    setSaving(false);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, padding:16 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:'#fff', borderRadius:12, width:'100%', maxWidth:480, maxHeight:'92vh', overflowY:'auto', boxShadow:'0 8px 40px rgba(0,0,0,0.15)' }}>

        {/* Modal header */}
        <div style={{ padding:'20px 24px 16px', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'#fff', zIndex:10 }}>
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, color:C.crimson, fontWeight:400, letterSpacing:'0.04em' }}>
            {isNew ? 'Add Product' : 'Edit Product'}
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:C.textPale, lineHeight:1, padding:0 }}>×</button>
        </div>

        <div style={{ padding:'20px 24px 24px', display:'flex', flexDirection:'column', gap:14 }}>

          {/* Season + Category row */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <Label required>Season</Label>
              <Select value={form.season} onChange={e => set('season', e.target.value)}>
                {SEASONS.map(s => <option key={s} value={s}>{SEASON_EMOJI[s]} {s}</option>)}
              </Select>
            </div>
            <div>
              <Label required>Category</Label>
              <Select value={form.c} onChange={e => set('c', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
            </div>
          </div>

          {/* Brand */}
          <div>
            <Label required>Brand</Label>
            <Input value={form.b} onChange={e => set('b', e.target.value)} placeholder="e.g. Romand" />
          </div>

          {/* Product Name */}
          <div>
            <Label required>Product Name</Label>
            <Input value={form.n} onChange={e => set('n', e.target.value)} placeholder="e.g. Juicy Lasting Tint" />
          </div>

          {/* Shade */}
          <div>
            <Label required>Shade Name</Label>
            <Input value={form.s} onChange={e => set('s', e.target.value)} placeholder="e.g. 04 Coral Sunrise" />
          </div>

          {/* Price + Where to buy */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <Label>Price (SGD)</Label>
              <Input value={form.p} onChange={e => set('p', e.target.value)} placeholder="$15–$22" />
            </div>
            <div>
              <Label>Where to Buy</Label>
              <Input value={form.w} onChange={e => set('w', e.target.value)} placeholder="Shopee / Sephora" />
            </div>
          </div>

          {/* Shop Link */}
          <div>
            <Label>Affiliate / Shop Link</Label>
            <Input value={form.l} onChange={e => set('l', e.target.value)} placeholder="https://..." />
          </div>

          {/* Image URL — hero field */}
          <div style={{ background:C.sand, borderRadius:8, padding:'14px 16px', border:`1px solid ${C.border}` }}>
            <Label>Product Image URL</Label>
            <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <ImgPreview url={imgInput} />
              <div style={{ flex:1 }}>
                <Input
                  value={imgInput}
                  onChange={e => setImgInput(e.target.value)}
                  placeholder="https://... (right-click product photo → Copy Image Address)"
                  style={{ marginBottom:6 }}
                />
                <div style={{ fontSize:9.5, color:C.textLight, lineHeight:1.6, letterSpacing:'0.02em' }}>
                  Paste a direct image URL. On Sephora/Shopee: right-click the product photo → Copy Image Address.
                </div>
              </div>
            </div>
          </div>

          {/* Why it works */}
          <div>
            <Label>Why It Works (AI Reason)</Label>
            <textarea
              value={form.no} onChange={e => set('no', e.target.value)}
              placeholder="e.g. Warm coral tint; stays vivid on Spring Bright's high-chroma skin"
              rows={2}
              style={{ ...BASE_INPUT, resize:'vertical', lineHeight:1.6 }}
              onFocus={e => e.target.style.borderColor = C.crimsonLight}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>

          {/* Trend tag */}
          <div>
            <Label>Trend Tag 2026</Label>
            <Input value={form.trend||''} onChange={e => set('trend', e.target.value)} placeholder="e.g. K-Beauty Vivid Tint 2026" />
          </div>

          {/* Actions */}
          <div style={{ display:'flex', gap:10, marginTop:4 }}>
            <button onClick={onClose} style={{ flex:1, background:C.sand, border:'none', borderRadius:6, padding:'11px 0', fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:600, color:C.textLight }}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={!canSave || saving}
              style={{ flex:2, background:canSave && !saving ? C.crimson : C.border, color:'#fff', border:'none', borderRadius:6, padding:'11px 0', fontSize:11, cursor:canSave && !saving ? 'pointer' : 'not-allowed', fontFamily:'inherit', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', transition:'background 0.2s' }}>
              {saving ? 'Saving...' : isNew ? 'Add Product' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm ──────────────────────────────────────
function DeleteConfirm({ product, onConfirm, onClose }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:300, padding:16 }}>
      <div style={{ background:'#fff', borderRadius:10, padding:'24px 28px', maxWidth:320, width:'100%', textAlign:'center', boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>
        <div style={{ fontSize:13, fontWeight:700, marginBottom:6, color:C.textDark }}>Remove this product?</div>
        <div style={{ fontSize:11, color:C.textLight, marginBottom:4, letterSpacing:'0.02em' }}>{product.b} — {product.n}</div>
        <div style={{ fontSize:10, color:C.textPale, marginBottom:22, letterSpacing:'0.02em' }}>{product.s}</div>
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={onClose} style={{ flex:1, background:C.sand, border:'none', borderRadius:6, padding:'10px 0', fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:600, color:C.textMid }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex:1, background:C.crimson, border:'none', borderRadius:6, padding:'10px 0', fontSize:11, cursor:'pointer', fontFamily:'inherit', fontWeight:700, color:'#fff' }}>Remove</button>
        </div>
      </div>
    </div>
  );
}

// ─── Product Row ─────────────────────────────────────────
function ProductRow({ product, onEdit, onDelete }) {
  return (
    <div style={{ display:'flex', gap:12, alignItems:'center', padding:'10px 0', borderBottom:`1px solid ${C.border}` }}>
      {/* Image */}
      <div style={{ width:44, height:44, borderRadius:5, background:C.sand, flexShrink:0, overflow:'hidden', border:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
        {product.img
          ? <img src={product.img} alt={product.n} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => e.target.style.display='none'} />
          : <span style={{ fontSize:16, opacity:0.4 }}>{product.c==='Lip'?'💋':product.c==='Blush'?'🌸':product.c==='Eye'?'👁':'💄'}</span>
        }
      </div>
      {/* Info */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2, flexWrap:'wrap' }}>
          <span style={{ fontSize:11.5, fontWeight:700, color:C.textDark, letterSpacing:'0.02em' }}>{product.b}</span>
          <Tag>{product.c}</Tag>
          {!product.img && <Tag color='#FFF0EE' text={C.crimson}>no image</Tag>}
        </div>
        <div style={{ fontSize:10.5, color:C.textMid, letterSpacing:'0.02em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{product.n} · {product.s}</div>
        {product.p && <div style={{ fontSize:9.5, color:C.textPale, marginTop:1 }}>{product.p} · {product.w}</div>}
      </div>
      {/* Actions */}
      <div style={{ display:'flex', gap:6, flexShrink:0 }}>
        <button onClick={() => onEdit(product)}
          style={{ background:C.sand, border:'none', borderRadius:5, padding:'6px 12px', fontSize:10, cursor:'pointer', fontFamily:'inherit', fontWeight:600, color:C.textMid, letterSpacing:'0.06em' }}>
          Edit
        </button>
        <button onClick={() => onDelete(product)}
          style={{ background:'none', border:`1px solid ${C.border}`, borderRadius:5, padding:'6px 10px', fontSize:13, cursor:'pointer', color:C.textPale, lineHeight:1 }}>
          ×
        </button>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed]       = useState(false);
  const [pwInput, setPwInput]     = useState('');
  const [pwError, setPwError]     = useState(false);
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [syncing, setSyncing]     = useState(false);
  const [syncMsg, setSyncMsg]     = useState('');
  const [activeSeason, setActiveSeason] = useState('All');
  const [searchQ, setSearchQ]     = useState('');
  const [filterNoImg, setFilterNoImg] = useState(false);
  const [modal, setModal]         = useState(null); // null | { mode: 'add'|'edit', product }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const pwRef = useRef();

  useEffect(() => {
    const l = document.createElement('link');
    l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap';
    l.rel = 'stylesheet';
    document.head.appendChild(l);
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/products');
      const data = await r.json();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(PRODUCTS_DEFAULT);
      }
    } catch {
      setProducts(PRODUCTS_DEFAULT);
    }
    setLoading(false);
  };

  const handleAuth = async () => {
    setPwError(false);
    try {
      const r = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwInput })
      });
      const data = await r.json();
      if (data.ok) { setAuthed(true); }
      else { setPwError(true); pwRef.current?.select(); }
    } catch { setPwError(true); }
  };

  const syncToKV = async (list) => {
    setSyncing(true);
    setSyncMsg('');
    try {
      const r = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      });
      if (r.ok) { setSyncMsg('✓ Synced — all users will see changes'); }
      else { setSyncMsg('Sync failed — changes saved locally only'); }
    } catch { setSyncMsg('Sync failed — check connection'); }
    setSyncing(false);
    setTimeout(() => setSyncMsg(''), 4000);
  };

  const handleSave = async (updated) => {
    let next;
    if (modal.mode === 'add') {
      next = [...products, updated];
    } else {
      next = products.map(p => p.id === updated.id ? updated : p);
    }
    setProducts(next);
    setModal(null);
    await syncToKV(next);
  };

  const handleDelete = async () => {
    const next = products.filter(p => p.id !== deleteTarget.id);
    setProducts(next);
    setDeleteTarget(null);
    await syncToKV(next);
  };

  // Filtered view
  const filtered = products.filter(p => {
    if (activeSeason !== 'All' && p.season !== activeSeason) return false;
    if (filterNoImg && p.img) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return p.b?.toLowerCase().includes(q) || p.n?.toLowerCase().includes(q) || p.s?.toLowerCase().includes(q);
    }
    return true;
  });

  const noImgCount = products.filter(p => !p.img).length;
  const seasonCount = s => s === 'All' ? products.length : products.filter(p => p.season === s).length;

  // ── Login screen ──
  if (!authed) {
    return (
      <div style={{ minHeight:'100vh', background:C.cream, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Montserrat', sans-serif", padding:24 }}>
        <div style={{ position:'fixed', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${C.green}, ${C.crimson}, ${C.crimsonLight})` }} />
        <div style={{ width:'100%', maxWidth:340, textAlign:'center' }}>
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:11, letterSpacing:'0.4em', color:C.textLight, textTransform:'uppercase', marginBottom:32 }}>VEU Alchemist · Admin</div>
          <div style={{ background:'#fff', borderRadius:10, padding:'28px 28px 24px', border:`1px solid ${C.border}`, boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize:10, letterSpacing:'0.16em', textTransform:'uppercase', color:C.textPale, marginBottom:14, fontWeight:700 }}>Enter Password</div>
            <input
              ref={pwRef} type="password" value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
              placeholder="password"
              style={{ ...BASE_INPUT, marginBottom:10, textAlign:'center', borderColor: pwError ? C.crimson : C.border }}
              onFocus={e => e.target.style.borderColor = C.crimsonLight}
              onBlur={e => e.target.style.borderColor = pwError ? C.crimson : C.border}
            />
            {pwError && <div style={{ fontSize:10, color:C.crimson, marginBottom:8, letterSpacing:'0.04em' }}>incorrect password</div>}
            <button onClick={handleAuth}
              style={{ width:'100%', background:C.crimson, color:'#fff', border:'none', borderRadius:6, padding:'11px 0', fontSize:10.5, letterSpacing:'0.16em', textTransform:'uppercase', cursor:'pointer', fontWeight:700, fontFamily:'inherit' }}>
              Enter
            </button>
          </div>
        </div>
        <style>{`input::placeholder{color:${C.textPale};}`}</style>
      </div>
    );
  }

  // ── Main admin UI ──
  return (
    <div style={{ minHeight:'100vh', background:C.cream, fontFamily:"'Montserrat', sans-serif" }}>
      <style>{`::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px} input::placeholder,textarea::placeholder{color:${C.textPale};}`}</style>

      <div style={{ position:'fixed', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${C.green}, ${C.crimson}, ${C.crimsonLight})`, zIndex:100 }} />

      {/* Header */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${C.border}`, padding:'0 22px', position:'sticky', top:2, zIndex:50, height:54, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:15, letterSpacing:'0.2em', color:C.crimson, fontWeight:300 }}>VEU ALCHEMIST</div>
          <div style={{ fontSize:9, color:C.textPale, letterSpacing:'0.14em', textTransform:'uppercase', marginTop:1 }}>Product Admin · {products.length} products</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {syncMsg && <span style={{ fontSize:10, color: syncMsg.startsWith('✓') ? C.green : C.crimson, letterSpacing:'0.04em' }}>{syncMsg}</span>}
          {syncing && <span style={{ fontSize:10, color:C.textLight, letterSpacing:'0.04em' }}>syncing...</span>}
          <button onClick={() => setModal({ mode:'add', product: emptyProduct() })}
            style={{ background:C.crimson, color:'#fff', border:'none', borderRadius:5, padding:'8px 16px', fontSize:10, letterSpacing:'0.12em', cursor:'pointer', textTransform:'uppercase', fontWeight:700, fontFamily:'inherit' }}>
            + Add Product
          </button>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'20px 16px' }}>

        {/* Image progress banner */}
        {noImgCount > 0 && (
          <div style={{ background:'#FFF8F0', border:'1px solid #F5D8C0', borderRadius:8, padding:'12px 16px', marginBottom:18, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#8B4A0A', letterSpacing:'0.04em', marginBottom:2 }}>{noImgCount} products missing images</div>
              <div style={{ fontSize:10, color:'#C07040', letterSpacing:'0.02em' }}>Paste image URLs in Edit to fill them in. Right-click any product photo online → Copy Image Address.</div>
            </div>
            <button onClick={() => setFilterNoImg(f => !f)}
              style={{ background: filterNoImg ? '#8B4A0A' : 'transparent', color: filterNoImg ? '#fff' : '#8B4A0A', border:'1px solid #C07040', borderRadius:4, padding:'6px 12px', fontSize:9.5, cursor:'pointer', fontFamily:'inherit', fontWeight:700, letterSpacing:'0.08em', whiteSpace:'nowrap', flexShrink:0 }}>
              {filterNoImg ? 'Show All' : 'Show Missing'}
            </button>
          </div>
        )}

        {/* Filters row */}
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
          {/* Search */}
          <input
            value={searchQ} onChange={e => setSearchQ(e.target.value)}
            placeholder="search brand, product, shade..."
            style={{ ...BASE_INPUT, flex:'1 1 200px', fontSize:11 }}
            onFocus={e => e.target.style.borderColor = C.crimsonLight}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <div style={{ fontSize:10, color:C.textLight, letterSpacing:'0.04em', flexShrink:0 }}>
            {filtered.length} shown
          </div>
        </div>

        {/* Season tabs */}
        <div style={{ display:'flex', overflowX:'auto', gap:0, marginBottom:18, borderBottom:`1px solid ${C.border}`, scrollbarWidth:'none' }}>
          {['All', ...SEASONS].map(s => (
            <button key={s} onClick={() => setActiveSeason(s)}
              style={{ background:'none', border:'none', borderBottom: activeSeason===s ? `2px solid ${C.crimson}` : '2px solid transparent', padding:'9px 13px', fontSize:9.5, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', whiteSpace:'nowrap', color: activeSeason===s ? C.crimson : C.textLight, fontWeight: activeSeason===s ? 700 : 400, fontFamily:'inherit', transition:'all 0.15s', marginBottom:-1 }}>
              {s === 'All' ? 'All' : SEASON_EMOJI[s]} {s} <span style={{ opacity:0.55 }}>({seasonCount(s)})</span>
            </button>
          ))}
        </div>

        {/* Product list */}
        {loading ? (
          <div style={{ textAlign:'center', padding:'48px 0', color:C.textPale, fontSize:12, letterSpacing:'0.08em' }}>Loading products...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'48px 0', color:C.textPale, fontSize:12, letterSpacing:'0.08em' }}>
            {searchQ || filterNoImg ? 'No products match your filters.' : 'No products in this season yet.'}
          </div>
        ) : (
          <div>
            {filtered.map(p => (
              <ProductRow key={p.id} product={p}
                onEdit={p => setModal({ mode:'edit', product:p })}
                onDelete={p => setDeleteTarget(p)} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal && (
        <ProductModal
          product={modal.product}
          isNew={modal.mode === 'add'}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          product={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
