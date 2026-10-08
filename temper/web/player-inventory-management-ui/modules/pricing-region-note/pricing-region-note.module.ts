import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pricingRegionNote = {
  id: "01a0636c-5d9b-78f4-ba33-e3faa97e0037",
  type: "page-type/module",
  slug: "pricing-region-note",
  definition: "the note saying a price's region",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The note's wording and its settings link are read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:34:03.000Z",
} as const satisfies Module
