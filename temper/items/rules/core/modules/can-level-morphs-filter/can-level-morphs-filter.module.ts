import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const canLevelMorphsFilter = {
  id: "01a06100-3be6-725c-a600-133642aa5e5b",
  type: "page-type/module",
  slug: "can-level-morphs-filter",
  definition: "the Can Level Morphs condition a rule may have, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `canLevelMorphs` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule whose action is other than `stock` is offered no Can Level Morphs condition.",
    },
  ],
} as const satisfies Module
