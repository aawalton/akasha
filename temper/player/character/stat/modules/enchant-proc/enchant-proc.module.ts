import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const enchantProc = {
  id: "01a13ff0-d4d8-7ee8-8a0f-d092bf883998",
  type: "page-type/module",
  slug: "enchant-proc",
  definition: "the damage and healing a weapon enchant gives each time it goes off",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An enchant's damage and healing are read from the enchant text the game gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An enchant goes off once every 4 seconds, as 5 heals in a 21 second fight showed.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "An enchant's healing is its text's figure, without any healing done or taken.",
    },
  ],
  createdAt: "2026-10-15T14:21:50.167Z",
  updatedAt: "2026-10-15T14:21:50.167Z",
} as const satisfies Module
