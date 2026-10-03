import Link from "next/link";
import type { Tool } from "@/lib/manifest";
import { validLink } from "@/lib/manifest";
import { asset } from "@/lib/paths";
import { Icon, categoryIcon } from "./Icon";
export function ToolActions({
  tool,
  compact = false,
}: {
  tool: Tool;
  compact?: boolean;
}) {
  const actions = [
    [tool.online, "Open Online", "globe"],
    [tool.download, "Download", "download"],
    [tool.github, "GitHub", "code"],
  ].filter(([url]) => validLink(url));
  return (
    <>
      {actions.map(([url, label, icon]) =>
        url.startsWith("/") ? (
          <Link
            className={compact ? "text-link" : "button"}
            href={url}
            key={label}
          >
            <Icon name={icon} size={16} />
            {label}
          </Link>
        ) : (
          <a
            className={compact ? "text-link" : "button"}
            href={asset(url)}
            key={label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name={icon} size={16} />
            {label}
          </a>
        ),
      )}
    </>
  );
}
export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className={`tool-card ${tool.category}`}>
      <div className="card-top">
        <div className="tool-icon">
          {tool.icon ? (
            <img
              src={asset(
                tool.icon.startsWith("http") || tool.icon.startsWith("/")
                  ? tool.icon
                  : `/tools/${tool.id}/${tool.icon}`,
              )}
              alt=""
              width="25"
              height="25"
            />
          ) : (
            <Icon name={categoryIcon[tool.category]} size={25} />
          )}
        </div>
        <span className="demo-label">{tool.demo ? "DEMO" : "REGISTERED"}</span>
      </div>
      <p className="eyebrow card-category">{tool.category}</p>
      <h3>
        <Link href={`/tools/${tool.id}/`}>{tool.name}</Link>
      </h3>
      <p className="card-description">{tool.description}</p>
      <div className="tool-badges">
        <span>
          <Icon
            name={tool.type === "online" ? "globe" : "download"}
            size={12}
          />
          {tool.type === "hybrid"
            ? "Desktop + Web"
            : tool.type === "online"
              ? "Online"
              : "Desktop"}
        </span>
        {tool.platforms.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
      <div className="card-footer">
        <span className="version">v{tool.version}</span>
        <Link className="text-link" href={`/tools/${tool.id}/`}>
          View details <Icon name="arrow" size={17} />
        </Link>
      </div>
      {(validLink(tool.online) ||
        validLink(tool.download) ||
        validLink(tool.github)) && (
        <div className="card-actions">
          <ToolActions tool={tool} compact />
        </div>
      )}
    </article>
  );
}
