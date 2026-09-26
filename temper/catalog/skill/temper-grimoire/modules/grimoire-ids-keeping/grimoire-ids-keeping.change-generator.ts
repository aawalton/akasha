import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const grimoireIdsKeeping = {
  id: "01a0df09-68eb-7d95-9fb5-69c816d4e3f8",
  type: "page-type/change-generator",
  slug: "grimoire-ids-keeping",
  definition: "the type naming every grimoire by its id, written again from the grimoire pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The type is written by a machine from the grimoire pages rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grimoire's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
