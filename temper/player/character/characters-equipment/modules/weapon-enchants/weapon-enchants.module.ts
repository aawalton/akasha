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
      statement: "This table is written out from the glyph pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A glyph's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A glyph moved to another place breaks every build hash saved.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The generator writes this table outside akasha.",
    },
  ],
  hashIndexed: ["TEMPER_WEAPON_ENCHANTS_BY_ID"],
} as const satisfies Module
