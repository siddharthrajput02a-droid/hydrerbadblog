# Hyderabad Elite Companions

This repository contains a Next.js App Router frontend for a Hyderabad-only premium companionship and lifestyle directory.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js

## Routes

- `/` home page
- `/hyderabad/[area]` dynamic Hyderabad area pages
- `/profile/[slug]` dynamic profile detail pages
- `/login` frontend-only login UI
- `/ads` public approved user-posted ads
- `/post-ad` profile ad posting form
- `/my-ads` browser-linked ad management
- `/dashboard` alias-style user dashboard for posted ads
- `/admin` mock moderation dashboard
- `/api/ads` Next.js route handler for listing and creating ads
- `/api/ads/[id]` Next.js route handler for editing, moderating, and deleting ads

## Next Backend on Vercel

The ad backend runs inside this Next.js app, so there is no separate backend deploy.

For persistent production ads on Vercel, add Vercel KV to the project and set:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `ADMIN_PIN` for approving or rejecting posted ads from `/admin/dashboard`

Local development falls back to `data/user-ads.json` automatically when those env vars are missing.

## Notes

- The original request was adapted to remain non-explicit and non-transactional.
- Mock data is stored in `data/profiles.ts`.
- User ad storage is handled by `lib/user-ad-store.ts`.
- SEO helpers and canonical metadata live in `lib/utils.ts`.
- Reusable UI components live in `components/`.

## Run

1. Install dependencies with `npm install`
2. Start development with `npm run dev`
