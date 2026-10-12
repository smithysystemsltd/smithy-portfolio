# Smithy Systems Public Site

A standalone public website for Smithy Systems. This project contains only the public-facing experience:

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

The contact form posts to `/api/contact` and sends an enquiry notification and visitor acknowledgement through [Resend](https://resend.com/). No database is required.

Set these environment variables in `.env.local` for local development and in the production hosting environment:

```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=Website enquiries <contact@your-verified-domain.com>
CONTACT_TO_EMAIL=smithysystemsltd@gmail.com
CONTACT_EMAIL=smithysystemsltd@gmail.com
```

Set the same variables in Vercel Project Settings > Environment Variables for each deployment environment. `CONTACT_TO_EMAIL` is the inbox for new enquiries; `CONTACT_EMAIL` is the public address shown to visitors and included in the acknowledgement. `RESEND_FROM_EMAIL` must use a domain verified with Resend, and the visitor's email is set as the reply-to address so enquiries can be answered directly.

To enable delivery, create a Resend API key, add the sending domain in Resend, then publish the exact SPF and DKIM DNS records Resend provides at your domain's DNS host. Wait for Resend to verify both records before testing. Avoid adding a second SPF record if one already exists; merge SPF mechanisms into the existing record. A DMARC policy is also recommended.

The route limits each observed client IP to five valid submission attempts per ten minutes. This lightweight in-memory limit is per running server instance and can reset when a Vercel function instance restarts; use a shared rate-limit store if stronger cross-instance enforcement is needed.
