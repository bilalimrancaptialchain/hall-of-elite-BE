# Hall of Elite - Backend

Backend API for the Hall of Elite platform.

## Latest progress

- Express server wired with CORS, cookie parsing, request logging, and error handling.
- Auth module with register/login/logout, JWT issuance, and HTTP-only cookie support.
- Trader endpoints for list and profile retrieval.
- Rewards endpoints for trader eligibility responses.
- Admin endpoints for tier and reward configurations.
- MT5 endpoints wired for accounts, trades, status, connect, and disconnect.
- Prisma schema, migrations, and seed pipeline for core trading and reward models.

## API routes (current)

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /elite/traders`
- `GET /elite/traders/:id`
- `GET /rewards/traders/:id`
- `GET /admin/tiers`
- `GET /admin/tiers/:id`
- `GET /admin/rewards`
- `GET /mt5/accounts`
- `GET /mt5/trades/:accountId`
- `GET /mt5/status`
- `POST /mt5/connect`
- `POST /mt5/disconnect`

## Environment variables

Required:
- `DATABASE_URL`
- `JWT_SECRET` (min 32 chars)

Optional:
- `PORT` (default `6200`)
- `CORS_ORIGIN` (default `http://localhost:6100`)
- `JWT_EXPIRES_IN` (default `7d`)
- `NODE_ENV` (`development` | `production` | `test`)

## Running locally

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```
