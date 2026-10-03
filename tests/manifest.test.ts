import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateTool,
  validateRegistry,
  validLink,
  isAvailable,
} from "../lib/manifest.ts";

const demo = {
  id: "xrd-analyzer",
  name: "XRD Analyzer",
  version: "0.0.0",
  category: "diffraction",
  type: "desktop",
  description: "Demo entry.",
  platforms: ["Windows"],
  icon: "",
  screenshots: [],
  download: "",
  online: "",
  github: "",
  documentation: "",
  citation: "",
  demo: true,
};

test("accepts the publishing template and optional fields", () => {
  assert.equal(validateTool(demo).id, "xrd-analyzer");
  assert.equal(
    validateTool({
      ...demo,
      type: "hybrid",
      online: "/lab/xrd-analyzer/",
      download: "https://example.com/release.zip",
    }).type,
    "hybrid",
  );
});
test("skills are available through guidance, retain version metadata and cannot be browser builds or Windows licensed clients", () => {
  const skill = validateTool({
    ...demo,
    type: "skill",
    demo: false,
    platforms: ["Codex"],
    documentation: "/lab/reviewer-two/",
    version: "1.1.0",
    history: [
      {
        version: "1.1.0",
        date: "2026-10-03",
        notes: "Updated review guidance",
      },
    ],
  });
  assert.equal(isAvailable(skill), true);
  assert.equal(isAvailable({ ...skill, documentation: "" }), false);
  assert.equal(isAvailable({ ...skill, demo: true }), false);
  assert.equal(skill.history?.[0].version, "1.1.0");
  assert.throws(() => validateTool({ ...skill, web: "dist/index.html" }));
  assert.throws(() =>
    validateTool({
      ...skill,
      platforms: ["Windows"],
      windowsActivationRequired: true,
    }),
  );
});

test("Windows activation metadata is scoped to a Windows client and excludes private manifest fields", () => {
  assert.equal(
    validateTool({ ...demo, windowsActivationRequired: true })
      .windowsActivationRequired,
    true,
  );
  for (const patch of [
    { windowsActivationRequired: "true" },
    { windowsActivationRequired: true, type: "online" },
    { windowsActivationRequired: true, platforms: ["Web"] },
    { ["private" + "SigningKey"]: "synthetic-fixture" },
    { zh: { issuer: { token: "synthetic-fixture" } } },
    {
      history: [
        {
          version: "1.0.0",
          date: "2026-10-03",
          notes: "Release",
          issuer: "synthetic-fixture",
        },
      ],
    },
  ])
    assert.throws(() => validateTool({ ...demo, ...patch }));
});
test("rejects invalid IDs, categories, types and links", () => {
  for (const patch of [
    { id: "../escape" },
    { category: "bad" },
    { type: "server" },
    { online: "javascript:alert(1)" },
    { download: "//evil.test/file" },
    { platforms: "Windows" },
    { screenshots: [4] },
  ]) {
    assert.throws(() => validateTool({ ...demo, ...patch }));
  }
});
test("rejects duplicate tools before static route generation", () => {
  assert.throws(() => validateRegistry([demo, demo]), /Duplicate/);
});
test("only exposes safe nonempty URLs", () => {
  assert.equal(validLink(""), false);
  assert.equal(validLink("javascript:alert(1)"), false);
  assert.equal(validLink("//example.com"), false);
  assert.equal(validLink("/lab/crystal-viewer/"), true);
  assert.equal(validLink("https://example.com/download.zip"), true);
});
test("availability requires a real entry with a usable access link", () => {
  assert.equal(
    isAvailable(validateTool({ ...demo, demo: false, version: "1.0.0" })),
    false,
  );
  assert.equal(
    isAvailable(validateTool({ ...demo, online: "/lab/xrd-analyzer/" })),
    false,
  );
  assert.equal(
    isAvailable(
      validateTool({ ...demo, demo: false, online: "/lab/xrd-analyzer/" }),
    ),
    true,
  );
});
test("rejects malformed HTTPS URLs before showing action buttons", () => {
  for (const url of [
    "https://?",
    "https://[bad",
    "https://example.com:99999/x",
    "https://example.com\\file",
  ]) {
    assert.equal(validLink(url), false, url);
    assert.throws(() => validateTool({ ...demo, download: url }));
  }
});
test("validates hosted app entries, release links and optional Chinese metadata", () => {
  const online = {
    ...demo,
    demo: false,
    type: "online",
    web: "/tools/xrd-analyzer/app/index.html",
    release: "https://github.com/example/tool/releases/tag/v1.0.0",
    zh: {
      description: "工具说明",
      features: ["导出数据"],
      historyNotes: { "1.0.0": "首个版本已发布" },
    },
  };
  assert.equal(validateTool(online).zh?.description, "工具说明");
  for (const patch of [
    { web: "/lab/elsewhere/index.html" },
    { web: "../dist/index.html" },
    { type: "desktop" },
    { demo: true },
    { release: "javascript:alert(1)" },
    { zh: { features: [1] } },
    { screenshots: ["../private.png"] },
  ])
    assert.throws(() => validateTool({ ...online, ...patch }));
});
