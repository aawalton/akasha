import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const queryShapes = {
  id: "01a06187-b3a3-7eb8-8802-5c8042236869",
  type: "page-type/module",
  slug: "query-shapes",
  definition: "the little bit of armour and weapon shape a skill query needs to read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A skill query reads the weight or the weapon type off a slot.",
    },
  ],
  createdAt: "2026-09-02T09:51:18.435Z",
  updatedAt: "2026-09-21T15:38:18.000Z",
} as const satisfies Module
