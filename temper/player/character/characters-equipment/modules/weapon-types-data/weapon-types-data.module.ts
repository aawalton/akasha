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
      statement: "The weapon types are read from the weapon type pages in hash-place order.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon's power at a quality is the grade under its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon scales as two-handed melee when its skill line is the two-handed line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon page naming no skill line is one-handed, its line set by the off hand.",
    },
  ],
} as const satisfies Module
