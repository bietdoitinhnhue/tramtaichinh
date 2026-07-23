import { ActionLink, BrandMark, Surface } from "@tram-tai-chinh/ui";

export default function HomePage() {
  return (
    <div className="ttc-container">
      <header className="site-header">
        <BrandMark />
        <ActionLink href="https://app.tramtaichinh.com" tone="secondary">
          Mở ứng dụng
        </ActionLink>
      </header>

      <main className="hero">
        <div>
          <p className="eyebrow">Milestone 0 · Foundation</p>
          <h1>Hiểu tiền. Chủ động dòng tiền.</h1>
          <p className="hero__lead">
            Trạm Tài Chính đang xây nền tảng kiến thức và công cụ giúp người Việt thoát khỏi vòng
            xoáy cơm áo gạo tiền bằng những quyết định rõ ràng, có dữ liệu.
          </p>
          <div className="hero__actions">
            <ActionLink href="https://app.tramtaichinh.com">Quản lý dòng tiền</ActionLink>
            <ActionLink href="#foundation" tone="secondary">
              Xem nền tảng kỹ thuật
            </ActionLink>
          </div>
        </div>

        <Surface>
          <p className="eyebrow" id="foundation">
            Nền tảng đã sẵn sàng
          </p>
          <ul className="foundation-list">
            <li>
              <strong>Hai ứng dụng tách biệt</strong>
              <span>Website SEO và ứng dụng quản lý tiền có deployment độc lập.</span>
            </li>
            <li>
              <strong>Tính toán tài chính chính xác</strong>
              <span>VND dùng bigint/Decimal, không dùng floating point tùy tiện.</span>
            </li>
            <li>
              <strong>Security by default</strong>
              <span>Strict CSP, security headers và database-first trước UI nghiệp vụ.</span>
            </li>
          </ul>
        </Surface>
      </main>
    </div>
  );
}
