import { T } from "@/components/Language";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getTools } from "@/lib/registry";
import { Catalog } from "@/components/Catalog";
export const metadata: Metadata = { title: "Tools" };
export default function Tools() {
  return (
    <div className="container page-content">
      <div className="page-heading">
        <p className="eyebrow">
          <T zh="NEXORALAB / 工具">NexoraLab / Tools</T>
        </p>
        <h1>
          <T zh="为下一次发现，准备好工具。">
            A toolkit for your next discovery.
          </T>
        </h1>
        <p>
          <T zh="寻找结构、表征与计算研究所需的科学软件。">
            Find scientific software for structures, characterization and
            computational research.
          </T>
        </p>
      </div>
      <Suspense
        fallback={
          <p>
            <T zh="正在加载工具目录…">Loading the tool catalog…</T>
          </p>
        }
      >
        <Catalog tools={getTools()} />
      </Suspense>
      <div className="integration-note">
        <h3>
          <T zh="持续成长的独立工具集。">A growing, independent collection.</T>
        </h3>
        <p>
          <T zh="每个工具保留独立项目。NexoraLab 汇集它们的信息、发布版本与在线使用入口。">
            Each tool remains an independent software project. NexoraLab brings
            their information, releases and online experiences into one place.
          </T>
        </p>
      </div>
    </div>
  );
}
