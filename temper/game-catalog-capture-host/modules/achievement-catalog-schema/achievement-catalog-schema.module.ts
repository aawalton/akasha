import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const achievementCatalogSchema = {
  id: "01a06076-5ea8-71a8-86ca-b64f4875777a",
  type: "page-type/module",
  slug: "achievement-catalog-schema",
  definition: "the zod schema reading the achievement catalog out of saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category has sub categories that have achievements.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A general sub category is optional on a category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry says whether the achievement is earned per character.",
    },
  ],
} as const satisfies Module
