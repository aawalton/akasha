import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneEsoStubs = {
  id: "01a06038-2cc0-7af6-bdb5-7b41393a4ae3",
  type: "page-type/module",
  slug: "zone-eso-stubs",
  definition: "the ESO functions LibZone's data file calls while it loads outside the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stub answers whatever lets the data file finish loading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stub's answer is never read as game data.",
    },
  ],
  createdAt: "2026-09-02T03:44:49.344Z",
  updatedAt: "2026-09-21T15:14:51.000Z",
} as const satisfies Module
