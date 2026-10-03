import type { Metadata } from "next";
import { Suspense } from "react";
import { getTools } from "@/lib/registry";
import { Catalog } from "@/components/Catalog";
export const metadata: Metadata = { title: "Tools" };
export default function Tools() {
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">NEXORALAB / TOOLS</p>
        <h1>A toolkit for your next discovery.</h1>
        <p>
          Find scientific software for structures, characterization and
          computational research.
        </p>
      </div>
      <Suspense fallback={<p>Loading the tool catalog…</p>}>
        <Catalog tools={getTools()} />
      </Suspense>
      <div className="integration-note">
        <h3>A growing, independent collection.</h3>
        <p>
          Each tool remains an independent software project. NexoraLab brings
          their information, releases and online experiences into one place.
        </p>
      </div>
    </div>
  );
}
