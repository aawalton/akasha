import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const armorWeights = {
  id: "01a0616f-8e17-7f39-850b-c2da8d153a31",
  pageTypeSlug: "module",
  slug: "armor-weights",
  definition: "the armor weights a piece is made in, and what wearing each is worth",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the armor weight pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A weight's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A weight moved to another place breaks every build hash saved.",
    },
    {
      invariantKind: "upkeep",
      statement: "The key order of this table is the wire order.",
    },
    {
      invariantKind: "upkeep",
      statement: "The order of the armor weight id union is not the wire order.",
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
