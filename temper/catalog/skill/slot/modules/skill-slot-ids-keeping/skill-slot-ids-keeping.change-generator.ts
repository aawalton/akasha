import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const skillSlotIdsKeeping = {
  id: "01a0e0c2-45db-7057-b85c-5a2a010f144f",
  type: "page-type/change-generator",
  slug: "skill-slot-ids-keeping",
  definition: "the type naming every skill slot by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the skill slot pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill slot's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
