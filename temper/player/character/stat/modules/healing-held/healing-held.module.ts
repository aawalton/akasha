import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healingHeld = {
  id: "01a188b5-7d11-7689-b81f-eac6c5c518c5",
  type: "page-type/module",
  slug: "healing-held",
  definition: "an effect whose amount is the healing an estimate held",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A healing-done effect gives the healing an estimate held, over-healing included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An estimate handed no healing gives the effect none.",
    },
  ],
  createdAt: "2026-10-29T17:29:17.840Z",
  updatedAt: "2026-10-29T17:29:17.840Z",
} as const satisfies Module
