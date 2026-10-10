import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoRunning = {
  id: "01a1263d-f909-7f9e-8d2f-bc11037ec7a3",
  type: "page-type/module",
  slug: "eso-running",
  definition: "whether the game is running on this machine",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game is running where a process's program is named eso64.exe.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the program a process runs is weighed, never its arguments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process table that cannot be read counts as the game not running.",
    },
  ],
  createdAt: "2026-10-10T14:35:58.089Z",
  updatedAt: "2026-10-10T14:35:58.089Z",
} as const satisfies Module
