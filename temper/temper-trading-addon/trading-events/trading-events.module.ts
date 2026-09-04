import type { Module } from "@akasha/code-system/module"

export const tradingEvents = {
  id: "01a06160-2a5a-796d-b687-09aeb649b743",
  pageTypeSlug: "module",
  slug: "trading-events",
  definition: "the game events the listings add-on listens for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every listener is named after the add-on so a reload can drop them.",
    },
  ],
} as const satisfies Module
