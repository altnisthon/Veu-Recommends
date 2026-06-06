import { useState, useRef, useEffect, useCallback } from "react";
import { PRODUCTS_DEFAULT } from "./products";

// ─── VEU Logo (base64) ──────────────────────────────────
const VEU_LOGO = "data:image/png;base64,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";



// ─── Season Profiles ─────────────────────────────────────
const SEASON_PROFILES = {
  'Spring Bright': { emoji:'🌸', family:'WARM', profile:'Warm · Light · High Chroma', colouring:'Light-medium warm skin, golden/peachy undertone, high colour contrast, bright eyes', direction:'Warm, clear, bright pigments. Avoid anything dusty or muted. Gold metallics over bronze.', best:'Bright coral, warm peach, golden yellow, warm turquoise, clear ivory', avoid:'Cool grey, icy blue, muted/dusty tones, pure black, cool pink' },
  'Spring Light':  { emoji:'🌼', family:'WARM', profile:'Warm · Light · Low-Mid Chroma', colouring:'Fair-light warm skin, peachy-golden undertone, low-medium contrast, soft eye colour', direction:'Soft warm tones only. Nothing too vivid or too dark. Cream formulas over powders.', best:'Warm ivory, soft peach, apricot, light camel, warm blush pink, soft gold, warm cream', avoid:'Saturated brights, cool pinks, grey-based neutrals, stark white, dark colours near face' },
  'Summer Light':  { emoji:'🌊', family:'COOL', profile:'Cool · Light · Low Chroma', colouring:'Fair-light cool skin, pink/bluish undertone, low contrast, light cool eyes', direction:'Icy, soft, cool tones. Light hand. Nothing warm or saturated. Silver metallics.', best:'Powder blue, soft lavender, cool white, light rose, icy pink, pale aqua, cool grey', avoid:'Warm orange, golden yellow, camel, warm beige, warm brown, warm ivory' },
  'Summer Mute':   { emoji:'🌫️', family:'COOL', profile:'Cool · Mid · Low Chroma', colouring:'Light-medium cool skin, pinkish/rosy undertone, medium-low contrast, cool ash tones', direction:'Muted cool tones. Nothing bright or warm. Dusty finishes over shiny. Rose-grey neutrals.', best:'Dusty rose, mauve, slate blue, cool greige, lavender grey, muted plum, cool taupe', avoid:'Warm orange, bright saturated colours, golden yellow, warm brown, stark white' },
  'Autumn Mute':   { emoji:'🍂', family:'WARM', profile:'Warm · Mid · Low Chroma', colouring:'Medium-dark warm skin, golden/olive/peachy undertone, medium contrast, warm eye colour', direction:'Muted warm tones. Earthy and organic. Nothing icy or cool. Bronze metallics.', best:'Olive green, terracotta, warm mustard, camel, warm taupe, burnt sienna, warm khaki', avoid:'Cool pinks, icy blue, bright saturated colours, pure black, stark white, cool grey' },
  'Autumn Deep':   { emoji:'🌰', family:'WARM', profile:'Warm · Deep · Mid-High Chroma', colouring:'Medium-deep warm skin, golden/bronze/olive undertone, high contrast, deep warm eyes', direction:'Rich deep warm pigments. High drama allowed. Deep bronzes and copper metallics.', best:'Oxblood, deep rust, chocolate brown, dark olive, warm black, deep teal (warm), cognac', avoid:'Cool pink, icy blue, lavender, cool grey, pure white, anything icy or pastel' },
  'Winter Dark':   { emoji:'❄️', family:'COOL', profile:'Cool · Deep · Mid-High Chroma', colouring:'Medium-deep cool skin, blue/pink/ash undertone, high contrast, cool deep eyes', direction:'Deep cool pigments. High contrast. Dramatic liner. Cool silver metallics.', best:'Deep navy, cool burgundy, cool black, forest green (cool), deep plum, charcoal cool', avoid:'Warm orange, warm brown, camel, golden yellow, warm red, warm ivory' },
  'Winter Bright': { emoji:'✨', family:'COOL', profile:'Cool · Light-Mid · High Chroma', colouring:'Fair-medium cool skin, blue/pink undertone, very high contrast, clear cool eyes', direction:'Vivid cool pigments. High contrast. True red lips. Silver/chrome metallics.', best:'True cool red, vivid fuchsia, royal blue, icy pink, pure white, cool black, bright violet', avoid:'Warm orange, warm brown, camel, warm ivory, muted tones, earthy colours' },
};

