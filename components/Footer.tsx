import { T } from "./Language";
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
          <p>
            <T zh="实用工具，让材料研究更进一步。">
              Practical tools. Better materials research.
            </T>
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/tools/">
            <T zh="工具">Tools</T>
          </Link>
          <Link href="/lab/">
            <T zh="在线实验室">Online Lab</T>
          </Link>
          <Link href="/research/">
            <T zh="研究方向">Research</T>
          </Link>
          <Link href="/about/">
            <T zh="关于">About</T>
          </Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} NexoraLab ·{" "}
          <T zh="由 Bing Wu 创立">Founded by Bing Wu</T>
        </span>
        <span>
          <T zh="探索 · 分析 · 模拟 · 构建">
            Explore · Analyze · Simulate · Build
          </T>
        </span>
      </div>
    </footer>
  );
}
