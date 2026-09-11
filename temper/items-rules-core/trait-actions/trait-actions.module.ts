import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const traitActions = {
  id: "01a06100-3c00-7c60-a2f3-ea058876bbef",
  type: "module",
  slug: "trait-actions",
  definition: "what becomes of an item carrying each trait, gathered from the rules naming traits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first rule naming a trait on a category settles the action for that trait.",
    },
  ],
} as const satisfies Module
