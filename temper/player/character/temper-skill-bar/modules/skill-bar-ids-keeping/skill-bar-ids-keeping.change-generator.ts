import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const skillBarIdsKeeping = {
  id: "01a0e096-154d-71c2-9c95-3eafcaed31c6",
  type: "page-type/change-generator",
  slug: "skill-bar-ids-keeping",
  definition: "the type naming every skill bar by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the skill bar pages.",
    },
  ],
  createdAt: "2026-09-27T01:58:47.373Z",
  updatedAt: "2026-09-27T01:58:51.000Z",
} as const satisfies ChangeGenerator
