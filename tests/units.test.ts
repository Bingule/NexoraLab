import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const context = vm.createContext({});
vm.runInContext(
  fs.readFileSync(
    "public/tools/scientific-unit-converter/app/units.js",
    "utf8",
  ),
  context,
);
const convert = context.NexoraUnits.convert as (
  value: string | number,
  category: string,
  from: string,
  to: string,
) => number;
test("scientific conversions preserve SI scales and exact constants", () => {
  assert.equal(convert(1, "length", "nm", "angstrom"), 10);
  assert.equal(convert(1, "energy", "eV", "J"), 1.602176634e-19);
  assert.equal(convert(2, "pressure", "GPa", "MPa"), 2000);
  assert.equal(convert("1.25e-3", "length", "m", "mm"), 1.25);
});
test("absolute temperature offsets and reverse conversion", () => {
  assert.equal(convert(0, "temperature", "C", "K"), 273.15);
  assert.equal(convert(32, "temperature", "F", "C"), 0);
  assert.equal(convert(-273.15, "temperature", "C", "K"), 0);
  assert.equal(convert(-459.67, "temperature", "F", "K"), 0);
  const value = convert(
    convert(25, "temperature", "C", "F"),
    "temperature",
    "F",
    "C",
  );
  assert.ok(Math.abs(value - 25) < 1e-10);
});
test("invalid values, mismatched units, overflow and temperatures below absolute zero are rejected", () => {
  for (const value of ["", " ", "0x10", "1,2", "Infinity", NaN])
    assert.throws(() => convert(value, "length", "nm", "m"));
  assert.throws(() => convert(-274, "temperature", "C", "K"));
  assert.throws(() => convert(1, "energy", "nm", "eV"));
  assert.throws(() => convert(1e308, "length", "m", "angstrom"));
  assert.throws(() => convert("1e-400", "length", "m", "m"));
  assert.throws(() => convert("1e-320", "length", "angstrom", "m"));
  assert.equal(convert("1e-320", "length", "nm", "nm"), 1e-320);
  assert.equal(convert("0e-400", "length", "m", "m"), 0);
});
