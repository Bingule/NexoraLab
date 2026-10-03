import Link from "next/link";
import { getTools } from "@/lib/registry";
import { researchAreas } from "@/lib/research";
import { ToolCard } from "@/components/ToolCard";
import { Icon, categoryIcon } from "@/components/Icon";
import { Lattice } from "@/components/Lattice";
import { Founder } from "@/components/Founder";

export default function Home() {
  const tools = getTools();
  const recent = [...tools]
    .sort((a, b) => (b.updated || "").localeCompare(a.updated || ""))
    .slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-rule" /> YOUR ONLINE MATERIALS LABORATORY
            </p>
            <h1>
              Tools for
              <br />
              materials <span>research.</span>
            </h1>
            <p className="hero-description">
              From atomic structures to experimental insight.
              <br className="desktop-break" /> Practical scientific software for
              exploring, analyzing
              <br className="desktop-break" /> and understanding materials.
            </p>
            <div className="hero-actions">
              <Link href="/tools/" className="button">
                Explore Tools <Icon name="arrow" size={18} />
              </Link>
              <Link href="/lab/" className="button secondary">
                <Icon name="globe" size={17} />
                Open Online Lab
              </Link>
            </div>
            <div className="hero-footnote">
              <span className="live-dot" /> Built for researchers. Open to
              discovery.
            </div>
          </div>
          <Lattice />
        </div>
      </section>
      <section className="founder-section">
        <div className="container">
          <Founder />
        </div>
      </section>
      <div className="discipline-strip">
        <div className="container">
          {[
            ["box", "Crystal structures"],
            ["chart", "Diffraction"],
            ["microscope", "Microscopy"],
            ["activity", "Electrochemistry"],
            ["cpu", "Simulation"],
          ].map(([icon, label]) => (
            <span key={label}>
              <Icon name={icon} size={17} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE RESEARCH TOOLKIT</p>
            <h2>Start with the right tool.</h2>
            <p>A growing collection, built around materials science.</p>
          </div>
          <Link className="text-link" href="/tools/">
            Browse all tools <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="tool-grid featured-grid">
          {tools
            .filter((t) => t.featured)
            .slice(0, 3)
            .map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
        </div>
        <p className="catalog-note">
          <span className="small-dot" /> Preview catalog — these entries
          demonstrate the platform. Software releases will be added
          individually.
        </p>
      </section>
      <section className="lab-band">
        <div className="container lab-band-inner">
          <div className="lab-band-icon">
            <Icon name="globe" size={33} />
          </div>
          <div>
            <p className="eyebrow">LESS SETUP. MORE SCIENCE.</p>
            <h2>Your next workspace is a browser tab.</h2>
            <p>Explore the future home of browser-based scientific tools.</p>
          </div>
          <Link className="button secondary" href="/lab/">
            Discover Online Lab <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CONNECTED BY SCIENCE</p>
            <h2>Research that shapes the tools.</h2>
          </div>
          <Link href="/research/" className="text-link">
            Our research areas <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="research-mini-grid">
          {researchAreas.map((r, i) => (
            <Link href="/research/" key={r.title}>
              <span className="research-number">0{i + 1}</span>
              <h3>{r.title}</h3>
              <Icon name={r.icon} size={24} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section container updates-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM THE LAB</p>
            <h2>Latest in the toolkit.</h2>
          </div>
          <span className="quiet-label">Registry updates</span>
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
                  {t.demo
                    ? "Demo catalog entry added"
                    : `Version ${t.version} registered`}
                </p>
              </div>
              <span className="update-version">
                {t.demo ? "Demo" : `v${t.version}`}
              </span>
              <time dateTime={t.updated}>{t.updated}</time>
              <Icon name="arrow" size={18} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
