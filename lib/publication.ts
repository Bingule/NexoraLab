// Publication checks do not implement or alter client license verification.
export function assertPublicAsset(name: string, content: Uint8Array) {
  const parts = name.replaceAll("\\", "/").toLowerCase().split("/");
  const base = parts.at(-1) || "";
  const publicKey = [
    "public.pem",
    "public-key.pem",
    "license_public.pem",
    "license-public.pem",
  ].includes(base);
  if (
    parts.some((part) =>
      /(?:license-owner|license-generator|activation-code-generator|private-licensing|customer-licenses|已签发授权)/.test(
        part,
      ),
    ) ||
    /(?:issuer|keygen|private-keep-secret|(?:generate|生成)[-_ ]?(?:activation|license|授权))/.test(
      base,
    ) ||
    /\.(?:key|p12|pfx|cdlicense|cvlicense|license|exe|msi|asar|zip|7z|tar|gz)$/i.test(
      base,
    ) ||
    (base.endsWith(".pem") && !publicKey) ||
    /^\.env(?:\.|$)/.test(base)
  )
    throw new Error(
      `Private publication asset or Windows binary (use a client-only Release): ${name}`,
    );
  const text = new TextDecoder().decode(content);
  if (/-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/.test(text))
    throw new Error(`Private key material in publication asset: ${name}`);
  if (
    /(?:master[_-]?key|private[_-]?signing[_-]?key|signing[_-]?secret)\s*["']?\s*[:=]\s*["'][^"'\r\n]+["']/i.test(
      text,
    )
  )
    throw new Error(`Private secret assignment in publication asset: ${name}`);
}
