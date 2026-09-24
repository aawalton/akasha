import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponTypesData = {
  id: "01a0616f-8e15-7014-9996-52aebc4519b8",
  type: "page-type/module",
  slug: "weapon-types-data",
  definition:
    "every weapon a character wields, with the power each carries and the hands each takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the weapon pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The generator writes this table outside akasha.",
    },
  ],
  hashIndexed: ["TEMPER_WEAPON_TYPES_BY_ID"],
} as const satisfies Module
