import Link from "next/link";
import { T } from "@/components/Language";
export default function NotFound() {
  return (
    <div className="container page-content empty-state">
      <p className="eyebrow">
        <T zh="404 / 页面未找到">404 / PAGE NOT FOUND</T>
      </p>
      <h1>
        <T zh="探索暂时偏离了晶格。">A little outside the lattice.</T>
      </h1>
      <p>
        <T zh="这个页面不存在。返回工具目录，继续探索。">
          This page does not exist. Return to the toolkit to continue exploring.
        </T>
      </p>
      <Link href="/tools/" className="button">
        <T zh="探索工具 →">Explore Tools →</T>
      </Link>
    </div>
  );
}
