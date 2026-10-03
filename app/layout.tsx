import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { asset } from "@/lib/paths";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "NexoraLab — Tools for Materials Research",
    template: "%s | NexoraLab",
  },
  description:
    "Scientific software and online tools for materials characterization, electrochemistry, crystal structures and computational materials science.",
  icons: { icon: asset("/logo.svg") },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
