# Kiến trúc Trạm Tài Chính

Tài liệu này ghi các quyết định kiến trúc đang có hiệu lực. Mọi milestone sau
phải cập nhật tài liệu trước khi thay đổi ranh giới hệ thống.

## 1. Domain và deployment

| Domain                 | Vercel project       | Source     | Vai trò                                                |
| ---------------------- | -------------------- | ---------- | ------------------------------------------------------ |
| `tramtaichinh.com`     | `tram-tai-chinh-web` | `apps/web` | Nội dung, SEO, calculator miễn phí                     |
| `app.tramtaichinh.com` | `tram-tai-chinh-app` | `apps/app` | Ứng dụng xác thực và dữ liệu người dùng                |
| `quanlydongtien.com`   | `tram-tai-chinh-web` | `apps/web` | Landing MVP; CTA/route ứng dụng chuyển sang app domain |

`quanlydongtien.com` không host authenticated application. Cookie phiên của
`tramtaichinh.com` không thể được chia sẻ an toàn như cookie cùng site với một
root domain khác. App chỉ sử dụng `app.tramtaichinh.com`.

## 2. Monorepo boundary

- pnpm quản lý workspace và lockfile.
- Turborepo điều phối `dev`, `lint`, `typecheck` và `build`.
- `apps/*` chỉ ghép UI, routing và delivery.
- `packages/finance-core` chứa pure financial functions; không phụ thuộc
  React, Next.js, Supabase client hoặc browser API.
- `packages/database-types` chỉ chứa type được sinh từ database đã migrate.
- `packages/validation` chứa Zod schema cho boundary input.
- `packages/config` chứa environment contract và security headers.
- `packages/seo` chứa URL/site metadata thuần.
- `packages/ui` ưu tiên Server Components; Client Components phải có lý do rõ ràng.

## 3. Database boundary

Milestone 0 chưa tạo schema hoặc bảng nghiệp vụ. Từ Milestone 1:

- `content`: bài viết, category, revision và trạng thái xuất bản.
- `finance`: household, account, transaction, budget, debt và goal.
- `private`: role, audit/security state và dữ liệu không được expose.
- `api`: view/function đã kiểm soát để Supabase Data API sử dụng.
- `public`: không chứa bảng nghiệp vụ.

Supabase Data API chỉ expose `api`. Mọi bảng user-owned phải bật RLS, có policy
theo household membership và có pgTAP test chứng minh hai user không đọc/ghi
chéo dữ liệu.

## 4. Authentication và authorization

- Supabase Auth là identity provider.
- SSR auth dùng cookie chỉ trên `app.tramtaichinh.com`.
- Browser dùng publishable/anon key và session của chính user.
- Service-role key không xuất hiện trong browser, public env hoặc CRUD thông thường.
- Admin cần database role và phiên AAL2 trước thao tác quản trị.

## 5. Financial correctness

- VND lưu bằng PostgreSQL `bigint`, đơn vị đồng.
- Rate/ratio lưu bằng PostgreSQL `numeric`.
- TypeScript sử dụng Decimal.js tại calculation boundary.
- Không dùng `number` cho phép tính tiền hoặc lãi suất.
- Mỗi formula export metadata gồm `formulaVersion`, assumptions và units.
- Formula là pure function và bắt buộc có unit test trước khi dùng trong UI.

## 6. Input và content safety

- Zod validate tại mọi server boundary.
- Mapping field sang câu lệnh database phải explicit; không truyền nguyên body.
- CMS lưu Markdown, không chấp nhận raw HTML và render qua sanitizer.
- Không log token, secret, số dư, thu nhập hoặc mô tả giao dịch.

## 7. Security baseline

Hai app áp dụng:

- Content Security Policy có `frame-ancestors 'none'`.
- HSTS với subdomain và preload.
- `X-Content-Type-Options: nosniff`.
- Referrer Policy nghiêm ngặt.
- Permissions Policy deny-by-default cho capability không dùng.
- `X-Frame-Options: DENY` để tương thích client cũ.

CSP hiện dùng inline-style allowance cho CSS/Next runtime và inline-script
allowance tương thích hydration. Milestone 5 phải đánh giá nonce-based CSP sau
khi kiến trúc caching/SSR ổn định.

## 8. Environment và secret handling

- Chỉ biến bắt đầu `NEXT_PUBLIC_` mới được phép đi vào browser bundle.
- Publishable Supabase key không phải secret; service-role key là secret.
- Environment được parse bằng Zod qua danh sách field explicit.
- Vercel Preview và Production có environment scope tách biệt.
- `.env*` bị ignore, chỉ `.env.example` được commit.

## 9. ADR log

### ADR-0001 — Hai Next.js applications

**Status:** Accepted.

Website SEO và app quản lý tiền có caching, security và release cadence khác
nhau. Hai app trong cùng monorepo giữ shared code nhưng tách deployment.

### ADR-0002 — Database-first và schema isolation

**Status:** Accepted.

UI nghiệp vụ chỉ được triển khai sau migration, constraint, index, RLS và
cross-user test. Chỉ schema `api` được expose.

### ADR-0003 — Không host app trên `quanlydongtien.com`

**Status:** Accepted.

MVP dùng landing/redirect vì root domain khác gây phức tạp cho session cookie,
CSRF boundary và logout consistency.

### ADR-0004 — Không tạo business schema trong Milestone 0

**Status:** Accepted.

Foundation chỉ cấu hình local Supabase và thư mục migration. Schema, RLS và
auth bắt đầu trong Milestone 1 để giữ commit/milestone có ranh giới rõ ràng.
