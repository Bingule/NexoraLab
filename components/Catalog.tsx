"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, type Tool } from "@/lib/manifest";
import { ToolCard } from "./ToolCard";
import { Icon } from "./Icon";
export function Catalog({ tools }: { tools: Tool[] }) {
  const params = useSearchParams();
  const requested = params.get("category") || "all";
  const [category, setCategory] = useState(
    categories.includes(requested as (typeof categories)[number])
      ? requested
      : "all",
  );
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all");
  const matches = tools.filter(
    (t) =>
      (category === "all" || t.category === category) &&
      (platform === "all" || t.platforms.includes(platform)) &&
      `${t.name} ${t.description} ${t.category} ${t.platforms.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const clear = () => {
    setCategory("all");
    setQuery("");
    setPlatform("all");
  };
  return (
    <>
      <div className="catalog-controls">
        <label className="search">
          <Icon name="search" />
          <input
            aria-label="Search tools"
            placeholder="Search tools, categories, or keywords…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="platform-filter">
          <span>Platform</span>
          <select
            aria-label="Filter by platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="all">All platforms</option>
            {Array.from(new Set(tools.flatMap((t) => t.platforms)))
              .sort()
              .map((p) => (
                <option key={p}>{p}</option>
              ))}
          </select>
        </label>
      </div>
      <div className="filter-tabs" aria-label="Tool categories">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            className={c === category ? "selected" : ""}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c === "all" ? "All tools" : c.charAt(0).toUpperCase() + c.slice(1)}
            {c === "all" && <span>{tools.length}</span>}
          </button>
        ))}
      </div>
      <div className="results-summary" aria-live="polite">
        <span>
          {matches.length} {matches.length === 1 ? "tool" : "tools"} in your
          workspace
        </span>
        <span>Demo catalog · Real releases coming later</span>
      </div>
      {matches.length ? (
        <div className="tool-grid">
          {matches.map((t) => (
            <ToolCard tool={t} key={t.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" size={34} />
          <h2>No tools found</h2>
          <p>Try another keyword, category or platform.</p>
          <button className="button" onClick={clear}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
