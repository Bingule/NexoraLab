import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { validateTool, isAvailable } from "../lib/manifest.ts";

const ids = [
  "crystal-description",
  "theoretical-capacity",
  "molecular-weight",
  "reviewer-two",
  "rate-performance",
];
test("all five TMCCDB tools are real registry entries with stable local workspaces", () => {
  for (const id of ids) {
    const tool = validateTool(
      JSON.parse(fs.readFileSync(`content/tools/${id}.json`, "utf8")),
    );
    assert.equal(tool.id, id);
    assert.equal(tool.demo, undefined);
    assert.equal(isAvailable(tool), true);
    assert.equal(tool.online, `/lab/${id}/`);
    assert.ok(tool.github.startsWith("https://github.com/Bingule/"));
  }
});
test("TMCCDB scientific modules retain the pinned upstream bytes, apart from one obsolete TS annotation", () => {
  const upstream = JSON.parse(
    fs.readFileSync("vendor/tmccdb/UPSTREAM.json", "utf8"),
  );
  for (const [path, hash] of Object.entries(upstream.scientificFiles)) {
    let source = fs.readFileSync(`vendor/tmccdb/${path}`, "utf8");
    if (path === upstream.typeOnlyCompatibility.file) {
      source = source.replace(
        "    const module: { levenbergMarquardt: RateOptimizer }",
        `${upstream.typeOnlyCompatibility.removedLine}\n    const module: { levenbergMarquardt: RateOptimizer }`,
      );
    }
    assert.equal(createHash("sha256").update(source).digest("hex"), hash, path);
  }
});
