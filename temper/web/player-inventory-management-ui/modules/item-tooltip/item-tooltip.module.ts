import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemTooltip = {
  id: "01a0636c-5d9b-72cf-8645-abd4e5160035",
  type: "page-type/module",
  slug: "item-tooltip",
  definition: "the tooltip drawing what an item is",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tooltip names an item's equip, weapon and armor type by the gear pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every text the game gives the tooltip is drawn through `eso-markup-text`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Style names are motif style pages; labels are web phrases in the game's spelling.",
    },
  ],
} as const satisfies Module
