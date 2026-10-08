import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useSetTargetEntities = {
  id: "01a0642c-5ba2-72f9-8c49-a10f1650c9de",
  type: "page-type/module",
  slug: "use-set-target-entities",
  definition: "the hook setting a character's target entities",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The characters offered are worked out again whenever the skill catalogue is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.778Z",
  updatedAt: "2026-09-27T11:33:21.000Z",
} as const satisfies Module
