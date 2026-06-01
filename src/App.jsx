import { useState, useRef, useEffect, useCallback } from "react";

const LOGO = "data:image/png;base64,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";

// ─── Product Database ─────────────────────────────────────────────────────────
const PRODUCTS_DEFAULT = {
  "Spring Bright": [
    {id:"sb0",c:"Base",b:"Armani Beauty",n:"Luminous Silk Foundation",s:"4.5 Golden Beige",p:"$90–$110",l:"https://invl.me/clngldg",w:"Sephora SG / Robinsons",no:"Warm golden-beige; Spring Bright's skin needs a glow base not a matte one",img:""},
    {id:"sb1",c:"Base",b:"TirTir",n:"Mask Fit Red Cushion",s:"17N Ivory",p:"$38–$45",l:"https://s.shopee.sg/9ALWfrwFC2",w:"Sephora / Shopee",no:"Light warm neutral; SPF40 cushion; best for Spring Bright's light clear skin",img:""},
    {id:"sb2",c:"Base",b:"Clio",n:"Kill Cover Founwear Cushion",s:"01 Porcelain",p:"$28–$35",l:"https://invl.me/clngldk",w:"Guardian / Watsons",no:"Light warm shade; vivid coverage stays clear on Spring Bright skin",img:""},
    {id:"sb3",c:"Blush",b:"Rare Beauty",n:"Soft Pinch Liquid Blush",s:"Joy",p:"$38–$45",l:"https://invl.me/clngle8",w:"Sephora SG",no:"Vivid coral — Spring Bright can carry saturated blush; soaked-in finish",img:""},
    {id:"sb4",c:"Blush",b:"HERORANGE",n:"Liquid Blush Stick with Sponge Tip",s:"05 Coral Jelly",p:"$18–$28",l:"https://s.shopee.sg/4qCXWdUW7M",w:"Shopee",no:"Transparent water-gel; coral; the high-chroma blush Spring Bright needs",img:""},
    {id:"sb5",c:"Blush",b:"Patrick Ta",n:"Major Headlines Double-Take Blush",s:"She's Coral",p:"$68–$80",l:"https://invl.me/clngleg",w:"Sephora SG",no:"Cream + powder duo; coral pigment for Spring Bright's vivid cheek",img:""},
    {id:"sb6",c:"Blush",b:"Sephora Collection",n:"Blush & Go",s:"Puff (warm peachy-pink)",p:"$28–$35",l:"https://invl.me/clnglei",w:"Sephora SG",no:"Squeeze tube gel blush; warm peachy; Spring Bright's effortless glow",img:""},
    {id:"sb7",c:"Eye",b:"3CE",n:"Multi Eye Color Palette",s:"Soft Petal",p:"$38–$48",l:"https://invl.me/clngleq",w:"Watsons",no:"Clear warm nudes for Spring Bright's everyday; satin pairs with bright lip",img:""},
    {id:"sb8",c:"Eye",b:"Judydoll",n:"Six-Color Eyeshadow Palette",s:"02 Champagne Gold",p:"$15–$22",l:"https://s.shopee.sg/4LGGwCl73Y",w:"Shopee / Lazada",no:"Affordable warm gold glitter; huge on Xiaohongshu; vivid on Spring Bright",img:""},
    {id:"sb9",c:"Eye",b:"NARS",n:"Total Seduction Eyeshadow Stick",s:"Warm Taupe",p:"$35–$42",l:"https://invl.me/clnglex",w:"Sephora SG",no:"1-step warm smoky; blurred grunge effect for Spring Bright's drama moment",img:""},
    {id:"sb10",c:"Eye",b:"Ace Beauté",n:"Whimsical Bloom Palette",s:"Full palette",p:"$45–$60",l:"",w:"Shopee / Online",no:"Warm botanical brights; Spring Bright can wear vivid warm eye looks",img:""},
    {id:"sb11",c:"Mascara",b:"NARS",n:"Climax Extreme Mascara",s:"Brown-Black",p:"$38–$45",l:"",w:"Sephora SG",no:"Brown-black warms Spring Bright's look; stark black too harsh on clear warm eyes",img:""},
    {id:"sb12",c:"Brow",b:"Anastasia Beverly Hills",n:"Brow Wiz",s:"Caramel / Light Brunette",p:"$38–$48",l:"",w:"Sephora SG",no:"Light-medium warm brown; ABH 2026 comeback; Spring Bright's fluffy brow look",img:""},
    {id:"sb13",c:"Lip",b:"Dior Beauty",n:"Addict Lip Glow Oil",s:"004 Coral",p:"$45–$55",l:"https://invl.me/clnglfc",w:"Sephora SG / DFS",no:"Warm coral tinted oil; Spring Bright's all-day lip with clear vibrancy",img:""},
    {id:"sb14",c:"Lip",b:"Romand",n:"Juicy Lasting Tint",s:"04 Coral Sunrise",p:"$15–$22",l:"https://s.shopee.sg/6feBiwviY6",w:"Shopee",no:"Vivid warm coral tint; K-beauty staple; Spring Bright's accessible lip",img:""},
    {id:"sb15",c:"Lip",b:"MAC Cosmetics",n:"Lustreglass Sheer-Shine Lipstick",s:"Dial Up Warmth",p:"$32–$42",l:"https://invl.me/clnglf7",w:"MAC / Sephora",no:"Warm peachy gloss; Y2K revival; Spring Bright's playful everyday lip",img:""},
    {id:"sb16",c:"Lip",b:"Peripera",n:"Water Bare Tint",s:"CR701 Coral Petal",p:"$12–$18",l:"https://s.shopee.sg/40dQYFEDlg",w:"Shopee / Lazada",no:"Viral velvet; vivid warm coral; Spring Bright's budget bold lip",img:""},
    {id:"sb17",c:"Lip",b:"Dior Beauty",n:"Rouge Dior On Stage",s:"028 Actrice",p:"$55–$70",l:"https://invl.me/clnglf1",w:"Sephora SG",no:"Vivid coral-red; Spring Bright can carry saturated brights — this is the bold lip",img:""},
    {id:"sb18",c:"Highlight",b:"Charlotte Tilbury",n:"Hollywood Flawless Filter",s:"3 Warm Light",p:"$75–$90",l:"",w:"Sephora SG",no:"Warm golden glow filter; amplifies Spring Bright's natural radiance",img:""},
    {id:"sb19",c:"Highlight",b:"Fenty Beauty",n:"Killawatt Freestyle Highlighter Duo",s:"Ginger Binge",p:"$42–$52",l:"https://invl.me/clnglem",w:"Sephora SG",no:"Warm gold metallic; Spring Bright's high-chroma highlight — vivid and clear",img:""},
  ],
  "Spring Light": [
    {id:"sl0",c:"Base",b:"Laneige",n:"Water Blank Cushion",s:"21N Natural Beige",p:"$42–$52",l:"",w:"Sephora SG / Shopee",no:"Light warm neutral; dewy finish suits Spring Light's soft delicate skin",img:""},
    {id:"sl1",c:"Base",b:"Canmake",n:"Mermaid Skin Gel UV SPF50+",s:"01 Clear",p:"$15–$22",l:"https://invl.me/clnglgy",w:"Watsons",no:"Lightweight SPF gel; Spring Light benefits from minimal coverage + protection",img:""},
    {id:"sl2",c:"Base",b:"Huda Beauty",n:"Easy Blur Natural Airbrush Foundation",s:"2W Light Warm",p:"$55–$68",l:"https://invl.me/clnglh1",w:"Sephora SG",no:"Very light warm tint; skin-celebrating; Spring Light's ideal skin-positive base",img:""},
    {id:"sl3",c:"Blush",b:"Judydoll",n:"Bare Water Blusher",s:"03 Spring Nap",p:"$18–$28",l:"https://s.shopee.sg/W3YPYqfHP",w:"Shopee",no:"Sheer warm peach water-blush; Spring Light needs soft not vivid blush",img:""},
    {id:"sl4",c:"Blush",b:"Glossier",n:"Cloud Paint",s:"Dusk (soft warm peach)",p:"$28–$35",l:"",w:"Sephora SG",no:"Soft diffused warm peach; Spring Light's most natural blush expression",img:""},
    {id:"sl5",c:"Blush",b:"Flower Knows",n:"Strawberry Rococo Blush",s:"01 Peach Parfait",p:"$22–$32",l:"https://s.shopee.sg/5VSEL8C5KO",w:"Shopee",no:"Soft peach; Xiaohongshu viral packaging; Spring Light's pretty daily blush",img:""},
    {id:"sl6",c:"Blush",b:"3CE",n:"Blush",s:"Peach Splash",p:"$28–$38",l:"https://invl.me/clnglfr",w:"Watsons",no:"Soft warm peach powder; Spring Light's everyday cheek colour",img:""},
    {id:"sl7",c:"Blush",b:"Benefit",n:"Dandelion Blush",s:"Baby Pink",p:"$48–$58",l:"https://invl.me/clnglh9",w:"Sephora SG",no:"Cult soft pink with warm shimmer; gentle on Spring Light's fair delicacy",img:""},
    {id:"sl8",c:"Eye",b:"Urban Decay",n:"Naked 1 Palette",s:"All warm nudes",p:"$65–$80",l:"",w:"Sephora SG",no:"All warm neutral tones; Spring Light's go-to for soft everyday warm eye",img:""},
    {id:"sl9",c:"Eye",b:"Peripera",n:"All Take Mood Palette",s:"01 Whisper of Spring Coral",p:"$38–$50",l:"https://invl.me/clnglfz",w:"Watsons",no:"Soft warm nudes by Korean MUA Pony; Spring Light's perfect daily palette",img:""},
    {id:"sl10",c:"Eye",b:"ZEESEA",n:"9-Color Eyeshadow Palette",s:"Grapefruit Plate",p:"$18–$28",l:"https://s.shopee.sg/4Awql1QLUI",w:"Shopee",no:"Soft warm gold tones; Spring Light's accessible everyday palette",img:""},
    {id:"sl11",c:"Mascara",b:"Benefit",n:"Roller Lash Mascara",s:"Brown-Black",p:"$42–$52",l:"",w:"Sephora SG",no:"Curling; brown-black is softer than black for Spring Light's gentle look",img:""},
    {id:"sl12",c:"Brow",b:"3CE",n:"Eyebrow Pencil",s:"01 Light Brown",p:"$18–$25",l:"",w:"Sephora / Shopee",no:"Light warm brown; Spring Light's brows should be soft, not defined too strongly",img:""},
    {id:"sl13",c:"Lip",b:"Charlotte Tilbury",n:"Matte Revolution",s:"Very Victoria",p:"$48–$60",l:"https://invl.me/clnglgc",w:"Sephora SG",no:"Peachy warm nude; Spring Light's signature lip — never too vivid or cool",img:""},
    {id:"sl14",c:"Lip",b:"Romand",n:"Glasting Water Gloss",s:"01 Sanho Crush",p:"$15–$22",l:"",w:"Shopee",no:"Glass-like warm peach; Spring Light's lip should be soft and dewy, not bold",img:""},
    {id:"sl15",c:"Lip",b:"Dior Beauty",n:"Addict Lip Glow Oil",s:"087 Spicy",p:"$45–$55",l:"https://invl.me/clnglgt",w:"Sephora SG",no:"Warm peachy oil; delicate iridescence suits Spring Light's soft aesthetic",img:""},
    {id:"sl16",c:"Lip",b:"Flower Knows",n:"Shell's Jewel Nourishing Lip Glaze",s:"P09 Coral Conch",p:"$10–$16",l:"https://s.shopee.sg/1LcfOY2weV",w:"Shopee",no:"Affordable warm peach gloss; Spring Light's budget everyday lip",img:""},
    {id:"sl17",c:"Highlight",b:"Becca",n:"Shimmering Skin Perfector",s:"Champagne Pop",p:"$42–$55",l:"",w:"Sephora SG",no:"Soft warm gold; Spring Light needs a delicate not overpowering highlight",img:""},
  ],
  "Summer Light": [
    {id:"suml0",c:"Base",b:"Chanel Beauty",n:"Les Beiges Water-Fresh Tint",s:"Light cool-neutral",p:"$80–$95",l:"",w:"Chanel / Sephora",no:"Sheer and cool-neutral; Summer Light's fair complexion needs minimal base",img:""},
    {id:"suml1",c:"Base",b:"Laneige",n:"Water Blank Cushion",s:"21C Cool Ivory",p:"$42–$52",l:"",w:"Sephora SG / Shopee",no:"Cool-toned ivory; dewy cushion; Summer Light's go-to K-beauty base",img:""},
    {id:"suml2",c:"Base",b:"Eborian",n:"CC Cream SPF50",s:"Fair (cool)",p:"$35–$48",l:"",w:"Sephora SG",no:"Cool fair tone; lightweight perfect for Summer Light's SG climate",img:""},
    {id:"suml3",c:"Blush",b:"Rare Beauty",n:"Soft Pinch Liquid Blush",s:"Hope",p:"$38–$45",l:"",w:"Sephora SG",no:"Soft cool rose; Summer Light's blush should be whisper-light, never vivid",img:""},
    {id:"suml4",c:"Blush",b:"NARS",n:"Afterglow Blush",s:"Deep Throat",p:"$45–$55",l:"",w:"Sephora SG",no:"Soft cool pink shimmer; Summer Light's ethereal glow cheek",img:""},
    {id:"suml5",c:"Blush",b:"Flower Knows",n:"Strawberry Rococo Blush",s:"05 Lavender Mist",p:"$22–$32",l:"",w:"Shopee",no:"Soft lavender-pink; Summer Light's most delicate colour expression",img:""},
    {id:"suml6",c:"Blush",b:"Milk Makeup",n:"Cooling Water Jelly Tint",s:"Poppy",p:"$32–$42",l:"",w:"Sephora SG",no:"Cool jelly; refreshing texture; Summer Light's airy skin aesthetic",img:""},
    {id:"suml7",c:"Blush",b:"RMK",n:"Creamy Cheek Colour",s:"04 Sheer Rose",p:"$42–$52",l:"",w:"Tangs / Isetan",no:"Cult Japanese cream; cool sheer rose; Summer Light's skin-blended cheek",img:""},
    {id:"suml8",c:"Eye",b:"Charlotte Tilbury",n:"Pillow Talk Eyeshadow Palette",s:"Full palette",p:"$75–$92",l:"",w:"Sephora SG",no:"Cool pinks, mauves; Summer Light's signature eye palette — soft and ethereal",img:""},
    {id:"suml9",c:"Eye",b:"Kate",n:"The Eye Color",s:"06 Lavender Mauve",p:"$12–$18",l:"",w:"Watsons / Shopee",no:"Single pan lavender; the 2026 soft purple eye trend; very affordable",img:""},
    {id:"suml10",c:"Eye",b:"ZEESEA",n:"British Museum Collab Palette",s:"Rose Garden",p:"$18–$28",l:"",w:"Shopee",no:"Cool dusty pink tones; Summer Light's Chinese brand palette pick",img:""},
    {id:"suml11",c:"Mascara",b:"Shiseido",n:"Full Lash Volume Mascara",s:"01 Black",p:"$38–$48",l:"",w:"Tangs / Isetan",no:"Gentle formula; Summer Light's lashes are often light — volume without harshness",img:""},
    {id:"suml12",c:"Brow",b:"Kate",n:"Designing Eyebrow 3D",s:"EX-4 Ash Brown",p:"$12–$18",l:"",w:"Watsons / Shopee",no:"Ash brown for cool tones; Summer Light's brows should be soft and cool-toned",img:""},
    {id:"suml13",c:"Lip",b:"Dior Beauty",n:"Addict Lip Glow Oil",s:"063 Pink Lilac",p:"$45–$55",l:"",w:"Sephora SG",no:"Sheer cool lilac; Summer Light's lip should be airy, not vivid — this is perfect",img:""},
    {id:"suml14",c:"Lip",b:"Romand",n:"Glasting Melting Balm",s:"01 Bare Pink",p:"$15–$22",l:"",w:"Shopee",no:"Sheer cool pink balm; Summer Light's go-to daily lip — nothing too saturated",img:""},
    {id:"suml15",c:"Lip",b:"Charlotte Tilbury",n:"Lip Lustre",s:"Pillow Talk",p:"$48–$60",l:"",w:"Sephora SG",no:"Soft cool mauve with lustre; Summer Light's elevated everyday lip",img:""},
    {id:"suml16",c:"Lip",b:"Etude",n:"Fixing Tint",s:"PK001 Pale Cool Pink",p:"$12–$18",l:"",w:"Shopee / Watsons",no:"Cool pale pink; accessible; Summer Light's budget everyday tint",img:""},
    {id:"suml17",c:"Highlight",b:"Becca",n:"Shimmering Skin Perfector",s:"Moonstone",p:"$42–$55",l:"",w:"Sephora SG",no:"Pearl-cool highlight; Summer Light's icy luminous glow — never warm gold",img:""},
  ],
  "Summer Mute": [
    {id:"summ0",c:"Base",b:"Charlotte Tilbury",n:"Airbrush Flawless Foundation",s:"5 Cool",p:"$80–$95",l:"",w:"Sephora SG",no:"Cool medium; matte-satin finish suits Summer Mute's sophisticated muted aesthetic",img:""},
    {id:"summ1",c:"Base",b:"Laneige",n:"Neo Cushion Matte",s:"23C Cool",p:"$48–$58",l:"",w:"Sephora SG / Shopee",no:"Cool matte cushion; Summer Mute's skin tone benefits from less shine",img:""},
    {id:"summ2",c:"Base",b:"Shu Uemura",n:"Unlimited Fluid Foundation",s:"144 Cool Medium",p:"$75–$90",l:"",w:"Tangs / Isetan",no:"Japanese craftsmanship; cool medium; Summer Mute's precision choice",img:""},
    {id:"summ3",c:"Blush",b:"Rare Beauty",n:"Soft Pinch Liquid Blush",s:"Believe",p:"$38–$45",l:"",w:"Sephora SG",no:"Muted mauve; Summer Mute's blush must be dusty/muted — never vivid",img:""},
    {id:"summ4",c:"Blush",b:"Chanel Beauty",n:"Les Beiges Healthy Glow Blush",s:"21 Dusty Rose",p:"$75–$90",l:"",w:"Chanel / Sephora",no:"Dusty cool rose; Summer Mute's signature elevated blush",img:""},
    {id:"summ5",c:"Blush",b:"NARS",n:"Blush",s:"Lovejoy",p:"$45–$55",l:"",w:"Sephora SG",no:"Muted cool pink powder; Summer Mute's everyday cheek colour",img:""},
    {id:"summ6",c:"Blush",b:"Flower Knows",n:"Strawberry Rococo Blush",s:"03 Rose Petal",p:"$22–$32",l:"",w:"Shopee",no:"Cool muted rose; accessible; Summer Mute's Chinese brand pick",img:""},
    {id:"summ7",c:"Blush",b:"Milk Makeup",n:"Cooling Water Jelly Tint",s:"Bitten",p:"$32–$42",l:"",w:"Sephora SG",no:"Cool muted rose gel; Summer Mute's refreshing cheek for SG climate",img:""},
    {id:"summ8",c:"Eye",b:"Urban Decay",n:"Naked 3 Palette",s:"Full cool rose-mauve",p:"$65–$80",l:"",w:"Sephora SG",no:"All cool rose-mauve-grey tones; Summer Mute's definitive everyday palette",img:""},
    {id:"summ9",c:"Eye",b:"Charlotte Tilbury",n:"Pillow Talk Eyeshadow Palette",s:"Muted cool pinks + grey-taupes",p:"$75–$92",l:"",w:"Sephora SG",no:"Muted cool pinks and grey-taupes; Summer Mute's romantic eye",img:""},
    {id:"summ10",c:"Eye",b:"ZEESEA",n:"British Museum Collab Palette",s:"Mauve Archives",p:"$18–$28",l:"",w:"Shopee",no:"Muted cool tones; affordable Summer Mute palette",img:""},
    {id:"summ11",c:"Mascara",b:"Shiseido",n:"Controlled Chaos Mascaraink",s:"01 Black Pulse",p:"$38–$48",l:"",w:"Tangs / Isetan / Sephora",no:"Neutral mascara; Summer Mute's lash volume without clumping",img:""},
    {id:"summ12",c:"Brow",b:"Anastasia Beverly Hills",n:"Brow Wiz",s:"Ash Brown",p:"$38–$48",l:"",w:"Sephora SG",no:"Ash brown; ABH 2026 comeback; Summer Mute's cool-toned brow",img:""},
    {id:"summ13",c:"Lip",b:"Charlotte Tilbury",n:"Matte Revolution",s:"Pillow Talk",p:"$48–$60",l:"",w:"Sephora SG",no:"THE Summer Mute lip; cool muted mauve — the 2026 mauve trend is made for this season",img:""},
    {id:"summ14",c:"Lip",b:"Dior Beauty",n:"Addict Lip Glow Oil",s:"001 Pink",p:"$45–$55",l:"",w:"Sephora SG",no:"Sheer cool pink oil; Summer Mute's everyday low-key lip",img:""},
    {id:"summ15",c:"Lip",b:"Romand",n:"Blur Fudge Tint",s:"10 Mauve Daily",p:"$15–$22",l:"",w:"Shopee",no:"Muted mauve blur tint; Summer Mute's most season-accurate K-beauty lip",img:""},
    {id:"summ16",c:"Lip",b:"L'Oréal Paris",n:"Colour Riche Intense Volume Matte",s:"Blush Fantasy",p:"$22–$32",l:"",w:"Watsons / Guardian",no:"Cool muted pink; accessible one-accent lip for Summer Mute",img:""},
    {id:"summ17",c:"Lip",b:"Shu Uemura",n:"Rouge Unlimited Matte",s:"PK355 Dusty Pink",p:"$48–$60",l:"",w:"Tangs / Isetan",no:"Cool dusty pink; Japanese matte formula; Summer Mute's elevated muted lip",img:""},
    {id:"summ18",c:"Highlight",b:"NARS",n:"Illuminator",s:"Orgasm (cool rose shimmer)",p:"$48–$58",l:"",w:"Sephora SG",no:"Subtle cool rose shimmer; Summer Mute's highlight is never blazing — a soft glow",img:""},
  ],
  "Autumn Mute": [
    {id:"am0",c:"Base",b:"Fenty Beauty",n:"Pro Filt'r Soft Matte Foundation",s:"350W Warm Medium",p:"$50–$65",l:"",w:"Sephora SG",no:"Warm 350W; matte suits Autumn Mute's earthy muted aesthetic",img:""},
    {id:"am1",c:"Base",b:"Bobbi Brown",n:"Skin Long-Wear Weightless Foundation",s:"W-044 Honey Warm",p:"$68–$82",l:"",w:"Sephora SG / TANGS",no:"Honey warm shade; natural finish; Autumn Mute's polished everyday base",img:""},
    {id:"am2",c:"Base",b:"Clio",n:"Kill Cover Mesh Glow Cushion",s:"03 Lingerie Warm",p:"$28–$38",l:"",w:"Watsons / Shopee",no:"Warm lingerie tone; muted glow mesh finish suits Autumn Mute's earthy skin",img:""},
    {id:"am3",c:"Blush",b:"Rare Beauty",n:"Soft Pinch Liquid Blush",s:"Grateful",p:"$38–$45",l:"",w:"Sephora SG",no:"Warm terracotta; muted not vivid — correct for Autumn Mute's low chroma season",img:""},
    {id:"am4",c:"Blush",b:"Charlotte Tilbury",n:"Cheek to Chic Blush",s:"Hepburn Honeymoon",p:"$60–$72",l:"",w:"Sephora SG",no:"Warm terracotta powder duo; buildable earthy flush for Autumn Mute",img:""},
    {id:"am5",c:"Blush",b:"NARS",n:"Blush",s:"Torrid",p:"$45–$55",l:"",w:"Sephora SG",no:"Warm coral-brick; classic NARS for Autumn Mute's warm cheek",img:""},
    {id:"am6",c:"Blush",b:"Judydoll",n:"Cloud Nine Blush",s:"05 Terracotta Bloom",p:"$12–$18",l:"",w:"Shopee",no:"Affordable viral terracotta; Autumn Mute's budget blush option",img:""},
    {id:"am7",c:"Blush",b:"Flower Knows",n:"Strawberry Rococo Blush",s:"07 Amber Honey",p:"$22–$32",l:"",w:"Shopee",no:"Warm amber-honey tone; Xiaohongshu favourite; Autumn Mute pick",img:""},
    {id:"am8",c:"Eye",b:"Anastasia Beverly Hills",n:"Soft Glam Palette",s:"Russet / Amber / Sienna",p:"$68–$82",l:"",w:"Sephora SG",no:"Warm rust-amber-sienna; muted warm tones; Autumn Mute's perfect everyday palette",img:""},
    {id:"am9",c:"Eye",b:"Urban Decay",n:"Naked Heat Palette",s:"Full amber-bronze-rust",p:"$65–$80",l:"",w:"Sephora SG",no:"All warm muted tones; Autumn Mute lives in this palette",img:""},
    {id:"am10",c:"Eye",b:"Romand",n:"Better Than Palette",s:"BE01 Butternut Latte",p:"$25–$35",l:"",w:"Shopee",no:"Warm nude-butterscotch tones; Autumn Mute's K-beauty palette",img:""},
    {id:"am11",c:"Eye",b:"Florasis",n:"Ancient City Eye Palette",s:"03 Autumn Harvest",p:"$28–$40",l:"",w:"Shopee",no:"Autumn-inspired warm muted tones; big on Xiaohongshu; season-accurate",img:""},
    {id:"am12",c:"Mascara",b:"Benefit",n:"They're Real Mascara",s:"Black",p:"$42–$52",l:"",w:"Sephora SG",no:"Lengthening mascara for Autumn Mute's subtle dramatic look",img:""},
    {id:"am13",c:"Brow",b:"Benefit",n:"Precisely My Brow Pencil",s:"03 Warm Light Brown",p:"$42–$52",l:"",w:"Sephora SG",no:"Warm light-medium brown; Autumn Mute's brow should be earthy, not dark",img:""},
    {id:"am14",c:"Lip",b:"MAC Cosmetics",n:"Matte Lipstick",s:"Twig",p:"$32–$42",l:"",w:"MAC / Sephora",no:"Warm muted nude; Autumn Mute's most season-correct everyday lip — earthy not vivid",img:""},
    {id:"am15",c:"Lip",b:"Romand",n:"Zero Velvet Tint",s:"13 Autumn",p:"$15–$22",l:"",w:"Shopee",no:"Warm muted berry velvet; Autumn Mute's Korean lip pick — earthy depth",img:""},
    {id:"am16",c:"Lip",b:"Charlotte Tilbury",n:"Matte Revolution",s:"Pillow Talk Intense",p:"$48–$60",l:"",w:"Sephora SG",no:"Warm muted rose; Autumn Mute's lip should stay in muted warm territory",img:""},
    {id:"am17",c:"Lip",b:"NYX Professional",n:"Lip Lingerie XXL Matte",s:"Spicy",p:"$15–$22",l:"",w:"Watsons / Guardian",no:"Warm muted terracotta nude; accessible Autumn Mute lip",img:""},
    {id:"am18",c:"Highlight",b:"Charlotte Tilbury",n:"Hollywood Flawless Filter",s:"5 Medium Warm",p:"$75–$90",l:"",w:"Sephora SG",no:"Medium warm filter; Autumn Mute's glow is earthy not flashy",img:""},
  ],
  "Autumn Deep": [
    {id:"ad0",c:"Base",b:"Fenty Beauty",n:"Pro Filt'r Soft Matte Foundation",s:"370W Deep Warm",p:"$50–$65",l:"",w:"Sephora SG",no:"Best-in-class deep warm shades; matte aligns with Autumn Deep's bold 2026 look",img:""},
    {id:"ad1",c:"Base",b:"NARS",n:"Natural Radiant Longwear Foundation",s:"Syracuse",p:"$68–$80",l:"",w:"Sephora SG",no:"Warm deep shade; luminous longevity; Autumn Deep's drama base",img:""},
    {id:"ad2",c:"Base",b:"Make Up For Ever",n:"HD Skin Foundation",s:"3Y38 Warm Deep",p:"$65–$80",l:"",w:"Sephora SG / TANGS",no:"Professional-grade; excellent warm deep shade range for Autumn Deep",img:""},
    {id:"ad3",c:"Blush",b:"Rare Beauty",n:"Soft Pinch Liquid Blush",s:"Lucky",p:"$38–$45",l:"",w:"Sephora SG",no:"Warm brick; Autumn Deep can carry richer, more saturated blush than Autumn Mute",img:""},
    {id:"ad4",c:"Blush",b:"Charlotte Tilbury",n:"Filmstar Bronze & Glow",s:"Medium-Deep",p:"$80–$95",l:"",w:"Sephora SG",no:"Bronze-to-glow duo; the sun-kissed cheek is Autumn Deep's power move",img:""},
    {id:"ad5",c:"Blush",b:"NARS",n:"Laguna Bronzer",s:"Laguna",p:"$45–$55",l:"",w:"Sephora SG",no:"Warm bronze swept high into temples; Autumn Deep's editorial cheek",img:""},
    {id:"ad6",c:"Blush",b:"Hourglass",n:"Ambient Lighting Blush",s:"Radiant Magenta",p:"$68–$82",l:"",w:"Sephora SG",no:"Warm red-toned ambient powder; Autumn Deep's elevated blush pick",img:""},
    {id:"ad7",c:"Blush",b:"Judydoll",n:"Cloud Nine Blush",s:"08 Sienna",p:"$12–$18",l:"",w:"Shopee",no:"Affordable viral sienna blush; Autumn Deep's budget-friendly cheek",img:""},
    {id:"ad8",c:"Eye",b:"Anastasia Beverly Hills",n:"Soft Glam Palette",s:"Cyprus Umber / Russet / Sienna",p:"$68–$82",l:"",w:"Sephora SG",no:"ABH 2026 comeback; richest deep warm palette for Autumn Deep's cut crease",img:""},
    {id:"ad9",c:"Eye",b:"Tom Ford Beauty",n:"Eye Color Quad",s:"Cocoa Mirage",p:"$90–$110",l:"",w:"Sephora SG",no:"Premium warm deep quad; Autumn Deep's luxury dramatic eye",img:""},
    {id:"ad10",c:"Eye",b:"Pat McGrath Labs",n:"Mothership VI",s:"Midnight Sun",p:"$85–$105",l:"",w:"Sephora SG",no:"Ultra-pigmented deep warm; Autumn Deep's maximalist palette pick",img:""},
    {id:"ad11",c:"Eye",b:"Florasis",n:"Blooming Rouge Palette",s:"02 Autumn Gold",p:"$28–$40",l:"",w:"Shopee",no:"Xiaohongshu cult; Autumn-inspired deep warm golds for Autumn Deep",img:""},
    {id:"ad12",c:"Mascara",b:"Hourglass",n:"Unlocked Instant Extensions Mascara",s:"Black",p:"$52–$65",l:"",w:"Sephora SG",no:"Extension effect; Autumn Deep's bold dramatic eye needs a statement mascara",img:""},
    {id:"ad13",c:"Brow",b:"Anastasia Beverly Hills",n:"Brow Definer",s:"Deep Brown",p:"$38–$48",l:"",w:"Sephora SG",no:"ABH 2026 comeback; deep warm brown brow for Autumn Deep's bold face",img:""},
    {id:"ad14",c:"Lip",b:"MAC Cosmetics",n:"Retro Matte Liquid Lipcolour",s:"Carnivorous",p:"$35–$45",l:"",w:"MAC / Sephora",no:"Vivid warm brick-red; Autumn Deep can carry saturation — this is their 2026 bold lip",img:""},
    {id:"ad15",c:"Lip",b:"Tom Ford Beauty",n:"Lip Stylo Matte",s:"Impassioned",p:"$65–$80",l:"",w:"Sephora SG",no:"Oxblood is Autumn Deep's heritage colour — the 2026 bold lip return is made for them",img:""},
    {id:"ad16",c:"Lip",b:"Dior Beauty",n:"Rouge Dior On Stage",s:"943 Euphoric",p:"$55–$70",l:"",w:"Sephora SG",no:"Warm deep burgundy; Dior's long-wear comfort for Autumn Deep's drama lip",img:""},
    {id:"ad17",c:"Lip",b:"Florasis",n:"Blooming Rouge Lipstick",s:"08 Deep Autumn",p:"$25–$38",l:"",w:"Shopee",no:"Florasis warm deep; Xiaohongshu cult lipstick; Autumn Deep's Chinese brand pick",img:""},
    {id:"ad18",c:"Highlight",b:"Fenty Beauty",n:"Killawatt Highlighter",s:"Lightning Dust (copper-gold)",p:"$42–$52",l:"",w:"Sephora SG",no:"Copper-gold highlight; Autumn Deep's metallic is copper not gold or silver",img:""},
  ],
  "Winter Bright": [
    {id:"wb0",c:"Base",b:"Giorgio Armani",n:"Luminous Silk Foundation",s:"6 Medium Cool",p:"$90–$110",l:"",w:"Sephora SG",no:"Cool medium; luminous return trend 2026; Winter Bright's crisp luminous base",img:""},
    {id:"wb1",c:"Base",b:"NARS",n:"Natural Radiant Longwear Foundation",s:"Alaska",p:"$68–$80",l:"",w:"Sephora SG",no:"Cool fair Alaska; radiant finish; Winter Bright's luminous high-contrast base",img:""},
    {id:"wb2",c:"Base",b:"Charlotte Tilbury",n:"Airbrush Flawless Foundation",s:"1 Cool",p:"$80–$95",l:"",w:"Sephora SG",no:"Cool fair; 24hr wear; Winter Bright's high-contrast base needs precision",img:""},
    {id:"wb3",c:"Blush",b:"Charlotte Tilbury",n:"Cheek to Chic Blush",s:"Love Is The Drug",p:"$60–$72",l:"",w:"Sephora SG",no:"Vivid cool rose; Winter Bright's high-chroma blush — graphic placement, bold colour",img:""},
    {id:"wb4",c:"Blush",b:"MAC Cosmetics",n:"Glow Play Blush",s:"That's Cheeky",p:"$38–$48",l:"",w:"MAC / Sephora",no:"Vivid cool pink; Winter Bright can carry saturated vivid blush placed graphically high",img:""},
    {id:"wb5",c:"Blush",b:"NARS",n:"Blush",s:"Orgasm",p:"$45–$55",l:"",w:"Sephora SG",no:"Cool silver-pink shimmer; Winter Bright's luminous vivid cheek",img:""},
    {id:"wb6",c:"Blush",b:"Givenchy",n:"Prisme Libre Blush",s:"06 Lilas Evanescent",p:"$70–$85",l:"",w:"Sephora SG",no:"Vivid cool lilac loose powder; Winter Bright's French luxury cheek pick",img:""},
    {id:"wb7",c:"Blush",b:"Romand",n:"Bare Water Blusher",s:"09 Mauve Haze",p:"$18–$28",l:"",w:"Shopee",no:"Cool vivid water blusher; budget-accessible Winter Bright blush",img:""},
    {id:"wb8",c:"Eye",b:"Pat McGrath Labs",n:"Mothership Eyeshadow",s:"Midnight Sun",p:"$85–$105",l:"",w:"Sephora SG",no:"Pat McGrath 2026 artistry; cool metallics for Winter Bright's vivid eye statement",img:""},
    {id:"wb9",c:"Eye",b:"Anastasia Beverly Hills",n:"Norvina Pro Pigment Vol. 5",s:"Icy Lilac / Cobalt / Silver",p:"$75–$92",l:"",w:"Sephora SG",no:"ABH 2026 comeback; vivid cool cut crease for Winter Bright — the season's eye moment",img:""},
    {id:"wb10",c:"Eye",b:"Urban Decay",n:"Naked Reloaded Palette",s:"Cool taupes / silvers",p:"$65–$80",l:"",w:"Sephora SG",no:"Cool neutral tones; Winter Bright's versatile everyday palette",img:""},
    {id:"wb11",c:"Mascara",b:"Urban Decay",n:"Perversion Mascara",s:"Black",p:"$38–$48",l:"",w:"Sephora SG",no:"True black volume; Winter Bright's non-negotiable mascara",img:""},
    {id:"wb12",c:"Brow",b:"Anastasia Beverly Hills",n:"Brow Wiz",s:"Taupe / Ash Brown",p:"$38–$48",l:"",w:"Sephora SG",no:"Cool taupe or ash; ABH 2026 comeback; Winter Bright's precise bold brow",img:""},
    {id:"wb13",c:"Lip",b:"MAC Cosmetics",n:"Ruby Woo Lipstick",s:"Ruby Woo",p:"$32–$42",l:"",w:"MAC / Sephora",no:"THE cool red — blue-based; Winter Bright's definitive bold lip; the 2026 true red moment",img:""},
    {id:"wb14",c:"Lip",b:"Tom Ford Beauty",n:"Lip Colour Ultra-Rich",s:"Forbidden Pink",p:"$58–$72",l:"",w:"Sephora SG",no:"Vivid cool fuchsia; Winter Bright's maximalist saturated pink lip moment",img:""},
    {id:"wb15",c:"Lip",b:"Dior Beauty",n:"Rouge Dior",s:"080 Red Smile",p:"$55–$70",l:"",w:"Sephora SG",no:"Blue-based cool red; Dior's vivid classic for Winter Bright's red lip moment",img:""},
    {id:"wb16",c:"Lip",b:"L'Oréal Paris",n:"Infallible Matte Resistance",s:"Bilingual",p:"$18–$25",l:"",w:"Watsons / Guardian",no:"16hr matte; vivid cool plum; Winter Bright's accessible bold lip option",img:""},
    {id:"wb17",c:"Lip",b:"Romand",n:"Zero Velvet Tint",s:"07 Fig",p:"$15–$22",l:"",w:"Shopee",no:"Cool fig-plum velvet; Winter Bright's K-beauty lip — vivid cool depth",img:""},
    {id:"wb18",c:"Highlight",b:"Pat McGrath Labs",n:"Skin Show Highlighter",s:"Silver Subliminal",p:"$68–$82",l:"",w:"Sephora SG",no:"Cool vivid silver; Winter Bright's highlight is always cool and striking — never warm",img:""},
  ],
  "Winter Dark": [
    {id:"wd0",c:"Base",b:"NARS",n:"Natural Radiant Longwear Foundation",s:"Macao",p:"$68–$80",l:"",w:"Sephora SG",no:"Cool deep; luminous longevity; Winter Dark's authority base",img:""},
    {id:"wd1",c:"Base",b:"Fenty Beauty",n:"Pro Filt'r Soft Matte Foundation",s:"490 Deep Cool",p:"$50–$65",l:"",w:"Sephora SG",no:"Deep cool 490; matte for Winter Dark's high-contrast clarity",img:""},
    {id:"wd2",c:"Base",b:"Pat McGrath Labs",n:"Skin Fetish Foundation",s:"Deep 45 Cool",p:"$80–$100",l:"",w:"Sephora SG",no:"Pat McGrath = 2026 artistry brand; cool deep perfection for Winter Dark",img:""},
    {id:"wd3",c:"Blush",b:"MAC Cosmetics",n:"Glow Play Blush",s:"Berry Shake",p:"$38–$48",l:"",w:"MAC / Sephora",no:"Vivid cool berry; Winter Dark's high-chroma cheek — graphic, high-placed",img:""},
    {id:"wd4",c:"Blush",b:"Charlotte Tilbury",n:"Cheek to Chic Blush",s:"Sex On The Rocks",p:"$60–$72",l:"",w:"Sephora SG",no:"Cool deep rose duo; buildable from day to editorial for Winter Dark",img:""},
    {id:"wd5",c:"Blush",b:"NARS",n:"Afterglow Blush",s:"Orgasm",p:"$45–$55",l:"",w:"Sephora SG",no:"Cool silver-pink shimmer on Winter Dark's high cheekbones — lit and lifted",img:""},
    {id:"wd6",c:"Blush",b:"Hourglass",n:"Ambient Lighting Blush",s:"Vivid",p:"$68–$82",l:"",w:"Sephora SG",no:"Vivid fuchsia; only Winter Dark can carry this with full authority and gravity",img:""},
    {id:"wd7",c:"Eye",b:"Pat McGrath Labs",n:"Mothership I Dark Star",s:"Deep cool metals",p:"$85–$105",l:"",w:"Sephora SG",no:"Pat McGrath maximalist; deep cool metallics for Winter Dark's drama eye",img:""},
    {id:"wd8",c:"Eye",b:"Anastasia Beverly Hills",n:"Norvina Pro Pigment Vol. 5",s:"Cobalt / Deep Violet / Silver",p:"$75–$92",l:"",w:"Sephora SG",no:"ABH 2026 comeback; Winter Dark's cut crease palette — cobalt and deep violet",img:""},
    {id:"wd9",c:"Eye",b:"Melt Cosmetics",n:"Gemini Eye Palette",s:"Sapphire / Onyx / Chrome",p:"$52–$65",l:"",w:"Online",no:"Bold cool metallics; Winter Dark's dramatic palette",img:""},
    {id:"wd10",c:"Eye",b:"Urban Decay",n:"Heavy Metal Glitter Liner",s:"Midnight Cowboy (cool silver)",p:"$22–$30",l:"",w:"Sephora SG",no:"Cool silver glitter; Winter Dark's iridescent eye statement — silver not gold",img:""},
    {id:"wd11",c:"Mascara",b:"Urban Decay",n:"Perversion Mascara",s:"Black",p:"$38–$48",l:"",w:"Sephora SG",no:"True black; Winter Dark's mascara is non-negotiable black — no brown-black",img:""},
    {id:"wd12",c:"Brow",b:"Anastasia Beverly Hills",n:"Brow Definer",s:"Dark Brown / Ebony",p:"$38–$48",l:"",w:"Sephora SG",no:"ABH 2026 comeback; dark cool brown or ebony for Winter Dark's strong brow",img:""},
    {id:"wd13",c:"Lip",b:"MAC Cosmetics",n:"Ruby Woo Lipstick",s:"Ruby Woo",p:"$32–$42",l:"",w:"MAC / Sephora",no:"THE cool red — blue-based; Winter Dark's definitive bold lip",img:""},
    {id:"wd14",c:"Lip",b:"Tom Ford Beauty",n:"Lip Colour Ultra-Rich",s:"Black Orchid",p:"$58–$72",l:"",w:"Sephora SG",no:"Deep cool plum; Winter Dark's luxury one-accent statement lip",img:""},
    {id:"wd15",c:"Lip",b:"Charlotte Tilbury",n:"Matte Revolution",s:"Bond Girl",p:"$48–$60",l:"",w:"Sephora SG",no:"Cool deep berry; Winter Dark's elegant bold lip option",img:""},
    {id:"wd16",c:"Lip",b:"Romand",n:"Zero Velvet Tint",s:"09 Dry Plum",p:"$15–$22",l:"",w:"Shopee",no:"Cool deep plum velvet; budget Winter Dark lip — very accessible SG",img:""},
    {id:"wd17",c:"Lip",b:"L'Oréal Paris",n:"Infallible Matte Resistance",s:"Midnight Roses",p:"$18–$25",l:"",w:"Watsons / Guardian",no:"16hr matte; deep cool berry; accessible Winter Dark bold lip",img:""},
    {id:"wd18",c:"Highlight",b:"NARS",n:"Highlighting Powder Palette",s:"Subculture (cool silver)",p:"$65–$80",l:"",w:"Sephora SG",no:"Cool silver; Winter Dark's highlight is always cool — never gold",img:""},
  ],
};

