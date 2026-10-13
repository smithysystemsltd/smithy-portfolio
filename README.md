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
BOOKING_URL=
NEXT_PUBLIC_SITE_URL=https://smithysystems.vercel.app
```

Set the same variables in Vercel Project Settings > Environment Variables for each deployment environment. Contact form enquiries and visitor acknowledgements use the business email configured in `config/site.ts`. Confirm that the mailbox receives mail before launch. Remove any legacy `CONTACT_TO_EMAIL` or `CONTACT_EMAIL` overrides from Vercel so they do not cause confusion. `RESEND_FROM_EMAIL` must use a domain verified with Resend, and the visitor's email is set as the reply-to address so enquiries can be answered directly. `BOOKING_URL` is optional; the booking button is hidden if it is empty.

Portfolio case studies are managed in `app/data/case-studies.ts`. Keep a study unpublished until its problem, solution, approved outcome, services, technology stack, timeline, at least one client-approved image, and written publication permission are verified. Unpublished studies are omitted from the case-study sitemap. Use `CASE_STUDY_TEMPLATE.md` to gather facts and written publication approval. When adding approved images, add descriptive alt text, clear the screenshot placeholder, and set both `published` and `publicationApproved` to `true`.

To enable delivery, create a Resend API key, add the sending domain in Resend, then publish the exact SPF and DKIM DNS records Resend provides at your domain's DNS host. Wait for Resend to verify both records before testing. Avoid adding a second SPF record if one already exists; merge SPF mechanisms into the existing record. A DMARC policy is also recommended.

The route limits each observed client IP to five valid submission attempts per ten minutes. This lightweight in-memory limit is per running server instance and can reset when a Vercel function instance restarts; use a shared rate-limit store if stronger cross-instance enforcement is needed.
