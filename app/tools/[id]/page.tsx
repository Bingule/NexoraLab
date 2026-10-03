import { T } from "@/components/Language";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTools } from "@/lib/registry";
import { asset } from "@/lib/paths";
import { validLink, isAvailable } from "@/lib/manifest";
import { Icon, categoryIcon } from "@/components/Icon";
import { ToolActions } from "@/components/ToolCard";
import { categoryLabels } from "@/lib/labels";
import { WindowsActivation } from "@/components/WindowsActivation";
import { pageMetadata } from "@/lib/site";
export function generateStaticParams() {
  return getTools().map((t) => ({ id: t.id }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const t = getTools().find((t) => t.id === id);
  return pageMetadata(
    t?.name || "Tool not found",
    t?.description || "Scientific software on AimatraLab.",
    `/tools/${id}/`,
  );
}
export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTools().find((t) => t.id === id);
  if (!t) notFound();
  const available = isAvailable(t);
  const screenshot = (s: string) =>
    asset(
      s.startsWith("https://") || s.startsWith("/") ? s : `/tools/${t.id}/${s}`,
    );
  return (
    <div className="container page-content">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">AimatraLab</Link>
        <span>/</span>
        <Link href="/tools/">
          <T zh="工具">Tools</T>
        </Link>
        <span>/</span>
        <span>{t.name}</span>
      </nav>
      <div className={`detail-heading ${t.category}`}>
        <div className="detail-icon tool-icon">
          <Icon name={categoryIcon[t.category]} size={38} />
        </div>
        <div>
          <p className="eyebrow">
            <T zh={categoryLabels[t.category]}>{t.category}</T>{" "}
            {!available && <T zh=" / 规划中"> / IN PREPARATION</T>}
          </p>
          <h1>{t.name}</h1>
          <p>
            <T zh={t.zh?.description}>{t.description}</T>
          </p>
        </div>
        <span className="detail-version">
          {!available ? <T zh="待发布">Unreleased</T> : `v${t.version}`}
        </span>
      </div>
      {!available && (
        <div className="notice">
          <Icon name="box" />
          <div>
            <strong>
              <T zh="这个工具尚未发布。">This tool is not available yet.</T>
            </strong>
            <p>
              <T zh="首个版本发布后，这里会提供功能说明、截图和下载入口。">
                Features, screenshots and downloads will be available with the
                first release.
              </T>
            </p>
          </div>
        </div>
      )}
      {t.windowsActivationRequired && (
        <WindowsActivation downloadAvailable={validLink(t.download)} />
      )}
      <div className="detail-layout">
        <div>
          <section className="detail-section">
            <h2>
              <T zh="概览">Overview</T>
            </h2>
            <p>
              <T zh={t.zh?.description}>{t.description}</T>
            </p>
            {t.screenshots.length ? (
              <div className="screenshots">
                {t.screenshots.map((s, i) => (
                  <img
                    key={s}
                    src={screenshot(s)}
                    alt={`${t.name} screenshot ${i + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            ) : (
              <div className="screenshot-placeholder">
                <Icon name={categoryIcon[t.category]} size={60} />
                <span>
                  <T zh="软件预览">Software preview</T>
                </span>
                <small>
                  <T zh="截图将在发布时提供。">
                    Screenshots have not been supplied.
                  </T>
                </small>
              </div>
            )}
          </section>
          <section className="detail-section">
            <h2>
              <T zh="功能">Features</T>
            </h2>
            {t.features?.length ? (
              <ul className="features-list">
                {t.features.map((f, i) => (
                  <li key={f}>
                    <Icon name="check" size={17} />
                    <T zh={t.zh?.features?.[i]}>{f}</T>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <T zh="详细功能将在正式发布时列出。">
                  Features will be listed with the first release.
                </T>
              </p>
            )}
          </section>
          <section className="detail-section">
            <h2>
              <T zh="版本历史">Version history</T>
            </h2>
            {t.history?.length ? (
              <div className="history-list">
                {t.history.map((h, i) => (
                  <article key={i}>
                    <strong>v{h.version}</strong>
                    <time dateTime={h.date}>{h.date}</time>
                    <p>
                      <T zh={t.zh?.historyNotes?.[h.version]}>{h.notes}</T>
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p>
                <T zh="尚无已发布版本。">No published releases yet.</T>
              </p>
            )}
          </section>
          <section className="detail-section">
            <h2>
              <T zh="引用">Citation</T>
            </h2>
            <p>
              {t.citation || (
                <T zh="引用信息尚未提供。">
                  Citation information has not been supplied.
                </T>
              )}
            </p>
          </section>
        </div>
        <aside>
          <div className="detail-sidebar">
            <h3>
              <T zh="工具信息">Tool information</T>
            </h3>
            <dl>
              <dt>
                <T zh="类别">Category</T>
              </dt>
              <dd className="capitalize">
                <T zh={categoryLabels[t.category]}>{t.category}</T>
              </dd>
              <dt>
                <T zh="类型">Type</T>
              </dt>
              <dd className="capitalize">
                <T
                  zh={
                    t.type === "desktop"
                      ? "桌面"
                      : t.type === "online"
                        ? "在线"
                        : "桌面 + 网页"
                  }
                >
                  {t.type}
                </T>
              </dd>
              <dt>
                <T zh="平台">Platforms</T>
              </dt>
              <dd>{t.platforms.join(", ")}</dd>
              <dt>
                <T zh="版本">Version</T>
              </dt>
              <dd>{!available ? <T zh="待发布">Unreleased</T> : t.version}</dd>
              <dt>
                <T zh="开发者">Developer</T>
              </dt>
              <dd>{t.developer || "Not supplied"}</dd>
              <dt>
                <T zh="状态">Status</T>
              </dt>
              <dd>
                <T zh={!available ? "规划中" : "已发布"}>
                  {!available ? "In preparation" : "Available"}
                </T>
              </dd>
            </dl>
            <div className="detail-actions">
              <ToolActions tool={t} />
              {validLink(t.documentation) &&
                (t.documentation.startsWith("/") ? (
                  <Link className="button secondary" href={t.documentation}>
                    <Icon name="book" size={17} />
                    <T zh="文档">Documentation</T>
                  </Link>
                ) : (
                  <a
                    className="button secondary"
                    href={t.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="book" size={17} />
                    <T zh="文档">Documentation</T>
                  </a>
                ))}
            </div>
            {!validLink(t.download) && !validLink(t.online) && (
              <p className="sidebar-note">
                <T zh="下载与在线入口尚未开放。">
                  Download and online access are not available yet.
                </T>
              </p>
            )}
          </div>
          <Link className="text-link back-link" href="/tools/">
            <T zh="← 返回全部工具">← Back to all tools</T>
          </Link>
        </aside>
      </div>
    </div>
  );
}
