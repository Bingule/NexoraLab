"use client";
import dynamic from "next/dynamic";
import { T } from "./Language";
import { I18nProvider } from "@/vendor/tmccdb/src/i18n/I18nProvider";
import "./tmcc-tools.css";
const loading = () => (
  <p role="status">
    <T zh="正在加载工具…">Loading tool…</T>
  </p>
);
const pages: Record<string, ReturnType<typeof dynamic>> = {
  "cv-kinetics": dynamic(
    () => import("@/vendor/tmccdb/src/pages/CvKineticsPage"),
    { ssr: false, loading },
  ),
  "molecular-weight": dynamic(
    () => import("@/vendor/tmccdb/src/pages/MolecularWeightPage"),
    { ssr: false, loading },
  ),
  "theoretical-capacity": dynamic(
    () => import("@/vendor/tmccdb/src/pages/TheoreticalCapacityPage"),
    { ssr: false, loading },
  ),
  "crystal-description": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/crystal-description/CrystalDescriptionPage"),
    { ssr: false, loading },
  ),
  "rate-performance": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/RatePerformanceAnalysisPage"),
    { ssr: false, loading },
  ),
  "model-comparison": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/ModelComparisonPage"),
    { ssr: false, loading },
  ),
  "transport-limitations": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/TransportLimitationPage"),
    { ssr: false, loading },
  ),
  "characteristic-time": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/CharacteristicTimePage"),
    { ssr: false, loading },
  ),
  "thickness-kinetics": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/ThicknessKineticsPage"),
    { ssr: false, loading },
  ),
  "ca-analysis": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/CaRateAnalysisPage"),
    { ssr: false, loading },
  ),
  "empirical-models": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/EmpiricalModelsPage"),
    { ssr: false, loading },
  ),
  "energy-power": dynamic(
    () =>
      import("@/vendor/tmccdb/src/tools/rate-performance/pages/EnergyPowerPage"),
    { ssr: false, loading },
  ),
};
export function TmccWorkspace({ id, view }: { id: string; view?: string }) {
  const Page = pages[view || id];
  if (!Page) return null;
  return (
    <I18nProvider>
      <div className="tmcc-tool">
        <Page />
      </div>
    </I18nProvider>
  );
}
