import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponTypesData = {
  id: "01a0616f-8e15-7014-9996-52aebc4519b8",
  pageTypeSlug: "module",
  slug: "weapon-types-data",
  definition:
    "every weapon a character wields, with the power each carries and the hands each takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the weapon pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A weapon's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A weapon moved to another place breaks every build hash saved.",
    },
    {
      invariantKind: "upkeep",
      statement: "The generator writes this table outside akasha.",
    },
    {
      invariantKind: "upkeep",
      statement: "Both copies of this table move together.",
    },
  ],
} as const satisfies Module
