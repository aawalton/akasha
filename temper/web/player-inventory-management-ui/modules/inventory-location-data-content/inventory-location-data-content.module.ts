import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryLocationDataContent = {
  id: "01a0636c-5d9b-7421-a641-ef2d6b530018",
  type: "page-type/module",
  slug: "inventory-location-data-content",
  definition: "the inventory drawn by where its items sit",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab header and the empty state are web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:39:23.000Z",
} as const satisfies Module
