import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponEnchants = {
  id: "01a0616f-8e18-7979-89eb-61f1621f3cdb",
  type: "page-type/module",
  slug: "weapon-enchants",
  definition: "every glyph a weapon takes, and what each is worth at a quality",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The glyphs and their worth at each quality are read from the enchant pages, live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A two-handed weapon carries twice the glyph's stated worth.",
    },
  ],
} as const satisfies Module
