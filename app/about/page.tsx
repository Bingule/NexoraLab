import { T } from "@/components/Language";
import type { Metadata } from "next";
import { Founder } from "@/components/Founder";
import { Icon } from "@/components/Icon";
import { pageMetadata, siteDescription } from "@/lib/site";
export const metadata: Metadata = pageMetadata(
  "About",
  siteDescription,
  "/about/",
);
export default function About() {
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">
          <T zh="AIMATRALAB / 关于">AimatraLab / About</T>
        </p>
        <h1>
          <T zh="实用工具，共享探索。">Practical tools. Shared discovery.</T>
        </h1>
        <p>
          <T zh="由 Dr. Wu 创立的 AI 辅助材料研究实验室与科学软件平台。">
            An AI-assisted materials research laboratory and scientific software
            platform founded by Dr. Wu.
          </T>
        </p>
      </div>
      <div className="about-mission">
        <p className="eyebrow">
          <T zh="我们的使命">Our mission</T>
        </p>
        <h2>
          <T zh="让材料研究中的实用科学工具，更易获取、使用与共享。">
            Make practical scientific tools for materials research easier to
            access, use and share.
          </T>
        </h2>
        <p>
          <T zh="AimatraLab 开发面向材料研究、表征、模拟、数据分析与科学可视化的实用工具，将 AI 辅助工作流与独立科学软件汇集到同一平台。">
            AimatraLab develops practical tools for materials research,
            characterization, simulation, data analysis and scientific
            visualization. AI-assisted workflows and independent scientific
            software share one accessible platform.
          </T>
        </p>
      </div>
      <Founder full />
      <div className="values-grid">
        {[
          [
            "box",
            "Rooted in materials science",
            "Tools shaped by the questions and workflows of materials research.",
            "立足材料科学",
            "以材料研究的真实问题和工作流为出发点。",
          ],
          [
            "code",
            "Independent by design",
            "Software projects keep their own code, documentation and release cycles.",
            "保持独立",
            "软件项目保留各自的代码、文档与发布周期。",
          ],
          [
            "globe",
            "Easy to access",
            "One place to discover desktop software and online scientific workspaces.",
            "便捷获取",
            "在同一平台发现桌面软件与在线科学工作区。",
          ],
        ].map(([icon, title, desc, titleZh, descZh]) => (
          <article key={title}>
            <Icon name={icon} size={24} />
            <h3>
              <T zh={titleZh}>{title}</T>
            </h3>
            <p>
              <T zh={descZh}>{desc}</T>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
