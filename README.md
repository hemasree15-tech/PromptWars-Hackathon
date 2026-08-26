# Sahaay — AI Health Navigator

An AI-powered symptom triage assistant for underserved communities. Built for **PromptWars × Diksuchi EdTech — AI for Social Impact (Healthcare track)**.

Sahaay classifies described symptoms into **Emergency / See a Doctor / Self-Care**, gives one clear next action, and never diagnoses or prescribes.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **Claude (Anthropic API)** — called server-side only, via `app/api/chat/route.ts`
- **Neon (Postgres)** — stores each triage conversation for the "outbreak signal" roadmap idea
- **Vercel** — hosting

## 1. Local setup

```bash
npm install    # or pnpm install
cp .env.example .env
```

Fill in `.env` with your real keys (see steps 2 and 3 below), then:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 2. Get an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com) → **API Keys** → Create Key
2. Put it in `.env` as `ANTHROPIC_API_KEY`

This key is **only** read on the server (`app/api/chat/route.ts`) — it is never sent to the browser.

## 3. Set up Neon (Postgres)

1. Create a free project at [neon.tech](https://neon.tech)
2. In your project, go to **SQL Editor**, paste the contents of `db/schema.sql`, and run it. This creates the `conversations` table used to log triage sessions.
3. Copy your connection string:
3. Go to **Settings → API** and copy:
   - **Connection string** tab → copy the full `postgresql://...` string → `DATABASE_URL`

The connection string is only used inside the API route (`lib/db.ts` → `db()`), never in client code.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Sahaay: AI health navigator"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Your `.env` file is already git-ignored — it will not be pushed.

## 5. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. Before deploying, open **Environment Variables** and add all four from `.env.example`:
   - `ANTHROPIC_API_KEY`
   - `DATABASE_URL`
4. Click **Deploy**

Vercel gives you a live URL (e.g. `sahaay.vercel.app`) — that's what you submit for the hackathon.

## Project structure

```
app/
  api/chat/route.ts     → server-side route that calls Claude + logs to Neon
  layout.tsx             → root layout, metadata
  page.tsx                → landing page + "Start health check" modal
components/
  health-check-chat.tsx  → the working triage chat UI
  ui/                      → shadcn components
lib/
  db.ts                    → server-side Neon (Postgres) client
  utils.ts
db/
  schema.sql               → run once in the Neon SQL editor
```

## Safety notes

Sahaay is a triage aid, not a diagnostic tool. It never gives drug names or dosages, always escalates ambiguous or red-flag symptoms toward professional care, and discloses that it is an AI assistant. This is enforced in the system prompt in `app/api/chat/route.ts` — do not remove those constraints.
