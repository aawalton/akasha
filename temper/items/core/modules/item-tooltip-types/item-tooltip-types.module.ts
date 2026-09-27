import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemTooltipTypes = {
  id: "01a060c5-3c24-78a1-bb89-9d7ce6bcb2c5",
  type: "page-type/module",
  slug: "item-tooltip-types",
  definition: "what a tooltip says about an item",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a tooltip says of an item comes from what was read off its bare item id.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A bare item id is read at level 0, so the enchant read off it says 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enchant read off the item's own link replaces the one its bare id gave.",
    },
  ],
} as const satisfies Module
