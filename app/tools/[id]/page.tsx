import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTools } from "@/lib/registry";
import { asset } from "@/lib/paths";
import { validLink } from "@/lib/manifest";
import { Icon, categoryIcon } from "@/components/Icon";
import { ToolActions } from "@/components/ToolCard";
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
  return { title: t?.name || "Tool not found", description: t?.description };
}
export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTools().find((t) => t.id === id);
  if (!t) notFound();
  const screenshot = (s: string) =>
    asset(
      s.startsWith("https://") || s.startsWith("/") ? s : `/tools/${t.id}/${s}`,
    );
  return (
    <div className="container page-content">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">NexoraLab</Link>
        <span>/</span>
        <Link href="/tools/">Tools</Link>
        <span>/</span>
        <span>{t.name}</span>
      </nav>
      <div className={`detail-heading ${t.category}`}>
        <div className="detail-icon tool-icon">
          <Icon name={categoryIcon[t.category]} size={38} />
        </div>
        <div>
          <p className="eyebrow">
            {t.category} {t.demo && " / DEMO ENTRY"}
          </p>
          <h1>{t.name}</h1>
          <p>{t.description}</p>
        </div>
        <span className="detail-version">v{t.version}</span>
      </div>
      {t.demo && (
        <div className="notice">
          <Icon name="box" />
          <div>
            <strong>Demo catalog entry — no software release yet.</strong>
            <p>
              This page demonstrates the publishing format. Capabilities,
              screenshots and releases will be supplied by the independent
              software project.
            </p>
          </div>
        </div>
      )}
      <div className="detail-layout">
        <div>
          <section className="detail-section">
            <h2>Overview</h2>
            <p>{t.description}</p>
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
                <span>Software preview</span>
                <small>Screenshots have not been supplied.</small>
              </div>
            )}
          </section>
          <section className="detail-section">
            <h2>Features</h2>
            {t.features?.length ? (
              <ul className="features-list">
                {t.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={17} />
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Features will be listed when the software project is registered.
              </p>
            )}
          </section>
          <section className="detail-section">
            <h2>Version history</h2>
            {t.history?.length ? (
              <div className="history-list">
                {t.history.map((h, i) => (
                  <article key={i}>
                    <strong>v{h.version}</strong>
                    <time dateTime={h.date}>{h.date}</time>
                    <p>{h.notes}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p>
                {t.demo
                  ? "No published releases. Version 0.0.0 identifies this demo entry."
                  : "No release history has been supplied."}
              </p>
            )}
          </section>
          <section className="detail-section">
            <h2>Citation</h2>
            <p>{t.citation || "Citation information has not been supplied."}</p>
          </section>
        </div>
        <aside>
          <div className="detail-sidebar">
            <h3>Tool information</h3>
            <dl>
              <dt>Category</dt>
              <dd className="capitalize">{t.category}</dd>
              <dt>Type</dt>
              <dd className="capitalize">{t.type}</dd>
              <dt>Platforms</dt>
              <dd>{t.platforms.join(", ")}</dd>
              <dt>Version</dt>
              <dd>{t.version}</dd>
              <dt>Developer</dt>
              <dd>{t.developer || "Not supplied"}</dd>
              <dt>Status</dt>
              <dd>{t.demo ? "Demo entry" : "Registered"}</dd>
            </dl>
            <div className="detail-actions">
              <ToolActions tool={t} />
              {validLink(t.documentation) &&
                (t.documentation.startsWith("/") ? (
                  <Link className="button secondary" href={t.documentation}>
                    <Icon name="book" size={17} />
                    Documentation
                  </Link>
                ) : (
                  <a
                    className="button secondary"
                    href={t.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="book" size={17} />
                    Documentation
                  </a>
                ))}
            </div>
            {!validLink(t.download) && !validLink(t.online) && (
              <p className="sidebar-note">
                {t.demo
                  ? "Download and online links will appear when a real release is registered."
                  : "No download or online URL has been supplied."}
              </p>
            )}
          </div>
          <Link className="text-link back-link" href="/tools/">
            ← Back to all tools
          </Link>
        </aside>
      </div>
    </div>
  );
}
