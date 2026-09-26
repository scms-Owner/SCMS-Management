# SCMS Management

SCMS (Sohanur Construction & Manpower Solution) Management is a mobile-first construction ERP foundation for:

- Workers and worker assignments
- Clients and multiple simultaneous projects/sites
- Contract work measurements and rate-based billing
- Manpower supply with client rate vs worker rate
- Decimal Hajira / attendance
- Daily pocket money and worker advances
- Weekly/monthly worker settlements
- Client cash receipts and billing
- Project expenses and cash ledger
- Project profitability and outstanding reports
- Correction requests and audit history
- Admin, Foreman, Worker and Client access patterns

## Current stack

- React + TypeScript + Vite
- Neon PostgreSQL 18
- Neon Auth / Better Auth
- Neon Data API
- GitHub Pages deployment
- PostgreSQL RLS for authenticated access control

The production Neon project is separate from the old SCMS Profile Supabase project.

## Neon project

- Project: `SCMS Manegment`
- Project ID: `muddy-term-80898072`
- Branch: `production`
- Database: `neondb`
- Region: `AWS ap-southeast-1`

No database passwords or private connection strings are stored in the frontend repository. The browser uses Neon Auth plus the Neon Data API.

## First-time admin setup

1. Open the SCMS Management site.
2. Create the first account from the Sign up screen.
3. Tell the project administrator that the account has been created.
4. The account must then be assigned the `ADMIN` role in Neon Auth before protected SCMS data is available.

After the first admin is assigned, the admin can create the remaining user profiles and assign project/worker/client relationships.

## Database model

The `app` schema contains 21 core tables plus reporting views for:

- project profitability
- client outstanding
- worker due
- current cash

The schema intentionally uses status/void/correction workflows for financial records instead of destructive deletes.
