# SCMS Management

Management application for **Sohanur Construction & Manpower Solution (SCMS)**.

## Current phase
This repository contains the frontend foundation only. **Supabase is intentionally not connected yet.**

## Planned system areas
- Admin dashboard
- Worker management and project assignments
- Client management
- Multiple simultaneous projects/sites
- Contract work with measurement-based billing
- Manpower supply
- Decimal Hajira / attendance
- Worker advances and daily pocket money
- Weekly/monthly worker settlements
- Client cash receipts and billing
- Project/company expenses
- Cash ledger
- Project revenue, cost and profit
- Foreman, Worker and Client portals
- Correction request workflow
- Audit logs
- Reports

## Architecture direction
- React + TypeScript + Vite
- Supabase will be connected in a later phase
- Role-based access will be enforced with database RLS after the database is introduced
- Financial records should use controlled correction/void workflows rather than hard deletion

## Safety
This repository is separate from SCMS-Profile. The existing profile website and its Supabase project are not part of this application.

## Local development
1. Install dependencies with `npm install`
2. Start development with `npm run dev`
3. Build with `npm run build`
