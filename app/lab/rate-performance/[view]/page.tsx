import { notFound } from "next/navigation";
import Link from "next/link";
import { rateViews } from "@/lib/migrated-tools";
import { TmccWorkspace } from "@/components/TmccWorkspace";
import { T } from "@/components/Language";
import { pageMetadata } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return rateViews.map((view) => ({ view }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  return pageMetadata(
    `${view.replaceAll("-", " ")} — Rate Performance`,
    "Rate Performance scientific analysis workspace on AimatraLab.",
    `/lab/rate-performance/${view}/`,
  );
}
export default async function RatePage({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  if (!(rateViews as readonly string[]).includes(view)) notFound();
  return (
    <div className="container page-content">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/lab/">
          <T zh="在线实验室">Online Lab</T>
        </Link>
        <span>/</span>
        <Link href="/lab/rate-performance/">
          <T zh="倍率性能">Rate Performance</T>
        </Link>
      </nav>
      <TmccWorkspace id="rate-performance" view={view} />
    </div>
  );
}
