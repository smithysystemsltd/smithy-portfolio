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

The contact form posts to `/api/contact` and sends an enquiry notification to the business inbox through [Resend](https://resend.com/). It does not send an automatic email to the visitor. No database is required. `BOOKING_URL` defaults to the Smithy Systems Cal.com booking page and can be overridden for another scheduling URL. `NEXT_PUBLIC_SITE_URL` defaults to `https://smithysystems.co.ke` and is the canonical site origin used by metadata and structured data.

Set these environment variables in `.env.local` for local development and in the production hosting environment:



Set the same variables in Vercel Project Settings > Environment Variables for each deployment environment. `CONTACT_TO_EMAIL` is the single business email used for public contact details, structured data, and enquiry notifications; it defaults to `smithysystemsltd@gmail.com` if unset. Confirm that the mailbox receives mail before launch. `RESEND_FROM_EMAIL` must use a domain verified with Resend; it does not need to be a mailbox you monitor. The visitor's email is set as the reply-to address so you can respond directly to their enquiry.

Portfolio projects and case-study details share `app/data/case-studies.ts`. Keep a project in `coming-soon` status until its problem, solution, approved outcome, services, technology stack, timeline, client-approved image, and written publication permission are verified. Projects without an approved cover image use a clearly labeled placeholder; add the image's real dimensions and descriptive alt text before publishing it. Use `CASE_STUDY_TEMPLATE.md` to gather facts and written publication approval.

To enable delivery, create a Resend API key, add the sending domain in Resend, then publish the exact SPF and DKIM DNS records Resend provides at your domain's DNS host. Wait for Resend to verify both records before testing. Avoid adding a second SPF record if one already exists; merge SPF mechanisms into the existing record. A DMARC policy is also recommended.

The route limits each observed client IP to five valid submission attempts per ten minutes. This lightweight in-memory limit is per running server instance and can reset when a Vercel function instance restarts; use a shared rate-limit store if stronger cross-instance enforcement is needed.
