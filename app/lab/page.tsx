import { isAvailable } from "@/lib/manifest";
import type { Metadata } from "next";
import { getTools } from "@/lib/registry";
import { ToolCard } from "@/components/ToolCard";
import { T } from "@/components/Language";
import { pageMetadata } from "@/lib/site";
export const metadata: Metadata = pageMetadata(
  "Online Lab",
  "Use AimatraLab's browser workspaces for materials calculations, structure descriptions and rate analysis, and find research skill usage guides.",
  "/lab/",
);
export default function Lab() {
  const tools = getTools().filter((t) => t.type !== "desktop");
  const available = tools.filter(
    (t) => t.type !== "skill" && isAvailable(t) && t.online,
  );
  const skills = tools.filter((t) => t.type === "skill" && isAvailable(t));
  const planned = tools.filter((t) => !isAvailable(t));
  const groups = [
    {
      title: "Materials & Structure",
      zh: "材料与结构",
      ids: ["crystal-description", "molecular-weight"],
    },
    {
      title: "Battery & Electrochemistry",
      zh: "电池与电化学",
      ids: ["theoretical-capacity", "rate-performance"],
    },
    {
      title: "Scientific Utilities",
      zh: "科学实用工具",
      ids: available
        .filter(
          (t) =>
            ![
              "crystal-description",
              "molecular-weight",
              "theoretical-capacity",
              "rate-performance",
              "reviewer-two",
            ].includes(t.id),
        )
        .map((t) => t.id),
    },
  ];
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">
          <T zh="AIMATRALAB / 在线实验室">AimatraLab / Online Lab</T>
        </p>
        <h1>
          <T zh="在浏览器中，开始科学探索。">Science, in your browser.</T>
        </h1>
        <p>
          <T zh="使用计算器、结构分析与倍率分析工具，也可查看研究 Skill 的安装与使用指南。">
            Use calculators, structure analysis and rate analysis tools, or find
            installation and usage guides for research skills.
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
      {groups
        .filter((group) => group.ids.length)
        .map((group) => (
          <section className="lab-tool-group" key={group.title}>
            <h3>
              <T zh={group.zh}>{group.title}</T>
            </h3>
            <div className="tool-grid lab-grid">
              {group.ids
                .map((id) => available.find((t) => t.id === id))
                .filter((t) => !!t)
                .map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
            </div>
          </section>
        ))}
      {skills.length > 0 && (
        <section className="lab-tool-group">
          <h2>
            <T zh="研究 Skills">Research skills</T>
          </h2>
          <p className="section-intro">
            <T zh="在受支持的宿主中安装或加载。这里提供使用指南与版本更新。">
              Install or load these skills in a supported host. Find usage
              guidance and version updates here.
            </T>
          </p>
          <div className="tool-grid lab-grid">
            {skills.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
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
