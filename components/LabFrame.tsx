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
  const syncLanguage = () => {
    // Older independent web releases still consume the previous message type.
    for (const type of ["aimatralab-language", "nexoralab-language"]) {
      frame.current?.contentWindow?.postMessage({ type, language }, "*");
    }
  };
  useEffect(() => {
    for (const type of ["aimatralab-language", "nexoralab-language"]) {
      frame.current?.contentWindow?.postMessage({ type, language }, "*");
    }
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
