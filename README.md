# Trạm Tài Chính

Monorepo cho:

- `tramtaichinh.com`: website nội dung, SEO và công cụ tài chính miễn phí.
- `app.tramtaichinh.com`: ứng dụng quản lý dòng tiền.
- `quanlydongtien.com`: landing page và cổng chuyển tiếp đến ứng dụng trong MVP.

## Yêu cầu hệ thống

- Node.js 24 LTS
- pnpm 11
- Docker Desktop hoặc Docker Engine
- Supabase CLI được cài qua dependency của workspace

## Khởi động

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm supabase start
pnpm dev
```

Website chạy tại `http://localhost:3000`; ứng dụng chạy tại
`http://localhost:3001`.

## Kiểm tra Milestone 0

```bash
pnpm env:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm supabase db reset
```

`pnpm supabase db reset` cần Docker daemon đang hoạt động.

## Nguyên tắc bảo mật

- Không đưa service-role key hoặc secret vào biến `NEXT_PUBLIC_*`.
- Không đặt bảng nghiệp vụ trong schema `public`.
- Chỉ schema `api` được expose qua Supabase Data API.
- Không log dữ liệu tài chính hoặc token.
- Mọi thay đổi database phải đi qua migration và RLS test.

Đọc [kiến trúc hệ thống](docs/ARCHITECTURE.md) và
[technical brief](TRAMTAICHINH_TECH_BRIEF_CODEX.md) trước khi phát triển.
