# SERIÉ

Official website for SERIÉ, built with Next.js. This repository contains the production codebase for the live site, migrated from an earlier Vite-based build with no changes to design or functionality.

## Overview

The site preserves the original design, content, scrolling effects, preloader timing, external booking destination, and desktop-only circular text exactly as they were in the previous version. No CMS or new pages were introduced during the migration — this is a framework upgrade, not a redesign.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React, Tailwind CSS
- **Bundler:** Webpack (both development and production)
- **Linting:** ESLint
- **Package manager:** npm

The project uses a root `app/` directory (no `src/`) with a `@/*` import alias. The React Compiler is disabled.

## Getting Started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

- `app/` — App Router routes, root layout, metadata, and error/404 pages
- `components/` — shared visual and interactive components
- `views/` — page designs composed by the App Router routes
- `data/` — service details, FAQs, policies, and training copy
- `public/assets/` — images and video assets

## Environment Variables

Copy `.env.example` to `.env.local` and provide the `NEXT_PUBLIC_EMAILJS_*` values (the older `VITE_*` names from the previous build are no longer used). These are public, client-side identifiers — no private EmailJS key should be added. Contact forms degrade gracefully if credentials are missing, but a live test submission is recommended before launch.

## Deployment

Deployed as a standard Next.js project on Vercel using `npm run build` with default Next.js output settings. Do not reuse the old Vite `vercel.json` rewrites or set the output to `dist`. Add the `NEXT_PUBLIC_EMAILJS_*` values to the hosting environment and trigger a rebuild. Legacy service URLs redirect to their canonical pages; unrecognized URLs fall through to the App Router 404 page.