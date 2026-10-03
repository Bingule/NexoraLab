import type { Metadata } from "next";
import Link from "next/link";
import { researchAreas } from "@/lib/research";
import { Icon } from "@/components/Icon";
export const metadata: Metadata = { title: "Research" };
export default function Research() {
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">NEXORALAB / RESEARCH</p>
        <h1>Built on a scientific foundation.</h1>
        <p>
          The materials research interests that inform NexoraLab’s practical
          tools and scientific workflows.
        </p>
      </div>
      <div className="research-grid">
        {researchAreas.map((r, i) => (
          <article key={r.title}>
            <div className="research-card-top">
              <Icon name={r.icon} size={29} />
              <span>0{i + 1}</span>
            </div>
            <p className="eyebrow">{r.tag}</p>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            <Link href={`/tools/?category=${r.category}`} className="text-link">
              Explore related tools <Icon name="arrow" size={17} />
            </Link>
          </article>
        ))}
      </div>
      <div className="mission-note">
        <p className="eyebrow">RESEARCH INTO PRACTICE</p>
        <h2>Better tools begin with real research questions.</h2>
        <p>
          NexoraLab connects a materials-science perspective with practical
          software development, making scientific workflows easier to access,
          use and share.
        </p>
        <Link href="/about/" className="text-link">
          About NexoraLab <Icon name="arrow" size={17} />
        </Link>
      </div>
    </div>
  );
}
