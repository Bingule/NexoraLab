import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTools } from "@/lib/registry";
import { Icon, categoryIcon } from "@/components/Icon";
export function generateStaticParams() {
  return getTools()
    .filter((t) => t.type !== "desktop")
    .map((t) => ({ id: t.id }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `${getTools().find((t) => t.id === id)?.name || "Tool"} workspace`,
  };
}
export default async function Workspace({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTools().find((t) => t.id === id && t.type !== "desktop");
  if (!t) notFound();
  return (
    <div className="container page-content">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/lab/">Online Lab</Link>
        <span>/</span>
        <span>{t.name}</span>
      </nav>
      <div className="page-heading">
        <p className="eyebrow">DEMO WORKSPACE</p>
        <h1>{t.name}</h1>
        <p>A reserved workspace for a future browser-based scientific tool.</p>
      </div>
      <div className="workspace-placeholder">
        <div className={`tool-icon ${t.category}`}>
          <Icon name={categoryIcon[t.category]} size={48} />
        </div>
        <span className="demo-label">PLATFORM PREVIEW</span>
        <h2>This workspace is ready for its tool.</h2>
        <p>
          The scientific application has not been integrated. No data is
          uploaded and no calculation is performed.
        </p>
        <div className="hero-actions">
          <Link className="button" href={`/tools/${t.id}/`}>
            View tool information <Icon name="arrow" size={17} />
          </Link>
          <Link className="button secondary" href="/lab/">
            Back to Online Lab
          </Link>
        </div>
      </div>
    </div>
  );
}
