import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTypeDataContent = {
  id: "01a0636c-5d9b-773e-817e-b2cee53c002e",
  type: "page-type/module",
  slug: "inventory-type-data-content",
  definition: "the inventory drawn by what kind its items are",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait filter is applied again whenever the traits are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab header and the empty states are web phrase pages.",
    },
  ],
} as const satisfies Module
