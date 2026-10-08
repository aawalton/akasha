import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillSlotCard = {
  id: "01a0642c-5bae-7b7b-bebc-f37e1800336e",
  type: "page-type/module",
  slug: "skill-slot-card",
  definition: "a card with a skill slot",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.790Z",
  updatedAt: "2026-09-27T11:42:08.000Z",
} as const satisfies Module
