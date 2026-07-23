# Milestone 0 — Foundation

## Phạm vi

- pnpm/Turborepo monorepo.
- Hai Next.js App Router applications.
- Sáu shared packages.
- Strict TypeScript, ESLint, Prettier, Vitest và Playwright.
- Supabase local configuration không có demo data.
- GitHub Actions.
- Environment validation và security headers.
- Design tokens và Server Component UI primitives.

## Ngoài phạm vi

- Database business schema, migrations và RLS.
- Authentication UI hoặc SSR session.
- CMS, article, newsletter.
- Accounts, transactions, budgets, debt và goals.
- Financial calculators.
- CAPTCHA, custom rate limit, Sentry và audit log.

## Exit criteria

- [x] `pnpm lint`
- [x] `pnpm typecheck`
- [x] `pnpm test`
- [x] `pnpm build`
- [ ] `pnpm supabase db reset`
- [x] Không có dependency canary.
- [x] Lockfile được tạo.
- [x] Repo không chứa production demo data hoặc secret.

Nếu Docker không có trong môi trường thực thi, bước Supabase reset phải được
ghi nhận là blocker môi trường và được chạy trong GitHub Actions.

## Validation record — 2026-07-23

- Environment contract: passed.
- ESLint: 8/8 workspace packages passed.
- TypeScript strict: 8/8 workspace packages passed.
- Vitest: 4 files, 7 tests passed.
- Next.js production build: `apps/web` và `apps/app` passed.
- Supabase config: CLI 2.109.1 parse thành công; reset bị chặn vì môi trường
  không cho truy cập Docker daemon.
- Playwright: test/config đã được tạo; browser binary không tải được trong
  network sandbox. GitHub Actions chạy bước này trên runner có network đầy đủ.
