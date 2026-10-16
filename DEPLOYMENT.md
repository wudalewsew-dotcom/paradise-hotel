# Paradise Hotel — Production Deployment Package

This package is prepared from the Paradise Hotel React + Express + MySQL project.

## 1. Important security action
The original development archive contained a backend `.env` file with real-looking SMTP credentials. Those credentials are **not included** in this deployment package. If they were ever used, revoke/rotate the Gmail App Password before production deployment.

Never commit `.env` files, database passwords, JWT secrets, payment credentials, or Google secrets.

## 2. What was corrected for deployment
- Removed backend/frontend `node_modules` and the old React `build` directory.
- Removed development `.env` files.
- Added `backend/.env.example` and `frontend/.env.example`.
- Added a root `.gitignore`.
- Removed private ID-card, receipt, and profile uploads from the deployment archive.
- Removed hard-coded frontend `localhost:5000` asset URLs.
- Frontend asset URLs now follow `REACT_APP_API_URL` or same-origin `/api`.
- Backend CORS now uses `CLIENT_URL`/`FRONTEND_URL` in production instead of allowing every browser origin.
- Removed hard-coded payment-account defaults from backend config.
- Added this deployment checklist.

## 3. Database
Use `database/paradise_hotel.sql` and the supplied migration files in order, or use the project's documented migration/seed procedure.

For production:
1. Create a dedicated database and application user.
2. Import the schema/migrations.
3. Do not use MySQL `root` from the application.
4. Back up the database and test restoration.

## 4. Backend
From `backend/`:

```bash
npm ci --omit=dev
npm start
```

Required environment variables are documented in `backend/.env.example`.

After deployment, test:

`https://YOUR-BACKEND-DOMAIN/api/health`

It should report that the server is running and the database is connected.

## 5. Frontend
From `frontend/` after setting `REACT_APP_API_URL`:

```bash
npm ci
npm run build
```

Deploy the resulting `build/` directory to a static host such as Vercel, Netlify, or Nginx.

## 6. Recommended architecture
- Frontend: Vercel/Netlify/Nginx
- Backend: Render/Railway/VPS
- Database: managed MySQL/MariaDB
- HTTPS: required
- File storage: persistent volume or S3-compatible/object storage

The current upload middleware writes files to local disk. For a multi-instance/cloud deployment, replace this with persistent object storage. In particular, ID cards and payment receipts must not be publicly exposed.

## 7. Google login
Update the Google OAuth authorized JavaScript origins and redirect URIs to the production domain. Do not leave localhost-only OAuth configuration.

## 8. Payments
Before production use, configure and verify the real payment provider credentials/callback URLs. Do not claim Telebirr or bank-transfer automation is production-certified until the provider integration has been tested and approved.

## 9. Final acceptance test
Test all four roles:
- Customer: registration, email activation, login, room booking, table/desk booking, food order, payment, profile, identity verification, review.
- Receptionist: guest operations, booking/check-in/check-out, payment verification, operational status.
- Manager: rooms, menu, tables, promotions, reports and operational monitoring.
- Admin: users/roles, settings, audit/security and system administration.

Also test HTTPS, CORS, email, image uploads, database backup/restore, error handling and mobile responsiveness.
