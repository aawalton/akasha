import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorEnchants = {
  id: "01a0616f-8e17-7a0c-8406-2388ce2938e6",
  type: "page-type/module",
  slug: "armor-enchants",
  definition: "every glyph an armor piece takes, and what each is worth at a quality",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The glyphs and their worth at each quality are read from the enchant pages, live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece other than the head, chest or legs carries a smaller share of the glyph.",
    },
  ],
} as const satisfies Module
