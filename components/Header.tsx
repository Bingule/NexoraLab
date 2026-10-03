"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/paths";
import { Icon } from "./Icon";
import { LanguageSwitch, useLanguage } from "./Language";
const nav = [
  ["Home", "/", "首页"],
  ["Tools", "/tools/", "工具"],
  ["Online Lab", "/lab/", "在线实验室"],
  ["Research", "/research/", "研究方向"],
  ["About", "/about/", "关于"],
];
export function Header() {
  const { text } = useLanguage();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label={text("AimatraLab home", "AimatraLab 首页")}
          onClick={() => setOpen(false)}
        >
          <img src={asset("/logo.svg")} width="33" height="33" alt="" />
          Aimatra<span>Lab</span>
        </Link>
        <nav
          id="main-navigation"
          className={open ? "nav open" : "nav"}
          aria-label={text("Main navigation", "主导航")}
        >
          {nav.map(([label, href, zh]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={
                (
                  href === "/"
                    ? path === "/"
                    : path.startsWith(href.replace(/\/$/, ""))
                )
                  ? "page"
                  : undefined
              }
            >
              {text(label, zh)}
            </Link>
          ))}
        </nav>
        <LanguageSwitch />
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={
            open
              ? text("Close navigation", "关闭导航")
              : text("Open navigation", "展开导航")
          }
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
