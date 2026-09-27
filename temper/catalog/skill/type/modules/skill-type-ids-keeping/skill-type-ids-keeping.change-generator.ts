import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const skillTypeIdsKeeping = {
  id: "01a0e094-6c14-71b8-a523-e04b4c7c7ab3",
  type: "page-type/change-generator",
  slug: "skill-type-ids-keeping",
  definition: "the type naming every skill type by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the skill type pages.",
    },
  ],
} as const satisfies ChangeGenerator
