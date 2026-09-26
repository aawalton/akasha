import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const sourceCategoryIdsKeeping = {
  id: "01a0df30-d97d-76c9-9886-a40519ffbd91",
  type: "page-type/change-generator",
  slug: "source-category-ids-keeping",
  definition: "the type naming every source category by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the source category pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source category's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
