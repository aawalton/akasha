import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const constraintBadges = {
  id: "01a06421-2522-7797-9798-69269634bacb",
  type: "page-type/module",
  slug: "constraint-badges",
  definition: "the badges naming what bounds a skill effect",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enemy type is named by its temper-enemy-type page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A staff's element is named by the temper-damage-type page it shares a key with.",
    },
  ],
} as const satisfies Module
