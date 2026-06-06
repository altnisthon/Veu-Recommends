import { useState, useRef, useEffect, useCallback } from "react";

// ─── VEU Logo (base64) ──────────────────────────────────
const VEU_LOGO = "data:image/png;base64,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";


// ─── Product Database (214 products) ────────────────────
const PRODUCTS_DEFAULT = [
  { id: 'sp0', season: 'Spring Bright', c: 'Base', b: "Armani Beauty", n: "Luminous Silk Foundation", s: "4.5 Golden Beige", p: "$90\u2013$110", w: "Sephora SG / Robinsons", l: "https://invl.me/clngldg", no: "Warm golden-beige; high-chroma warm skin needs a glow base not a matte one", trend: "Cloudglow Base 2026", img: '' },
  { id: 'sp1', season: 'Spring Bright', c: 'Base', b: "TirTir", n: "Mask Fit Red Cushion", s: "17N Ivory", p: "$38\u2013$45", w: "Sephora SG / Shopee / YesStyle", l: "https://s.shopee.sg/9ALWfrwFC2", no: "Light warm neutral; SPF40 cushion; best for Spring Bright's light clear skin", trend: "K-Beauty Hybrid 2026", img: '' },
  { id: 'sp2', season: 'Spring Bright', c: 'Base', b: "Clio", n: "Kill Cover Founwear Cushion", s: "01 Porcelain (warm)", p: "$28\u2013$35", w: "Guardian / Watsons / Shopee", l: "https://invl.me/clngldk", no: "Light warm shade; vivid coverage stays clear on Spring Bright skin", trend: "K-Beauty Viral 2026", img: '' },
  { id: 'sp3', season: 'Spring Bright', c: 'Base', b: "Makeup By Mario", n: "SurrealSkin Foundation", s: "2W Warm Light", p: "$65\u2013$75", w: "Sephora SG", l: "https://invl.me/clngldo", no: "Warm light; blurring tech; natural not heavy \u2014 Spring Bright's skin is already radiant", trend: "Skinimalism 2026", img: '' },
  { id: 'sp4', season: 'Spring Bright', c: 'Base', b: "Bior\u00e9 UV", n: "Aqua Rich Tinted Watery Essence SPF50+", s: "Universal Sheer Warm Tint", p: "$20\u2013$28", w: "Guardian / Watsons / Shopee", l: "https://invl.me/clngldu", no: "Replaces foundation on light days; essential for SG climate; no cool grey cast", trend: "SPF-Makeup Hybrid 2026", img: '' },
  { id: 'sp5', season: 'Spring Bright', c: 'Base', b: "\u82b1\u897f\u5b50 Florasis", n: "Perfect Canvas Cushion Foundation Longwear/Hydrating", s: "02 Natural Beige", p: "$22\u2013$30", w: "Shopee", l: "https://s.shopee.sg/8fPG5GVAb1", no: "Budget-friendly; warm neutral; Spring Bright's everyday cushion option", trend: "Accessible C-Beauty 2026", img: '' },
  { id: 'sp6', season: 'Spring Bright', c: 'Concealer', b: "NARS", n: "Radiant Creamy Concealer", s: "Cannelle (warm peach-medium)", p: "$45\u2013$55", w: "Sephora SG / TANGS", l: "https://invl.me/clngle0", no: "Warm peachy-beige; brightens Spring Bright's golden undereye area naturally", trend: "Warm Bright Concealer", img: '' },
  { id: 'sp7', season: 'Spring Bright', c: 'Concealer', b: "Benefit", n: "Boi-ing Cakeless Concealer", s: "4 Warm Light", p: "$42\u2013$52", w: "Sephora SG / TANGS", l: "https://invl.me/clngle3", no: "Flexible formula; warm light tone; no grey cast on Spring Bright", trend: "Clean Warm Cover", img: '' },
  { id: 'sp8', season: 'Spring Bright', c: 'Blush', b: "Rare Beauty", n: "Soft Pinch Liquid Blush", s: "Joy (vivid warm coral)", p: "$38\u2013$45", w: "Sephora SG", l: "https://invl.me/clngle8", no: "Vivid coral \u2014 Spring Bright can carry saturated blush; soaked-in finish", trend: "Emotive Flush 2026", img: '' },
  { id: 'sp9', season: 'Spring Bright', c: 'Blush', b: "Sephora Collection", n: "All-In-One Cream Color Blush", s: "Coral Beach", p: "$75\u2013$90", w: "Sephora SG / Online", l: "https://invl.me/clnglec", no: "Fluid formula; vibrant coral; multi-use cheeks + lips \u2014 Spring Bright efficiency", trend: "Multi-Use Tint 2026", img: '' },
  { id: 'sp10', season: 'Spring Bright', c: 'Blush', b: "HERORANGE", n: "Liquid Blush Stick with Sponge Tip", s: "05 Coral Jelly", p: "$18\u2013$28", w: "Shopee / Olive Young Online", l: "https://s.shopee.sg/4qCXWdUW7M", no: "Transparent water-gel; coral; the high-chroma blush Spring Bright needs", trend: "K-Beauty Viral Blush", img: '' },
  { id: 'sp11', season: 'Spring Bright', c: 'Blush', b: "Patrick Ta", n: "Major Headlines Double-Take Blush", s: "She's Coral", p: "$68\u2013$80", w: "Sephora SG / Online", l: "https://invl.me/clngleg", no: "Cream + powder duo; coral pigment for Spring Bright's vivid cheek", trend: "Intentional Pairing 2026", img: '' },
  { id: 'sp12', season: 'Spring Bright', c: 'Blush', b: "Sephora Collection", n: "Blush & Go", s: "Puff (warm peachy-pink)", p: "$28\u2013$35", w: "Sephora SG / Online", l: "https://invl.me/clnglei", no: "Squeeze tube gel blush; warm peachy; Spring Bright's effortless glow", trend: "Natural Flush 2026", img: '' },
  { id: 'sp13', season: 'Spring Bright', c: 'Highlight', b: "Charlotte Tilbury", n: "Hollywood Flawless Filter", s: "3 (warm light-medium)", p: "$75\u2013$90", w: "Sephora SG / TANGS", l: "", no: "Warm golden glow filter; under or over base; amplifies Spring Bright's natural radiance", trend: "Cloudglow Highlight", img: '' },
  { id: 'sp14', season: 'Spring Bright', c: 'Highlight', b: "Fenty Beauty", n: "Killawatt Freestyle Highlighter Duo", s: "Ginger Binge (warm gold)", p: "$42\u2013$52", w: "Sephora SG", l: "https://invl.me/clnglem", no: "Warm gold metallic; Spring Bright's high-chroma highlight \u2014 vivid and clear", trend: "Warm Gold Highlight", img: '' },
  { id: 'sp15', season: 'Spring Bright', c: 'Eye', b: "Ace Beaut\u00e9", n: "Whimsical Bloom Palette", s: "Full (rusty orange / warm peach / butter yellow)", p: "$45\u2013$60", w: "Online / Shopee", l: "", no: "IPSY 2026 pick; warm botanical brights; Spring Bright can wear vivid warm eye looks", trend: "Expressive Colour 2026", img: '' },
  { id: 'sp16', season: 'Spring Bright', c: 'Eye', b: "3CE", n: "Multi Eye Color Palette", s: "Soft Petal (clear warm nudes)", p: "$38\u2013$48", w: "Watsons", l: "https://invl.me/clngleq", no: "Clear warm nudes for Spring Bright's everyday; satin pairs with bright lip", trend: "K-Beauty Eye 2026", img: '' },
  { id: 'sp17', season: 'Spring Bright', c: 'Eye', b: "Judydoll", n: "Six-Color Eyeshadow Palette", s: "02 Champagne Gold", p: "$15\u2013$22", w: "Shopee / Lazada", l: "https://s.shopee.sg/4LGGwCl73Y", no: "Affordable warm gold glitter; huge on Xiaohongshu; vivid on Spring Bright", trend: "Galactic Metallic 2026", img: '' },
  { id: 'sp18', season: 'Spring Bright', c: 'Eye', b: "NARS", n: "Total Seduction Eyeshadow Stick", s: "Warm Taupe", p: "$35\u2013$42", w: "Sephora SG", l: "https://invl.me/clnglex", no: "1-step warm smoky; blurred grunge effect for Spring Bright's drama moment", trend: "Soft Smoky 2026", img: '' },
  { id: 'sp19', season: 'Spring Bright', c: 'Eye', b: "ICONIC London", n: "Glitter Eyeshadow Glaze Crayon", s: "Nectar (warm gold)", p: "$28\u2013$38", w: "Sephora SG / Online", l: "", no: "Warm gold shimmer on inner corner; Spring Bright's metallic accent", trend: "Galactic Metallic 2026", img: '' },
  { id: 'sp20', season: 'Spring Bright', c: 'Mascara', b: "NARS", n: "Climax Extreme Mascara", s: "Brown-Black", p: "$38\u2013$45", w: "Sephora SG", l: "", no: "Brown-black warms Spring Bright's look; stark black too harsh on clear warm eyes", trend: "Warm Mascara 2026", img: '' },
  { id: 'sp21', season: 'Spring Bright', c: 'Mascara', b: "Shiseido", n: "Controlled Chaos Mascaraink", s: "01 Black Pulse", p: "$38\u2013$48", w: "Tangs / Isetan / Sephora", l: "", no: "Warm black formula; precise Japanese application; pairs with vivid eye look", trend: "Japanese Volume Mascara", img: '' },
  { id: 'sp22', season: 'Spring Bright', c: 'Brow', b: "Anastasia Beverly Hills", n: "Brow Wiz", s: "Caramel / Light Brunette", p: "$38\u2013$48", w: "Sephora SG", l: "", no: "Light-medium warm brown; ABH 2026 comeback; Spring Bright's fluffy brow look", trend: "Bold Brow Return 2026", img: '' },
  { id: 'sp23', season: 'Spring Bright', c: 'Lip', b: "Dior Beauty", n: "Rouge Dior On Stage", s: "028 Actrice (warm vivid coral-red)", p: "$55\u2013$70", w: "Sephora SG", l: "https://invl.me/clnglf1", no: "Vivid coral-red; Spring Bright can carry saturated brights \u2014 this is the season's bold lip", trend: "Statement Saturated 2026", img: '' },
  { id: 'sp24', season: 'Spring Bright', c: 'Lip', b: "MAC Cosmetics", n: "Lustreglass Sheer-Shine Lipstick", s: "Dial Up Warmth (warm peach gloss)", p: "$32\u2013$42", w: "MAC / Sephora", l: "https://invl.me/clnglf7", no: "Warm peachy gloss; Y2K frosted revival; Spring Bright's playful everyday lip", trend: "Y2K Gloss Revival 2026", img: '' },
  { id: 'sp25', season: 'Spring Bright', c: 'Lip', b: "Dior Beauty", n: "Addict Lip Glow Oil", s: "004 Coral", p: "$45\u2013$55", w: "Sephora SG / DFS", l: "https://invl.me/clnglfc", no: "Warm coral tinted oil; Spring Bright's all-day lip with clear vibrancy", trend: "Chameleon Lip Oil 2026", img: '' },
  { id: 'sp26', season: 'Spring Bright', c: 'Lip', b: "Romand", n: "Juicy Lasting Tint", s: "04 Coral Sunrise", p: "$15\u2013$22", w: "Shopee", l: "https://s.shopee.sg/6feBiwviY6", no: "Vivid warm coral tint; K-beauty staple; Spring Bright's accessible lip", trend: "K-Beauty Vivid Tint 2026", img: '' },
  { id: 'sp27', season: 'Spring Bright', c: 'Lip', b: "Romand", n: "Juicy Lasting Tint", s: "Warm Coral Gold Iridescent", p: "$22\u2013$32", w: "Shopee", l: "https://s.shopee.sg/6feBiwviY7", no: "Warm gold shimmer gloss; Spring Bright's iridescent trend pick", trend: "Iridescent Lip 2026", img: '' },
  { id: 'sp28', season: 'Spring Bright', c: 'Lip', b: "Peripera", n: "Water Bare Tint", s: "CR701 Coral Petal", p: "$12\u2013$18", w: "Shopee / Lazada", l: "https://s.shopee.sg/40dQYFEDlg", no: "Viral Douyin/Xiaohongshu velvet; vivid warm coral; Spring Bright's budget bold", trend: "Affordable Viral Vivid Lip", img: '' },
  { id: 'sp29', season: 'Spring Bright', c: 'Setting', b: "Innisfree", n: "No Sebum Mineral Powder", s: "\u2014", p: "$18\u2013$25", w: "Watsons / Guardian / Shopee", l: "", no: "Controls oil without dullness; doesn't cool down Spring Bright's warm glow", trend: "K-Beauty Setting Staple", img: '' },
  { id: 'sp30', season: 'Spring Bright', c: 'Setting', b: "Charlotte Tilbury", n: "Airbrush Flawless Finish Powder", s: "2 Medium", p: "$60\u2013$75", w: "Sephora SG / TANGS", l: "", no: "Micro-fine; sets without flattening Spring Bright's natural radiance", trend: "Glow-Lock Setting", img: '' },
  { id: 'sp31', season: 'Spring Light', c: 'Base', b: "Laneige", n: "Water Blank Cushion", s: "21N Natural Beige", p: "$42\u2013$52", w: "Sephora SG / Shopee", l: "https://invl.me/clniebl", no: "Light warm neutral; dewy finish suits Spring Light's soft delicate skin", trend: "K-Beauty Hybrid 2026", img: '' },
  { id: 'sp32', season: 'Spring Light', c: 'Base', b: "Skintific", n: "Cover All Perfect BB Cushion", s: "", p: "$22\u2013$32", w: "Watsons / Shopee", l: "https://invl.me/clnglgx", no: "Sheer warm coverage; Spring Light's skin is naturally fair \u2014 don't over-cover", trend: "K-Beauty SPF Base", img: '' },
  { id: 'sp33', season: 'Spring Light', c: 'Base', b: "Canmake", n: "Mermaid Skin Gel UV SPF50+", s: "01 Clear", p: "$15\u2013$22", w: "Watsons", l: "https://invl.me/clnglgy", no: "Lightweight SPF gel; Spring Light benefits from minimal coverage + SPF protection", trend: "Japanese SPF Base", img: '' },
  { id: 'sp34', season: 'Spring Light', c: 'Base', b: "Huda Beauty", n: "Easy Blur Natural Airbrush Foundation", s: "2W Light Warm", p: "$55\u2013$68", w: "Sephora SG", l: "https://invl.me/clnglh1", no: "Very light warm tint; skin-celebrating; Spring Light's ideal skin-positive base", trend: "Soft Glow Base 2026", img: '' },
  { id: 'sp35', season: 'Spring Light', c: 'Base', b: "Flower Beauty", n: "Light Illusion Concealer (used as tint)", s: "N2 Light Warm", p: "$18\u2013$25", w: "iHerb / Shopee", l: "", no: "Ultra-light warm coverage; budget option for Spring Light's fairness", trend: "Accessible Light Base", img: '' },
  { id: 'sp36', season: 'Spring Light', c: 'Concealer', b: "Excel", n: "Silent Cover Concealer", s: "", p: "$18\u2013$25", w: "Watsons", l: "https://invl.me/clnglh4", no: "Fair warm tone; very accessible; Spring Light's budget concealer", trend: "Warm Light Concealer", img: '' },
  { id: 'sp37', season: 'Spring Light', c: 'Blush', b: "Judydoll", n: "Bare Water Blusher", s: "03 Spring Nap (Blushing Tangerine)", p: "$18\u2013$28", w: "Shopee", l: "https://s.shopee.sg/W3YPYqfHP", no: "Sheer warm peach water-blush; Spring Light needs soft not vivid blush", trend: "Soft Emotive Flush 2026", img: '' },
  { id: 'sp38', season: 'Spring Light', c: 'Blush', b: "Glossier", n: "Cloud Paint", s: "Dusk (soft warm peach)", p: "$28\u2013$35", w: "Sephora SG / Online", l: "", no: "Soft, diffused warm peach; Spring Light's most natural blush expression", trend: "Soft Natural Flush 2026", img: '' },
  { id: 'sp39', season: 'Spring Light', c: 'Blush', b: "Benefit", n: "Dandelion Blush", s: "Baby Pink (warm-leaning)", p: "$48\u2013$58", w: "Sephora SG", l: "https://invl.me/clnglh9", no: "Cult soft pink with warm shimmer; gentle on Spring Light's fair delicacy", trend: "Classic Soft Warm Blush", img: '' },
  { id: 'sp40', season: 'Spring Light', c: 'Blush', b: "Flower Knows", n: "Strawberry Rococo Blush", s: "01 Peach Parfait", p: "$22\u2013$32", w: "Shopee", l: "https://s.shopee.sg/5VSEL8C5KO", no: "Soft peach; Xiaohongshu viral packaging; Spring Light's pretty daily blush", trend: "K-Beauty Artistry Style", img: '' },
  { id: 'sp41', season: 'Spring Light', c: 'Blush', b: "3CE", n: "Blush", s: "Peach Splash", p: "$28\u2013$38", w: "Watsons", l: "https://invl.me/clnglfr", no: "Soft warm peach powder; Spring Light's everyday cheek colour", trend: "K-Beauty Soft Blush", img: '' },
  { id: 'sp42', season: 'Spring Light', c: 'Highlight', b: "Becca", n: "Shimmering Skin Perfector", s: "Champagne Pop (warm gold)", p: "$42\u2013$55", w: "Sephora SG", l: "https://invl.me/clnglfu", no: "Soft warm gold; Spring Light needs a delicate not overpowering highlight", trend: "Soft Warm Glow", img: '' },
  { id: 'sp43', season: 'Spring Light', c: 'Eye', b: "Urban Decay", n: "Naked 1 Palette", s: "Full (warm nudes)", p: "$65\u2013$80", w: "Sephora SG", l: "", no: "All warm neutral tones; Spring Light's go-to for soft everyday warm eye", trend: "Warm Neutral Eye", img: '' },
  { id: 'sp44', season: 'Spring Light', c: 'Eye', b: "Peripera", n: "All Take Mood Palette", s: "01 Whisper of Spring Coral", p: "$38\u2013$50", w: "Watsons", l: "https://invl.me/clnglfz", no: "Soft warm nudes by Korean MUA Pony; Spring Light's perfect daily palette", trend: "K-Beauty Soft Eye", img: '' },
  { id: 'sp45', season: 'Spring Light', c: 'Eye', b: "ZEESEA", n: "9-Color Eyeshadow Palette", s: "grapefruit Plate", p: "$18\u2013$28", w: "Shopee", l: "https://s.shopee.sg/4Awql1QLUI", no: "Soft warm gold tones; Spring Light's version of the galactic metallic trend", trend: "Viral Chinese Palette", img: '' },
  { id: 'sp46', season: 'Spring Light', c: 'Eye', b: "MAC Cosmetics", n: "Technakohl Liner", s: "Bronzed (warm brown)", p: "$28\u2013$35", w: "MAC / Sephora", l: "", no: "Warm brown kohl; Spring Light avoids black liner \u2014 too harsh on fair delicate eyes", trend: "Warm Brown Liner", img: '' },
  { id: 'sp47', season: 'Spring Light', c: 'Mascara', b: "Benefit", n: "Roller Lash Mascara", s: "Brown-Black", p: "$42\u2013$52", w: "Sephora SG / TANGS", l: "", no: "Curling; brown-black is softer than black for Spring Light's gentle look", trend: "Soft Volume 2026", img: '' },
  { id: 'sp48', season: 'Spring Light', c: 'Brow', b: "3CE", n: "Eyebrow Pencil", s: "01 Light Brown", p: "$18\u2013$25", w: "Sephora / Shopee", l: "", no: "Light warm brown; Spring Light's brows should be soft, not defined too strongly", trend: "Soft Warm Brow", img: '' },
  { id: 'sp49', season: 'Spring Light', c: 'Brow', b: "Kate", n: "Designing Eyebrow 3D", s: "EX-5 Natural Brown (warm)", p: "$12\u2013$18", w: "Watsons / Shopee", l: "", no: "Natural warm brown; Japanese precision; very accessible SG", trend: "Affordable Japanese Brow", img: '' },
  { id: 'sp50', season: 'Spring Light', c: 'Lip', b: "Charlotte Tilbury", n: "Matte Revolution", s: "Very Victoria (warm peachy nude)", p: "$48\u2013$60", w: "Sephora SG", l: "https://invl.me/clnglgc", no: "Peachy warm nude; Spring Light's signature lip \u2014 never too vivid or too cool", trend: "Soft Warm Nude Lip", img: '' },
  { id: 'sp51', season: 'Spring Light', c: 'Lip', b: "Romand", n: "Glasting Water Gloss", s: "01 Sanho Crush (warm peach)", p: "$15\u2013$22", w: "Shopee / Olive Young Online", l: "", no: "Glass-like warm peach; Spring Light's lip should be soft and dewy, not bold", trend: "Glass Lip 2026", img: '' },
  { id: 'sp52', season: 'Spring Light', c: 'Lip', b: "MAC Cosmetics", n: "Glow Play Tendertalk Lip Balm", s: "Introvert", p: "$32\u2013$42", w: "MAC / Sephora", l: "https://invl.me/clnglgk", no: "Warm peachy satin; Spring Light's go-to everyday lip colour", trend: "Soft Warm Satin Lip", img: '' },
  { id: 'sp53', season: 'Spring Light', c: 'Lip', b: "Flower Knows", n: "Shell's Jewel Collection Nourishing Lip Glaze", s: "P09 Coral Conch", p: "$10\u2013$16", w: "Shopee / Lazada", l: "https://s.shopee.sg/1LcfOY2weV", no: "Affordable Chinese gloss; soft warm peach; Spring Light's budget everyday lip", trend: "Affordable Soft Gloss", img: '' },
  { id: 'sp54', season: 'Spring Light', c: 'Lip', b: "Dior Beauty", n: "Addict Lip Glow Oil", s: "087 Spicy", p: "$45\u2013$55", w: "Sephora SG / DFS", l: "https://invl.me/clnglgt", no: "Warm peachy oil; delicate iridescence suits Spring Light's soft aesthetic", trend: "Chameleon Lip Oil 2026", img: '' },
  { id: 'sp55', season: 'Spring Light', c: 'Setting', b: "Shiseido", n: "Synchro Skin Invisible Silk Pressed Powder", s: "01 Translucent", p: "$58\u2013$72", w: "Tangs / Isetan / Sephora", l: "", no: "Fine powder; no grey cast on warm skin; Spring Light's gentle set", trend: "Japanese Precision Setting", img: '' },
  { id: 'su56', season: 'Summer Light', c: 'Base', b: "ILIA Beauty", n: "True Skin Serum Foundation", s: "SF2 Telluride (cool fair)", p: "$70\u2013$85", w: "Sephora SG / Online", l: "", no: "Cool fair shade; clean ingredients; Summer Light's skin-first 2026 approach", trend: "Clean Longevity 2026", img: '' },
  { id: 'su57', season: 'Summer Light', c: 'Base', b: "Laneige", n: "Water Blank Cushion", s: "21C Cool Ivory", p: "$42\u2013$52", w: "Sephora SG", l: "https://invl.me/clnieqa", no: "Cool-toned ivory; dewy cushion; Summer Light's go-to K-beauty base", trend: "K-Beauty Hybrid 2026", img: '' },
  { id: 'su58', season: 'Summer Light', c: 'Base', b: "Eborian", n: "CC Cream SPF50", s: "Fair (cool)", p: "$35\u2013$48", w: "Sephora SG / Online", l: "", no: "Searches up 50% SS26; cool fair tone; lightweight perfect for Summer Light", trend: "SPF-Makeup Hybrid 2026", img: '' },
  { id: 'su59', season: 'Summer Light', c: 'Base', b: "IPSA", n: "Flow Flesher", s: "100 (cool fair)", p: "$65\u2013$80", w: "Isetan / Tangs", l: "", no: "Cult Japanese base; cool light; Summer Light's Japanese luxury base pick", trend: "Japanese Luminous Base", img: '' },
  { id: 'su60', season: 'Summer Light', c: 'Base', b: "Canmake", n: "Mermaid Skin Gel UV SPF50+", s: "00 Cool Clear", p: "$15\u2013$22", w: "Watsons / Shopee", l: "https://invl.me/clnieca", no: "Cool toned sheer SPF; Summer Light's SG climate essential", trend: "Japanese SPF Base", img: '' },
  { id: 'su61', season: 'Summer Light', c: 'Concealer', b: "NARS", n: "Radiant Creamy Concealer", s: "Vanilla (cool fair)", p: "$45\u2013$55", w: "Sephora SG / TANGS", l: "https://invl.me/clniecl", no: "Cool-neutral fair; Summer Light's undereye brightener without warm pull", trend: "Cool Light Concealer", img: '' },
  { id: 'su62', season: 'Summer Light', c: 'Blush', b: "Rare Beauty", n: "Soft Pinch Liquid Blush", s: "Happy (soft cool rose)", p: "$38\u2013$45", w: "Sephora SG", l: "https://invl.me/clnied0", no: "Soft cool rose; Summer Light's blush should be whisper-light, never vivid", trend: "Soft Emotive Flush 2026", img: '' },
  { id: 'su63', season: 'Summer Light', c: 'Blush', b: "NARS", n: "Afterglow Blush", s: "Dolce Vita (cool soft pink shimmer)", p: "$45\u2013$55", w: "Sephora SG", l: "https://invl.me/clnied1", no: "Soft cool pink shimmer; Summer Light's ethereal glow cheek", trend: "Diffused Luminous 2026", img: '' },
  { id: 'su64', season: 'Summer Light', c: 'Blush', b: "Canmake", n: "Light Cheek Colour", s: "Little Shy Pink", p: "$10\u2013$20", w: "Watsons", l: "https://invl.me/clnied6", no: "Cult Japanese cream; cool sheer rose; Summer Light's skin-blended cheek", trend: "Japanese Cream Blush", img: '' },
  { id: 'su65', season: 'Summer Light', c: 'Blush', b: "Jung Sae Mool", n: "Artist Cushion Blush", s: "Lavender Pink", p: "$32\u2013$42", w: "Shopee", l: "https://s.shopee.sg/9fIHUo1mB7", no: "Cool jelly; refreshing texture; Summer Light's airy skin aesthetic", trend: "Gel Tint 2026", img: '' },
  { id: 'su66', season: 'Summer Light', c: 'Blush', b: "Flower Knows", n: "Strawberry Rococo Blush", s: "G02 Little Cranberry", p: "$30\u2013$40", w: "Shopee", l: "https://s.shopee.sg/5q5YvyVKTI", no: "Soft lavender-pink; Summer Light's most delicate colour expression", trend: "K-Beauty Artistry Style 2026", img: '' },
  { id: 'su67', season: 'Summer Light', c: 'Highlight', b: "Flower Knows", n: "Little Angel Collection", s: "L04 Moonriver", p: "$30\u2013$40", w: "Shopee", l: "https://s.shopee.sg/4VaBLdbuNd", no: "Pearl-cool highlight; Summer Light's icy luminous glow \u2014 never warm gold", trend: "Cool Pearl Highlight", img: '' },
  { id: 'su68', season: 'Summer Light', c: 'Eye', b: "CLIO", n: "Pro Eye Palette Air", s: "17 Mature Hermione", p: "$30-$50", w: "Watsons", l: "https://invl.me/clnieg0", no: "Cool pinks, mauves; Summer Light's signature eye palette \u2014 soft and ethereal", trend: "Soft Pastel Eye 2026", img: '' },
  { id: 'su69', season: 'Summer Light', c: 'Eye', b: "Kanebo", n: "Kate Popping Silhouette Shadow Series", s: "MV-1 Mauve Pop", p: "$18-25", w: "Shopee", l: "https://s.shopee.sg/2qRxN31PDk", no: "Single pan lavender; the 2026 soft purple eye trend; very affordable", trend: "Soft Purple Eye 2026", img: '' },
  { id: 'su70', season: 'Summer Light', c: 'Eye', b: "ZEESEA", n: "9-Color Eyeshadow Palette", s: "Purple Plate", p: "$18\u2013$28", w: "Shopee / Lazada", l: "https://s.shopee.sg/9KfR78vqgW", no: "Cool dusty pink tones; Summer Light's Chinese brand palette pick", trend: "Viral Chinese Palette 2026", img: '' },
  { id: 'su71', season: 'Summer Light', c: 'Eye', b: "Charlotte Tilbury", n: "Rock 'N' Kohl", s: "Smokey Grey (cool)", p: "$38\u2013$48", w: "Sephora SG / TANGS", l: "", no: "Cool grey liner; Summer Light avoids black \u2014 grey is softer and season-correct", trend: "Liner Return 2026", img: '' },
  { id: 'su72', season: 'Summer Light', c: 'Mascara', b: "Shiseido", n: "Full Lash Volume Mascara", s: "01 Black", p: "$38\u2013$48", w: "Tangs / Isetan / Sephora", l: "", no: "Gentle formula; Summer Light's lashes are often light \u2014 volume without harshness", trend: "Japanese Volume Lash", img: '' },
  { id: 'su73', season: 'Summer Light', c: 'Brow', b: "Kate", n: "Designing Eyebrow 3D", s: "EX-4 Ash Brown (cool)", p: "$12\u2013$18", w: "Watsons / Shopee", l: "", no: "Ash brown for cool tones; Summer Light's brows should be soft and cool-toned", trend: "Affordable Cool Brow", img: '' },
  { id: 'su74', season: 'Summer Light', c: 'Lip', b: "Dior Beauty", n: "Addict Lip Glow Oil", s: "001 Pink", p: "$45\u2013$55", w: "Sephora SG", l: "https://invl.me/clniep1", no: "Sheer cool lilac; Summer Light's lip should be airy, not vivid \u2014 this is perfect", trend: "Chameleon Lip Oil 2026", img: '' },
  { id: 'su75', season: 'Summer Light', c: 'Lip', b: "Romand", n: "Glasting Melting Balm", s: "04 Hippie Pink (cool sheer)", p: "$15\u2013$22", w: "Shopee", l: "https://s.shopee.sg/40dup1KZSU", no: "Sheer cool pink balm; Summer Light's go-to daily lip \u2014 nothing too saturated", trend: "Soft Sheer Lip 2026", img: '' },
  { id: 'su76', season: 'Summer Light', c: 'Lip', b: "Jill Stuart", n: "Crystal Bloom Lip Bouquet Serum", s: "2", p: "$48\u2013$60", w: "Sephora SG", l: "https://invl.me/clniep9", no: "Soft cool mauve with lustre; Summer Light's elevated everyday lip", trend: "Soft Mauve Lustre 2026", img: '' },
  { id: 'su77', season: 'Summer Light', c: 'Lip', b: "Hourglass", n: "Phantom Volumizing Glossy Balm", s: "Reveal 90", p: "$60-$70", w: "Sephora", l: "https://invl.me/clniepp", no: "Cool pale pink matte; Summer Light's Japanese brand lip pick", trend: "Japanese Cool Pale Lip", img: '' },
  { id: 'su78', season: 'Summer Light', c: 'Lip', b: "Romand", n: "Glasting Color Gloss | Miffy Edition Lip Gloss", s: "24 Cream Bebe", p: "$12\u2013$18", w: "Shopee", l: "https://s.shopee.sg/1gG0371TMm", no: "Cool pale pink; accessible; Summer Light's budget everyday tint", trend: "Accessible Cool Tint", img: '' },
  { id: 'su79', season: 'Summer Light', c: 'Setting', b: "Innisfree", n: "Blur Powder", s: "#1 Silky (neutral)", p: "$22\u2013$30", w: "Watsons / Guardian / Shopee", l: "", no: "Soft blur effect; lightweight; doesn't add warmth to Summer Light's cool skin", trend: "Skinimalism Setting 2026", img: '' },
  { id: 'su80', season: 'Summer Mute', c: 'Base', b: "Charlotte Tilbury", n: "Airbrush Flawless Foundation", s: "5 Cool (cool medium)", p: "$80\u2013$95", w: "Sephora SG / TANGS", l: "https://invl.me/clnieqg", no: "Cool medium; matte-satin finish suits Summer Mute's sophisticated muted aesthetic", trend: "Precision Muted Base 2026", img: '' },
  { id: 'su81', season: 'Summer Mute', c: 'Base', b: "Chanel Beauty", n: "Les Beiges Healthy Glow Foundation", s: "B30 (cool beige)", p: "$85\u2013$100", w: "Chanel / Sephora", l: "", no: "Cool beige; natural glow without warmth; Summer Mute's elevated base", trend: "Cool Natural Base 2026", img: '' },
  { id: 'su82', season: 'Summer Mute', c: 'Base', b: "Laneige", n: "Neo Cushion Matte", s: "23C Cool", p: "$48\u2013$58", w: "Sephora SG / Shopee", l: "https://invl.me/clnieql", no: "Cool matte cushion; Summer Mute's skin tone benefits from less shine", trend: "K-Beauty Matte 2026", img: '' },
  { id: 'su83', season: 'Summer Mute', c: 'Base', b: "ILIA Beauty", n: "True Skin Serum Foundation", s: "SF3 Kaimu (cool light-med)", p: "$70\u2013$85", w: "Sephora SG / Online", l: "", no: "Clean formula; cool-toned; Summer Mute's wellness-first 2026 approach", trend: "Clean Cool Base 2026", img: '' },
  { id: 'su84', season: 'Summer Mute', c: 'Base', b: "Shu Uemura", n: "Unlimited Fluid Foundation", s: "144 (cool medium)", p: "$75\u2013$90", w: "Tangs / Isetan / Sephora", l: "https://invl.me/clnieqp", no: "Japanese craftsmanship; cool medium; Summer Mute's precision choice", trend: "Japanese Precision Base", img: '' },
  { id: 'su85', season: 'Summer Mute', c: 'Concealer', b: "NARS", n: "Radiant Creamy Concealer", s: "Cafe con Leche (cool medium)", p: "$45\u2013$55", w: "Sephora SG / TANGS", l: "https://invl.me/clniecl", no: "Cool-neutral medium; Summer Mute's natural undereye brightener", trend: "Cool Medium Concealer", img: '' },
  { id: 'su86', season: 'Summer Mute', c: 'Blush', b: "Flower Knows", n: "Little Angel Collection", s: "04 Rose Ashes", p: "$25\u2013$35", w: "Shopee", l: "https://s.shopee.sg/1BJjSurWUh", no: "Muted mauve; Summer Mute's blush must be dusty/muted \u2014 never vivid", trend: "Muted Emotive Flush 2026", img: '' },
  { id: 'su87', season: 'Summer Mute', c: 'Blush', b: "Banila Co.", n: "Romantic Blush Lip & Cheek", s: "04 Flora", p: "$15-$25", w: "Shopee", l: "https://s.shopee.sg/8pjAb63DMF", no: "Dusty cool rose; Summer Mute's signature elevated blush", trend: "Elevated Muted Flush", img: '' },
  { id: 'su88', season: 'Summer Mute', c: 'Blush', b: "NARS", n: "The Multiple", s: "Dolce Vita", p: "$50-$65", w: "Sephora SG", l: "https://invl.me/clniet3", no: "Muted cool pink powder; Summer Mute's everyday cheek colour", trend: "Muted Cool Blush", img: '' },
  { id: 'su89', season: 'Summer Mute', c: 'Blush', b: "3CE", n: "Face Blush", s: "City Mauve", p: "$15\u2013$32", w: "Shopee / Watsons", l: "https://invl.me/clnietl", no: "Cool muted rose; accessible; Summer Mute's Chinese brand pick", trend: "Artistry Style 2026", img: '' },
  { id: 'su90', season: 'Summer Mute', c: 'Blush', b: "Mistine", n: "Thai Milk Curry Blush", s: "07 Iceberry Powder", p: "$10\u2013$20", w: "Sephora SG / Online", l: "", no: "Cool muted rose gel; Summer Mute's refreshing cheek for SG climate", trend: "Muted Gel Tint 2026", img: '' },
  { id: 'su91', season: 'Summer Mute', c: 'Highlight', b: "Flower Knows", n: "Little Angel Collection Embossed Highlighter", s: "L01 Ero's Fable", p: "$28\u2013$58", w: "Shopee", l: "https://s.shopee.sg/5ApsEzrSYk", no: "Subtle cool rose shimmer; Summer Mute's highlight is never blazing \u2014 a soft glow", trend: "Muted Cool Glow", img: '' },
  { id: 'su92', season: 'Summer Mute', c: 'Eye', b: "Flower Knows", n: "Shell's Jewel Collection", s: "01 Moonlight Pearl", p: "$25\u2013$40", w: "Shopee", l: "https://s.shopee.sg/7pqdQ0T8ZV", no: "All cool rose-mauve-grey tones; Summer Mute's definitive everyday palette", trend: "Muted Pastel Eye 2026", img: '' },
  { id: 'su93', season: 'Summer Mute', c: 'Eye', b: "MILLEFEE", n: "Meow Paw Eyeshadow Palette", s: "01 Amaenbo", p: "$25\u2013$35", w: "Watsons", l: "https://invl.me/clnievm", no: "Muted cool pinks and grey-taupes; Summer Mute's romantic eye", trend: "Romantic Diffused 2026", img: '' },
  { id: 'su94', season: 'Summer Mute', c: 'Eye', b: "FLORTTE", n: "Love Yourself 4-Colour Eyeshadow Palette", s: "2", p: "$15\u2013$25", w: "Watsons", l: "https://invl.me/clnievx", no: "Muted cool greys; Summer Mute's smoky eye without drama or brightness", trend: "Muted Cool Smoky Eye", img: '' },
  { id: 'su95', season: 'Summer Mute', c: 'Eye', b: "LAKA", n: "Forever 6 Eye Palette", s: "03 Primrose", p: "$18\u2013$28", w: "Shopee", l: "https://s.shopee.sg/80A3chaPGj", no: "Muted cool tones; affordable Summer Mute palette", trend: "Affordable Cool Palette", img: '' },
  { id: 'su96', season: 'Summer Mute', c: 'Eye', b: "Charlotte Tilbury", n: "Rock 'N' Kohl", s: "Periwinkle Punk (cool muted blue)", p: "$38\u2013$48", w: "Sephora SG / TANGS", l: "", no: "Muted periwinkle liner; Summer Mute's subtle colour liner moment", trend: "Liner Return 2026", img: '' },
  { id: 'su97', season: 'Summer Mute', c: 'Mascara', b: "Shiseido", n: "Controlled Chaos Mascaraink", s: "01 Black Pulse", p: "$38\u2013$48", w: "Tangs / Isetan / Sephora", l: "", no: "Neutral mascara; Summer Mute's lash volume without clumping", trend: "Japanese Volume", img: '' },
  { id: 'su98', season: 'Summer Mute', c: 'Brow', b: "Anastasia Beverly Hills", n: "Brow Wiz", s: "Ash Brown (cool)", p: "$38\u2013$48", w: "Sephora SG", l: "", no: "Ash brown; ABH 2026 comeback; Summer Mute's cool-toned brow", trend: "ABH Cool Brow 2026", img: '' },
  { id: 'su99', season: 'Summer Mute', c: 'Lip', b: "Too Cool For School", n: "Sway Lip Velvet", s: "No.5 Rosy Oat", p: "$12-$25", w: "Shopee", l: "https://s.shopee.sg/W42h1Ppia", no: "THE Summer Mute lip; cool muted mauve \u2014 the 2026 mauve trend is made for this season", trend: "Mauve Comeback 2026", img: '' },
  { id: 'su100', season: 'Summer Mute', c: 'Lip', b: "Romand", n: "New Glasting Color Gloss", s: "23 Cream Haze", p: "$18\u2013$25", w: "Shopee", l: "https://s.shopee.sg/8V6KDrfdvp", no: "Rounded bullet for blurred lip perimeter; Summer Mute's 2026 lip architecture", trend: "Blurred Lip 2026", img: '' },
  { id: 'su101', season: 'Summer Mute', c: 'Lip', b: "BBIA", n: "Glow Tint (MLBB Lip Tint Edition)", s: "11 Nudy Bottle", p: "$11-$20", w: "Shopee", l: "https://s.shopee.sg/9pbhoOWgvM", no: "Sheer cool pink oil; Summer Mute's everyday low-key lip", trend: "Chameleon Lip Oil 2026", img: '' },
  { id: 'su102', season: 'Summer Mute', c: 'Lip', b: "Romand", n: "Blur Fudge Tint", s: "07 Cool Rose Up", p: "$15\u2013$22", w: "Shopee", l: "https://s.shopee.sg/6py6F2VGzo", no: "Muted mauve blur tint; Summer Mute's most season-accurate K-beauty lip", trend: "Blurred Lip K-Beauty 2026", img: '' },
  { id: 'su103', season: 'Summer Mute', c: 'Lip', b: "3CE", n: "Gdrop Glow Gel", s: "Calming", p: "$12\u2013$22", w: "Shopee", l: "https://invl.me/clnieyu", no: "Cool muted pink; accessible one-accent lip for Summer Mute", trend: "Accessible Muted Bold 2026", img: '' },
  { id: 'su104', season: 'Summer Mute', c: 'Lip', b: "Entropy", n: "Charm Tint Glow", s: "C9 Beryl Charm", p: "$12\u2013$23", w: "Shopee", l: "https://s.shopee.sg/8V6KENxVys", no: "Cool dusty pink; Japanese matte formula; Summer Mute's elevated muted lip", trend: "Japanese Muted Lip", img: '' },
  { id: 'su105', season: 'Summer Mute', c: 'Setting', b: "Laura Mercier", n: "Translucent Loose Setting Powder", s: "Translucent (neutral)", p: "$65\u2013$80", w: "Sephora SG / TANGS", l: "", no: "Sets without orange cast or warmth; Summer Mute's professional finish", trend: "Pro Muted Setting", img: '' },
  { id: 'su106', season: 'Summer Mute', c: 'Setting', b: "Shiseido", n: "Synchro Skin Invisible Silk Pressed Powder", s: "02 Translucent (cool)", p: "$58\u2013$72", w: "Tangs / Isetan / Sephora", l: "", no: "No grey or warm cast; summer Mute's precision cool-neutral setting", trend: "Japanese Cool Setting", img: '' },
  { id: 'au107', season: 'Autumn Mute', c: 'Base', b: "Fenty Beauty", n: "Pro Filt'r Soft Matte Foundation", s: "350W (warm medium)", p: "$50\u2013$65", w: "Sephora SG", l: "https://invl.me/clnif05", no: "Warm 350W; matte suits Autumn Mute's earthy muted aesthetic", trend: "Warm Muted Base 2026", img: '' },
  { id: 'au108', season: 'Autumn Mute', c: 'Base', b: "Charlotte Tilbury", n: "Beautiful Skin Foundation", s: "10 Warm (medium-warm)", p: "$75\u2013$90", w: "Sephora SG / TANGS", l: "", no: "Medium warm; skin-like finish; Autumn Mute doesn't want high shine", trend: "Natural Warm Glow", img: '' },
  { id: 'au109', season: 'Autumn Mute', c: 'Base', b: "Huda Beauty", n: "GloWish Multidew Skin Tint", s: "6W Medium Warm", p: "$55\u2013$68", w: "Sephora SG", l: "", no: "Warm medium tint; texture-celebrating; 2026 philosophy aligns with Autumn Mute's natural look", trend: "Skin-Positive Tint 2026", img: '' },
  { id: 'au110', season: 'Autumn Mute', c: 'Base', b: "Bobbi Brown", n: "Skin Long-Wear Weightless Foundation", s: "W-044 Honey Warm", p: "$68\u2013$82", w: "Sephora SG / TANGS", l: "", no: "Honey warm shade; natural finish; Autumn Mute's polished everyday base", trend: "Classic Warm Natural", img: '' },
  { id: 'au111', season: 'Autumn Mute', c: 'Base', b: "Clio", n: "Kill Cover Mesh Glow Cushion", s: "03 Lingerie Warm", p: "$28\u2013$38", w: "Watsons / Shopee", l: "https://invl.me/clnif0j", no: "Warm lingerie tone; muted glow mesh finish suits Autumn Mute's earthy skin", trend: "K-Beauty Warm Cushion", img: '' },
  { id: 'au112', season: 'Autumn Mute', c: 'Base', b: "Canmake", n: "Powder Foundation", s: "PW23 Natural Warm", p: "$18\u2013$28", w: "Watsons / Shopee", l: "https://invl.me/clnif0t", no: "Affordable Japanese warm powder; Autumn Mute's budget base option", trend: "Japanese Accessible Base", img: '' },
  { id: 'au113', season: 'Autumn Mute', c: 'Concealer', b: "NARS", n: "Radiant Creamy Concealer", s: "Amande (warm medium)", p: "$45\u2013$55", w: "Sephora SG / TANGS", l: "https://invl.me/clniecl", no: "Warm medium tone; Autumn Mute's undereye in warm muted harmony", trend: "Warm Medium Concealer", img: '' },
  { id: 'au114', season: 'Autumn Mute', c: 'Blush', b: "Rare Beauty", n: "Soft Pinch Liquid Blush", s: "Virtue", p: "$38\u2013$45", w: "Sephora SG", l: "https://invl.me/clnif1x", no: "Warm terracotta; muted not vivid \u2014 correct for Autumn Mute's low chroma season", trend: "Muted Emotive Flush 2026", img: '' },
  { id: 'au115', season: 'Autumn Mute', c: 'Blush', b: "Patrick Ta", n: "Major Headlines Double-Take", s: "Not Too Much", p: "$60\u2013$72", w: "Sephora SG / TANGS", l: "https://invl.me/clnif1p", no: "Warm terracotta powder duo; buildable earthy flush for Autumn Mute", trend: "Warm Focal Cheek 2026", img: '' },
  { id: 'au116', season: 'Autumn Mute', c: 'Blush', b: "NARS", n: "Blush", s: "900 Behave", p: "$45\u2013$55", w: "Sephora SG", l: "https://invl.me/clnif2b", no: "Warm coral-brick; classic NARS for Autumn Mute's warm cheek", trend: "Warm Earthy Blush", img: '' },
  { id: 'au117', season: 'Autumn Mute', c: 'Blush', b: "Judydoll", n: "Blush Powder", s: "4", p: "$5-$12", w: "Shopee / Watsons", l: "https://invl.me/clnif2m", no: "Affordable viral terracotta; Autumn Mute's budget blush option", trend: "Affordable Terracotta 2026", img: '' },
  { id: 'au118', season: 'Autumn Mute', c: 'Blush', b: "Flower Knows", n: "Strawberry Rococo Blush", s: "01 Angel Chanson", p: "$22\u2013$32", w: "Shopee", l: "https://s.shopee.sg/2LVgtxOpwW", no: "Warm amber-honey tone; Xiaohongshu favourite; Autumn Mute pick", trend: "Warm Artistry Style", img: '' },
  { id: 'au119', season: 'Autumn Mute', c: 'Highlight', b: "Fenty Beauty", n: "Killawatt Freestyle Highlighter Duo", s: "Girl Next Door / Chich Phreak", p: "$55-$65", w: "Sephora SG / TANGS", l: "https://invl.me/clnif2u", no: "Medium warm filter; Autumn Mute's glow is earthy not flashy", trend: "Warm Muted Glow", img: '' },
  { id: 'au120', season: 'Autumn Mute', c: 'Eye', b: "Canmake", n: "Petit Palette Eyes", s: "M01 Maple Mille", p: "$6-$15", w: "Shopee", l: "https://s.shopee.sg/4ftbgWFxgO", no: "Warm rust-amber-sienna; muted warm tones; Autumn Mute's perfect everyday palette", trend: "ABH Revival 2026", img: '' },
  { id: 'au121', season: 'Autumn Mute', c: 'Eye', b: "CLIO", n: "Muse Master Palette", s: "03 Beige Step One", p: "$20\u2013$30", w: "Shopee", l: "https://s.shopee.sg/4VaBUKBIFo", no: "All warm muted tones; Autumn Mute lives in this palette", trend: "Warm Earthy Eye", img: '' },
  { id: 'au122', season: 'Autumn Mute', c: 'Eye', b: "Florasis", n: "Birds of the Phoenix Face Palette", s: "02 Retro Brown", p: "$55-$69", w: "Shopee / Lazada", l: "https://s.shopee.sg/4LGlK6q8zZ", no: "Autumn-inspired warm muted tones; big on Xiaohongshu; season-accurate", trend: "Chinese Autumn Artistry", img: '' },
  { id: 'au123', season: 'Autumn Mute', c: 'Eye', b: "Romand", n: "Better Than Palette", s: "M01 Dry Apple Blossom", p: "$8\u2013$15", w: "Shopee / Olive Young Online", l: "https://s.shopee.sg/110JM8BIVM", no: "Warm nude-butterscotch tones; Autumn Mute's K-beauty palette", trend: "K-Beauty Warm Eye", img: '' },
  { id: 'au124', season: 'Autumn Mute', c: 'Eye', b: "MAC Cosmetics", n: "Technakohl Liner", s: "Bronzed (warm brown)", p: "$28\u2013$35", w: "MAC / Sephora", l: "", no: "Warm brown kohl; Autumn Mute avoids black \u2014 brown is earthy and season-correct", trend: "Warm Liner 2026", img: '' },
  { id: 'au125', season: 'Autumn Mute', c: 'Mascara', b: "Benefit", n: "They're Real Mascara", s: "Black", p: "$42\u2013$52", w: "Sephora SG / TANGS", l: "", no: "Lengthening mascara for Autumn Mute's subtle dramatic look", trend: "Volume Lash", img: '' },
  { id: 'au126', season: 'Autumn Mute', c: 'Brow', b: "Benefit", n: "Precisely My Brow Pencil", s: "03 Warm Light Brown", p: "$42\u2013$52", w: "Sephora SG / TANGS", l: "", no: "Warm light-medium brown; Autumn Mute's brow should be earthy, not dark", trend: "Warm Brow 2026", img: '' },
  { id: 'au127', season: 'Autumn Mute', c: 'Lip', b: "MAC Cosmetics", n: "Matte Lipstick", s: "Taupe", p: "$32\u2013$42", w: "MAC / Sephora", l: "https://invl.me/clnifc0", no: "Warm muted nude; Autumn Mute's most season-correct everyday lip \u2014 earthy, not vivid", trend: "Muted Warm Nude Lip", img: '' },
  { id: 'au128', season: 'Autumn Mute', c: 'Lip', b: "Charlotte Tilbury", n: "Blush Balm Lip Tint", s: "Pillow Talk", p: "$48\u2013$60", w: "Sephora SG / TANGS", l: "https://invl.me/clnifc8", no: "Warm muted rose; Autumn Mute's lip should stay in muted warm territory", trend: "Warm Muted Lip 2026", img: '' },
  { id: 'au129', season: 'Autumn Mute', c: 'Lip', b: "Romand", n: "Zero Velvet Tint", s: "16 Burny Nude", p: "$15\u2013$22", w: "Shopee / Olive Young Online", l: "https://s.shopee.sg/3g14XLP1bW", no: "Warm muted berry velvet; Autumn Mute's Korean lip pick \u2014 earthy depth", trend: "K-Beauty Muted Lip", img: '' },
  { id: 'au130', season: 'Autumn Mute', c: 'Lip', b: "Entropy", n: "Charm Tint Glow", s: "C6 Water Wood Charm", p: "$15\u2013$20", w: "Shopee / Lazada", l: "https://s.shopee.sg/60OzJm3hu4", no: "Earthy terracotta velvet; Autumn Mute's budget everyday lip", trend: "Affordable Muted Warm Lip", img: '' },
  { id: 'au131', season: 'Autumn Mute', c: 'Lip', b: "BBIA", n: "Glow Tint (MLBB Edition Lip Tint)", s: "19 Choco Bottle", p: "$15\u2013$22", w: "Shopee", l: "https://s.shopee.sg/1gG09tywZm", no: "Warm muted terracotta nude; accessible Autumn Mute lip", trend: "Accessible Earthy Lip", img: '' },
  { id: 'au132', season: 'Autumn Mute', c: 'Setting', b: "Hourglass", n: "Veil Translucent Setting Powder", s: "\u2014", p: "$62\u2013$78", w: "Sephora SG / Online", l: "", no: "No orange or cool cast; Autumn Mute's skin stays earthy and natural", trend: "Muted Warm Setting", img: '' },
  { id: 'au133', season: 'Autumn Deep', c: 'Base', b: "Fenty Beauty", n: "Pro Filt'r Soft Matte Foundation", s: "370W (deep warm)", p: "$50\u2013$65", w: "Sephora SG", l: "https://invl.me/clnif05", no: "Best-in-class deep warm shades; matte finish aligns with Autumn Deep's bold 2026 look", trend: "Deep Warm Matte 2026", img: '' },
  { id: 'au134', season: 'Autumn Deep', c: 'Base', b: "NARS", n: "Natural Radiant Longwear Foundation", s: "Syracuse (warm deep)", p: "$68\u2013$80", w: "Sephora SG", l: "https://invl.me/clnife9", no: "Warm deep Syracuse shade; luminous longevity; Autumn Deep's drama base", trend: "Deep Luminous Base", img: '' },
  { id: 'au135', season: 'Autumn Deep', c: 'Base', b: "Huda Beauty", n: "GloWish Multidew Skin Tint", s: "8W Deep Warm", p: "$55\u2013$68", w: "Sephora SG", l: "", no: "Skin-positive formula; warm deep; 2026 texture-embracing philosophy", trend: "Texture-Positive 2026", img: '' },
  { id: 'au136', season: 'Autumn Deep', c: 'Base', b: "Make Up For Ever", n: "HD Skin Foundation", s: "3Y38 (warm deep)", p: "$65\u2013$80", w: "Sephora SG / TANGS", l: "https://invl.me/clnifee", no: "Professional-grade; excellent warm deep shade range", trend: "Pro Deep Warm Base", img: '' },
  { id: 'au137', season: 'Autumn Deep', c: 'Base', b: "Mary Phillips", n: "Sculpt & Glow Face Palette", s: "Universal Warm", p: "$75\u2013$95", w: "Online", l: "", no: "Viral underpainting \u2014 sculpt before foundation; Autumn Deep has striking features to sculpt", trend: "Underpainting 2026", img: '' },
  { id: 'au138', season: 'Autumn Deep', c: 'Concealer', b: "Hourglass", n: "Vanish Airbursh Concealer", s: "Custard (warm deep)", p: "$55-$70", w: "Sephora SG / TANGS", l: "https://invl.me/clnifen", no: "Warm custard tone; brightens Autumn Deep's rich complexion", trend: "Warm Deep Concealer", img: '' },
  { id: 'au139', season: 'Autumn Deep', c: 'Blush', b: "Rare Beauty", n: "Soft Pinch Liquid Blush", s: "Resilience", p: "$38\u2013$45", w: "Sephora SG", l: "https://invl.me/clniff6", no: "Warm brick; Autumn Deep can carry richer, more saturated blush than Autumn Mute", trend: "Deep Emotive Flush 2026", img: '' },
  { id: 'au140', season: 'Autumn Deep', c: 'Blush', b: "Banila Co", n: "Romantic Blush Lip &Cheek", s: "18 Chill Teddy", p: "$15-$25", w: "Shopee / Lazada", l: "https://s.shopee.sg/2qRxYqavKg", no: "Bronze-to-glow duo; the sun-kissed cheek is Autumn Deep's power move", trend: "Bronzed Focal Cheek 2026", img: '' },
  { id: 'au141', season: 'Autumn Deep', c: 'Blush', b: "NAMING", n: "Fluffy Powder Blush", s: "Tender", p: "$15-$23", w: "Shopee / Lazada", l: "https://s.shopee.sg/3LOE9ykTT0", no: "Warm bronze swept high and into temples; Autumn Deep's editorial cheek", trend: "Emotive Sun-Skin 2026", img: '' },
  { id: 'au142', season: 'Autumn Deep', c: 'Blush', b: "Hourglass", n: "Ambient Lighting Blush", s: "Mood Exposure", p: "$68\u2013$82", w: "Sephora SG / Online", l: "https://invl.me/clnifh1", no: "Warm red-toned ambient powder; Autumn Deep's elevated blush pick", trend: "Diffused Warm Depth 2026", img: '' },
  { id: 'au143', season: 'Autumn Deep', c: 'Blush', b: "Judydoll", n: "Blush & Highlight Palette", s: "01 Milky Apricot Melon", p: "$12\u2013$18", w: "Watsons", l: "https://invl.me/clnifhd", no: "Affordable viral sienna blush; Autumn Deep's budget-friendly cheek", trend: "Affordable Warm Deep Blush", img: '' },
  { id: 'au144', season: 'Autumn Deep', c: 'Highlight', b: "Fenty Beauty", n: "Killawatt Highlighter", s: "Ginger Binge / Moscow Mule", p: "$42\u2013$52", w: "Sephora SG", l: "https://invl.me/clnifhs", no: "Copper-gold highlight; Autumn Deep's metallic is copper not gold or silver", trend: "Copper Highlight 2026", img: '' },
  { id: 'au145', season: 'Autumn Deep', c: 'Eye', b: "fwee", n: "More Mood Eyeshadow Palette", s: "01 More Than Nude", p: "$25-$35", w: "Sephora SG / Online", l: "https://s.shopee.sg/LkcarHkpj", no: "ABH 2026 comeback; richest deep warm palette for Autumn Deep's cut crease", trend: "ABH Revival \u00b7 Cut Crease 2026", img: '' },
  { id: 'au146', season: 'Autumn Deep', c: 'Eye', b: "Tom Ford Beauty", n: "Eye Color Quad", s: "27 Evening Attire", p: "$150-$170", w: "Sephora SG / DFS", l: "https://invl.me/clnifir", no: "Premium warm deep quad; Autumn Deep's luxury dramatic eye", trend: "Luxury Deep Eye 2026", img: '' },
  { id: 'au147', season: 'Autumn Deep', c: 'Eye', b: "ZEESEA", n: "9-Color Eyeshadow Palette", s: "Grapefruit Plate", p: "$8-$15", w: "Shopee", l: "https://s.shopee.sg/4LGlMWMQ1D", no: "Ultra-pigmented deep warm; Autumn Deep's maximalist palette pick", trend: "Maximalist Deep Artistry", img: '' },
  { id: 'au148', season: 'Autumn Deep', c: 'Eye', b: "Flower Knows", n: "Swan Ballet Series", s: "01 White Swan", p: "$28\u2013$40", w: "Shopee / Lazada", l: "https://s.shopee.sg/6AiPY21d5g", no: "Xiaohongshu cult; Autumn-inspired deep warm golds for Autumn Deep", trend: "Chinese Luxury Deep Eye", img: '' },
  { id: 'au149', season: 'Autumn Deep', c: 'Eye', b: "MAC Cosmetics", n: "Technakohl Liner", s: "Smoulder (warm black)", p: "$28\u2013$35", w: "MAC / Sephora", l: "", no: "Warm black kohl; Autumn Deep's deep smoky eye starts here", trend: "Bold Liner Return 2026", img: '' },
  { id: 'au150', season: 'Autumn Deep', c: 'Eye', b: "ICONIC London", n: "Glitter Eyeshadow Glaze Crayon", s: "Bronze", p: "$28\u2013$38", w: "Sephora SG / Online", l: "", no: "Bronze metallic crayon; Autumn Deep's galactic metallic is always copper/bronze", trend: "Deep Metallic 2026", img: '' },
  { id: 'au151', season: 'Autumn Deep', c: 'Mascara', b: "Hourglass", n: "Unlocked Instant Extensions Mascara", s: "Black", p: "$52\u2013$65", w: "Sephora SG / Online", l: "", no: "Extension effect; Autumn Deep's bold dramatic eye needs a statement mascara", trend: "Drama Volume 2026", img: '' },
  { id: 'au152', season: 'Autumn Deep', c: 'Brow', b: "Anastasia Beverly Hills", n: "Brow Definer", s: "Deep Brown", p: "$38\u2013$48", w: "Sephora SG", l: "", no: "ABH 2026 comeback; deep warm brown brow for Autumn Deep's bold face", trend: "ABH Bold Brow 2026", img: '' },
  { id: 'au153', season: 'Autumn Deep', c: 'Lip', b: "MAC Cosmetics", n: "Retro Matte Liquid Lipcolour", s: "Topped With Brandy", p: "$35\u2013$45", w: "MAC / Sephora", l: "https://invl.me/clnifkd", no: "Vivid warm brick-red; Autumn Deep can carry saturation \u2014 this is their 2026 bold lip", trend: "Bold Lip Return 2026", img: '' },
  { id: 'au154', season: 'Autumn Deep', c: 'Lip', b: "Dior Beauty", n: "Rouge Dior Forever Liquid Lipstick", s: "626 Forever Famous", p: "$60\u2013$70", w: "Sephora SG / DFS", l: "https://invl.me/clnifko", no: "Oxblood is Autumn Deep's heritage colour \u2014 the 2026 bold lip return is made for them", trend: "Oxblood Statement 2026", img: '' },
  { id: 'au155', season: 'Autumn Deep', c: 'Lip', b: "Flower Knows", n: "Knight Unicorn Collection Glazed Lipstick", s: "U09 Waltz", p: "$25\u2013$35", w: "Shopee", l: "", no: "Warm deep burgundy; Dior's long-wear comfort for Autumn Deep's drama lip", trend: "Intelligent Bold Lip 2026", img: '' },
  { id: 'au156', season: 'Autumn Deep', c: 'Lip', b: "Florasis", n: "Blooming Rouge Love Lock Lipstick", s: "M9213", p: "$35\u2013$48", w: "Shopee / Lazada", l: "https://s.shopee.sg/7pqdXW6IcL", no: "Florasis warm deep; Xiaohongshu cult lipstick; Autumn Deep's Chinese brand pick", trend: "Chinese Luxury Deep Lip", img: '' },
  { id: 'au157', season: 'Autumn Deep', c: 'Lip', b: "Banila Co", n: "Sheer Velvet Veil Tint", s: "RD03 Brick Bake", p: "$15\u2013$22", w: "Shopee", l: "https://s.shopee.sg/3B4nz40cdN", no: "Affordable warm brick nude; Autumn Deep's accessible everyday bold lip", trend: "Accessible Bold Autumn", img: '' },
  { id: 'au158', season: 'Autumn Deep', c: 'Setting', b: "Laura Mercier", n: "Translucent Loose Setting Powder", s: "Translucent Honey", p: "$65\u2013$80", w: "Sephora SG / TANGS", l: "", no: "Warm honey setting; no ash on deep warm skin \u2014 Autumn Deep essential", trend: "Warm Deep Setting", img: '' },
  { id: 'wi159', season: 'Winter Dark', c: 'Base', b: "NARS", n: "Natural Radiant Longwear Foundation", s: "Macao (cool deep)", p: "$68\u2013$80", w: "Sephora SG", l: "https://invl.me/clnife9", no: "Cool deep; luminous longevity; Winter Deep's authority base", trend: "Precision Deep Cool 2026", img: '' },
  { id: 'wi160', season: 'Winter Dark', c: 'Base', b: "Pat McGrath Labs", n: "Skin Fetish Foundation", s: "Deep 45 (cool deep)", p: "$80\u2013$100", w: "Sephora SG / Online", l: "", no: "Pat McGrath = 2026 artistry brand; cool deep perfection for Winter Deep", trend: "Artistry Base 2026", img: '' },
  { id: 'wi161', season: 'Winter Dark', c: 'Base', b: "Fenty Beauty", n: "Pro Filt'r Soft Matte Foundation", s: "490 (deep cool)", p: "$50\u2013$65", w: "Sephora SG", l: "https://invl.me/clnif05", no: "Deep cool 490; matte for Winter Deep's high-contrast clarity", trend: "Deep Cool Matte", img: '' },
  { id: 'wi162', season: 'Winter Dark', c: 'Base', b: "Huda Beauty", n: "#FauxFilter Luminous Matte", s: "Mocha (cool deep)", p: "$60\u2013$75", w: "Sephora SG", l: "", no: "Cool 'Mocha'; full coverage for Winter Deep's dramatic base canvas", trend: "Full Cool Deep Coverage", img: '' },
  { id: 'wi163', season: 'Winter Dark', c: 'Concealer', b: "NARS", n: "Radiant Creamy Concealer", s: "Amande (cool medium-deep)", p: "$45\u2013$55", w: "Sephora SG / TANGS", l: "https://invl.me/clniecl", no: "Cool-neutral deep; brightens without warm pull on Winter Deep's cool skin", trend: "Cool Deep Concealer", img: '' },
  { id: 'wi164', season: 'Winter Dark', c: 'Blush', b: "Lilybyred", n: "Luv Beam Cheek Balm", s: "Cheeky Lavender", p: "$12\u2013$18", w: "Shopee", l: "https://s.shopee.sg/3VheO03Vjz", no: "Vivid cool berry; Winter Deep's high-chroma cheek \u2014 graphic, high-placed", trend: "Bold Cool Cheek 2026", img: '' },
  { id: 'wi165', season: 'Winter Dark', c: 'Blush', b: "fwee", n: "Mellow Dual Blush", s: "MV02 Icy Cupid", p: "$13\u2013$20", w: "Shopee", l: "https://s.shopee.sg/8pjAjzrDPx", no: "Cool deep rose duo; buildable from day to editorial for Winter Deep", trend: "Architectural Cheek 2026", img: '' },
  { id: 'wi166', season: 'Winter Dark', c: 'Blush', b: "NARS", n: "The Multiple", s: "Trance", p: "$55\u2013$65", w: "Sephora SG", l: "https://invl.me/clnifo3", no: "Cool silver-pink shimmer on Winter Deep's high cheekbones \u2014 lit and lifted", trend: "Luminous Cool Cheek 2026", img: '' },
  { id: 'wi167', season: 'Winter Dark', c: 'Blush', b: "Wakemake", n: "Over Blurring Pot Lips & Cheeks", s: "08 Berry Plum", p: "$10\u2013$15", w: "Shopee", l: "https://s.shopee.sg/17mE0Mlsk", no: "Vivid fuchsia; only Winter Deep can carry this with full authority and gravity", trend: "Vivid Statement Blush 2026", img: '' },
  { id: 'wi168', season: 'Winter Dark', c: 'Highlight', b: "Joocyee", n: "The World is My Oyster Collection", s: "D310 Light Sparkle", p: "$12\u2013$18", w: "Shopee", l: "https://s.shopee.sg/7VDn9vUis4", no: "Cool silver; Winter Deep's highlight is always cool \u2014 never gold", trend: "Cool Silver Highlight 2026", img: '' },
  { id: 'wi169', season: 'Winter Dark', c: 'Eye', b: "Flower Knows", n: "Swan Ballet Series", s: "Black Swan", p: "$35\u2013$45", w: "Shopee", l: "https://s.shopee.sg/2Vp7Csq6Qd", no: "Pat McGrath maximalist; deep cool metallics for Winter Deep's drama eye", trend: "Maximalist Deep Artistry 2026", img: '' },
  { id: 'wi170', season: 'Winter Dark', c: 'Eye', b: "CLIO", n: "Muse Master Palette", s: "04 Lilac Talk", p: "$15\u2013$27", w: "Shopee", l: "https://s.shopee.sg/9fIHk846Lj", no: "ABH 2026 comeback; Winter Deep's cut crease palette \u2014 cobalt and deep violet", trend: "Cut Crease Revival 2026", img: '' },
  { id: 'wi171', season: 'Winter Dark', c: 'Eye', b: "Colorgram", n: "Pin Point Eyeshadow Palette", s: "03 Pink+Lavender=Love", p: "$12\u2013$15", w: "Shopee", l: "https://s.shopee.sg/6py6N2kV9x", no: "Bold cool metallics; Winter Deep's dramatic palette", trend: "Deep Cool Drama Eye", img: '' },
  { id: 'wi172', season: 'Winter Dark', c: 'Eye', b: "Romand", n: "Better Than Palette", s: "11 Cheeky Cheeky Garden", p: "$20-$30", w: "Shopee", l: "https://s.shopee.sg/8pjAkrvnhM", no: "Cool silver glitter; Winter Deep's iridescent eye statement \u2014 silver not gold", trend: "Galactic Silver 2026", img: '' },
  { id: 'wi173', season: 'Winter Dark', c: 'Eye', b: "Urban Decay", n: "24/7 Glide-On Eye Pencil", s: "Zero (true black)", p: "$28\u2013$38", w: "Sephora SG", l: "", no: "True black; Winter Deep's liner must be zero warm pull \u2014 this is the one", trend: "True Black Liner 2026", img: '' },
  { id: 'wi174', season: 'Winter Dark', c: 'Eye', b: "Shu Uemura", n: "Drawing Pencil", s: "ME Black", p: "$28\u2013$38", w: "Tangs / Isetan / Sephora", l: "", no: "Japanese precision; true black; Winter Deep's clean dramatic line", trend: "Japanese Precision Liner", img: '' },
  { id: 'wi175', season: 'Winter Dark', c: 'Mascara', b: "Urban Decay", n: "Perversion Mascara", s: "Black", p: "$38\u2013$48", w: "Sephora SG", l: "", no: "True black; Winter Deep's mascara is non-negotiable black \u2014 no brown-black", trend: "True Black Volume 2026", img: '' },
  { id: 'wi176', season: 'Winter Dark', c: 'Mascara', b: "Shu Uemura", n: "Tsuya Wing Mascara", s: "02 Black", p: "$38\u2013$48", w: "Tangs / Isetan", l: "", no: "Sharp black lengthening; Japanese craftsmanship for Winter Deep's precise lash", trend: "Japanese Precision Lash", img: '' },
  { id: 'wi177', season: 'Winter Dark', c: 'Brow', b: "Anastasia Beverly Hills", n: "Brow Definer", s: "Dark Brown / Ebony", p: "$38\u2013$48", w: "Sephora SG", l: "", no: "ABH 2026 comeback; dark cool brown or ebony for Winter Deep's strong brow", trend: "ABH Bold Dark Brow 2026", img: '' },
  { id: 'wi178', season: 'Winter Dark', c: 'Lip', b: "MAC Cosmetics", n: "MACximal Silky Matte Lipstick", s: "Diva", p: "$32\u2013$42", w: "MAC / Sephora", l: "https://invl.me/clniftv", no: "THE cool red \u2014 blue-based; Winter Deep's definitive bold lip; the 2026 true red moment", trend: "The True Red 2026", img: '' },
  { id: 'wi179', season: 'Winter Dark', c: 'Lip', b: "Shiseido", n: "Technosatin Gel Lipstick", s: "424", p: "$48\u2013$52", w: "Sephora SG", l: "https://invl.me/clnifu2", no: "Deep cool plum; Winter Deep's luxury one-accent statement lip", trend: "Luxury Deep Bold Lip 2026", img: '' },
  { id: 'wi180', season: 'Winter Dark', c: 'Lip', b: "Lilybyred", n: "Juicy Liar Water Tint", s: "Blackberry Tequila", p: "$10\u2013$15", w: "Shopee", l: "https://s.shopee.sg/W42pu9MDh", no: "Cool deep berry; Winter Deep's elegant bold lip option", trend: "Cool Deep Berry Lip 2026", img: '' },
  { id: 'wi181', season: 'Winter Dark', c: 'Lip', b: "Florasis", n: "Blooming Rouge Love Lock Lipstick", s: "M1888", p: "$35-$45", w: "Shopee", l: "https://s.shopee.sg/2Vp7DfI9DW", no: "16hr matte; deep cool berry; accessible Winter Deep bold lip", trend: "Accessible Deep Maximalism", img: '' },
  { id: 'wi182', season: 'Winter Dark', c: 'Lip', b: "LAKA", n: "Fruity Glam Tint", s: "179 Diva", p: "$6\u2013$12", w: "Shopee", l: "https://s.shopee.sg/5q5ZBv6LpJ", no: "Cool deep plum velvet; budget Winter Deep lip \u2014 very accessible SG", trend: "K-Beauty Deep Lip 2026", img: '' },
  { id: 'wi183', season: 'Winter Dark', c: 'Setting', b: "Make Up For Ever", n: "HD Skin Setting Spray", s: "\u2014", p: "$35\u2013$48", w: "Sephora SG", l: "", no: "Sets without powdering; Winter Deep's precision finish stays crisp", trend: "Pro Deep Setting", img: '' },
  { id: 'wi184', season: 'Winter Bright', c: 'Base', b: "Giorgio Armani", n: "Luminous Silk Perfect Natural Glow Foundation", s: "6 Medium Cool", p: "$90\u2013$110", w: "Sephora SG", l: "https://invl.me/clniky5", no: "Cool medium; luminous return trend 2026; Winter Bright's crisp luminous base", trend: "Luminous Return 2026", img: '' },
  { id: 'wi185', season: 'Winter Bright', c: 'Base', b: "Charlotte Tilbury", n: "Airbrush Flawless Foundation", s: "", p: "$80\u2013$95", w: "Sephora SG", l: "https://invl.me/clniky8", no: "Cool fair; 24hr wear; Winter Bright's high-contrast base needs precision", trend: "Precision Cool Base 2026", img: '' },
  { id: 'wi186', season: 'Winter Bright', c: 'Base', b: "NARS", n: "Natural Radiant Longwear Foundation", s: "", p: "$68\u2013$85", w: "Sephora SG", l: "https://invl.me/clnikye", no: "Cool fair Alaska; radiant finish; Winter Bright's luminous high-contrast base", trend: "Cool Fair Radiant", img: '' },
  { id: 'wi187', season: 'Winter Bright', c: 'Base', b: "Estee Lauder", n: "Double Wear Stay-in-Place Longwear Matte Foundation", s: "", p: "$75-$82", w: "Sephora SG", l: "https://invl.me/clnikyo", no: "Cool fair Porcelain; full coverage for Winter Bright's vivid makeup canvas", trend: "Cool Fair Full Coverage", img: '' },
  { id: 'wi188', season: 'Winter Bright', c: 'Base', b: "Isamaya Beauty", n: "Industrial Colour Face Transformer", s: "Universal artistry base", p: "$75\u2013$95", w: "Online / Sephora", l: "", no: "Isamaya Ffrench (Off-White 2026 MUA) brand; Winter Bright's artistry pick", trend: "Artistry Base 2026", img: '' },
  { id: 'wi189', season: 'Winter Bright', c: 'Concealer', b: "Charlotte Tilbury", n: "Airbrush Flawless Blur Concealer", s: "", p: "$48\u2013$56", w: "Sephora SG", l: "https://invl.me/clnikyq", no: "Cool shade; skin-like finish; Winter Bright's high-contrast face needs clean brightening", trend: "Cool Concealer 2026", img: '' },
  { id: 'wi190', season: 'Winter Bright', c: 'Blush', b: "Dior", n: "Backstage Rosy Glow Blush", s: "001 Rosy Glow", p: "$60\u2013$72", w: "Sephora SG", l: "https://invl.me/clnikxx", no: "Vivid cool rose; Winter Bright's high-chroma blush \u2014 graphic placement, bold colour", trend: "Vivid Cool Cheek 2026", img: '' },
  { id: 'wi191', season: 'Winter Bright', c: 'Blush', b: "Dasique", n: "Blending Mood Cheek", s: "06 Berry Smoothie", p: "$15-$25", w: "Shopee", l: "https://s.shopee.sg/3Vhfsi9grF", no: "Vivid cool pink; Winter Bright can carry saturated vivid blush placed graphically high", trend: "High-Chroma Cheek 2026", img: '' },
  { id: 'wi192', season: 'Winter Bright', c: 'Blush', b: "NARS", n: "Blush", s: "908 Catch Me", p: "$55\u2013$65", w: "Sephora SG", l: "https://invl.me/clnikzc", no: "Cool silver-pink shimmer; Winter Bright's luminous vivid cheek", trend: "Luminous High-Chroma Cheek", img: '' },
  { id: 'wi193', season: 'Winter Bright', c: 'Blush', b: "Givenchy", n: "Prisme Libre Blush", s: "01 Mousseline Lilas", p: "$70\u2013$85", w: "Sephora SG", l: "https://invl.me/clnikzi", no: "Vivid cool lilac loose powder; Winter Bright's French luxury cheek pick", trend: "French Vivid Blush", img: '' },
  { id: 'wi194', season: 'Winter Bright', c: 'Blush', b: "House of Hur", n: "Moist Ampoule Blusher", s: "07 Pink Rosie", p: "$12\u2013$20", w: "Shopee / Olive Young Online", l: "https://s.shopee.sg/1BJl6iBe67", no: "Cool vivid water blusher; budget-accessible Winter Bright blush", trend: "K-Beauty Vivid Cool Blush", img: '' },
  { id: 'wi195', season: 'Winter Bright', c: 'Highlight', b: "Peripera", n: "Moodlike Highlighter", s: "03 Pink Prism", p: "$10-$15", w: "Shopee", l: "https://s.shopee.sg/2g8YtckMjp", no: "Cool vivid silver; Winter Bright's highlight is always cool and striking \u2014 never warm", trend: "Silver Vivid Highlight 2026", img: '' },
  { id: 'wi196', season: 'Winter Bright', c: 'Eye', b: "Flower Knows", n: "Bunny Garden Collection 6-Cokor Makeup Palette", s: "03 Ruby Berry-Sugar Strawberry", p: "$30-$40", w: "Shopee", l: "https://s.shopee.sg/6AiR4Er0F5", no: "Pat McGrath 2026 artistry; cool metallics for Winter Bright's vivid eye statement", trend: "Maximalist Vivid Eye 2026", img: '' },
  { id: 'wi197', season: 'Winter Bright', c: 'Eye', b: "Anastasia Beverly Hills", n: "Norvina Pro Pigment Vol. 5", s: "", p: "$75\u2013$92", w: "Sephora SG / Online", l: "https://invl.me/clnil0l", no: "ABH 2026 comeback; vivid cool cut crease for Winter Bright \u2014 the season's eye moment", trend: "Cut Crease Revival 2026", img: '' },
  { id: 'wi198', season: 'Winter Bright', c: 'Eye', b: "Etude House", n: "My Little Nut Palette", s: "01 Girly Girl", p: "$25\u2013$35", w: "Shopee", l: "https://s.shopee.sg/1qZRuMts19", no: "Cool neutral tones; Winter Bright's versatile everyday palette", trend: "Cool Neutral Everyday Eye", img: '' },
  { id: 'wi199', season: 'Winter Bright', c: 'Eye', b: "Romand", n: "Better Than Palette", s: "07 Berry Fuchsia Garden", p: "$20\u2013$28", w: "Shopee", l: "https://s.shopee.sg/3VhftiRt1U", no: "Silver holographic; IPSY 2026 pick; Winter Bright's metallic moment \u2014 only cool silver", trend: "Iridescent Statement 2026", img: '' },
  { id: 'wi200', season: 'Winter Bright', c: 'Eye', b: "CLIO", n: "Pro Eye Palette", s: "12 Crystal Paw", p: "$20\u2013$29", w: "Shopee", l: "https://s.shopee.sg/5q5agDW6j1", no: "Cool grey-blue smoky; Winter Bright's everyday dramatic eye", trend: "Cool Smoky Vivid Eye", img: '' },
  { id: 'wi201', season: 'Winter Bright', c: 'Eye', b: "Urban Decay", n: "Perversion 24/7 Liner", s: "Perversion (true black)", p: "$28\u2013$38", w: "Sephora SG", l: "", no: "True black; Winter Bright's graphic liner is always zero-warm true black", trend: "True Black Graphic Liner 2026", img: '' },
  { id: 'wi202', season: 'Winter Bright', c: 'Eye', b: "Shu Uemura", n: "Drawing Pencil", s: "ME Black", p: "$28\u2013$38", w: "Tangs / Isetan", l: "", no: "Japanese precision; true black for Winter Bright's clean vivid line", trend: "Japanese Precision Black", img: '' },
  { id: 'wi203', season: 'Winter Bright', c: 'Mascara', b: "Urban Decay", n: "Perversion Mascara", s: "Black", p: "$38\u2013$48", w: "Sephora SG", l: "", no: "True black volume; Winter Bright's non-negotiable mascara", trend: "True Black Volume 2026", img: '' },
  { id: 'wi204', season: 'Winter Bright', c: 'Mascara', b: "Shiseido", n: "Full Lash Volume Mascara", s: "01 Black", p: "$38\u2013$48", w: "Tangs / Isetan / Sephora", l: "", no: "True black Japanese mascara; precise volume for Winter Bright", trend: "Japanese Lash Volume", img: '' },
  { id: 'wi205', season: 'Winter Bright', c: 'Brow', b: "Anastasia Beverly Hills", n: "Brow Wiz", s: "Taupe (cool fair) / Ash Brown", p: "$38\u2013$48", w: "Sephora SG", l: "", no: "Cool taupe or ash; ABH 2026 comeback; Winter Bright's precise bold brow", trend: "ABH Bold Brow 2026", img: '' },
  { id: 'wi206', season: 'Winter Bright', c: 'Lip', b: "Too Cool For School", n: "Sway Lip Velvet", s: "7 Muted Cherry", p: "$12\u2013$20", w: "Shopee", l: "https://s.shopee.sg/AUrQF2Jttl", no: "BeautyMatter's MAC 2026 comeback pick; the defining vivid cool red of 2026", trend: "The True Red 2026", img: '' },
  { id: 'wi207', season: 'Winter Bright', c: 'Lip', b: "LAKA", n: "Fruity Glam Tint", s: "118 Adore", p: "$8\u2013$12", w: "Shopee", l: "https://s.shopee.sg/50WTh4Ogvo", no: "Vivid cool fuchsia; Winter Bright's maximalist saturated pink lip moment", trend: "Vivid Fuchsia Statement 2026", img: '' },
  { id: 'wi208', season: 'Winter Bright', c: 'Lip', b: "Banila Co", n: "Sheer Velvet Veil Tint", s: "RD01 Love me", p: "$12\u2013$18", w: "Shopee", l: "https://s.shopee.sg/3B4pVnkE9c", no: "Vivid cool red; Winter Bright's clean high-chroma bold lip", trend: "Cool Red Statement 2026", img: '' },
  { id: 'wi209', season: 'Winter Bright', c: 'Lip', b: "Yves Saint Laurent", n: "Loveshine Wet Shine Lipstick", s: "208 Raspberry Shine", p: "$55\u2013$70", w: "Sephora SG", l: "https://invl.me/clnil3g", no: "Blue-based cool red; Dior's vivid classic for Winter Bright's red lip moment", trend: "French Vivid Cool Red 2026", img: '' },
  { id: 'wi210', season: 'Winter Bright', c: 'Lip', b: "3CE", n: "Cashmere Hug Lipstick", s: "03 Your Side", p: "$18\u2013$25", w: "Watsons", l: "https://invl.me/clnil3z", no: "16hr matte; vivid cool plum; Winter Bright's accessible bold lip option", trend: "Accessible Vivid Bold Lip", img: '' },
  { id: 'wi211', season: 'Winter Bright', c: 'Lip', b: "Dinto", n: "Marcus Aurelius Collection Blur-Glowy", s: "256 Carpe Diem", p: "$5\u2013$10", w: "Shopee", l: "https://s.shopee.sg/AUrQFuTVJs", no: "Cool fig-plum velvet; Winter Bright's K-beauty lip \u2014 vivid cool depth", trend: "K-Beauty Winter Vivid Lip", img: '' },
  { id: 'wi212', season: 'Winter Bright', c: 'Lip', b: "CLIO", n: "Water Soda Tint", s: "02 Berry Fizz", p: "$12\u2013$18", w: "Shopee / Watsons", l: "https://invl.me/clnil4k", no: "Budget vivid cool red; great for everyday Winter Bright casual looks", trend: "Affordable Vivid Cool Red", img: '' },
  { id: 'wi213', season: 'Winter Bright', c: 'Setting', b: "Charlotte Tilbury", n: "Airbrush Flawless Finish Micro-Powder", s: "1 Fair (cool)", p: "$60\u2013$75", w: "Sephora SG / TANGS", l: "", no: "Micro-powder; no warm cast; Winter Bright's crisp high-contrast finish", trend: "Cool Precision Setting", img: '' }
];

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

