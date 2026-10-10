import { siteDescription, siteUrl, siteHref } from "@/lib/site";
import { isAvailable } from "@/lib/manifest";
import Link from "next/link";
import { getTools } from "@/lib/registry";
import { researchAreas } from "@/lib/research";
import { ToolCard } from "@/components/ToolCard";
import { Icon, categoryIcon } from "@/components/Icon";
import { Lattice } from "@/components/Lattice";
import { Founder } from "@/components/Founder";
import { T } from "@/components/Language";

export default function Home() {
  const tools = getTools();
  const recent = [...tools]
    .filter((t) => isAvailable(t) && t.history?.length)
    .sort((a, b) => (b.updated || "").localeCompare(a.updated || ""))
    .slice(0, 3);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${siteUrl.href}#website`,
                name: "AimatraLab",
                alternateName: "aimatralab.com",
                url: siteUrl.href,
                description: siteDescription,
                inLanguage: ["zh-CN", "en"],
                publisher: { "@id": `${siteUrl.href}#organization` },
              },
              {
                "@type": "Organization",
                "@id": `${siteUrl.href}#organization`,
                name: "AimatraLab",
                url: siteUrl.href,
                logo: siteHref("/logo.svg"),
                description: siteDescription,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-rule" />{" "}
              <T zh="AI 辅助材料研究工具">
                AI-assisted tools for materials research
              </T>
            </p>
            <h1>
              AimatraLab
              <br />
              <T
                zh={
                  <>
                    助力<span>材料研究。</span>
                  </>
                }
              >
                Materials research <span>tools.</span>
              </T>
            </h1>
            <p className="hero-description">
              <T zh="从原子结构到实验洞察。">
                From atomic structures to experimental insight.
              </T>
              <br className="desktop-break" />{" "}
              <T zh="使用 CIF 晶体结构描述、分子量与理论容量计算、电化学数据分析工具，探索科研论文评审 AI Skill。">
                Explore CIF crystal descriptions, molar mass and theoretical
                capacity calculators, electrochemical data analysis, and an AI
                skill for scientific manuscript review.
              </T>
            </p>
            <div className="hero-actions">
              <Link href="/tools/" className="button">
                <T zh="探索工具">Explore Tools</T>{" "}
                <Icon name="arrow" size={18} />
              </Link>
              <Link href="/lab/" className="button secondary">
                <Icon name="globe" size={17} />
                <T zh="打开在线实验室">Open Online Lab</T>
              </Link>
            </div>
            <div className="hero-footnote">
              <span className="live-dot" />{" "}
              <T zh="为研究者打造，让探索更进一步。">
                Built for researchers. Open to discovery.
              </T>
            </div>
          </div>
          <Lattice />
        </div>
      </section>
      <div className="discipline-strip">
        <div className="container">
          {[
            ["box", "Crystal structures", "晶体结构", "structure"],
            ["chart", "Diffraction", "衍射", "diffraction"],
            ["microscope", "Microscopy", "显微表征", "microscopy"],
            ["activity", "Electrochemistry", "电化学", "electrochemistry"],
            ["cpu", "Simulation", "模拟", "simulation"],
          ].map(([icon, label, zh, category]) => (
            <Link key={label} href={`/tools/?category=${category}`}>
              <span>
                <Icon name={icon} size={17} />
                <T zh={zh}>{label}</T>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <T zh="精选工具">Featured tools</T>
            </p>
            <h2>
              <T zh="从合适的工具开始。">Start with the right tool.</T>
            </h2>
            <p>
              <T zh="围绕材料科学，持续完善的工具集。">
                A growing collection, built around materials science.
              </T>
            </p>
          </div>
          <Link className="text-link" href="/tools/">
            <T zh="浏览全部工具">Browse all tools</T>{" "}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="tool-grid featured-grid">
          {tools
            .filter((t) => t.featured && isAvailable(t))
            .sort((a, b) => Number(!!a.demo) - Number(!!b.demo))
            .slice(0, 4)
            .map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
        </div>
        <p className="catalog-note">
          <span className="small-dot" />{" "}
          <T zh="已发布工具可直接使用；规划中的工具会在正式发布后开放。">
            Released tools are ready to use. Planned tools become available when
            their first release is published.
          </T>
        </p>
      </section>
      <section className="lab-band">
        <div className="container lab-band-inner">
          <div className="lab-band-icon">
            <Icon name="globe" size={33} />
          </div>
          <div>
            <p className="eyebrow">
              <T zh="在线实验室">Online Lab</T>
            </p>
            <h2>
              <T zh="浏览器，就是你的下一个工作区。">
                Your next workspace is a browser tab.
              </T>
            </h2>
            <p>
              <T zh="使用结构描述、分子量与容量计算和倍率分析工具，或查看研究 Skill 的使用指南。">
                Explore structure descriptions, formula and capacity
                calculators, rate analysis and research skill guides.
              </T>
            </p>
          </div>
          <Link className="button secondary" href="/lab/">
            <T zh="进入在线实验室">Discover Online Lab</T>{" "}
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <T zh="科学连接一切">Connected by science</T>
            </p>
            <h2>
              <T zh="研究，塑造工具。">Research that shapes the tools.</T>
            </h2>
          </div>
          <Link href="/research/" className="text-link">
            <T zh="了解研究方向">Our research areas</T>{" "}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="research-mini-grid">
          {researchAreas.map((r, i) => (
            <Link href="/research/" key={r.title}>
              <span className="research-number">0{i + 1}</span>
              <div>
                <h3>
                  <T zh={r.zh.title}>{r.title}</T>
                </h3>
                <p>
                  <T zh={r.zh.description}>{r.description}</T>
                </p>
              </div>
              <Icon name={r.icon} size={24} />
            </Link>
          ))}
        </div>
      </section>
      <section className="founder-section">
        <div className="container">
          <Founder />
        </div>
      </section>
      <section className="section container updates-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <T zh="实验室动态">From the lab</T>
            </p>
            <h2>
              <T zh="最新发布与更新。">Latest releases & updates.</T>
            </h2>
          </div>
          <span className="quiet-label">
            <T zh="软件发布">Software releases</T>
          </span>
        </div>
        <div className="updates-list">
          {recent.map((t) => (
            <Link href={`/tools/${t.id}/`} key={t.id}>
              <div className={`update-icon ${t.category}`}>
                <Icon name={categoryIcon[t.category]} />
              </div>
              <div>
                <h3>{t.name}</h3>
                <p>
                  <T zh={t.zh?.historyNotes?.[t.history![0].version]}>
                    {t.history![0].notes}
                  </T>
                </p>
              </div>
              <span className="update-version">v{t.version}</span>
              <time dateTime={t.updated}>{t.updated}</time>
              <Icon name="arrow" size={18} />
            </Link>
          ))}
        </div>
        {!recent.length && (
          <p>
            <T zh="首个软件发布后，更新会显示在这里。">
              Software updates will appear here with the first release.
            </T>
          </p>
        )}
      </section>
    </>
  );
}
