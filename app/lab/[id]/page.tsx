import { CvVersionNotice } from "@/components/CvVersionNotice";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTools } from "@/lib/registry";
import { Icon, categoryIcon } from "@/components/Icon";
import { T } from "@/components/Language";
import { LabFrame } from "@/components/LabFrame";
import { TmccWorkspace } from "@/components/TmccWorkspace";
import { isMigratedTool } from "@/lib/migrated-tools";
import { pageMetadata } from "@/lib/site";
import { ReviewerTwoGuide } from "@/components/ReviewerTwoGuide";
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
  const tool = getTools().find((t) => t.id === id);
  return pageMetadata(
    `${tool?.name || "Tool"} ${tool?.type === "skill" ? "usage guide" : "workspace"}`,
    tool?.description || "An AimatraLab scientific workspace.",
    `/lab/${id}/`,
  );
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
        <Link href="/lab/">
          <T zh="在线实验室">Online Lab</T>
        </Link>
        <span>/</span>
        <span>{t.name}</span>
      </nav>
      {!isMigratedTool(t.id) && (
        <div className="page-heading">
          <p className="eyebrow">
            <T zh={t.demo ? "规划中的工作区" : "在线工作区"}>
              {t.demo ? "WORKSPACE IN PREPARATION" : "ONLINE WORKSPACE"}
            </T>
          </p>
          <h1>{t.name}</h1>
          <p>
            <T zh={t.zh?.description}>{t.description}</T>
          </p>
        </div>
      )}
      {t.id === "cv-kinetics" && <CvVersionNotice />}
      {t.id === "reviewer-two" ? (
        <ReviewerTwoGuide tool={t} />
      ) : isMigratedTool(t.id) ? (
        <TmccWorkspace id={t.id} />
      ) : t.web ? (
        <>
          <LabFrame src={t.web} name={t.name} />
          <div className="workspace-links">
            <span>v{t.version}</span>
            <Link href={`/tools/${t.id}/`} className="text-link">
              <T zh="文档与下载">Documentation & downloads</T>
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </>
      ) : (
        <div className="workspace-placeholder">
          <div className={`tool-icon ${t.category}`}>
            <Icon name={categoryIcon[t.category]} size={48} />
          </div>
          <span className="demo-label">
            <T zh="规划中">IN PREPARATION</T>
          </span>
          <h2>
            <T zh="这个工作区尚未开放。">
              This workspace is not available yet.
            </T>
          </h2>
          <p>
            <T zh="工具将在首个正式发布后开放。可前往详情页了解可用入口。">
              Access opens with the first online release. Visit the tool page
              for available links.
            </T>
          </p>
          <div className="hero-actions">
            <Link className="button" href={`/tools/${t.id}/`}>
              <T zh="查看工具信息">View tool information</T>{" "}
              <Icon name="arrow" size={17} />
            </Link>
            <Link className="button secondary" href="/lab/">
              <T zh="返回在线实验室">Back to Online Lab</T>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
