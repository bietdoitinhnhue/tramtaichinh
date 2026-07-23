import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type ActionLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    tone?: "primary" | "secondary";
  }
>;

export function ActionLink({
  children,
  className = "",
  tone = "primary",
  ...props
}: ActionLinkProps) {
  const classes = ["ttc-action-link", `ttc-action-link--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span aria-label="Trạm Tài Chính" className="ttc-brand">
      <span aria-hidden="true" className="ttc-brand__symbol">
        T
      </span>
      {compact ? null : <span className="ttc-brand__name">Trạm Tài Chính</span>}
    </span>
  );
}

export function Surface({ children }: PropsWithChildren) {
  return <section className="ttc-surface">{children}</section>;
}
