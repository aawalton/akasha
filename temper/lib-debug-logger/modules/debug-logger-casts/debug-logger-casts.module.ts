import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerCasts = {
  id: "01a06061-408d-74a5-bf73-9ca2050ea277",
  type: "page-type/module",
  slug: "debug-logger-casts",
  definition: "the assertions handing an untyped Lua value to TypeScript as a named shape",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cast here changes no value.",
    },
  ],
} as const satisfies Module
