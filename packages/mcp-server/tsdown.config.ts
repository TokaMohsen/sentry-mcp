import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    // Only mark test-only packages as external
    "@sentry/mcp-server-mocks",
  ],
  noExternal: [
    // Force bundling of mcp-core (including all subpath exports)
    "@sentry/mcp-core",
    /^@sentry\/mcp-core\/.*/,
  ],
  env: {
    SENTRY_ENVIRONMENT: "stdio",
    npm_package_version: "{{version}}",
  },
});