const SEASON_PROFILES = {
  "Spring Bright": { tone:"Warm", energy:"Playful, radiant, fresh", direction:"Warm, clear, bright pigments. Gold metallics. Avoid dusty or muted.", avoid:"Cool grey, icy blue, muted/dusty tones, pure black, cool pink", colouring:"Light-medium warm skin, golden/peachy undertone, high colour contrast, bright eyes" },
  "Spring Light": { tone:"Warm", energy:"Gentle, feminine, approachable", direction:"Soft warm tones only. Cream formulas over powders. Nothing too vivid or dark.", avoid:"Saturated brights, cool pinks, grey-based neutrals, stark white, dark colours near face", colouring:"Fair-light warm skin, peachy-golden undertone, low-medium contrast, soft eye colour" },
  "Summer Light": { tone:"Cool", energy:"Ethereal, gentle, refined", direction:"Icy, soft, cool tones. Light hand. Nothing warm or saturated. Silver metallics.", avoid:"Warm orange, golden yellow, camel, warm beige, warm brown, warm ivory", colouring:"Fair-light cool skin, pink/bluish undertone, low contrast, light cool eyes" },
  "Summer Mute": { tone:"Cool", energy:"Sophisticated, quiet, elegant", direction:"Muted cool tones. Nothing bright or warm. Dusty finishes over shiny. Rose-grey neutrals.", avoid:"Warm orange, bright saturated colours, golden yellow, warm brown, stark white", colouring:"Light-medium cool skin, pinkish/rosy undertone, medium-low contrast, cool ash tones" },
  "Autumn Mute": { tone:"Warm", energy:"Grounded, natural, effortless", direction:"Muted warm tones. Earthy and organic. Nothing icy or cool. Bronze metallics.", avoid:"Cool pinks, icy blue, bright saturated colours, pure black, stark white, cool grey", colouring:"Medium-dark warm skin, golden/olive/peachy undertone, medium contrast, warm eye colour" },
  "Autumn Deep": { tone:"Warm", energy:"Bold, powerful, dramatic", direction:"Rich deep warm pigments. High drama allowed. Deep bronzes and copper metallics.", avoid:"Cool pink, icy blue, lavender, cool grey, pure white, anything icy or pastel", colouring:"Medium-deep warm skin, golden/bronze/olive undertone, high contrast, deep warm eyes" },
  "Winter Bright": { tone:"Cool", energy:"Striking, dramatic, high-contrast", direction:"Vivid cool pigments. High contrast. True red lips. Silver/chrome metallics.", avoid:"Warm orange, warm brown, camel, warm ivory, muted tones, earthy colours", colouring:"Fair-medium cool skin, blue/pink undertone, very high contrast, clear cool eyes" },
  "Winter Dark": { tone:"Cool", energy:"Authoritative, intense, sophisticated", direction:"Deep cool pigments. High contrast. Dramatic liner. Cool silver metallics.", avoid:"Warm orange, warm brown, camel, golden yellow, warm red, warm ivory", colouring:"Medium-deep cool skin, blue/pink/ash undertone, high contrast, cool deep eyes" },
};

