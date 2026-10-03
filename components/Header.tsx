"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/paths";
import { Icon } from "./Icon";
const nav = [
  ["Home", "/"],
  ["Tools", "/tools/"],
  ["Online Lab", "/lab/"],
  ["Research", "/research/"],
  ["About", "/about/"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="NexoraLab home"
          onClick={() => setOpen(false)}
        >
          <img src={asset("/logo.svg")} width="33" height="33" alt="" />
          Nexora<span>Lab</span>
        </Link>
        <nav
          id="main-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {nav.map(([label, href]) => (
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
              {label}
            </Link>
          ))}
        </nav>
        <span className="header-caption">A workspace for discovery</span>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
