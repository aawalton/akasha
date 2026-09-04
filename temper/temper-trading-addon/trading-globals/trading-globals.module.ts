import type { Module } from "@akasha/code-system/module"

export const tradingGlobals = {
  id: "01a06160-2a5b-740c-8508-b285f810f373",
  pageTypeSlug: "module",
  slug: "trading-globals",
  definition: "the names the add-on hangs off the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only what an outside caller needs is reachable.",
    },
  ],
} as const satisfies Module