// ─── Product helpers ─────────────────────────────────────
function getProducts() {
  return PRODUCTS_DEFAULT;
}

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
        @keyframes pulse { 0%,100%{opacity:0.25;transform:scale(0.75)} 50%{opacity:1;transform:scale(1)} }
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

Keep responses conversational and warm. Two products at a time max unless asked for more.`;
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

- Recommend 2 products at a time unless the user asks for more.
- If asked about a category with no products, acknowledge warmly and pivot.
- Keep your conversational messages short and warm — save the detail for the product cards.
- Never use em dashes. Never sound corporate or AI-like.`;
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
      ? `hi ${displayName}! i'm VEU, your personal colour consultant. which is your seasonal colour type?`
      : `hi there! i'm VEU, your personal colour consultant. which is your seasonal colour type?`;
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
    setState('chatting');
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
  };

  const restart = () => {
    setSeason(null);
    setState('greeting');
    const displayName = userName !== 'lovely' ? userName : null;
    setMessages([{ role: 'ai', text: displayName ? `welcome back, ${displayName}! pick your season:` : `welcome back! pick your season:` }]);
  };

  const LOOKS = ['Natural & Everyday', 'K-Beauty Glass Skin', 'Glam', 'Office Chic', 'Romantic', 'Bold & Editorial'];

  if (userName === null) return <WelcomeScreen onStart={startChat} />;

  const profile = season ? SEASON_PROFILES[season] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F5', display: 'flex', flexDirection: 'column', fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.25;transform:scale(0.75)} 50%{opacity:1;transform:scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 3px } ::-webkit-scrollbar-track { background: transparent }
        ::-webkit-scrollbar-thumb { background: #EDE8E0; border-radius: 3px }
        textarea { resize: none; }
        textarea::placeholder { color: #C8C0B8; font-size: 12px; letter-spacing: 0.05em; }
        .msg-animate { animation: fadeUp 0.25s ease forwards; }
        .chip-btn:hover { border-color: #932D28 !important; color: #932D28 !important; }
      `}</style>

      {/* Gradient top line */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #154327, #932D28, #d75c61, #f1bab3)', zIndex: 100 }} />

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EDE8E0', padding: '0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 2, zIndex: 50, height: 54 }}>
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
        {state !== 'ended' && state !== 'greeting' && (
          <button onClick={endChat} style={{ background: 'none', border: 'none', fontSize: 9.5, color: '#B0A8A0', cursor: 'pointer', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'inherit', fontWeight: 600, padding: '6px 0' }}>
            end ×
          </button>
        )}
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 20px 20px', maxWidth: 660, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

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

        {/* Quick prompts during chat */}
        {state === 'chatting' && messages.length > 2 && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 4 }}>
            {['show me 2 more', 'what about lips?', 'what about blush?', 'what about eyes?', 'what about base?'].map(q => (
              <Chip key={q} label={q} onClick={() => sendMessage(q)} />
            ))}
          </div>
        )}

        {/* End state */}
        {state === 'ended' && (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={restart}
              style={{ background: 'transparent', color: '#932D28', border: '1px solid #932D28', borderRadius: 2, padding: '11px 28px', fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#932D28'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#932D28'; }}>
              start new chat
            </button>
          </div>
        )}
      </div>

      {/* Input bar */}
      {state !== 'ended' && state !== 'greeting' && (
        <div style={{ background: '#fff', borderTop: '1px solid #EDE8E0', padding: '12px 20px 14px', position: 'sticky', bottom: 0 }}>
          <div style={{ maxWidth: 660, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
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