const SEASONS = Object.keys(SEASON_PROFILES);

// ─── Brand colours ───────────────────────────────────────
const C = {
  crimson: '#932D28', crimsonLight: '#d75c61', pinkLight: '#f1bab3', pinkPale: '#f9d9d7',
  green: '#154327', greenMid: '#1F5033', greenLight: '#81a357',
  cream: '#FDF8F5', border: '#EDE8E0', sand: '#e8e3d8',
  textDark: '#1a1a1a', textMid: '#666', textLight: '#A0988F', textPale: '#C0B8B0',
};


// ─── Recommendation Card Generator ───────────────────────
function parseRecommendations(messages) {
  const recs = [];
  messages.forEach(m => {
    if (m.role !== 'ai') return;
    const clean = m.text.replace(/\*\*(.*?)\*\*/g, '$1');
    const lines = clean.split('\n');
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      if (/^Product:/i.test(line)) {
        recs.push({
          product: line.replace(/^Product:\s*/i, ''),
          shade:   (lines[i+1]||'').replace(/^Shade:\s*/i, '').trim(),
          shop:    (lines[i+2]||'').replace(/^Shop:\s*/i, '').trim(),
          reason:  (lines[i+3]||'').replace(/^Reason:\s*/i, '').trim(),
        });
        i += 4;
      } else { i++; }
    }
  });
  return recs;
}

