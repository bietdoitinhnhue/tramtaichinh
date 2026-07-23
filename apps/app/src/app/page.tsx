import { ActionLink, BrandMark, Surface } from "@tram-tai-chinh/ui";

export default function AppHomePage() {
  return (
    <main className="app-shell ttc-container">
      <Surface>
        <header className="app-header">
          <BrandMark />
          <ActionLink href="https://tramtaichinh.com" tone="secondary">
            Về website
          </ActionLink>
        </header>

        <p className="app-eyebrow">Ứng dụng · Foundation</p>
        <h1>Quản lý dòng tiền từ một nơi rõ ràng.</h1>
        <p className="app-lead">
          Nền tảng kỹ thuật đã được tách riêng cho dữ liệu tài chính. Authentication, household và
          RLS sẽ được triển khai database-first trong Milestone 1.
        </p>
        <ActionLink href="https://tramtaichinh.com">Khám phá Trạm Tài Chính</ActionLink>

        <div className="status-row">
          <span aria-hidden="true" className="status-dot" />
          Chưa tạo tài khoản hoặc dữ liệu demo trong production.
        </div>
      </Surface>
    </main>
  );
}
