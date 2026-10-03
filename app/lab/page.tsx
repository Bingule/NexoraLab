import { isAvailable } from "@/lib/manifest";
import type { Metadata } from "next";
import { getTools } from "@/lib/registry";
import { ToolCard } from "@/components/ToolCard";
import { T } from "@/components/Language";
export const metadata: Metadata = { title: "Online Lab" };
export default function Lab() {
  const tools = getTools().filter((t) => t.type !== "desktop");
  const available = tools.filter((t) => isAvailable(t) && t.online);
  const planned = tools.filter((t) => !isAvailable(t));
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">
          <T zh="NEXORALAB / 在线实验室">NexoraLab / Online Lab</T>
        </p>
        <h1>
          <T zh="在浏览器中，开始科学探索。">Science, in your browser.</T>
        </h1>
        <p>
          <T zh="轻量科学工具，无需安装。选择一个工作区即可开始。">
            Lightweight scientific tools, without installation. Choose a
            workspace to get started.
          </T>
        </p>
      </div>
      <div className="section-heading compact">
        <h2>
          <T zh="可用工作区">Available workspaces</T>
        </h2>
        <span className="quiet-label">
          {available.length} <T zh="个在线工具">online tools</T>
        </span>
      </div>
      <div className="tool-grid lab-grid">
        {available.map((t) => (
          <ToolCard key={t.id} tool={t} />
        ))}
      </div>
      <div className="section-heading compact roadmap-heading">
        <div>
          <p className="eyebrow">
            <T zh="持续开发">On the horizon</T>
          </p>
          <h2>
            <T zh="规划中的工具">Tools in preparation</T>
          </h2>
        </div>
      </div>
      <p className="section-intro">
        <T zh="这些工作区尚未开放；正式发布后即可使用。">
          These workspaces are not available yet. Access opens with each tool’s
          first release.
        </T>
      </p>
      <div className="tool-grid lab-grid">
        {planned.map((t) => (
          <ToolCard key={t.id} tool={t} />
        ))}
      </div>
    </div>
  );
}
