import { ActionLink, BrandMark, Surface } from "@tram-tai-chinh/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Quản lý dòng tiền",
};

export default function MoneyManagerLandingPage() {
  return (
    <main className="landing ttc-container">
      <Surface>
        <BrandMark />
        <p className="eyebrow">quanlydongtien.com</p>
        <h1>Dòng tiền rõ ràng, mục tiêu gần hơn.</h1>
        <p className="landing__lead">
          Trong MVP, toàn bộ tài khoản và phiên đăng nhập được đặt an toàn tại app.tramtaichinh.com.
          Bạn sẽ được chuyển sang ứng dụng khi bắt đầu.
        </p>
        <div className="hero__actions">
          <ActionLink href="https://app.tramtaichinh.com">Đi đến ứng dụng</ActionLink>
          <ActionLink href="https://tramtaichinh.com" tone="secondary">
            Đọc kiến thức tài chính
          </ActionLink>
        </div>
      </Surface>
    </main>
  );
}
