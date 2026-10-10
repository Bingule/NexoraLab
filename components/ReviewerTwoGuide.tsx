import Link from "next/link";
import type { Tool } from "@/lib/manifest";
import { T } from "./Language";
import { Icon } from "./Icon";

export function ReviewerTwoGuide({ tool }: { tool: Tool }) {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">
          <T zh="AI Skill / 使用指南">AI skill / Usage guide</T>
        </p>
        <h1>Reviewer Two</h1>
        <p>
          <T zh={tool.zh?.description}>{tool.description}</T>
        </p>
        <div className="hero-actions">
          <button className="button secondary" type="button" disabled>
            <Icon name="download" size={17} />
            <T zh="暂不开放下载">Download temporarily unavailable</T>
          </button>
        </div>
      </header>
      <section className="detail-section">
        <h2>
          <T zh="如何使用">How to use</T>
        </h2>
        <ol>
          <li>
            <p>
              <T zh="获取 Skill：暂不开放下载。以下使用指南供已获取 Skill 的获授权用户参考。">
                Get the skill: downloads are temporarily unavailable. The guide
                below is for authorized users who already have the skill.
              </T>
            </p>
          </li>
          <li>
            <p>
              <T zh="安装或加载：将该文件夹安装为 Codex Skill 后使用 $reviewer-two，或明确要求宿主加载 SKILL.md。Claude Code 和其他 LLM 宿主请按对应适配器配置，并检查本次会话的实际能力。">
                Install or load: expose the folder as a Codex skill and invoke
                $reviewer-two, or ask the host to load SKILL.md. For Claude Code
                or another LLM host, follow its adapter and verify the
                capabilities available in the current session.
              </T>
            </p>
          </li>
          <li>
            <p>
              <T zh="开始审阅：明确授权稿件访问，选择 first-round（初审）或 revision-round（修回审稿），然后提供获授权的材料。审稿结论由人工审稿人决定。">
                Start a review: explicitly authorize manuscript access, select
                first-round or revision-round, and supply the authorized
                material. The human reviewer retains the final scientific
                judgment.
              </T>
            </p>
          </li>
        </ol>
        <div className="notice">
          <Icon name="book" />
          <div>
            <strong>
              <T zh="在获授权的宿主中运行">Run in an authorized host</T>
            </strong>
            <p>
              <T zh="AimatraLab 提供 Skill 使用指南，不接收稿件。未发表内容仅应在你获准使用的私有环境中处理。">
                AimatraLab provides skill guidance and does not receive
                manuscripts. Process unpublished work only in a private
                environment you are authorized to use.
              </T>
            </p>
          </div>
        </div>
      </section>
      <section className="detail-section">
        <h2>
          <T zh="版本与更新">Versions & updates</T>
        </h2>
        <p>
          <T zh="下方为 AimatraLab 登记的版本历史。暂不开放下载；更新 Skill 时请查看版本说明，并重新运行项目检查。">
            Below is the version history registered on AimatraLab. Downloads are
            temporarily unavailable. When updating the skill, review the release
            notes and rerun the project checks.
          </T>
        </p>
        <div className="history-list">
          {tool.history?.map((entry) => (
            <article key={entry.version}>
              <strong>v{entry.version}</strong>
              <time dateTime={entry.date}>{entry.date}</time>
              <p>
                <T zh={tool.zh?.historyNotes?.[entry.version]}>{entry.notes}</T>
              </p>
            </article>
          ))}
        </div>
        <Link className="text-link" href="/tools/reviewer-two/">
          <T zh="Skill 详情与版本历史">Skill details & version history</T>
          <Icon name="arrow" size={17} />
        </Link>
      </section>
    </>
  );
}
