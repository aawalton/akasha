import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionUltimateSlotCard = {
  id: "01a0642f-8c34-794d-a248-7c5518fe886d",
  type: "page-type/module",
  slug: "companion-ultimate-slot-card",
  definition: "the card drawing a companion's ultimate slot",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
