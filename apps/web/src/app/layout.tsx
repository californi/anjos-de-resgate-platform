import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteContent } from "@anjos/shared";
import "./globals.css";

export const metadata: Metadata = {
  title: siteContent.organization.platformName,
  description: siteContent.organization.description
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-shell">
          {process.env.NEXT_PUBLIC_DEMO_MODE === "true" ? (
            <div className="demo-notice" role="note">
              Demo de validacao: use somente dados ficticios. Alteracoes podem
              ser apagadas quando o ambiente reiniciar.
            </div>
          ) : null}
          <header className="site-header">
            <a className="brand" href="/">
              <span className="brand-mark">AR</span>
              <span>{siteContent.organization.name}</span>
            </a>
            <nav className="site-nav" aria-label="Principal">
              {siteContent.navigation.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
