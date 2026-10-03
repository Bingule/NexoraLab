export const migratedToolIds = [
  "crystal-description",
  "theoretical-capacity",
  "molecular-weight",
  "reviewer-two",
  "rate-performance",
] as const;
export function isMigratedTool(id: string) {
  return (migratedToolIds as readonly string[]).includes(id);
}
export const rateViews = [
  "model-comparison",
  "transport-limitations",
  "characteristic-time",
  "thickness-kinetics",
  "ca-analysis",
  "empirical-models",
  "energy-power",
] as const;
