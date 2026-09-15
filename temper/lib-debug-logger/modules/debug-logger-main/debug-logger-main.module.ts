import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerMain = {
  id: "01a06061-408f-7340-8c9c-c97f192b2642",
  type: "page-type/module",
  slug: "debug-logger-main",
  definition: "the order the library parts are switched on in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The logger class is ready before anything that makes a logger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here is exported.",
    },
  ],
} as const satisfies Module
