import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traitActions = {
  id: "01a06100-3c00-7c60-a2f3-ea058876bbef",
  type: "page-type/module",
  slug: "trait-actions",
  definition: "what becomes of an item carrying each trait, taken from the rules naming traits",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The first rule naming a trait on a category settles the action for that trait.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.448Z",
  updatedAt: "2026-09-22T14:23:56.000Z",
} as const satisfies Module
