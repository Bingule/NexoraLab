import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { asset } from "@/lib/paths";
import "./globals.css";
import { LanguageProvider, T } from "@/components/Language";
import { pageMetadata, siteDescription, siteTitle, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  ...pageMetadata("", siteDescription, "/"),
  metadataBase: siteUrl,
  applicationName: "AimatraLab",
  title: {
    default: siteTitle,
    template: "%s | AimatraLab",
  },
  icons: { icon: asset("/logo.svg") },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <LanguageProvider>
          <a href="#main" className="skip-link">
            <T zh="跳转到正文">Skip to content</T>
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
