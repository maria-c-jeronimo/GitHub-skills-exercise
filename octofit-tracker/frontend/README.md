# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, React Router, and Bootstrap. Start the
API on port `8000` and the frontend with `npm run dev --prefix
octofit-tracker/frontend`.

## API URL configuration

Vite exposes `VITE_CODESPACE_NAME` to the frontend at build/dev-server startup.
In a Codespace, define it in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then calls
`https://your-codespace-name-8000.app.github.dev`. Replace the example with the
value of your Codespace's `CODESPACE_NAME`, and restart the Vite server after
changing `.env.local`.

When `VITE_CODESPACE_NAME` is unset or blank, the frontend safely uses
`http://localhost:8000`.
