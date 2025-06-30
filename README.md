# Stepank Web3 Portfolio

This is a dynamic portfolio website for Stepan Kryshtafovych, built with React and Vite. It features a client-side AI background generator, a secure backend service to dynamically rewrite content using the Google Gemini API, and an audio visualizer. The entire application is containerized with Docker for consistent and easy deployment.

## Features
- **Dynamic Content:** The "About Me" section is rewritten by a language model for each visitor.
- **AI-Generated Backgrounds:** A unique, fingerprint-based canvas pattern is generated in the background.
- **Audio Visualization:** An interactive audio visualizer for both file-based and microphone input.
- **Secure by Design:** API keys are handled by a backend server and are not exposed to the client.
- **Containerized:** The entire application can be built and run with Docker.

## Local Development

To run the project locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Create Environment File:**
    Create a `.env` file in the project root and add your Google Gemini API key:
    ```
    GEMINI_API_KEY=YOUR_API_KEY
    ```

3.  **Run the Development Server:**
    This command starts both the frontend and the backend server.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Docker Deployment

The application is fully containerized. To build and run it with Docker:

1.  **Build the Image:**
    ```bash
    docker build -t stepank-web3 .
    ```

2.  **Run the Container:**
    Pass your Gemini API key as an environment variable.
    ```bash
    docker run -p 3001:3001 -e GEMINI_API_KEY="YOUR_API_KEY" stepank-web3
    ```
    The application will be available at `http://localhost:3001`.

## Legacy IPFS Deployment
The project was previously configured for decentralized deployment on IPFS. These instructions are preserved below but may require updates to work with the current application structure.

### Build for Production
```bash
npm run build
```

### Deploy to IPFS
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