function generateCard(recs, season, userName) {
  const name = userName && userName !== 'lovely' ? userName : null;
  const profile = season ? SEASON_PROFILES[season] : null;
  const date = new Date().toLocaleDateString('en-SG', { day:'numeric', month:'long', year:'numeric' });

  // Parse shop links from "Shop text · [Shop →](url)" format
  const parseShop = (shopStr) => {
    const linkMatch = shopStr.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
    const textPart = shopStr.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '').replace(/·\s*$/, '').trim();
    return { text: textPart, url: linkMatch ? linkMatch[2] : null };
  };

  const recCards = recs.map(r => {
    const shop = parseShop(r.shop);
    return `
      <div class="product-card">
        <div class="product-top">
          <div class="product-name">${r.product}</div>
          ${r.shade ? `<div class="product-shade">${r.shade}</div>` : ''}
        </div>
        ${r.shop ? `<div class="product-shop">
          ${shop.url
            ? `<a href="${shop.url}" target="_blank" rel="noopener noreferrer">${shop.text || 'Shop'} →</a>`
            : `<span>${r.shop}</span>`
          }
        </div>` : ''}
        ${r.reason ? `<div class="product-reason">${r.reason}</div>` : ''}
      </div>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>VEU Alchemist — My Colour Picks${season ? ' · ' + season : ''}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #FDF8F5; font-family: 'Montserrat', sans-serif; color: #1a1a1a; min-height: 100vh; }
  .page { max-width: 680px; margin: 0 auto; padding: 48px 32px 64px; }

  .stripe { height: 3px; background: linear-gradient(90deg, #154327, #932D28, #d75c61, #f1bab3); margin-bottom: 40px; }

  .header { text-align: center; margin-bottom: 36px; }
  .brand { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: #A0988F; margin-bottom: 14px; }
  .title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; line-height: 1.2; color: #1a1a1a; margin-bottom: 8px; }
  .title em { color: #932D28; font-style: italic; }
  .meta { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #C0B8B0; margin-top: 10px; }
  .divider { width: 32px; height: 1px; background: #932D28; margin: 14px auto; }

  .season-tag { display: inline-block; background: #fff; border: 1px solid #EDE8E0; border-left: 3px solid #932D28; padding: 8px 16px; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #932D28; font-weight: 700; margin-bottom: 32px; }

  .section-label { font-size: 8.5px; letter-spacing: 0.22em; text-transform: uppercase; color: #C0B8B0; font-weight: 700; margin-bottom: 14px; }

  .product-card { background: #fff; border: 1px solid #EDE8E0; border-left: 2px solid #932D28; border-radius: 0 8px 8px 0; padding: 14px 18px; margin-bottom: 10px; }
  .product-top { margin-bottom: 6px; }
  .product-name { font-size: 12px; font-weight: 700; color: #1a1a1a; letter-spacing: 0.02em; line-height: 1.4; }
  .product-shade { font-size: 11px; color: #932D28; margin-top: 2px; font-weight: 500; letter-spacing: 0.03em; }
  .product-shop { font-size: 10px; color: #888; margin-bottom: 6px; }
  .product-shop a { color: #932D28; text-decoration: none; border-bottom: 1px solid rgba(147,45,40,0.3); padding-bottom: 1px; }
  .product-shop a:hover { opacity: 0.75; }
  .product-reason { font-size: 10.5px; color: #A0988F; font-style: italic; line-height: 1.6; border-top: 1px solid #F0EBE5; padding-top: 7px; margin-top: 6px; letter-spacing: 0.01em; }

  .footer { margin-top: 48px; text-align: center; border-top: 1px solid #EDE8E0; padding-top: 24px; }
  .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 14px; letter-spacing: 0.2em; color: #932D28; font-weight: 300; text-transform: uppercase; }
  .footer-note { font-size: 9px; color: #C0B8B0; letter-spacing: 0.1em; margin-top: 6px; }
  .footer-link { color: #932D28; text-decoration: none; }

  @media print {
    body { background: #fff; }
    .page { padding: 24px; }
  }
</style>
</head>
<body>
<div class="stripe"></div>
<div class="page">
  <div class="header">
    <div class="brand">VEU Alchemist · Colour Picks</div>
    <h1 class="title">
      ${name ? `${name}'s` : 'my'} colour picks.<br/>
      <em>${season || 'curated for you.'}</em>
    </h1>
    <div class="divider"></div>
    <div class="meta">Generated ${date} · veu-recommends.vercel.app</div>
  </div>

  ${season ? `<div style="text-align:center;margin-bottom:32px"><div class="season-tag">${profile?.emoji || ''} ${season} · ${profile?.profile || ''}</div></div>` : ''}

  <div class="section-label">${recs.length} product${recs.length !== 1 ? 's' : ''} recommended</div>
  ${recCards}

  <div class="footer">
    <div class="footer-brand">VEU Alchemist</div>
    <div class="footer-note">colour analysis · makeup recommendations · <a class="footer-link" href="https://veu-alchemist.com" target="_blank">veu-alchemist.com</a></div>
  </div>
</div>
</body>
</html>`;

  return html;
}

function downloadCard(recs, season, userName) {
  const html = generateCard(recs, season, userName);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `veu-picks${season ? '-' + season.toLowerCase().replace(/\s+/g,'-') : ''}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Product helpers ─────────────────────────────────────
// Runtime product store — starts with defaults, overwritten by KV on load
let _products = PRODUCTS_DEFAULT;
function getProducts() { return _products; }
function setLiveProducts(list) { if (Array.isArray(list) && list.length > 0) _products = list; }

function findProduct(text, season) {
  const products = getProducts();
  const pool = season ? products.filter(p => p.season === season) : products;
  const t = text.toLowerCase();
  // Pass 1: brand + 2 name words
  let match = pool.find(p => {
    const b = p.b.toLowerCase(), n = p.n.toLowerCase();
    const words = n.split(/\s+/).filter(w => w.length > 2);
    return t.includes(b) && words.slice(0,2).every(w => t.includes(w));
  });
  if (match) return match;
  // Pass 2: brand + 1 name word
  match = pool.find(p => {
    const b = p.b.toLowerCase(), n = p.n.toLowerCase();
    const words = n.split(/\s+/).filter(w => w.length > 2);
    return t.includes(b) && words.slice(0,1).every(w => t.includes(w));
  });
  if (match) return match;
  // Pass 3: brand only
  return pool.find(p => t.includes(p.b.toLowerCase()));
}

// ─── RichText renderer ───────────────────────────────────
function renderLine(text) {
  const parts = [];
  let rest = text.replace(/\*\*(.*?)\*\*/g, '$1');
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  let last = 0, m;
  while ((m = linkRe.exec(rest)) !== null) {
    if (m.index > last) parts.push(rest.slice(last, m.index));
    parts.push(<a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer" style={{ color: '#932D28', textDecoration: 'none', borderBottom: '1px solid rgba(147,45,40,0.3)', paddingBottom: 1 }}>{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < rest.length) parts.push(rest.slice(last));
  return parts;
}

function RichText({ text, season }) {
  const clean = text.replace(/\*\*(.*?)\*\*/g, '$1');
  const lines = clean.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line === '---') { i++; continue; }

    if (/^Product:/i.test(line)) {
      const productLine = line.replace(/^Product:\s*/i, '');
      const shadeLine   = (lines[i+1]||'').replace(/^Shade:\s*/i, '');
      const shopLine    = (lines[i+2]||'').replace(/^Shop:\s*/i, '');
      const reasonLine  = (lines[i+3]||'').replace(/^Reason:\s*/i, '');

      const productText = productLine + ' ' + shadeLine;
      const prod = findProduct(productText, season);

      blocks.push(
        <div key={i} style={{ background: '#fff', border: '1px solid #EDE8E0', borderLeft: '2px solid #932D28', borderRadius: '0 8px 8px 0', padding: '14px 16px', marginBottom: 12, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 64, height: 64, borderRadius: 4, background: '#FAF7F4', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EDE8E0' }}>
            {prod?.img
              ? <img src={prod.img} alt={productLine} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 22, opacity: 0.5 }}>{prod?.c === 'Lip' ? '💋' : prod?.c === 'Blush' ? '🌸' : prod?.c === 'Eye' ? '👁' : prod?.c === 'Base' ? '✨' : '💄'}</span>
            }
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1a1a1a', marginBottom: 1, letterSpacing: '0.02em', lineHeight: 1.4 }}>{productLine}</div>
            {shadeLine && <div style={{ fontSize: 10.5, color: '#932D28', marginBottom: 6, letterSpacing: '0.03em', fontWeight: 500 }}>{shadeLine}</div>}
            {shopLine && <div style={{ fontSize: 10, color: '#888', marginBottom: 7, letterSpacing: '0.02em' }}>{renderLine(shopLine)}</div>}
            {reasonLine && (
              <div style={{ fontSize: 10.5, color: '#A0988F', lineHeight: 1.6, paddingTop: 7, borderTop: '1px solid #F0EBE5', fontStyle: 'italic', letterSpacing: '0.01em' }}>
                {reasonLine}
              </div>
            )}
          </div>
        </div>
      );
      i += 4; continue;
    }

    blocks.push(<p key={i} style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.7, color: '#333', letterSpacing: '0.01em' }}>{renderLine(line)}</p>);
    i++;
  }
  return <>{blocks}</>;
}


