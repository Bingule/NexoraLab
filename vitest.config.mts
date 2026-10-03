import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["vendor/tmccdb/tests/*.test.ts"],
    environment: "jsdom",
    globals: true,
  },
});
