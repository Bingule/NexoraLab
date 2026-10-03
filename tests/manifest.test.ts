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
