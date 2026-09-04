import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionRecipeProgress = {
  id: "01a06121-f0d4-7ab6-9220-119f03765b07",
  pageTypeSlug: "module",
  slug: "completion-recipe-progress",
  definition: "the recipes each character knows, counted by recipe list",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Module
