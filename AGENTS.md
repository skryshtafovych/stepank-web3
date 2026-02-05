# AGENTS.md

This file guides automated agents working on this repo.

## Project overview
- React + Vite frontend in `src/`
- Express API in `server.js` (Gemini rewrite endpoint)
- Static assets in `public/`
- Deployment config in `app.yaml` and `Dockerfile`

## Local setup
1. Install dependencies:
   - `npm install`
2. Create `.env` in the repo root:
   - `GEMINI_API_KEY=...` (required for server startup)
   - `RECAPTCHA_SECRET_KEY=...` (required for reCAPTCHA verification)

## Run and build
- `npm run dev` (Vite + API server via concurrently)
- `npm run server` (API only, port 3001 by default)
- `npm run build` (Vite production build to `dist/`)
- `npm run preview` (preview the production build)
- `npm run lint` (ESLint)

## Notes for changes
- Keep edits small and focused; avoid unrelated refactors.
- Follow existing JSX and CSS patterns in `src/`.
- Do not commit secrets or `.env` files.
- Update README if you change setup or commands.
# AGENTS.md

## Project summary
- React + Vite frontend with an Express backend.
- Backend rewrites the "About Me" text via Google Gemini.
- Production build output is served from `dist/` by `server.js`.

## Key paths
- `src/`: React components, CSS, and client utilities.
- `server.js`: Express API + static file server.
- `public/`: static assets.
- `app.yaml`, `Dockerfile`: deployment configuration.

## Local setup
1. Install deps:
   - `npm install`
2. Create `.env` in the repo root:
   - `GEMINI_API_KEY=...`
   - Optional: `RECAPTCHA_SECRET_KEY=...`
   - Optional: `PORT=3001`

## Common commands
- `npm run dev` (starts Vite + backend server)
- `npm run server` (backend only)
- `npm run build` (Vite production build to `dist/`)
- `npm run preview` (Vite preview)
- `npm run lint` (ESLint)

## API
- `POST /api/rewrite` with JSON `{ "text": "..." }`
  - Returns `{ "rewrittenText": "..." }`

## Testing
- No automated tests are configured.
- Use `npm run lint` and manual testing via `npm run dev`.

## Notes for changes
- Keep frontend changes inside `src/` and styles in related `.css` files.
- Do not commit `dist/` or other build artifacts.
- `server.js` exits if `GEMINI_API_KEY` is missing.
