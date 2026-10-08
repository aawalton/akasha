import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCharacterRulesPanel = {
  id: "01a0636c-5d9a-7dec-b460-45bc5ec10011",
  type: "page-type/module",
  slug: "inventory-character-rules-panel",
  definition: "the panel holding the character rules",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panel's wording is web phrase pages, and its rule status labels are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.370Z",
  updatedAt: "2026-09-27T11:33:52.000Z",
} as const satisfies Module
