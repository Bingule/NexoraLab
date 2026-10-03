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
    { title: "Research Assistant", zh: "研究助手", ids: ["reviewer-two"] },
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
          <T zh="NEXORALAB / 在线实验室">NexoraLab / Online Lab</T>
        </p>
        <h1>
          <T zh="在浏览器中，开始科学探索。">Science, in your browser.</T>
        </h1>
        <p>
          <T zh="计算器、结构分析和科学审稿工作流。选择工具，查看它的运行方式。">
            Calculators, structure analysis and scientific review workflows.
            Choose a tool to see how it runs.
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
