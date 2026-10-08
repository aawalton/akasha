import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const roleIdsKeeping = {
  id: "01a0e08d-5ffb-7c17-90c7-3b20b15c8974",
  type: "page-type/change-generator",
  slug: "role-ids-keeping",
  definition: "the type naming every character role by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the character role pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character role's id is its page's slug.",
    },
  ],
  createdAt: "2026-09-27T01:49:16.667Z",
  updatedAt: "2026-09-27T01:49:21.000Z",
} as const satisfies ChangeGenerator