// ─── Message bubbles ─────────────────────────────────────
function AiMessage({ text, season, loading }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 22 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, border: '1px solid #EDE8E0', padding: 4, boxSizing: 'border-box' }}>
        <img src={VEU_LOGO} alt="VEU" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {loading
          ? <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '10px 0' }}>
              {[0,1,2].map(j => <span key={j} style={{ width: 5, height: 5, borderRadius: '50%', background: '#d75c61', display: 'inline-block', animation: `pulse 1.2s ${j*0.25}s infinite ease-in-out` }} />)}
            </div>
          : <RichText text={text} season={season} />
        }
      </div>
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 22 }}>
      <div style={{ background: '#932D28', color: '#fff', borderRadius: '16px 2px 16px 16px', padding: '10px 16px', maxWidth: '72%', fontSize: 13, lineHeight: 1.6, letterSpacing: '0.01em', fontWeight: 400 }}>
        {text}
      </div>
    </div>
  );
}

function Chip({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ background: 'transparent', color: '#666', border: '1px solid #D8D2CC', borderRadius: 2, padding: '7px 14px', fontSize: 10.5, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap', fontWeight: 500, textTransform: 'uppercase' }}
      onMouseOver={e => { e.currentTarget.style.borderColor = '#932D28'; e.currentTarget.style.color = '#932D28'; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = '#D8D2CC'; e.currentTarget.style.color = '#666'; }}
    >
      {label}
    </button>
  );
}

