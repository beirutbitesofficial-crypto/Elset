# منتجات الست — Online Store

React (Vite) store for منتجات الست. Customers pick products, fill in their delivery details, and the order opens in WhatsApp (to +961 81 896 924), ready to send. Payment is cash on delivery.

## Edit products, prices, WhatsApp number

Everything is in `src/config.js`:

- `WHATSAPP_NUMBER`: digits only, with the country code (`96181896924`)
- `PRODUCTS[].price`: set a number (e.g. `8`) to show prices and totals. `0` shows "السعر عند التأكيد"
- `ON_REQUEST`: the products made fresh on request

Product images are in `public/assets/`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Every push to `master` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).
One-time setup: in the repo go to **Settings → Pages → Source** and pick **GitHub Actions**.
