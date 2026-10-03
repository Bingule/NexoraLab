import type { Metadata } from "next";
import { Founder } from "@/components/Founder";
import { Icon } from "@/components/Icon";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">NEXORALAB / ABOUT</p>
        <h1>Practical tools. Shared discovery.</h1>
        <p>
          An online materials-science laboratory and scientific software
          platform founded by Bing Wu.
        </p>
      </div>
      <div className="about-mission">
        <p className="eyebrow">OUR MISSION</p>
        <h2>
          Make practical scientific tools for materials research easier to
          access, use and share.
        </h2>
        <p>
          NexoraLab brings independent scientific software and browser-based
          research tools together in a clear, accessible workspace. The focus is
          on characterization, structures, data analysis, simulation and
          visualization.
        </p>
      </div>
      <Founder full />
      <div className="values-grid">
        {[
          [
            "box",
            "Rooted in materials science",
            "Tools shaped by the questions and workflows of materials research.",
          ],
          [
            "code",
            "Independent by design",
            "Software projects keep their own code, documentation and release cycles.",
          ],
          [
            "globe",
            "Easy to access",
            "One place to discover desktop software and online scientific workspaces.",
          ],
        ].map(([icon, title, desc]) => (
          <article key={title}>
            <Icon name={icon} size={24} />
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
