# Trạm Tài Chính — Technical Brief

## Kiến trúc bắt buộc

- `tramtaichinh.com`: website nội dung, SEO và công cụ tài chính miễn phí.
- `app.tramtaichinh.com`: ứng dụng quản lý dòng tiền.
- `quanlydongtien.com`: landing page và redirect đến `app.tramtaichinh.com`
  trong MVP.
- Một pnpm monorepo sử dụng Turborepo.
- Hai Next.js App Router applications:
  - `apps/web`
  - `apps/app`
- Supabase cho PostgreSQL, Auth, Storage, Cron và database migrations.
- Vercel để deploy frontend.

Không đặt ứng dụng trực tiếp trên `quanlydongtien.com` trong MVP vì hai tên
miền gốc khác nhau không thể chia sẻ cookie phiên đăng nhập thông thường một
cách đơn giản.

## Nguyên tắc triển khai

1. Dùng Next.js App Router, React, TypeScript strict, pnpm và Turborepo.
2. Không dùng package canary.
3. Pin dependency bằng lockfile.
4. Server Components là mặc định.
5. Chỉ dùng Client Components khi cần form, chart hoặc tương tác trình duyệt.
6. Database-first: viết migration, constraint, index và RLS trước UI nghiệp vụ.
7. Chỉ expose schema `api`.
8. Không expose trực tiếp schema `content`, `finance` hoặc `private`.
9. Không chứa bảng nghiệp vụ trong schema `public`.
10. Không dùng secret/service key trong browser hoặc trong luồng CRUD của người dùng.
11. Mọi bảng chứa dữ liệu người dùng phải có RLS.
12. Viết test xác minh User A không thể đọc hoặc chỉnh sửa dữ liệu của User B.
13. Mọi input phải được validate bằng Zod.
14. Không mass-assign toàn bộ request body vào database.
15. Tiền VND lưu bằng `bigint`, đơn vị đồng.
16. Lãi suất và tỷ lệ lưu bằng PostgreSQL `numeric`; sử dụng Decimal.js trong TypeScript.
17. Không dùng floating point tùy tiện cho phép tính tài chính.
18. Các công thức tài chính phải là pure functions trong `packages/finance-core`.
19. Mỗi công thức phải có `formulaVersion`, assumptions và unit tests.
20. Không lưu mật khẩu ngân hàng, OTP, CVV hoặc toàn bộ số thẻ.
21. Không log số dư, thu nhập, mô tả giao dịch, token hoặc secret.
22. CMS lưu Markdown và render qua sanitizer; không render raw HTML.
23. Admin phải có role trong database và MFA AAL2.
24. Thiết lập CSP, HSTS, `nosniff`, Referrer Policy, Permissions Policy và
    `frame-ancestors`.
25. Thêm CAPTCHA và rate limiting cho endpoint có khả năng bị abuse.
26. Không tạo dữ liệu demo trong production.
27. Không tự ý thêm chức năng ngoài phạm vi MVP.
28. Ưu tiên bảo mật và maintainability hơn tốc độ viết code.

## Cấu trúc monorepo

```text
tram-tai-chinh/
├── apps/
│   ├── web/
│   └── app/
├── packages/
│   ├── ui/
│   ├── finance-core/
│   ├── database-types/
│   ├── validation/
│   ├── config/
│   └── seo/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   ├── tests/
│   ├── functions/
│   └── config.toml
├── docs/
└── .github/workflows/
```

## Thứ tự triển khai

### Milestone 0 — Foundation

- Khởi tạo monorepo.
- Tạo hai Next.js apps.
- Tạo shared packages.
- Cấu hình Supabase local.
- Cấu hình ESLint, TypeScript, Vitest và Playwright.
- Cấu hình GitHub Actions.
- Cấu hình environment validation.
- Thiết lập security headers.
- Tạo design system cơ bản.

### Milestone 1 — Database và authentication

- Tạo migrations.
- Tạo schema `content`, `finance`, `api`, `private`.
- Tạo profile, household và household member.
- Tạo SSR authentication.
- Tạo personal household sau onboarding.
- Viết RLS policies.
- Viết RLS cross-user tests.
- Xây trang login, register, reset password và security settings.

### Milestone 2 — Website nội dung

- Homepage.
- Trang Bắt đầu.
- Category và article pages.
- Admin CMS.
- Markdown rendering có sanitize.
- Draft, preview, publish và revision.
- Sitemap, canonical, metadata, Open Graph và JSON-LD.
- Newsletter.

### Milestone 3 — Quản lý dòng tiền

- Accounts.
- Transaction categories.
- Income, expense và transfer.
- Recurring transactions.
- Monthly budgets.
- Dashboard.
- Net worth.
- CSV export.

### Milestone 4 — Nợ, mục tiêu và calculator

- Debt module.
- Emergency fund.
- Financial goals.
- Financial Health Check.
- Home affordability calculator.
- Home timeline calculator.
- Retirement gap calculator.
- Unit test cho toàn bộ công thức.

### Milestone 5 — Security hardening

- CAPTCHA.
- Custom API rate limiting.
- Admin MFA.
- Audit logs.
- Sentry data scrubbing.
- Backup và restore runbook.
- Threat model.
- Security review.

## Cách làm việc

Trước khi code:

1. Đọc toàn bộ repository và technical brief.
2. Tạo kế hoạch cho milestone hiện tại.
3. Liệt kê các file dự kiến tạo hoặc sửa.
4. Ghi các quyết định kiến trúc vào `docs/ARCHITECTURE.md`.

Sau mỗi milestone, chạy:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm supabase db reset
```

Sau đó báo cáo:

- Những file đã tạo hoặc sửa.
- Migration đã thêm.
- RLS policy đã thêm.
- Test đã chạy.
- Lỗi hoặc rủi ro còn tồn tại.
- Việc cần thực hiện ở milestone tiếp theo.

Không thực hiện toàn bộ hệ thống trong một giant commit. Bắt đầu bằng
**Milestone 0 — Foundation**.
