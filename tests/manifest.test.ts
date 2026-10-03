import { test } from "node:test";
import assert from "node:assert/strict";
import { validateTool, validateRegistry, validLink } from "../lib/manifest.ts";

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
