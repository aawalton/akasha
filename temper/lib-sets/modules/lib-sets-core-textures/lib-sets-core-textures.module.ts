import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsCoreTextures = {
  id: "01a061fc-ceea-7feb-ba96-4aea2c1aee0c",
  type: "page-type/module",
  slug: "lib-sets-core-textures",
  definition: "the icon for an equip slot, weapon type, armor type or set type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Each icon table is filled from the game the first time an icon is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Game string ids are reached by prefix and index rather than by concatenated name.",
    },
  ],
} as const satisfies Module
