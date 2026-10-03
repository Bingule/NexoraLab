import Link from "next/link";
import { asset } from "@/lib/paths";
import { Icon } from "./Icon";
export function Founder({ full = false }: { full?: boolean }) {
  return (
    <div className={`founder ${full ? "founder-full" : ""}`}>
      <div className="founder-photo">
        <img
          src={asset("/founder/bing-wu.jpg")}
          alt="Bing Wu standing beside the sea"
          loading="lazy"
        />
      </div>
      <div className="founder-copy">
        <p className="eyebrow">THE SCIENCE BEHIND THE TOOLS</p>
        <h2>Bing Wu, Ph.D.</h2>
        <p className="founder-role">Founder of NexoraLab</p>
        <p>
          Materials researcher working at the intersection of materials
          chemistry, electrochemistry, crystal chemistry, computational
          materials science and scientific software development.
        </p>
        <p className="affiliation">
          University of Chemistry and Technology Prague
        </p>
        <div className="interest-tags">
          {[
            "2D Materials",
            "Electrochemistry",
            "DFT",
            "XRD",
            "TEM",
            "Scientific Software",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {full ? (
          <div
            className="profile-placeholders"
            aria-label="Profile links awaiting URLs"
          >
            {["Google Scholar", "GitHub", "ORCID", "Email", "CV"].map((t) => (
              <span key={t}>
                {t}
                <small>Link to be added</small>
              </span>
            ))}
          </div>
        ) : (
          <Link href="/about/" className="text-link">
            Meet the founder <Icon name="arrow" size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}
