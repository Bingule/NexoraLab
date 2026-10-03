import Link from "next/link";
import { asset } from "@/lib/paths";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link className="brand" href="/">
            <img src={asset("/logo.svg")} width="28" height="28" alt="" />
            Nexora<span>Lab</span>
          </Link>
          <p>Practical tools. Better materials research.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/tools/">Tools</Link>
          <Link href="/lab/">Online Lab</Link>
          <Link href="/research/">Research</Link>
          <Link href="/about/">About</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} NexoraLab · Founded by Bing Wu
        </span>
        <span>Explore · Analyze · Simulate · Build</span>
      </div>
    </footer>
  );
}
