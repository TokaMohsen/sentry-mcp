import { defineConfig } from "tsdown";

export default defineConfig({
  // Use single entry points to avoid code splitting circular dependency issues
  // The main CLI entry and the programmatic stdio transport export
  entry: ["src/index.ts", "src/transports/stdio.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false, // Disable code splitting to avoid circular dependency issues with runtime helpers
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
