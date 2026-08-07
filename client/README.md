# Avasaa Stays - Booking & Journal Platform Client

This directory contains the React (Vite) frontend application.

## Folder Structure

```
client/
├── src/
│   ├── assets/         # Images, fonts, and styling assets
│   ├── components/     # Shared components (Navbar, Footer, etc.)
│   ├── context/        # React context providers (state)
│   ├── data/           # Mock data and local static references
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page layouts (Home, Stay, About, Journal, Book, etc.)
│   ├── services/       # Client API endpoints logic
│   └── utils/          # Client-side helper functions
├── vercel.json         # Vercel configuration for SPA router support
└── package.json
```

---

## Deployment to Vercel

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Import your Git repository.
4. Configure project settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Open **Environment Variables** and add:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com` (your backend URL deployed on Render)
6. Click **Deploy**. Vercel will build and serve your app.

---

## Environment Variables

Every endpoint request inside the client triggers queries using `import.meta.env.VITE_API_URL` to route requests dynamically.

* **Development (Local Host)**:
  - Client `.env`: `VITE_API_URL=http://localhost:5001`
* **Production**:
  - Client Environment: `VITE_API_URL=https://yourbackend.onrender.com`

---

## Local Development & Testing

```bash
npm install
npm run dev
```

To test the production build locally:
```bash
npm run build
npm run preview
```
This serves the production bundles locally to verify correct functionality and load speeds.
