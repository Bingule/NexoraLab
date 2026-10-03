// NexoraLab language adapter; upstream resources and interpolation retained.
import { useCallback, type ReactNode } from "react";
import { useLanguage } from "@/components/Language";
import { en, type TranslationKey } from "../locales/en";
import { zh } from "../locales/zh";
export type Language = "en" | "zh";
type InterpolationParams = Record<string, string | number>;
type TranslationResources = Partial<Record<TranslationKey, string>>;
export function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
export function useI18n() {
  const { language, setLanguage } = useLanguage();
  const t = useCallback(
    (key: TranslationKey, params?: InterpolationParams) =>
      resolveTranslation(key, params, language === "zh" ? zh : en),
    [language],
  );
  return { language, setLanguage, t };
}
export function resolveTranslation(
  key: TranslationKey,
  params: InterpolationParams | undefined,
  translations: TranslationResources,
): string {
  const value = translations[key] ?? en[key];
  return value.replace(/{{(\w+)}}/g, (token, name: string) => {
    const parameter = params?.[name];
    return parameter === undefined ? token : String(parameter);
  });
}
