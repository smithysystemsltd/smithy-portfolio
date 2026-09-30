# APPRIC Public Site

A standalone public website for APPRIC. This project contains only the public-facing experience:

- Home
- About
- Services
- Portfolio
- Contact

The employee portal, authentication, dashboard, MongoDB connection, and blog are intentionally excluded.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

The contact form posts to `/api/contact` and emails enquiries to `smithysystemsltd@gmail.com` through [Resend](https://resend.com/). No database is required.

Set these environment variables in `.env.local` for local development and in the production hosting environment:

```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=Website enquiries <contact@your-verified-domain.com>
```

Create a Resend API key and verify the sending domain/address with Resend before enabling delivery. `RESEND_FROM_EMAIL` must be an address Resend allows you to send from. The visitor's email is set as the reply-to address so enquiries can be answered directly.
