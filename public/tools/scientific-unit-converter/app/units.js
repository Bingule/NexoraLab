(function (root) {
  "use strict";
  const families = {
    length: { m: [1, 0, "m"], mm: [1e-3, 0, "mm"], um: [1e-6, 0, "μm"], nm: [1e-9, 0, "nm"], angstrom: [1e-10, 0, "Å"] },
    energy: { J: [1, 0, "J"], meV: [1.602176634e-22, 0, "meV"], eV: [1.602176634e-19, 0, "eV"], keV: [1.602176634e-16, 0, "keV"] },
    pressure: { Pa: [1, 0, "Pa"], kPa: [1e3, 0, "kPa"], MPa: [1e6, 0, "MPa"], GPa: [1e9, 0, "GPa"], bar: [1e5, 0, "bar"] },
    temperature: { K: [1, 0, "K"], C: [1, 273.15, "°C"], F: [5 / 9, 459.67, "°F"] }
  };
  function convert(input, category, from, to) {
    const text = String(input).trim();
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(text) || !Number.isFinite(Number(text))) throw new Error("number");
    const family = families[category];
    if (!family || !Object.hasOwn(family, from) || !Object.hasOwn(family, to)) throw new Error("unit");
    const value = Number(text);
    if (value === 0 && /[1-9]/.test(text.split(/e/i)[0])) throw new Error("range");
    const base = (value + family[from][1]) * family[from][0];
    if (category === "temperature" && base < 0) throw new Error("absoluteZero");
    let result = category === "temperature" ? base / family[to][0] - family[to][1] : value * (family[from][0] / family[to][0]);
    // Remove cancellation noise at temperature zero, without rounding tiny SI values.
    if (category === "temperature" && Math.abs(result) < Number.EPSILON * Math.max(Math.abs(base / family[to][0]), Math.abs(family[to][1])) * 4) result = 0;
    if (!Number.isFinite(result) || (category !== "temperature" && value !== 0 && result === 0)) throw new Error("range");
    return Object.is(result, -0) ? 0 : result;
  }
  root.NexoraUnits = { families, convert };
})(globalThis);
