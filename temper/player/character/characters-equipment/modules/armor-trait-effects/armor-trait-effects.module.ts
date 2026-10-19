import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorTraitEffects = {
  id: "01a0616f-8e16-76df-997d-3945e96d8d4b",
  type: "page-type/module",
  slug: "armor-trait-effects",
  definition: "the effects a worn piece of armor gets from its trait",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Divines sums each piece's nominal share and leaves the sum unrounded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stone's value under Divines is its base times one plus that sum, rounded down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stone with a boon scale has that value times its scale, rounded down again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A boon's tooltip number is worked out apart from the value worked out exactly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tooltip adds each piece's share to one in single precision.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tooltip's thousandths are that sum times a thousand in single precision, floored.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.958Z",
  updatedAt: "2026-10-19T23:15:56.576Z",
} as const satisfies Module