const SEASONS = ['Spring Light','Spring Bright','Summer Light','Summer Mute','Autumn Mute','Autumn Deep','Winter Bright','Winter Dark'];
const SEASON_EMOJIS = {'Spring Light':'🌼','Spring Bright':'🌸','Summer Light':'🌊','Summer Mute':'🌫️','Autumn Mute':'🍂','Autumn Deep':'🌰','Winter Bright':'✨','Winter Dark':'❄️'};
const SEASON_COLORS = {
  'Spring Light':'#F5C9A0','Spring Bright':'#FF8A70',
  'Summer Light':'#C4AEDE','Summer Mute':'#A0A0CC',
  'Autumn Mute':'#C89060','Autumn Deep':'#903828',
  'Winter Bright':'#5070DD','Winter Dark':'#282878',
};
const LOOKS = ['Natural / Everyday','K-Beauty Glass Skin','Glam / Night Out','Office / Work','Soft & Romantic','Bold & Dramatic'];
const PRODUCT_CATS = ['👁 Eyeshadow & Eyes','🌸 Blush & Cheeks','💋 Lips','🏗 Base & Foundation','✨ Full Look'];

// ─── Category matcher ─────────────────────────────────────────────────────────
function matchCat(dbCat, uiCat) {
  if (uiCat === '✨ Full Look') return true;
  if (uiCat === '👁 Eyeshadow & Eyes') return ['Eye','Mascara','Brow','Eyeliner'].includes(dbCat);
  if (uiCat === '🌸 Blush & Cheeks') return ['Blush','Highlight'].includes(dbCat);
  if (uiCat === '💋 Lips') return dbCat === 'Lip';
  if (uiCat === '🏗 Base & Foundation') return ['Base','Concealer','Setting'].includes(dbCat);
  return true;
}

