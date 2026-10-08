import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentConfig = {
  id: "01a06100-3beb-75f4-a59d-ba8d15b49b38",
  type: "page-type/module",
  slug: "equipment-config",
  definition:
    "the equipment settings the game addon reads, built from the rules and from the saved settings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting the rules do not decide falls back on the saved settings.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.427Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
