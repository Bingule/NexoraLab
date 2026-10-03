import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/registry";
import { Icon, categoryIcon } from "@/components/Icon";
export const metadata: Metadata = { title: "Online Lab" };
const planned = [
  ["CIF utilities", "Structure file conversion and preparation.", "box"],
  [
    "Supercell generator",
    "A future workspace for building periodic structures.",
    "layers",
  ],
  ["XRD calculators", "A future home for diffraction utilities.", "chart"],
  [
    "Electrochemical calculators",
    "A future home for electrochemical utilities.",
    "activity",
  ],
  [
    "Scientific plotting",
    "A future workspace for research data visualization.",
    "chart",
  ],
  ["Unit conversion", "A future home for scientific unit utilities.", "code"],
];
export default function Lab() {
  const tools = getTools().filter((t) => t.type !== "desktop");
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">NEXORALAB / ONLINE LAB</p>
        <h1>Science, in your browser.</h1>
        <p>
          A dedicated workspace for online scientific tools. No installation
          required.
        </p>
      </div>
      <div className="notice">
        <Icon name="globe" size={23} />
        <div>
          <strong>The workspace is taking shape.</strong>
          <p>
            This first version provides the platform structure. Demo workspaces
            contain no scientific calculations.
          </p>
        </div>
      </div>
      <div className="section-heading compact">
        <h2>Demo workspaces</h2>
        <span className="quiet-label">{tools.length} preview entries</span>
      </div>
      <div className="tool-grid lab-grid">
        {tools.map((t) => (
          <article key={t.id} className={`tool-card ${t.category}`}>
            <div className="card-top">
              <div className="tool-icon">
                <Icon name={categoryIcon[t.category]} size={25} />
              </div>
              <span className="demo-label">DEMO WORKSPACE</span>
            </div>
            <h3>{t.name}</h3>
            <p className="card-description">{t.description}</p>
            <div className="card-footer">
              <span className="version">Preview only</span>
              <Link href={`/lab/${t.id}/`} className="text-link">
                View workspace <Icon name="arrow" size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="section-heading compact roadmap-heading">
        <div>
          <p className="eyebrow">ON THE HORIZON</p>
          <h2>Room for more discovery.</h2>
        </div>
      </div>
      <div className="planned-grid">
        {planned.map(([name, description, icon]) => (
          <article key={name}>
            <Icon name={icon} size={23} />
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <span className="planned-label">PLANNED</span>
          </article>
        ))}
      </div>
    </div>
  );
}
