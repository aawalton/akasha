import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const effectBadge = {
  id: "01a06421-2523-7b6d-946a-21342b06779b",
  type: "page-type/module",
  slug: "effect-badge",
  definition: "the badge naming a part of a skill effect",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A damage type is named by its temper-damage-type page's title.",
    },
  ],
} as const satisfies Module
