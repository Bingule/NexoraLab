"use client";
import { asset } from "@/lib/paths";
import { useLanguage } from "./Language";
import { useEffect, useRef, useState } from "react";
export function LabFrame({ src, name }: { src: string; name: string }) {
  const { language, ready, text } = useLanguage();
  const [initialLanguage, setInitialLanguage] = useState<string>();
  useEffect(() => {
    if (ready) setInitialLanguage((value) => value ?? language);
  }, [ready, language]);
  const frame = useRef<HTMLIFrameElement>(null);
  const syncLanguage = () =>
    frame.current?.contentWindow?.postMessage(
      { type: "nexoralab-language", language },
      "*",
    );
  useEffect(() => {
    frame.current?.contentWindow?.postMessage(
      { type: "nexoralab-language", language },
      "*",
    );
  }, [language]);
  return (
    <iframe
      ref={frame}
      onLoad={syncLanguage}
      className="lab-frame"
      title={text(`${name} interactive workspace`, `${name} 在线工作区`)}
      src={`${asset(src)}?lang=${initialLanguage || language}`}
      sandbox="allow-scripts"
    />
  );
}
