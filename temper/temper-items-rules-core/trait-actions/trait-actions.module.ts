import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const traitActions = {
  id: "01a06100-3c00-7c60-a2f3-ea058876bbef",
  pageTypeSlug: "module",
  slug: "trait-actions",
  definition: "what becomes of an item carrying each trait, gathered from the rules naming traits",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first rule naming a trait on a category settles what becomes of that trait.",
    },
  ],
} as const satisfies Module
