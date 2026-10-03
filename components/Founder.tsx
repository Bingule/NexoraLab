import Link from "next/link";
import { asset } from "@/lib/paths";
import { Icon } from "./Icon";
import { T } from "./Language";
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
        <p className="eyebrow">
          <T zh="工具背后的科学">The science behind the tools</T>
        </p>
        <h2>Bing Wu, Ph.D.</h2>
        <p className="founder-role">
          <T zh="AimatraLab 创始人">Founder of AimatraLab</T>
        </p>
        <p>
          <T zh="材料研究者，专注材料化学、电化学与计算材料科学的实用工具开发。">
            Materials researcher developing practical tools for materials
            chemistry, electrochemistry and computational materials science.
          </T>
        </p>
        <p className="affiliation">
          <T zh="布拉格化学技术大学">
            University of Chemistry and Technology Prague
          </T>
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
                <small>
                  <T zh="链接待补充">Link to be added</T>
                </small>
              </span>
            ))}
          </div>
        ) : (
          <Link href="/about/" className="text-link">
            <T zh="了解创始人">Meet the founder</T>{" "}
            <Icon name="arrow" size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}
