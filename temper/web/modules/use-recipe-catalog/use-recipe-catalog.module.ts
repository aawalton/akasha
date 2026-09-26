import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useRecipeCatalog = {
  id: "01a0de64-3221-76c6-b047-3d627aa593b5",
  type: "page-type/module",
  slug: "use-recipe-catalog",
  definition: "the recipe catalogue a screen reads from the recipe list pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen reads the recipe list pages only where it shows something they decide.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe list page changing while a screen is open reaches it with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than shown as no recipes.",
    },
  ],
} as const satisfies Module
