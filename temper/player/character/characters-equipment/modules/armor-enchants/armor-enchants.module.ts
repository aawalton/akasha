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
      statement: "This table is written out from the glyph pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A glyph's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The generator writes this table outside akasha.",
    },
  ],
  hashIndexed: ["TEMPER_ARMOR_ENCHANTS_BY_ID"],
} as const satisfies Module
