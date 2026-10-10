import type { Tool } from "./manifest";

const descriptiveTitles: Record<string, string> = {
  "crystal-description": "Crystal Description — CIF Structure Reports",
  "cv-kinetics": "CV Kinetics — b-value & Dunn Analysis",
  "rate-performance": "Rate Performance — Electrochemical Rate Analysis",
  "reviewer-two": "Reviewer Two — Scientific Manuscript Review Skill",
};

export function toolSeoTitle(tool: Tool): string {
  return descriptiveTitles[tool.id] || tool.name;
}
