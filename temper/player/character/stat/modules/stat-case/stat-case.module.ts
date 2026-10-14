import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statCase = {
  id: "01a13b6c-6cf8-7106-b132-ed425b58823b",
  type: "page-type/module",
  slug: "stat-case",
  definition: "a stat case's pinned stats held against what the calculator gives",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is worked out from its build with the buffs and stars it listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned stat the calculator no longer gives has drifted, and fails the test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A known gap the calculator now gives is closed, and is named for pinning.",
    },
  ],
  createdAt: "2026-10-14T17:18:43.951Z",
  updatedAt: "2026-10-14T17:18:43.951Z",
} as const satisfies Module
