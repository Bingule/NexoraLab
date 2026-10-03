(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const words = {
    en: { title: "Scientific Unit Converter", intro: "Convert common materials-science units. All calculations stay in your browser.", quantity: "Quantity", length: "Length", energy: "Energy", pressure: "Pressure", temperature: "Absolute temperature", value: "Value", from: "From", to: "To", swap: "Swap units", notation: "Scientific notation is supported, for example 1.25e-3.", result: "RESULT", precision: "Results display up to 12 significant digits. Temperature converts absolute values, not temperature differences.", definitions: "Definitions: 1 Å = 10⁻¹⁰ m · 1 eV = 1.602176634 × 10⁻¹⁹ J · 1 bar = 10⁵ Pa · K = °C + 273.15.", reference: "SI definitions — BIPM", number: "Enter a finite number using decimal or scientific notation.", absoluteZero: "Absolute temperature cannot be below 0 K (−273.15 °C).", range: "The value is outside the supported numerical range.", unit: "Choose units from the same quantity." },
    zh: { title: "科学单位换算器", intro: "换算材料研究中的常用单位。所有计算都在你的浏览器中完成。", quantity: "物理量", length: "长度", energy: "能量", pressure: "压力", temperature: "绝对温度", value: "数值", from: "原单位", to: "目标单位", swap: "交换单位", notation: "支持科学计数法，例如 1.25e-3。", result: "换算结果", precision: "结果最多显示 12 位有效数字。温度换算针对绝对温度，不适用于温差。", definitions: "定义：1 Å = 10⁻¹⁰ m · 1 eV = 1.602176634 × 10⁻¹⁹ J · 1 bar = 10⁵ Pa · K = °C + 273.15。", reference: "SI 定义 — BIPM", number: "请输入有限数值，可使用小数或科学计数法。", absoluteZero: "绝对温度不能低于 0 K（−273.15 °C）。", range: "该数值超出了支持的计算范围。", unit: "请选择同一物理量的单位。" }
  };
  const requested = new URLSearchParams(location.search).get("lang");
  let language = requested === "zh" ? "zh" : "en";
  const defaults = { length: ["nm", "angstrom"], energy: ["eV", "J"], pressure: ["MPa", "Pa"], temperature: ["C", "K"] };
  const format = n => String(Number(n.toPrecision(12)));
  function calculate() {
    $("error").textContent = "";
    try {
      const category = $("quantity").value, from = $("from").value, to = $("to").value;
      const value = AimatraUnits.convert($("value").value, category, from, to);
      const source = AimatraUnits.families[category][from][2], target = AimatraUnits.families[category][to][2];
      $("result").textContent = `${format(value)} ${target}`;
      $("equation").textContent = `${$("value").value.trim()} ${source} = ${format(value)} ${target}`;
      $("value").removeAttribute("aria-invalid");
    } catch (error) {
      $("result").textContent = "—"; $("equation").textContent = "";
      $("error").textContent = words[language][error.message] || words[language].number;
      $("value").setAttribute("aria-invalid", "true");
    }
  }
  function chooseQuantity() {
    const category = $("quantity").value, units = AimatraUnits.families[category];
    ["from", "to"].forEach((id, index) => {
      $(id).replaceChildren(...Object.entries(units).map(([key, unit]) => new Option(unit[2], key)));
      $(id).value = defaults[category][index];
    });
    calculate();
  }
  function translate() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = words[language][el.dataset.i18n]; });
    $("language").textContent = language === "zh" ? "EN" : "中文";
    $("result").parentElement.setAttribute("aria-label", words[language].result);
    calculate();
  }
  $("quantity").addEventListener("change", chooseQuantity);
  ["value", "from", "to"].forEach(id => $(id).addEventListener(id === "value" ? "input" : "change", calculate));
  $("swap").addEventListener("click", () => { const from = $("from").value; $("from").value = $("to").value; $("to").value = from; calculate(); });
  $("language").addEventListener("click", () => { language = language === "zh" ? "en" : "zh"; translate(); });
  window.addEventListener("message", event => {
    if (event.source === parent && ["aimatralab-language", "nexoralab-language"].includes(event.data?.type) && ["en", "zh"].includes(event.data.language)) { language = event.data.language; translate(); }
  });
  chooseQuantity(); translate();
})();
