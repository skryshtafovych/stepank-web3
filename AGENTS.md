# AGENTS.md

## Project summary
- React + Vite frontend with an Express backend.
- Backend rewrites the "About Me" text via Google Gemini.
- Production build output is served from `dist/` by `server.js`.

## Key files and entry points
- `src/App.jsx`: main UI component (frontend run file).
- `src/main.jsx`: mounts `App` into the DOM.
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
- Do not commit secrets, `.env`, or `dist/`.
- `server.js` exits if `GEMINI_API_KEY` is missing.
- Update README if you change setup or commands.
