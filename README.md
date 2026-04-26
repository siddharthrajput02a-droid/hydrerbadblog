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
- `/dashboard` user dashboard with local-state ad posting
- `/admin` mock moderation dashboard

## Notes

- The original request was adapted to remain non-explicit and non-transactional.
- Mock data is stored in `data/profiles.ts`.
- SEO helpers and canonical metadata live in `lib/utils.ts`.
- Reusable UI components live in `components/`.

## Run

1. Install dependencies with `npm install`
2. Start development with `npm run dev`
