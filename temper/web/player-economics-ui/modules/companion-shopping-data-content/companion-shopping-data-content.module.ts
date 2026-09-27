import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionShoppingDataContent = {
  id: "01a063a1-8cc1-7004-9c53-197461ab3bf9",
  type: "page-type/module",
  slug: "companion-shopping-data-content",
  definition: "the companion gear a player still needs, drawn three ways",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The filter names and empty states are read from phrase pages.",
    },
  ],
} as const satisfies Module
