import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { assertPublicAsset } from "../lib/publication.ts";
const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean);
const findings: string[] = [];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  try {
    if (fs.lstatSync(file).isSymbolicLink())
      throw new Error(`Publication symlink requires review: ${file}`);
    assertPublicAsset(file, fs.readFileSync(file));
  } catch (error) {
    findings.push((error as Error).message);
  }
}
if (findings.length) {
  console.error(findings.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Checked ${files.length} tracked publication files; no configured private-material findings.`,
  );
