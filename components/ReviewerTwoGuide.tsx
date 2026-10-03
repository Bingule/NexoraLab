import Link from "next/link";
import type { Tool } from "@/lib/manifest";
import { T } from "./Language";
import { Icon } from "./Icon";

const source = "https://github.com/Bingule/reviewer-two";
const commit = "9ff847d0b23a23c87b24e5340907df4c45f32ffc";

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
          <a
            className="button"
            href={`${source}/blob/${commit}/README.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="book" size={17} />
            <T zh="安装文档">Installation documentation</T>
          </a>
          <a
            className="button secondary"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="code" size={17} />
            <T zh="源码与更新">Source & updates</T>
          </a>
        </div>
      </header>
      <section className="detail-section">
        <h2>
          <T zh="如何使用">How to use</T>
        </h2>
        <ol>
          <li>
            <p>
              <T zh="获取 Skill：在上方安装文档中查看 SKILL.md、共享规则及宿主适配器，并将项目克隆或复制到获授权的私有环境。">
                Get the skill: follow the installation documentation and clone
                or copy the project into an authorized private environment.
                Review SKILL.md, the shared rules and the adapter for your host.
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
          <T zh="下方为 AimatraLab 登记的版本历史。安装文档链接固定到登记时的源码提交；更新 Skill 时请查看原仓库的变更说明，并重新运行项目检查。">
            Below is the version history registered on AimatraLab. Installation
            documentation is pinned to the recorded source commit. When updating
            the skill, review the upstream changes and rerun the project checks.
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
        <p>
          <T zh="固定源码提交：">Pinned source commit: </T>
          <code style={{ overflowWrap: "anywhere" }}>{commit}</code>
        </p>
        <Link className="text-link" href="/tools/reviewer-two/">
          <T zh="Skill 详情与版本历史">Skill details & version history</T>
          <Icon name="arrow" size={17} />
        </Link>
      </section>
    </>
  );
}
