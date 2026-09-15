import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setCategories = {
  id: "01a0616f-8e15-7812-a6e6-cca332a9a6e5",
  type: "module",
  slug: "set-categories",
  definition: "where a gear set is found, and the sets sorted under each",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the set category pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The generator writes this table outside akasha.",
    },
  ],
} as const satisfies Module
