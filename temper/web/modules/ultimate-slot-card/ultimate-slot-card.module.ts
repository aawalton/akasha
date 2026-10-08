import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ultimateSlotCard = {
  id: "01a0642c-5bb1-70ad-ba21-7cb45c72fc9c",
  type: "page-type/module",
  slug: "ultimate-slot-card",
  definition: "a card with an ultimate slot",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.793Z",
  updatedAt: "2026-09-27T11:42:08.000Z",
} as const satisfies Module