// ─── Welcome Screen ──────────────────────────────────────
function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('');
  const inputRef = useRef();

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 300); }, []);

  const handleSubmit = () => { onStart(name.trim() || 'lovely'); };
  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F5', display: 'flex', flexDirection: 'column', fontFamily: "'Montserrat', sans-serif", position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background elements */}
      <div style={{ position: 'fixed', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(241,186,179,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(129,163,87,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #154327, #932D28, #d75c61, #f1bab3)', zIndex: 10 }} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', zIndex: 1 }}>

        {/* Logo + brand */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={VEU_LOGO} alt="VEU Alchemist" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#A0988F', fontWeight: 400 }}>VEU ALCHEMIST</div>
        </div>

        {/* Editorial headline */}
        <div style={{ textAlign: 'center', marginBottom: 52, maxWidth: 340 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 300, color: '#1a1a1a', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            colour is everything.
          </h1>
          <div style={{ width: 32, height: 1, background: '#932D28', margin: '0 auto 14px' }} />
          <p style={{ fontSize: 12, color: '#A0988F', lineHeight: 1.8, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, fontWeight: 500 }}>
            personalised makeup · your season
          </p>
        </div>

        {/* Input section */}
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C0B8B0', marginBottom: 10, textAlign: 'center', fontWeight: 600 }}>
            what shall i call you?
          </div>
          <input
            ref={inputRef}
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={handleKey}
            placeholder="name / nickname"
            maxLength={30}
            style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1.5px solid ${name ? '#932D28' : '#D8D2CC'}`, borderRadius: 0, padding: '12px 0', fontSize: 16, boxSizing: 'border-box', outline: 'none', color: '#1a1a1a', fontFamily: "'Cormorant Garamond', serif", transition: 'border-color 0.2s', letterSpacing: '0.05em', textAlign: 'center', fontWeight: 300 }}
            onFocus={e => e.target.style.borderBottomColor = '#932D28'}
            onBlur={e => e.target.style.borderBottomColor = name ? '#932D28' : '#D8D2CC'}
          />
          <button
            onClick={handleSubmit}
            style={{ width: '100%', background: 'transparent', color: '#932D28', border: '1px solid #932D28', borderRadius: 2, padding: '13px 0', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', marginTop: 20, transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.background = '#932D28'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#932D28'; }}
          >
            begin
          </button>
          <p style={{ fontSize: 10, color: '#C8C0B8', letterSpacing: '0.06em', textAlign: 'center', marginTop: 18, lineHeight: 1.6 }}>
            not sure of your season? we'll help you discover it.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '16px 0 20px', fontSize: 9, color: '#C8C0B8', letterSpacing: '0.15em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
        @veu_alchemist
      </div>

      <style>{`
        html,body,#root{overflow:hidden;height:100%} @keyframes pulse { 0%,100%{opacity:0.25;transform:scale(0.75)} 50%{opacity:1;transform:scale(1)} }
        input::placeholder { color: #C8C0B8; font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 0.08em; }
      `}</style>
    </div>
  );
}

// ─── Build system prompt ─────────────────────────────────
// ─── Build system prompt ─────────────────────────────────
function buildSystemPrompt(season, userName) {
  const products = getProducts();
  const name = userName && userName !== 'lovely' ? userName : null;
  const greeting = name ? `The user's name is ${name}. Use their name naturally — occasionally, not every message.` : '';

  if (!season) {
    return `You are VEU, a warm and knowledgeable beauty consultant for VEU Alchemist — a Singapore-based colour analysis brand. ${greeting}

Your personality: You're like a brilliant friend who genuinely knows makeup inside out. Warm, direct, a little editorial. You give real recommendations, not vague advice. You remember context within the conversation.

The user hasn't done a colour analysis yet. You can:
1. Help them discover their season through questions about their skin undertone, eye colour, hair colour, and how they look in warm vs cool colours.
2. Recommend products generally while noting which seasons they suit best.

When recommending products, ALWAYS format each one exactly like this:
Product: [Brand Name] ([price range])
Shade: [Shade Name]
Shop: [Where to buy] · [Shop →](link)
Reason: [One warm, expert sentence on why this shade works]

Keep responses conversational and warm. Three products at a time max unless asked for more.`;
  }

  const profile = SEASON_PROFILES[season];
  const seasonProducts = products.filter(p => p.season === season);
  const productList = seasonProducts.map(p => `[${p.c}] ${p.b} - ${p.n} | Shade: ${p.s} | Price: ${p.p} | Buy: ${p.w}${p.l ? ' | Link: ' + p.l : ''} | Why: ${p.no}`).join('\n');

  return `You are VEU, a warm and knowledgeable beauty consultant for VEU Alchemist — a Singapore-based colour analysis brand. ${greeting}

Your personality: You're like a brilliant friend who genuinely knows colour science and makeup. Warm, direct, occasionally editorial. You give real, confident recommendations. You reference the user's season naturally — not robotically.

THE USER'S SEASON: ${season} ${profile.emoji}
PCCS Profile: ${profile.profile}
Their colouring: ${profile.colouring}
Makeup direction: ${profile.direction}
Best colours: ${profile.best}
Colours to avoid: ${profile.avoid}

CURATED PRODUCT LIST FOR ${season.toUpperCase()}:
${productList}

RULES:
- Only recommend products from the list above. Never invent products.
- If a product has no shop link, omit the link — just write the shop name.
- When a product note (Why) is given, use it to write the Reason — make it sound natural and warm, not clinical.
- Always format each recommendation exactly like this:

Product: [Brand Name] ([price range])
Shade: [Shade Name]
Shop: [Where to buy] · [Shop →](link)
Reason: [One warm, expert sentence on why this suits their ${season} colouring]

- Recommend 3 products at a time unless the user asks for more.
- If asked about a category with no products, acknowledge warmly and pivot.
- Keep your conversational messages short and warm — save the detail for the product cards.
- Never use em dashes. Never sound corporate or AI-like.
- IMPORTANT: Whenever you recommend Base, Foundation, Concealer, or any skin/complexion product, always add a warm one-line disclaimer after the product cards — something like: "just a note — shade recommendations are a starting point. skin tone varies from person to person, so swatch in natural light before buying if you can!" Keep it casual and warm, not clinical.`;
}

// ─── Main App ─────────────────────────────────────────────
export default function App() {
  const [userName, setUserName]   = useState(null);
  const [season, setSeason]       = useState(null);
  const [state, setState]         = useState('greeting');
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const bottomRef = useRef();
  const inputRef  = useRef();

  useEffect(() => {
    const l = document.createElement('link');
    l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap';
    l.rel = 'stylesheet';
    document.head.appendChild(l);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/products');
        const data = await r.json();
        // API returns { ok, products } — use KV data if available
        if (data?.ok && Array.isArray(data.products) && data.products.length > 0) {
          setLiveProducts(data.products);
        }
      } catch {}
    })();
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, loading]);

  const startChat = (name) => {
    setUserName(name);
    const displayName = name !== 'lovely' ? name : null;
    const greeting = displayName
      ? `hi ${displayName}! i'm VEU, your personal colour consultant. which is your seasonal colour type? at the end, you can save a recommendation card with all your picks and links.`
      : `hi there! i'm VEU, your personal colour consultant. which is your seasonal colour type? at the end, you can save a recommendation card with all your picks and links.`;
    setMessages([{ role: 'ai', text: greeting }]);
    setState('greeting');
  };

  const selectSeason = (s) => {
    const displayName = userName !== 'lovely' ? userName : null;
    const profile = SEASON_PROFILES[s];
    const response = displayName
      ? `gorgeous, ${displayName}! ${s} ${profile.emoji} is such a beautiful season. your makeup direction is all about ${profile.direction.toLowerCase()} what look are you going for today?`
      : `gorgeous! ${s} ${profile.emoji} is such a beautiful season. your makeup direction is all about ${profile.direction.toLowerCase()} what look are you going for today?`;
    setSeason(s);
    setMessages(m => [...m, { role: 'user', text: s }, { role: 'ai', text: response }]);
    setState('look');
  };

  const selectNotSure = () => {
    const displayName = userName !== 'lovely' ? userName : null;
    const text = displayName
      ? `no worries at all, ${displayName}! you can [book a colour analysis](https://veu-alchemist.com/services-1) to find your exact season — or i can help you explore some recommendations in the meantime. what would you like?`
      : `no worries at all! you can [book a colour analysis](https://veu-alchemist.com/services-1) to find your exact season — or i can help you explore in the meantime. what would you like?`;
    setMessages(m => [...m, { role: 'user', text: "i'm not sure of my season" }, { role: 'ai', text }]);
    setState('not_sure');
  };

  const selectLook = (look) => {
    setMessages(m => [...m, { role: 'user', text: look }, { role: 'ai', text: `love that! what products are you looking for?` }]);
    setState('picking');
  };

  const selectCategory = (cat) => {
    setState('chatting');
    sendMessage(cat);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);
    setState('chatting');

    const history = [...messages, { role: 'user', text: userMsg }];
    const apiMessages = history.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, system: buildSystemPrompt(season, userName) })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "i'm having a moment — try again?";
      setMessages(m => [...m, { role: 'ai', text: reply }]);
    } catch {
      setMessages(m => [...m, { role: 'ai', text: "something went wrong on my end. try again?" }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const endChat = () => {
    const displayName = userName !== 'lovely' ? userName : null;
    const bye = displayName
      ? `you're going to look amazing, ${displayName}. come back anytime. 🌹`
      : `you're going to look amazing. come back anytime. 🌹`;
    setMessages(m => [...m, { role: 'ai', text: bye }]);
    setState('ended');
    // Auto-trigger card download if any recommendations were made
    const recs = parseRecommendations(messages);
    if (recs.length > 0) {
      setTimeout(() => downloadCard(recs, season, userName), 600);
    }
  };

  const restart = () => {
    setSeason(null);
    setState('greeting');
    const displayName = userName !== 'lovely' ? userName : null;
    setMessages([{ role: 'ai', text: displayName ? `welcome back, ${displayName}! pick your season:` : `welcome back! pick your season:` }]);
  };

  const LOOKS = ['Natural & Everyday', 'K-Beauty Glass Skin', 'Glam', 'Office Chic', 'Romantic', 'Bold & Editorial'];
  const CATEGORIES = ['👁 Eyes', '🌸 Blush', '💋 Lips', '✨ Base & Skin', '💄 Full Look'];

  if (userName === null) return <WelcomeScreen onStart={startChat} />;

  const profile = season ? SEASON_PROFILES[season] : null;

  return (
    <div style={{ background: '#FDF8F5', display: 'flex', flexDirection: 'column', fontFamily: "'Montserrat', sans-serif", overflow: 'hidden', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <style>{`
        html,body,#root{overflow:hidden;height:100%} @keyframes pulse { 0%,100%{opacity:0.25;transform:scale(0.75)} 50%{opacity:1;transform:scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 3px } ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: #EDE8E0; border-radius: 3px }
        textarea { resize: none; }
        textarea::placeholder { color: #C8C0B8; font-size: 12px; letter-spacing: 0.05em; }
        .msg-animate { animation: fadeUp 0.25s ease forwards; }
        .chip-btn:hover { border-color: #932D28 !important; color: #932D28 !important; }
      `}</style>

      {/* Gradient top line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #154327, #932D28, #d75c61, #f1bab3)', flexShrink: 0 }} />

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EDE8E0', padding: '0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50, height: 54, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src={VEU_LOGO} alt="VEU" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: '0.22em', color: '#932D28', fontWeight: 300, lineHeight: 1, textTransform: 'uppercase' }}>VEU Alchemist</div>
            {season
              ? <div style={{ fontSize: 9, color: '#A0988F', letterSpacing: '0.12em', marginTop: 3, textTransform: 'uppercase', fontWeight: 600 }}>{profile?.emoji} {season}</div>
              : <div style={{ fontSize: 9, color: '#C0B8B0', letterSpacing: '0.1em', marginTop: 3, textTransform: 'uppercase' }}>colour consultant</div>
            }
          </div>
        </div>
        {state !== 'ended' && state !== 'greeting' && state !== 'look' && (
          <button onClick={endChat} style={{ background: 'none', border: 'none', fontSize: 9.5, color: '#B0A8A0', cursor: 'pointer', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'inherit', fontWeight: 600, padding: '6px 0' }}>
            end ×
          </button>
        )}
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, WebkitOverflowScrolling: 'touch' }}>
      <div style={{ maxWidth: 660, width: '100%', margin: '0 auto', padding: '28px 20px 80px', boxSizing: 'border-box' }}>

        {messages.map((m, i) => (
          <div key={i} className="msg-animate">
            {m.role === 'ai'
              ? <AiMessage text={m.text} season={season} />
              : <UserMessage text={m.text} />
            }
          </div>
        ))}
        {loading && <AiMessage loading />}
        <div ref={bottomRef} />

        {/* Season picker */}
        {state === 'greeting' && !loading && (
          <div style={{ marginTop: 4, animation: 'fadeUp 0.3s ease forwards' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 7 }}>
              {SEASONS.map(s => (
                <button key={s} onClick={() => selectSeason(s)} className="chip-btn"
                  style={{ background: 'transparent', color: '#555', border: '1px solid #D8D2CC', borderRadius: 2, padding: '7px 13px', fontSize: 10.5, letterSpacing: '0.07em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', whiteSpace: 'nowrap', fontWeight: 500, textTransform: 'uppercase' }}>
                  {SEASON_PROFILES[s].emoji} {s}
                </button>
              ))}
            </div>
            <button onClick={selectNotSure} className="chip-btn"
              style={{ background: 'transparent', color: '#A0988F', border: '1px dashed #C8C0B8', borderRadius: 2, padding: '7px 13px', fontSize: 10, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', fontWeight: 500, textTransform: 'uppercase' }}>
              i'm not sure of my season
            </button>
          </div>
        )}

        {/* Not sure options */}
        {state === 'not_sure' && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
            <Chip label="help me discover my season" onClick={() => sendMessage("can you help me figure out my season?")} />
            <Chip label="browse recommendations anyway" onClick={() => { setState('chatting'); sendMessage("show me some general makeup recommendations"); }} />
          </div>
        )}

        {/* Look picker */}
        {state === 'look' && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
            {LOOKS.map(l => <Chip key={l} label={l} onClick={() => selectLook(l)} />)}
          </div>
        )}

        {/* Product category picker */}
        {state === 'picking' && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
            {CATEGORIES.map(c => <Chip key={c} label={c} onClick={() => selectCategory(c)} />)}
          </div>
        )}

        {/* Quick prompts — only after first recommendations */}
        {state === 'chatting' && messages.filter(m => m.role === 'ai' && m.text.toLowerCase().includes('product:')).length > 0 && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
            <Chip label="show me 3 more" onClick={() => sendMessage('show me 3 more')} />
            <button
              onClick={() => downloadCard(parseRecommendations(messages), season, userName)}
              style={{ background: 'transparent', color: '#154327', border: '1px solid #154327', borderRadius: 2, padding: '7px 14px', fontSize: 10.5, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, textTransform: 'uppercase', transition: 'all 0.15s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#154327'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#154327'; }}>
              ↓ save my picks
            </button>
          </div>
        )}

        {/* End state */}
        {state === 'ended' && (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            {parseRecommendations(messages).length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: '#A0988F', letterSpacing: '0.04em', marginBottom: 10 }}>
                  your picks are ready to save.
                </div>
                <button
                  onClick={() => downloadCard(parseRecommendations(messages), season, userName)}
                  style={{ background: '#154327', color: '#fff', border: 'none', borderRadius: 2, padding: '11px 24px', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, marginBottom: 10, display: 'block', margin: '0 auto 10px' }}>
                  ↓ download my picks
                </button>
              </div>
            )}
            <button onClick={restart}
              style={{ background: 'transparent', color: '#932D28', border: '1px solid #932D28', borderRadius: 2, padding: '11px 28px', fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#932D28'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#932D28'; }}>
              start new chat
            </button>
          </div>
        )}
      </div>
      </div>

      {/* Input bar */}
      {state !== 'ended' && state !== 'greeting' && state !== 'look' && (
        <div style={{ background: '#fff', borderTop: '1px solid #EDE8E0', padding: '12px 20px 14px', flexShrink: 0 }}>
          <div style={{ maxWidth: 660, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'flex-end', width: '100%', boxSizing: 'border-box' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={season ? `ask me anything about your ${season} makeup...` : `ask me anything...`}
              rows={1}
              style={{ flex: 1, border: 'none', borderBottom: `1.5px solid ${input ? '#932D28' : '#D8D2CC'}`, borderRadius: 0, padding: '8px 0', fontSize: 13, outline: 'none', fontFamily: 'inherit', color: '#1a1a1a', background: 'transparent', transition: 'border-color 0.2s', lineHeight: 1.6, maxHeight: 90, overflowY: 'auto', letterSpacing: '0.01em' }}
              onFocus={e => e.target.style.borderBottomColor = '#932D28'}
              onBlur={e => e.target.style.borderBottomColor = input ? '#932D28' : '#D8D2CC'}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{ width: 36, height: 36, borderRadius: '50%', background: input.trim() && !loading ? '#932D28' : '#EDE8E0', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s', marginBottom: 2 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
