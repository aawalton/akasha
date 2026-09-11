import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const debugLoggerCasts = {
  id: "01a06061-408d-74a5-bf73-9ca2050ea277",
  pageTypeSlug: "module",
  type: "module",
  slug: "debug-logger-casts",
  definition: "the assertions handing an untyped Lua value to TypeScript as a named shape",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cast here changes no value.",
    },
  ],
} as const satisfies Module
