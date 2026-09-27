import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const classIdsKeeping = {
  id: "01a0e08d-6075-7446-8172-389d3faa1db4",
  type: "page-type/change-generator",
  slug: "class-ids-keeping",
  definition: "the type naming every class by its id, written again from the class pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the class pages rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
