import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkEquipTarget = {
  id: "01a06137-f964-761e-935e-c18a08cf1dce",
  type: "page-type/module",
  slug: "check-equip-target",
  definition:
    "the condition check over whether an item is equipment a character or companion wants",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing equipType or traitType or quality makes the condition indeterminate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first missing field of those three is reported as the missing signal.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Character equipment and companion equipment are separate environment lookups.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reports which character wants the equipment.",
    },
  ],
  createdAt: "2026-09-02T08:24:13.412Z",
  updatedAt: "2026-09-21T15:32:06.000Z",
} as const satisfies Module
