import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchPotionEffectsFilter = {
  id: "01a0613a-e0ab-720b-94a5-6dafe7b134f2",
  type: "page-type/module",
  slug: "search-potion-effects-filter",
  definition:
    "the effects a potion carries, narrowed by a multiselect of health, magicka, and stamina restore",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item matches the selection where the item has a selected effect.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The three restore effects are offered rather than the full potion effect list.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
