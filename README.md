# Stepank Web3 Scaffold

This is a scaffolded React + Vite project ready for decentralized hosting on IPFS and ENS.

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deploy to IPFS

```bash
npm run deploy:ipfs
```
This uses [ipfs-deploy](https://github.com/ipfs-shipyard/ipfs-deploy) to upload the `build/` directory to IPFS and returns a content hash.

## Connect stepank.eth (ENS)
1. Go to your ENS manager (e.g., app.ens.domains).
2. Set the Content Hash record for `stepank.eth` to the returned IPFS hash (format: `ipfs://<hash>`).

## Connect stepank.com (DNSLink)
1. In your DNS provider, add a TXT record for `_dnslink.stepank.com`:
   - Name: `_dnslink`
   - Type: `TXT`
   - Value: `dnslink=/ipfs/<your-ipfs-hash>`
2. Optionally, set up a redirect from stepank.com to your ENS domain (stepank.eth.link or stepank.eth.limo).

## About
- `stepank.com` and `stepank.eth` both point to the same decentralized site.
- No wallet integration is included by default, but you can add web3 features as needed.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
