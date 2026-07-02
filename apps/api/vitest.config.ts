import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@anjos/domain": new URL("../../packages/domain/src/index.ts", import.meta.url)
        .pathname,
      "@anjos/shared": new URL("../../packages/shared/src/index.ts", import.meta.url)
        .pathname
    }
  },
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"]
  }
});
