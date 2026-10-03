import { test } from "node:test";
import assert from "node:assert/strict";
import { assertPublicAsset } from "../lib/publication.ts";
const bytes = (value: string) => new TextEncoder().encode(value);
test("publication permits client verification keys and blocks issuer material, records and binary archives", () => {
  assert.doesNotThrow(() =>
    assertPublicAsset(
      "license_public.pem",
      bytes("synthetic public verification key"),
    ),
  );
  assert.doesNotThrow(() =>
    assertPublicAsset(
      "license_verify.cjs",
      bytes("// client verification, not issuance"),
    ),
  );
  for (const file of [
    "issuer.cjs",
    "license-owner/public.pem",
    "PRIVATE-KEEP-SECRET.pem",
    "customer.cdlicense",
    "client.zip",
    "client.exe",
  ])
    assert.throws(() => assertPublicAsset(file, bytes("synthetic fixture")));
  assert.throws(
    () =>
      assertPublicAsset("app.js", bytes("-----BEGIN " + "PRIVATE KEY-----")),
    /Private key material/,
  );
  assert.throws(
    () =>
      assertPublicAsset(
        "settings.json",
        bytes('{"MASTER_' + 'KEY":"synthetic-fixture"}'),
      ),
    /Private secret assignment/,
  );
});
