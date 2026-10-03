import { T } from "@/components/Language";
import type { Metadata } from "next";
import Link from "next/link";
import { researchAreas } from "@/lib/research";
import { Icon } from "@/components/Icon";
export const metadata: Metadata = { title: "Research" };
export default function Research() {
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">
          <T zh="NEXORALAB / 研究方向">NEXORALAB / RESEARCH</T>
        </p>
        <h1>
          <T zh="建立在科学基础之上。">Built on a scientific foundation.</T>
        </h1>
        <p>
          <T zh="材料研究，为 NexoraLab 的实用工具与科学工作流提供基础。">
            The materials research interests that inform NexoraLab’s practical
            tools and scientific workflows.
          </T>
        </p>
      </div>
      <div className="research-grid">
        {researchAreas.map((r, i) => (
          <article key={r.title}>
            <div className="research-card-top">
              <Icon name={r.icon} size={29} />
              <span>0{i + 1}</span>
            </div>
            <p className="eyebrow">
              <T zh={r.zh.tag}>{r.tag}</T>
            </p>
            <h2>
              <T zh={r.zh.title}>{r.title}</T>
            </h2>
            <p>
              <T zh={r.zh.description}>{r.description}</T>
            </p>
            <Link href={`/tools/?category=${r.category}`} className="text-link">
              <T zh="探索相关工具">Explore related tools</T>
              <Icon name="arrow" size={17} />
            </Link>
          </article>
        ))}
      </div>
      <div className="mission-note">
        <p className="eyebrow">
          <T zh="让研究走向实践">RESEARCH INTO PRACTICE</T>
        </p>
        <h2>
          <T zh="更好的工具，始于真实的研究问题。">
            Better tools begin with real research questions.
          </T>
        </h2>
        <p>
          <T zh="NexoraLab 将材料科学视角融入实用软件开发，让科学工作流更易获取、使用与共享。">
            NexoraLab connects a materials-science perspective with practical
            software development, making scientific workflows easier to access,
            use and share.
          </T>
        </p>
        <Link href="/about/" className="text-link">
          <T zh="关于 NexoraLab">About NexoraLab</T>
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </div>
  );
}
