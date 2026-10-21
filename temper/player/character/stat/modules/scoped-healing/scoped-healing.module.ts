import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scopedHealing = {
  id: "01a15e22-06ca-711c-83a3-bfa203efe20b",
  type: "page-type/module",
  slug: "scoped-healing",
  definition: "the healing done a passive adds to the heals of one skill line",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Emerald Moss adds 5% healing done to a Green Balance heal for each Green Balance skill on its bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Emerald Moss's share adds to the build's healing done before the heal grows by it once.",
    },
  ],
  createdAt: "2026-10-21T11:04:10.698Z",
  updatedAt: "2026-10-21T11:04:10.698Z",
} as const satisfies Module
