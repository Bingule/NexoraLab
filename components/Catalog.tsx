"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, isAvailable, type Tool } from "@/lib/manifest";
import { ToolCard } from "./ToolCard";
import { Icon } from "./Icon";
import { useLanguage } from "./Language";
import { categoryLabels } from "@/lib/labels";
export function Catalog({ tools }: { tools: Tool[] }) {
  const { text } = useLanguage();
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
      `${t.name} ${t.description} ${t.zh?.description || ""} ${t.category} ${categoryLabels[t.category]} ${t.platforms.join(" ")}`
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
            aria-label={text("Search tools", "搜索工具")}
            placeholder={text(
              "Search tools, categories, or keywords…",
              "搜索工具、类别或关键词…",
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="platform-filter">
          <span>{text("Platform", "平台")}</span>
          <select
            aria-label={text("Filter by platform", "按平台筛选")}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="all">{text("All platforms", "全部平台")}</option>
            {Array.from(new Set(tools.flatMap((t) => t.platforms)))
              .sort()
              .map((p) => (
                <option key={p}>{p}</option>
              ))}
          </select>
        </label>
      </div>
      <div
        className="filter-tabs"
        aria-label={text("Tool categories", "工具类别")}
      >
        {["all", ...categories].map((c) => (
          <button
            key={c}
            className={c === category ? "selected" : ""}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {text(
              c === "all"
                ? "All tools"
                : c.charAt(0).toUpperCase() + c.slice(1),
              categoryLabels[c],
            )}
            {c === "all" && <span>{tools.length}</span>}
          </button>
        ))}
      </div>
      <div className="results-summary" aria-live="polite">
        <span>
          {text(
            `${matches.length} tools found`,
            `找到 ${matches.length} 个工具`,
          )}
        </span>
        <span>
          {text(
            `${tools.filter(isAvailable).length} available · ${tools.filter((t) => !isAvailable(t)).length} in preparation`,
            `${tools.filter(isAvailable).length} 个已发布 · ${tools.filter((t) => !isAvailable(t)).length} 个规划中`,
          )}
        </span>
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
          <h2>{text("No tools found", "未找到工具")}</h2>
          <p>
            {text(
              "Try another keyword, category or platform.",
              "请尝试其他关键词、类别或平台。",
            )}
          </p>
          <button className="button" onClick={clear}>
            {text("Clear filters", "清除筛选")}
          </button>
        </div>
      )}
    </>
  );
}