// ─── Link parser ──────────────────────────────────────────────────────────────
function renderInlineText(text, keyPfx) {
  const out = [];
  const boldRe = /\*\*([^*]+)\*\*/g;
  let last = 0, m;
  while ((m = boldRe.exec(text)) !== null) {
    if (m.index > last) {
      text.slice(last, m.index).split('\n').forEach((ln,k,a) => {
        out.push(<span key={`${keyPfx}-t${last}-${k}`}>{ln}</span>);
        if (k < a.length-1) out.push(<br key={`${keyPfx}-br${last}-${k}`}/>);
      });
    }
    out.push(<strong key={`${keyPfx}-b${m.index}`}>{m[1]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    text.slice(last).split('\n').forEach((ln,k,a) => {
      out.push(<span key={`${keyPfx}-te${last}-${k}`}>{ln}</span>);
      if (k < a.length-1) out.push(<br key={`${keyPfx}-bre${last}-${k}`}/>);
    });
  }
  return out;
}

// Renders a single line, applying link + bold formatting
function renderLine(line, key) {
  const out = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m;
  while ((m = linkRe.exec(line)) !== null) {
    if (m.index > last) out.push(...renderInlineText(line.slice(last, m.index), `${key}-p${last}`));
    out.push(<a key={`${key}-lnk${m.index}`} href={m[2]} target="_blank" rel="noopener noreferrer" style={{color:'#932D28',fontWeight:600,textDecoration:'underline'}}>{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(...renderInlineText(line.slice(last), `${key}-pe`));
  return out;
}

const LABELS = ['Product', 'Shade', 'Shop', 'Reason'];
const CAT_EMOJI = { Eye:'👁', Mascara:'👁', Brow:'✏️', Eyeliner:'👁', Blush:'🌸', Highlight:'✨', Lip:'💋', Base:'🫧', Concealer:'🫧', Setting:'🫧' };

function findProduct(productLine, seasonProducts) {
  const clean = productLine.replace(/\(~.*?\)/g, '').toLowerCase().trim();
  // Pass 1: brand AND at least 2 meaningful product name words must match
  for (const p of (seasonProducts || [])) {
    const b = p.b.toLowerCase();
    const nWords = p.n.toLowerCase().split(' ').filter(w => w.length > 2);
    const brandMatch = clean.includes(b);
    const nameMatchCount = nWords.filter(w => clean.includes(w)).length;
    if (brandMatch && nameMatchCount >= 2) return p;
  }
  // Pass 2: brand AND at least 1 meaningful product name word
  for (const p of (seasonProducts || [])) {
    const b = p.b.toLowerCase();
    const nWords = p.n.toLowerCase().split(' ').filter(w => w.length > 2);
    const brandMatch = clean.includes(b);
    const nameMatchCount = nWords.filter(w => clean.includes(w)).length;
    if (brandMatch && nameMatchCount >= 1) return p;
  }
  // Pass 3: brand only (last resort)
  for (const p of (seasonProducts || [])) {
    const b = p.b.toLowerCase();
    if (clean.includes(b)) return p;
  }
  return null;
}

function RichText({ text, seasonProducts = [] }) {
  const lines = text.split('\n');
  const sections = [];
  let i = 0;

  while (i < lines.length) {
    // Strip ** bold markers before any detection logic
    const trimmed = lines[i].trim().replace(/\*\*/g, '');
    if (trimmed.startsWith('Product:')) {
      const block = [];
      while (i < lines.length) {
        const bl = lines[i].trim().replace(/\*\*/g, '');
        if (bl === '' && block.length > 0) break;
        if (bl) block.push(bl);
        i++;
      }
      sections.push({ type: 'product', lines: block });
    } else if (trimmed === '') {
      sections.push({ type: 'space' });
      i++;
    } else {
      sections.push({ type: 'text', line: trimmed });
      i++;
    }
  }

  return <>{sections.map((s, idx) => {
    if (s.type === 'space') return <div key={idx} style={{height:6}}/>;

    if (s.type === 'text') return (
      <div key={idx} style={{fontSize:13,lineHeight:1.65,marginBottom:2}}>
        {renderLine(s.line, `ln-${idx}`)}
      </div>
    );

    if (s.type === 'product') {
      const prodLine = (s.lines.find(l => l.startsWith('Product:')) || '').replace('Product:', '').trim();
      const matched = findProduct(prodLine, seasonProducts);
      const img = matched?.img || '';
      const placeholder = CAT_EMOJI[matched?.c || ''] || '💄';

      return (
        <div key={idx} style={{display:'flex',gap:12,alignItems:'flex-start',margin:'8px 0',paddingBottom:8,borderBottom:'1px solid #F5F0EB'}}>
          {/* Product image or emoji placeholder */}
          <div style={{width:72,height:72,borderRadius:10,overflow:'hidden',flexShrink:0,background:'#FDF0EE',border:'1px solid #F1BAB3',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>
            {img
              ? <img src={img} alt="product" style={{width:'100%',height:'100%',objectFit:'cover'}}
                  onError={e=>{e.currentTarget.style.display='none';}}/>
              : placeholder}
          </div>
          {/* Label lines */}
          <div style={{flex:1,minWidth:0}}>
            {s.lines.map((bl, bi) => {
              const ci = bl.indexOf(':');
              const label = ci > 0 ? bl.slice(0, ci) : '';
              const value = ci > 0 ? bl.slice(ci+1).trim() : bl;
              if (!LABELS.includes(label)) return <div key={bi} style={{fontSize:12.5}}>{renderLine(bl, `bl-${idx}-${bi}`)}</div>;
              return (
                <div key={bi} style={{display:'flex',gap:6,alignItems:'baseline',flexWrap:'wrap',marginBottom:3}}>
                  <span style={{fontSize:8.5,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#932D28',flexShrink:0,paddingTop:2}}>
                    {label}
                  </span>
                  <span style={{fontSize:12.5,color:'#2A2018',lineHeight:1.5}}>
                    {renderLine(value, `v-${idx}-${bi}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  })}</>;
}

// ─── Cloud ────────────────────────────────────────────────────────────────────
function Cloud({ style }) {
  return (
    <div style={{position:'absolute',pointerEvents:'none',...style}}>
      <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <ellipse cx="100" cy="55" rx="80" ry="24" fill="white" opacity="0.7"/>
        <ellipse cx="72" cy="44" rx="46" ry="34" fill="white" opacity="0.7"/>
        <ellipse cx="130" cy="46" rx="42" ry="28" fill="white" opacity="0.7"/>
        <ellipse cx="55" cy="50" rx="30" ry="22" fill="white" opacity="0.65"/>
      </svg>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ products, onSave, onClose }) {
  const [season, setSeason] = useState('Spring Bright');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [addMode, setAddMode] = useState(false);
  const [newForm, setNewForm] = useState({c:'Lip',b:'',n:'',s:'',p:'',l:'',w:'',no:''});
  const [localProds, setLocalProds] = useState(() => JSON.parse(JSON.stringify(products)));
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'ok' | 'error'
  const [saveMsg, setSaveMsg] = useState('');

  const cats = [...new Set(Object.values(localProds).flat().map(p=>p.c))].sort();
  const rows = localProds[season] || [];

  const handleEdit = (p) => { setEditId(p.id); setEditForm({...p}); };
  const handleSaveEdit = () => {
    setLocalProds(prev => ({...prev, [season]: prev[season].map(p => p.id===editId ? {...editForm} : p)}));
    setEditId(null);
  };
  const handleDelete = (id) => {
    if (!window.confirm('Remove this product?')) return;
    setLocalProds(prev => ({...prev, [season]: prev[season].filter(p => p.id!==id)}));
  };
  const handleAdd = () => {
    const id = `${season.substring(0,2).toLowerCase()}_${Date.now()}`;
    setLocalProds(prev => ({...prev, [season]: [...(prev[season]||[]), {...newForm, id}]}));
    setNewForm({c:'Lip',b:'',n:'',s:'',p:'',l:'',w:'',no:''});
    setAddMode(false);
  };
  const handleSaveAll = async () => {
    setSaveStatus('saving');
    setSaveMsg('');
    const result = await onSave(localProds);
    if (result && !result.ok) {
      setSaveStatus('error');
      setSaveMsg(result.msg || 'Something went wrong.');
    } else {
      setSaveStatus('ok');
      setSaveMsg('Synced to all users ✓');
      setTimeout(() => { setSaveStatus(null); onClose(); }, 1200);
    }
  };

  const INPUT = {border:'1px solid #EDE8E0',borderRadius:4,padding:'4px 6px',fontSize:11,width:'100%',boxSizing:'border-box',fontFamily:'inherit'};
  const CELL = {padding:'6px 8px',borderBottom:'1px solid #F5F0EB',verticalAlign:'top'};

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:500,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
      <div style={{background:'#FDFAF7',borderRadius:12,width:'100%',maxWidth:900,maxHeight:'90vh',overflow:'hidden',display:'flex',flexDirection:'column',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
        {/* Header */}
        <div style={{background:'#932D28',color:'#fff',padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,letterSpacing:'0.15em'}}>PRODUCT LIBRARY</div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            {saveStatus === 'saving' && <span style={{fontSize:11,color:'rgba(255,255,255,0.8)',letterSpacing:'0.06em'}}>Syncing...</span>}
            {saveStatus === 'ok' && <span style={{fontSize:11,color:'#90EE90',letterSpacing:'0.06em'}}>{saveMsg}</span>}
            {saveStatus === 'error' && <span style={{fontSize:11,color:'#FFB3B3',maxWidth:260,lineHeight:1.4,letterSpacing:'0.03em'}}>{saveMsg}</span>}
            <button onClick={handleSaveAll} disabled={saveStatus==='saving'} style={{background:'#fff',color:'#932D28',border:'none',borderRadius:6,padding:'7px 16px',fontSize:11,fontWeight:700,cursor:'pointer',letterSpacing:'0.08em',opacity:saveStatus==='saving'?0.6:1}}>SAVE & SYNC</button>
            <button onClick={onClose} style={{background:'none',border:'1px solid rgba(255,255,255,0.4)',borderRadius:6,color:'#fff',padding:'7px 12px',fontSize:11,cursor:'pointer'}}>Discard</button>
          </div>
        </div>
        {/* Season tabs */}
        <div style={{display:'flex',overflowX:'auto',background:'#fff',borderBottom:'1px solid #EDE8E0',flexShrink:0}}>
          {SEASONS.map(s => (
            <button key={s} onClick={() => setSeason(s)} style={{background:'none',border:'none',borderBottom: season===s ? '2px solid #932D28' : '2px solid transparent',padding:'10px 14px',fontSize:10,letterSpacing:'0.1em',cursor:'pointer',whiteSpace:'nowrap',color:season===s?'#932D28':'#999',fontWeight:season===s?700:400,fontFamily:'inherit'}}>
              {SEASON_EMOJIS[s]} {s}
            </button>
          ))}
        </div>
        {/* Table */}
        <div style={{overflowY:'auto',flex:1,padding:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div style={{fontSize:11,color:'#999'}}>{rows.length} products in {season}</div>
            <button onClick={()=>setAddMode(true)} style={{background:'#932D28',color:'#fff',border:'none',borderRadius:6,padding:'7px 14px',fontSize:10,fontWeight:700,cursor:'pointer',letterSpacing:'0.1em'}}>+ ADD PRODUCT</button>
          </div>
          {addMode && (
            <div style={{background:'#FFF7F5',border:'1px solid #F5CCC8',borderRadius:8,padding:14,marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:'#932D28',marginBottom:10,letterSpacing:'0.08em'}}>NEW PRODUCT</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:8}}>
                <div><div style={{fontSize:10,color:'#999',marginBottom:3}}>CATEGORY</div>
                  <select value={newForm.c} onChange={e=>setNewForm(f=>({...f,c:e.target.value}))} style={INPUT}>
                    {['Eye','Blush','Lip','Base','Concealer','Highlight','Mascara','Brow','Setting'].map(c=><option key={c}>{c}</option>)}
                  </select></div>
                <div><div style={{fontSize:10,color:'#999',marginBottom:3}}>BRAND</div><input value={newForm.b} onChange={e=>setNewForm(f=>({...f,b:e.target.value}))} style={INPUT} placeholder="e.g. Romand"/></div>
                <div><div style={{fontSize:10,color:'#999',marginBottom:3}}>PRODUCT NAME</div><input value={newForm.n} onChange={e=>setNewForm(f=>({...f,n:e.target.value}))} style={INPUT} placeholder="e.g. Juicy Lasting Tint"/></div>
                <div><div style={{fontSize:10,color:'#999',marginBottom:3}}>SHADE</div><input value={newForm.s} onChange={e=>setNewForm(f=>({...f,s:e.target.value}))} style={INPUT} placeholder="e.g. 04 Coral"/></div>
                <div><div style={{fontSize:10,color:'#999',marginBottom:3}}>PRICE (SGD)</div><input value={newForm.p} onChange={e=>setNewForm(f=>({...f,p:e.target.value}))} style={INPUT} placeholder="e.g. $15–$22"/></div>
                <div><div style={{fontSize:10,color:'#999',marginBottom:3}}>LINK</div><input value={newForm.l} onChange={e=>setNewForm(f=>({...f,l:e.target.value}))} style={INPUT} placeholder="https://..."/></div>
                <div style={{gridColumn:'1/-1'}}><div style={{fontSize:10,color:'#999',marginBottom:3}}>WHERE TO BUY</div><input value={newForm.w} onChange={e=>setNewForm(f=>({...f,w:e.target.value}))} style={INPUT} placeholder="e.g. Sephora SG / Shopee"/></div>
                <div style={{gridColumn:'1/-1'}}><div style={{fontSize:10,color:'#999',marginBottom:3}}>WHY IT WORKS (for this season)</div><textarea value={newForm.no} onChange={e=>setNewForm(f=>({...f,no:e.target.value}))} style={{...INPUT,height:50,resize:'vertical'}} placeholder="Why this product suits the season..."/></div>
                <div style={{gridColumn:'1/-1'}}><div style={{fontSize:10,color:'#999',marginBottom:3}}>PRODUCT IMAGE URL (optional)</div><input value={newForm.img||''} onChange={e=>setNewForm(f=>({...f,img:e.target.value}))} style={INPUT} placeholder="https://..."/></div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button onClick={handleAdd} disabled={!newForm.b||!newForm.n} style={{background:'#932D28',color:'#fff',border:'none',borderRadius:6,padding:'8px 16px',fontSize:11,fontWeight:700,cursor:'pointer',opacity:(!newForm.b||!newForm.n)?0.5:1}}>Add Product</button>
                <button onClick={()=>setAddMode(false)} style={{background:'#F5F0EB',border:'none',borderRadius:6,padding:'8px 14px',fontSize:11,cursor:'pointer',color:'#888'}}>Cancel</button>
              </div>
            </div>
          )}
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
            <thead>
              <tr style={{background:'#F9F5F2'}}>
                {['Cat','Brand','Product','Shade','Price','Where','Link','Notes / Why It Works','Image',''].map(h=>(
                  <th key={h} style={{...CELL,fontWeight:700,color:'#888',letterSpacing:'0.08em',fontSize:10,textAlign:'left',textTransform:'uppercase'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(p => editId===p.id ? (
                <tr key={p.id} style={{background:'#FFF7F5'}}>
                  <td style={CELL}><select value={editForm.c} onChange={e=>setEditForm(f=>({...f,c:e.target.value}))} style={INPUT}>{['Eye','Blush','Lip','Base','Concealer','Highlight','Mascara','Brow','Setting'].map(c=><option key={c}>{c}</option>)}</select></td>
                  <td style={CELL}><input value={editForm.b} onChange={e=>setEditForm(f=>({...f,b:e.target.value}))} style={INPUT}/></td>
                  <td style={CELL}><input value={editForm.n} onChange={e=>setEditForm(f=>({...f,n:e.target.value}))} style={INPUT}/></td>
                  <td style={CELL}><input value={editForm.s} onChange={e=>setEditForm(f=>({...f,s:e.target.value}))} style={INPUT}/></td>
                  <td style={CELL}><input value={editForm.p} onChange={e=>setEditForm(f=>({...f,p:e.target.value}))} style={INPUT}/></td>
                  <td style={CELL}><input value={editForm.w} onChange={e=>setEditForm(f=>({...f,w:e.target.value}))} style={INPUT}/></td>
                  <td style={CELL}><input value={editForm.l} onChange={e=>setEditForm(f=>({...f,l:e.target.value}))} style={INPUT}/></td>
                  <td style={CELL}><textarea value={editForm.no} onChange={e=>setEditForm(f=>({...f,no:e.target.value}))} style={{...INPUT,height:50,resize:'vertical'}}/></td>
                  <td style={CELL}><input value={editForm.img||''} onChange={e=>setEditForm(f=>({...f,img:e.target.value}))} style={INPUT} placeholder="https://..."/></td>
                  <td style={{...CELL,whiteSpace:'nowrap'}}>
                    <button onClick={handleSaveEdit} style={{background:'#932D28',color:'#fff',border:'none',borderRadius:4,padding:'4px 8px',fontSize:10,cursor:'pointer',marginRight:4}}>Save</button>
                    <button onClick={()=>setEditId(null)} style={{background:'#F5F0EB',border:'none',borderRadius:4,padding:'4px 8px',fontSize:10,cursor:'pointer'}}>✕</button>
                  </td>
                </tr>
              ) : (
                <tr key={p.id} style={{borderBottom:'1px solid #F5F0EB'}}>
                  <td style={{...CELL}}><span style={{background:'#F9F5F2',padding:'2px 6px',borderRadius:3,fontSize:10,fontWeight:600}}>{p.c}</span></td>
                  <td style={{...CELL,fontWeight:600}}>{p.b}</td>
                  <td style={CELL}>{p.n}</td>
                  <td style={{...CELL,color:'#888'}}>{p.s}</td>
                  <td style={{...CELL,whiteSpace:'nowrap',color:'#932D28',fontWeight:600}}>{p.p}</td>
                  <td style={{...CELL,color:'#888',fontSize:10}}>{p.w}</td>
                  <td style={CELL}>{p.l ? <a href={p.l} target="_blank" rel="noopener noreferrer" style={{color:'#932D28',fontSize:10}}>Link ↗</a> : <span style={{color:'#DDD',fontSize:10}}>—</span>}</td>
                  <td style={{...CELL,color:'#666',maxWidth:200}}>{p.no}</td>
                  <td style={CELL}>{p.img ? <img src={p.img} style={{width:36,height:36,objectFit:'cover',borderRadius:4}} alt=""/> : <span style={{color:'#DDD',fontSize:10}}>—</span>}</td>
                  <td style={{...CELL,whiteSpace:'nowrap'}}>
                    <button onClick={()=>handleEdit(p)} style={{background:'none',border:'1px solid #EDE8E0',borderRadius:4,padding:'3px 7px',fontSize:10,cursor:'pointer',marginRight:4,color:'#666'}}>Edit</button>
                    <button onClick={()=>handleDelete(p.id)} style={{background:'none',border:'1px solid #EDBBBB',borderRadius:4,padding:'3px 7px',fontSize:10,cursor:'pointer',color:'#932D28'}}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState] = useState('greeting'); // greeting | look | chatting | ended
  const [season, setSeason] = useState(null);
  const [look, setLook] = useState(null);
  const [productCat, setProductCat] = useState(null);
  const [messages, setMessages] = useState([]); // {role, content}
  const [apiHistory, setApiHistory] = useState([]); // for Claude API
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(PRODUCTS_DEFAULT);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [adminSession, setAdminSession] = useState(''); // stores verified password for this session
  const [ready, setReady] = useState(false);
  const bottomRef = useRef();
  const inputRef = useRef();

  // Load shared products from server on startup
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.ok && data.products) setProducts(data.products);
        // If data.ok is false, silently use PRODUCTS_DEFAULT (KV not configured yet)
      } catch {}
      setReady(true);
    })();
  }, []);

  // Save products to server so ALL users see the update
  const saveProducts = async (prods, pw) => {
    setProducts(prods);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw || adminSession, products: prods })
      });
      const data = await res.json();
      if (!data.ok) {
        return { ok: false, msg: data.error || 'Save failed — check that Upstash KV is connected and redeploy.' };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, msg: 'Network error — could not reach the server.' };
    }
  };

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({behavior:'smooth'}), 50);
  }, [messages, loading, state]);

  // Build system prompt
  const buildSystemPrompt = useCallback((s, l, pc) => {
    const profile = SEASON_PROFILES[s] || {};
    // Always pass ALL products for the season — AI handles any category the user asks about
    const prods = products[s] || [];
    const prodList = prods.map(p => `[${p.c}] ${p.b} "${p.n}" | shade: ${p.s} | ${p.p} | ${p.w}${p.l?' | '+p.l:''} | ${p.no}`).join('\n');
    return `You are VEU, the makeup guide for VEU Alchemist Singapore. Friendly, brief, direct — beauty bestie energy, not a lecture.

SEASON: ${s}
MAKEUP DIRECTION: ${profile.direction || ''}
AVOID: ${profile.avoid || ''}
LOOK GOAL: ${l || 'general'}

PRODUCT LIST — recommend ONLY from this, never invent products:
${prodList}

RULES:
- Recommend exactly 2 products per message
- The user may ask about any category at any point — always follow what they ask for
- Your opening line should be short, warm, and varied (1 sentence max) — e.g. "Here are two gorgeous lip picks for you ✨" or "These two will look stunning on you 💄"
- After the 2 products, close with a short friendly line asking if they want 2 more or want to switch to a different product type
- Format EACH product exactly like this — no exceptions, no extra dashes or separators between fields:

Product: [Brand] [Product Name] (~[price])
Shade: [Shade Name]
Shop: [where to buy][if there is a link, add " · " then [Shop →](link)]
Reason: [one sentence on why this suits their season specifically]

- Leave one blank line between the two products
- Never use --- or bullet points inside the product block
- Don't repeat products already recommended in this conversation
- Never recommend anything not on the list above
- IMPORTANT: You MUST recommend any product the user asks about by brand name if it exists in the list, even if the notes field is short or empty. If the notes are sparse, write your own Reason based on the season profile and product type — never refuse to recommend a listed product
- If the user asks for a specific brand and it's in the list, always recommend it`;
  }, [products]);

  // Call Claude API
  const callAI = useCallback(async (history, s, l, pc) => {
    setLoading(true);
    try {
      const systemPrompt = buildSystemPrompt(s, l, pc);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, messages: history })
      });
      const data = await response.json();
      if (data.error) {
        console.error('API error:', data.error);
        return `Something went wrong: ${typeof data.error === 'string' ? data.error : JSON.stringify(data.error)}`;
      }
      const text = data.content?.[0]?.text || "Hmm, something went sideways — give me a moment and try again! ✨";
      return text;
    } catch (err) {
      console.error('Fetch error:', err);
      return "Oops, a little glitch on my end! Try sending your message again. ✨";
    } finally {
      setLoading(false);
    }
  }, [buildSystemPrompt]);

  // Handle season selection
  const handleSeasonSelect = async (s) => {
    if (s === 'not_sure') {
      const msg = {role:'assistant', content:`No worries! Knowing your season makes such a difference — Eunice does personalised **Seasonal Colour Analysis** sessions if you'd like to find yours.\n\n👉 [Book here →](https://www.veu-alchemist.com/services-1)\n\nIn the meantime, happy to help you browse anyway!`};
      setMessages([msg]);
      setState('not_sure');
    } else {
      setSeason(s);
      const msg = {role:'assistant', content:`${SEASON_EMOJIS[s]} **${s}** — love it! What look are you going for?`};
      setMessages([msg]);
      setState('look');
    }
  };

  // Handle look + product cat selection
  const handleLookSelect = (l) => {
    setLook(l);
    const msg = {role:'assistant', content:`${l} — nice! What are you looking for?`};
    setMessages(prev => [...prev, msg]);
  };

  const handleCatSelect = async (pc) => {
    setProductCat(pc);
    setState('chatting');
    const initMsg = `I'm ${season}. I want a ${look} look. Start with ${pc} — recommend 2 products.`;
    const history = [{role:'user', content:initMsg}];
    setApiHistory(history);
    const reply = await callAI(history, season, look, pc);
    const newHistory = [...history, {role:'assistant', content:reply}];
    setApiHistory(newHistory);
    setMessages(prev => [...prev, {role:'assistant', content:reply}]);
  };

  // Handle user message
  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const userMsg = {role:'user', content:text};
    setMessages(prev => [...prev, userMsg]);
    const newHistory = [...apiHistory, userMsg];
    setApiHistory(newHistory);
    const reply = await callAI(newHistory, season, look, productCat);
    const finalHistory = [...newHistory, {role:'assistant', content:reply}];
    setApiHistory(finalHistory);
    setMessages(prev => [...prev, {role:'assistant', content:reply}]);
    inputRef.current?.focus();
  };

  const handleMore = async () => {
    const moreMsg = {role:'user', content:'Yes please, show me 2 more options!'};
    setMessages(prev => [...prev, moreMsg]);
    const newHistory = [...apiHistory, moreMsg];
    setApiHistory(newHistory);
    const reply = await callAI(newHistory, season, look, productCat);
    const finalHistory = [...newHistory, {role:'assistant', content:reply}];
    setApiHistory(finalHistory);
    setMessages(prev => [...prev, {role:'assistant', content:reply}]);
  };

  const handleEndChat = async () => {
    setState('ended');
    const byeMsg = {role:'assistant', content:`So glad I could help! ✨ Wear your colours with confidence — that's what your season is for. Come back anytime.\n\n*— VEU*`};
    setMessages(prev => [...prev, byeMsg]);
  };

  const handleRestart = () => {
    setState('greeting');
    setSeason(null);
    setLook(null);
    setProductCat(null);
    setMessages([]);
    setApiHistory([]);
    setInput('');
  };

  const handleAdminClick = () => {
    setPwInput('');
    setPwError(false);
    setShowPwModal(true);
  };

  const handlePwSubmit = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwInput })
      });
      const data = await res.json();
      if (data.ok) {
        setAdminSession(pwInput); // store for use when saving
        setShowPwModal(false);
        setShowAdmin(true);
        setPwInput('');
        setPwError(false);
      } else {
        setPwError(true);
        setPwInput('');
      }
    } catch {
      setPwError(true);
      setPwInput('');
    }
  };

  // Handle not_sure proceed
  const handleNotSureProceed = () => {
    setSeason(null);
    const msg = {role:'assistant', content:`Let's explore! What kind of look are you going for?`};
    setMessages(prev => [...prev, msg]);
    setState('look_general');
  };

  // For general (no season) chat
  const handleCatSelectGeneral = async (pc) => {
    setProductCat(pc);
    setState('chatting');
    const initMsg = `I don't know my colour season yet but I want a ${look} look. I'm looking for ${pc} products. Can you recommend 2 versatile options that work across many different seasons?`;
    const systemPrompt = `You are VEU, the warm AI guide for VEU Alchemist Singapore. The user doesn't know their colour season yet. Recommend universally flattering products from your knowledge — pick well-loved, widely available products that suit a range of skin tones and undertones.

RULES:
- Recommend exactly 2 products per message
- Your opening line should be short and warm (1 sentence max)
- After the 2 products, ask if they want 2 more or want to switch category, and gently suggest they book a colour analysis at https://www.veu-alchemist.com/services-1 for truly personalised picks
- Format EACH product exactly like this — no exceptions:

Product: [Brand] [Product Name] (~[price in SGD])
Shade: [Shade Name]
Shop: [where to buy in Singapore]
Reason: [one sentence on why this is universally flattering]

- Leave one blank line between the two products
- Never use --- or bullet points inside the product block
- Don't repeat products already recommended in this conversation`;
    const history = [{role:'user', content:initMsg}];
    setApiHistory(history);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, messages: history })
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "Let me find something for you! ✨";
      const newHistory = [...history, {role:'assistant', content:text}];
      setApiHistory(newHistory);
      setMessages(prev => [...prev, {role:'assistant', content:text}]);
    } catch { setMessages(prev => [...prev, {role:'assistant', content:"Oops, try again! ✨"}]); }
    setLoading(false);
  };

  const isLookGeneral = state === 'look_general';
  const isLookState = state === 'look' || isLookGeneral;
  const showLookPicker = isLookState && look === null;
  const showCatPicker = isLookState && look !== null;
  const showInput = state === 'chatting';

  // Cloud positions
  const clouds = [
    {x:-8,y:5,w:220,h:88,dur:28,delay:0},
    {x:30,y:60,w:160,h:64,dur:35,delay:8},
    {x:70,y:15,w:180,h:72,dur:25,delay:14},
    {x:-15,y:40,w:140,h:56,dur:40,delay:5},
    {x:55,y:78,w:200,h:80,dur:32,delay:20},
    {x:85,y:35,w:150,h:60,dur:38,delay:12},
  ];

  if (!ready) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:"'Montserrat',sans-serif",color:'#B8A8A0',letterSpacing:'0.15em',fontSize:12}}>Loading...</div>;

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',fontFamily:"'Montserrat',sans-serif",background:'#FDF8F5',position:'relative',overflow:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
        @keyframes floatCloud { 0% { transform: translateX(-250px); opacity:0; } 5% { opacity:1; } 90% { opacity:1; } 100% { transform: translateX(110vw); opacity:0; } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        @keyframes pulse { 0%,80%,100% { opacity:0.3; transform:scale(0.8); } 40% { opacity:1; transform:scale(1); } }
        @keyframes spinIn { from { opacity:0; transform:scale(0.9) rotate(-2deg); } to { opacity:1; transform:scale(1) rotate(0); } }
        .msg-in { animation: fadeIn 0.35s ease; }
        .chat-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .chat-btn { transition: all 0.2s; }
        .send-btn:hover { background: #7A2420 !important; }
        .end-btn:hover { background: #FFF0EE !important; }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #EDE8E0; border-radius: 2px; }
      `}</style>

      {/* Animated clouds background */}
      {clouds.map((c,i) => (
        <div key={i} style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
          <div style={{position:'absolute',top:`${c.y}%`,animation:`floatCloud ${c.dur}s linear ${c.delay}s infinite`,willChange:'transform'}}>
            <Cloud style={{width:c.w,height:c.h}} />
          </div>
        </div>
      ))}

      {/* Header */}
      <div style={{background:'rgba(255,255,255,0.92)',backdropFilter:'blur(8px)',borderBottom:'1px solid #EDE8E0',padding:'12px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',zIndex:10,flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <img src={LOGO} alt="VEU" style={{width:32,height:32,borderRadius:'50%',objectFit:'cover',border:'1.5px solid #F1BAB3'}}/>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,letterSpacing:'0.2em',color:'#932D28',fontWeight:300,lineHeight:1}}>VEU ALCHEMIST</div>
            <div style={{fontSize:8.5,color:'#C0B8B0',letterSpacing:'0.18em',textTransform:'uppercase',marginTop:1}}>Beauty Guide</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {season && <div style={{fontSize:9.5,background:'#FDF0EE',color:'#932D28',padding:'4px 10px',borderRadius:12,fontWeight:600,letterSpacing:'0.06em',border:'1px solid #F5CCC8'}}>{SEASON_EMOJIS[season]} {season}</div>}
          <button onClick={handleAdminClick} title="Product library" style={{background:'none',border:'1px solid #EDE8E0',borderRadius:6,width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:14,color:'#C0B8B0'}} className="chat-btn">⚙</button>
        </div>
      </div>

      {/* Chat area — unified scroll container, all messages always visible */}
      <div style={{flex:1,minHeight:0,overflowY:'auto',padding:'16px 14px',zIndex:1,display:'flex',flexDirection:'column',gap:14}}>

        {/* Always-visible greeting message */}
        <AiMessage content={`Hello there! ✨ I'm **VEU**, your makeup colour guide.\n\nI'll recommend products that actually suit your colour season — so your looks feel effortless, not random.\n\nWhat's your colour season?`} />

        {/* Season picker (only on greeting state) */}
        {state === 'greeting' && (
          <div className="msg-in" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,maxWidth:400,marginLeft:46}}>
            {SEASONS.map(s => (
              <button key={s} onClick={()=>handleSeasonSelect(s)} className="chat-btn" style={{background:'rgba(255,255,255,0.9)',border:`1.5px solid ${SEASON_COLORS[s]}30`,borderRadius:10,padding:'10px 12px',cursor:'pointer',fontFamily:'inherit',textAlign:'left',display:'flex',alignItems:'center',gap:8,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <span style={{fontSize:16}}>{SEASON_EMOJIS[s]}</span>
                <span style={{fontSize:11,fontWeight:500,color:'#333',letterSpacing:'0.03em'}}>{s}</span>
              </button>
            ))}
            <button onClick={()=>handleSeasonSelect('not_sure')} className="chat-btn" style={{background:'rgba(255,255,255,0.9)',border:'1.5px solid #EDE8E0',borderRadius:10,padding:'10px 12px',cursor:'pointer',fontFamily:'inherit',textAlign:'left',gridColumn:'1/-1',display:'flex',alignItems:'center',gap:8,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <span style={{fontSize:16}}>🤔</span>
              <span style={{fontSize:11,fontWeight:500,color:'#888',letterSpacing:'0.03em'}}>I'm not sure</span>
            </button>
          </div>
        )}

        {/* All accumulated messages (shown from first reply onwards) */}
        {messages.map((m,i) => {
          const isLast = i === messages.length - 1;
          const isChatting = state === 'chatting';
          const isEnded = state === 'ended';
          if (m.role === 'assistant') {
            return <AiMessage key={i} content={m.content}
              seasonProducts={season ? (products[season] || []) : []}
              onMore={(isChatting && isLast && !loading) ? handleMore : null}
              onEnd={(isChatting && isLast && !loading) ? handleEndChat : null}
            />;
          }
          return <UserMessage key={i} content={m.content}/>;
        })}

        {/* Not sure — browse button */}
        {state === 'not_sure' && (
          <div className="msg-in" style={{marginLeft:46,display:'flex',gap:8,flexWrap:'wrap'}}>
            <button onClick={handleNotSureProceed} className="chat-btn" style={{background:'#F9D9D7',border:'none',borderRadius:20,padding:'9px 18px',fontSize:11,cursor:'pointer',fontFamily:'inherit',color:'#932D28',fontWeight:600}}>Browse makeup anyway</button>
          </div>
        )}

        {/* Look picker */}
        {isLookState && look === null && (
          <div className="msg-in" style={{marginLeft:46}}>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {LOOKS.map(l => (
                <button key={l} onClick={()=>handleLookSelect(l)} className="chat-btn" style={{background:'rgba(255,255,255,0.9)',border:'1.5px solid #EDE8E0',borderRadius:20,padding:'8px 16px',fontSize:11,cursor:'pointer',fontFamily:'inherit',color:'#555',boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}>{l}</button>
              ))}
            </div>
          </div>
        )}

        {/* Product category picker */}
        {isLookState && look !== null && (
          <div className="msg-in" style={{marginLeft:46}}>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {PRODUCT_CATS.map(pc => (
                <button key={pc} onClick={()=>isLookGeneral ? handleCatSelectGeneral(pc) : handleCatSelect(pc)} className="chat-btn" style={{background:'rgba(255,255,255,0.9)',border:'1.5px solid #EDE8E0',borderRadius:20,padding:'8px 16px',fontSize:11,cursor:'pointer',fontFamily:'inherit',color:'#555',boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}>{pc}</button>
              ))}
            </div>
          </div>
        )}

        {/* Restart button */}
        {state === 'ended' && (
          <div className="msg-in" style={{textAlign:'center',padding:'20px 0'}}>
            <button onClick={handleRestart} className="chat-btn" style={{background:'#932D28',color:'#fff',border:'none',borderRadius:20,padding:'12px 28px',fontSize:11,fontWeight:700,cursor:'pointer',letterSpacing:'0.12em',textTransform:'uppercase',fontFamily:'inherit',boxShadow:'0 4px 16px rgba(147,45,40,0.3)'}}>✨ Start New Chat</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{display:'flex',alignItems:'flex-end',gap:10,marginLeft:0}}>
            <div style={{width:34,height:34,borderRadius:'50%',overflow:'hidden',flexShrink:0,border:'1.5px solid #F1BAB3',display:'flex',alignItems:'center',justifyContent:'center',background:'#FDF0EE'}}>
              <img src={LOGO} alt="VEU" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            </div>
            <div style={{background:'#fff',borderRadius:'18px 18px 18px 4px',padding:'12px 16px',boxShadow:'0 2px 12px rgba(0,0,0,0.07)',border:'1px solid #F5F0EB'}}>
              <div style={{display:'flex',gap:5,alignItems:'center'}}>
                {[0,0.2,0.4].map((d,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#D0A8A0',animation:`pulse 1.2s ease-in-out ${d}s infinite`}}/>)}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      {/* Input area */}
      {showInput && (
        <div style={{background:'rgba(255,255,255,0.92)',backdropFilter:'blur(8px)',borderTop:'1px solid #EDE8E0',padding:'10px 14px',zIndex:10,flexShrink:0,display:'flex',gap:8,alignItems:'flex-end'}}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend();}}}
            placeholder="Ask anything about your look..."
            rows={1}
            style={{flex:1,border:'1.5px solid #EDE8E0',borderRadius:20,padding:'10px 16px',fontSize:12,fontFamily:'inherit',resize:'none',lineHeight:1.5,background:'#FDFAF7',color:'#333',maxHeight:100,overflowY:'auto'}}
          />
          <button onClick={handleSend} disabled={!input.trim()||loading} className="send-btn chat-btn" style={{background:'#932D28',color:'#fff',border:'none',borderRadius:'50%',width:38,height:38,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,fontSize:16,opacity:(!input.trim()||loading)?0.4:1,boxShadow:'0 2px 8px rgba(147,45,40,0.3)'}}>↑</button>
        </div>
      )}

      {/* Password gate modal */}
      {showPwModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:400,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div style={{background:'#fff',borderRadius:12,padding:'28px 28px 24px',maxWidth:320,width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.25)'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:'#932D28',letterSpacing:'0.1em',marginBottom:6}}>Owner Access</div>
            <div style={{fontSize:11,color:'#B0A8A0',marginBottom:20,letterSpacing:'0.04em'}}>Enter your password to manage products.</div>
            <input
              type="password"
              value={pwInput}
              onChange={e=>{setPwInput(e.target.value);setPwError(false);}}
              onKeyDown={e=>e.key==='Enter'&&handlePwSubmit()}
              placeholder="Password"
              autoFocus
              style={{width:'100%',border:`1.5px solid ${pwError?'#E05050':'#EDE8E0'}`,borderRadius:8,padding:'10px 14px',fontSize:13,fontFamily:'inherit',boxSizing:'border-box',outline:'none',marginBottom:pwError?6:14,background:'#FDFAF7'}}
            />
            {pwError && <div style={{fontSize:11,color:'#E05050',marginBottom:12,letterSpacing:'0.04em'}}>Incorrect password. Try again.</div>}
            <div style={{display:'flex',gap:8}}>
              <button onClick={handlePwSubmit} style={{flex:1,background:'#932D28',color:'#fff',border:'none',borderRadius:8,padding:'10px 0',fontSize:11,fontWeight:700,cursor:'pointer',letterSpacing:'0.1em',fontFamily:'inherit'}}>ENTER</button>
              <button onClick={()=>setShowPwModal(false)} style={{flex:1,background:'#F5F0EB',color:'#888',border:'none',borderRadius:8,padding:'10px 0',fontSize:11,cursor:'pointer',fontFamily:'inherit'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showAdmin && <AdminPanel products={products} onSave={(p)=>saveProducts(p, adminSession)} onClose={()=>setShowAdmin(false)}/>}
    </div>
  );
}

// ─── Message components ───────────────────────────────────────────────────────
function AiMessage({ content, isLast, onMore, onEnd, seasonProducts }) {
  return (
    <div className="msg-in" style={{display:'flex',alignItems:'flex-end',gap:10}}>
      <div style={{width:34,height:34,borderRadius:'50%',overflow:'hidden',flexShrink:0,border:'1.5px solid #F1BAB3',background:'#FDF0EE',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={LOGO} alt="VEU" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
      </div>
      <div style={{maxWidth:'78%'}}>
        <div style={{background:'#fff',borderRadius:'18px 18px 18px 4px',padding:'12px 16px',boxShadow:'0 2px 12px rgba(0,0,0,0.07)',border:'1px solid #F5F0EB',fontSize:13,lineHeight:1.65,color:'#2A2018'}}>
          <RichText text={content} seasonProducts={seasonProducts}/>
        </div>
        {(onMore || onEnd) && (
          <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
            {onMore && <button onClick={onMore} className="chat-btn end-btn" style={{background:'#FDF0EE',border:'1px solid #F5CCC8',borderRadius:16,padding:'6px 14px',fontSize:10.5,cursor:'pointer',fontFamily:'inherit',color:'#932D28',fontWeight:600,letterSpacing:'0.05em'}}>Show me 2 more ✨</button>}
            {onEnd && <button onClick={onEnd} className="chat-btn" style={{background:'none',border:'1px solid #EDE8E0',borderRadius:16,padding:'6px 14px',fontSize:10.5,cursor:'pointer',fontFamily:'inherit',color:'#B8B0A8',letterSpacing:'0.05em'}}>End chat</button>}
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ content }) {
  return (
    <div className="msg-in" style={{display:'flex',justifyContent:'flex-end'}}>
      <div style={{background:'linear-gradient(135deg,#d75c61,#932D28)',borderRadius:'18px 18px 4px 18px',padding:'10px 16px',maxWidth:'72%',fontSize:13,lineHeight:1.6,color:'#fff',boxShadow:'0 2px 12px rgba(147,45,40,0.2)'}}>
        {content}
      </div>
    </div>
  );
}
