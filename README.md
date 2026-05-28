# VEU Alchemist — Beauty Guide Chat

An AI-powered makeup recommendation chat built for [VEU Alchemist](https://www.veu-alchemist.com). Users select their colour season and get personalised product recommendations from the VEU product library.

---

## Deploy to Vercel (recommended — 5 minutes)

### Step 1 — Push this repo to GitHub
1. Create a new repo on [github.com](https://github.com) (name it `veu-alchemist-chat`)
2. Upload all these files into it (drag and drop works)

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (free account)
2. Click **Add New → Project**
3. Import your GitHub repo
4. Vercel will auto-detect it as a Vite project — no build settings needed

### Step 3 — Add your API key
1. In your Vercel project, go to **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from [console.anthropic.com](https://console.anthropic.com) → API Keys
3. Click **Save**

### Step 4 — Deploy
Click **Redeploy** (or it deploys automatically). Your chat will be live at `your-project.vercel.app`.

> Users open the URL and start chatting — no API key entry, no setup.

---

## Run locally (for testing)

```bash
npm install
```

Create a `.env` file (copy from `.env.example`):
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Start the dev server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Updating products

The product library is managed in the chat itself:
1. Open the chat in a browser
2. Click the **⚙** icon (top right)
3. Enter the owner password (`veu2026` — change this in `src/App.jsx`)
4. Add, edit, or delete products per season
5. Changes save to the browser's localStorage on that device

---

## File structure

```
veu-alchemist-chat/
├── api/
│   └── chat.js          ← Serverless proxy (keeps API key server-side)
├── src/
│   ├── main.jsx          ← React entry point
│   └── App.jsx           ← Full chat application
├── index.html            ← HTML shell
├── vite.config.js        ← Build config
├── vercel.json           ← Vercel routing config
├── package.json
├── .env.example          ← Copy to .env for local dev
└── .gitignore            ← Ignores .env and node_modules
```

---

## Tech stack

- **React 18** + **Vite** — frontend
- **Vercel serverless functions** — API proxy
- **Anthropic Claude** (`claude-sonnet-4-20250514`) — AI recommendations
- **localStorage** — product library persistence (admin only)
