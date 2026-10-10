import Link from "next/link";
import type { Tool } from "@/lib/manifest";
import { validLink, isAvailable } from "@/lib/manifest";
import { asset } from "@/lib/paths";
import { Icon, categoryIcon } from "./Icon";
import { T } from "./Language";
import { categoryLabels } from "@/lib/labels";
import { WindowsActivation } from "./WindowsActivation";
export function ToolActions({
  tool,
  compact = false,
}: {
  tool: Tool;
  compact?: boolean;
}) {
  const actions = [
    [tool.type === "skill" ? tool.documentation : "", "Usage guide", "book"],
    [tool.online, "Open Online", "globe"],
    [
      tool.download,
      tool.windowsActivationRequired ? "Download Windows" : "Download",
      "download",
    ],
    [tool.release || "", "Release notes", "book"],
  ].filter(([url]) => validLink(url));
  return (
    <>
      {actions.map(([url, label, icon]) =>
        url.startsWith("/") && !label.startsWith("Download") ? (
          <Link
            className={compact ? "text-link" : "button"}
            href={url}
            key={label}
          >
            <Icon name={icon} size={16} />
            <T
              zh={
                {
                  "Open Online": "在线使用",
                  "Usage guide": "使用指南",
                  Download: "下载",
                  "Download Windows": "下载 Windows 离线版",
                  "Release notes": "发布说明",
                }[label]
              }
            >
              {label}
            </T>
          </Link>
        ) : (
          <a
            className={compact ? "text-link" : "button"}
            href={asset(url)}
            key={label}
            target={url.startsWith("/") ? undefined : "_blank"}
            rel={url.startsWith("/") ? undefined : "noopener noreferrer"}
          >
            <Icon name={icon} size={16} />
            <T
              zh={
                {
                  "Open Online": "在线使用",
                  "Usage guide": "使用指南",
                  Download: "下载",
                  "Download Windows": "下载 Windows 离线版",
                  "Release notes": "发布说明",
                }[label]
              }
            >
              {label}
            </T>
          </a>
        ),
      )}
    </>
  );
}
export function ToolCard({ tool }: { tool: Tool }) {
  const available = isAvailable(tool);
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
        <span className="demo-label">
          <T zh={!available ? "规划中" : "已发布"}>
            {!available ? "PLANNED" : "AVAILABLE"}
          </T>
        </span>
      </div>
      <div className="tool-preview">
        {tool.screenshots[0] ? (
          <img
            src={asset(
              tool.screenshots[0].startsWith("/") ||
                tool.screenshots[0].startsWith("https://")
                ? tool.screenshots[0]
                : `/tools/${tool.id}/${tool.screenshots[0]}`,
            )}
            alt={`${tool.name} screenshot`}
            loading="lazy"
          />
        ) : (
          <>
            <Icon name={categoryIcon[tool.category]} size={34} />
            <span>
              <T
                zh={
                  tool.type === "skill"
                    ? "安装 · 使用 · 更新"
                    : !available
                      ? "尚未发布"
                      : "截图待补充"
                }
              >
                {tool.type === "skill"
                  ? "Install · Use · Update"
                  : tool.demo
                    ? "Release in preparation"
                    : "Screenshot coming soon"}
              </T>
            </span>
          </>
        )}
      </div>
      <p className="eyebrow card-category">
        <T zh={categoryLabels[tool.category]}>{tool.category}</T>
      </p>
      <h3>
        <Link href={`/tools/${tool.id}/`}>{tool.name}</Link>
      </h3>
      <p className="card-description">
        <T zh={tool.zh?.description}>{tool.description}</T>
      </p>
      <div className="tool-badges">
        <span>
          <Icon
            name={
              tool.type === "skill"
                ? "code"
                : tool.type === "online"
                  ? "globe"
                  : "download"
            }
            size={12}
          />
          <T
            zh={
              tool.type === "skill"
                ? "Skill"
                : tool.type === "hybrid"
                  ? "桌面 + 网页"
                  : tool.type === "online"
                    ? "在线"
                    : "桌面"
            }
          >
            {tool.type === "skill"
              ? "Skill"
              : tool.type === "hybrid"
                ? "Desktop + Web"
                : tool.type === "online"
                  ? "Online"
                  : "Desktop"}
          </T>
        </span>
        {tool.platforms.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
      {tool.windowsActivationRequired && <WindowsActivation compact />}
      <div className="card-footer">
        <span className="version">
          {!available ? <T zh="待发布">Unreleased</T> : `v${tool.version}`}
        </span>
        <Link className="text-link" href={`/tools/${tool.id}/`}>
          <T zh="查看详情">View details</T> <Icon name="arrow" size={17} />
        </Link>
      </div>
      {(validLink(tool.online) ||
        validLink(tool.download) ||
        (tool.type === "skill" && validLink(tool.documentation))) && (
        <div className="card-actions">
          <ToolActions tool={tool} compact />
        </div>
      )}
    </article>
  );
}
