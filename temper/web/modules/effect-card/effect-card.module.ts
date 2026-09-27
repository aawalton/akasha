import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const effectCard = {
  id: "01a0641f-8bec-738d-a051-aa742fad450a",
  type: "page-type/module",
  slug: "effect-card",
  definition: "the card gathering the badges of a skill effect",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A single target is named by its target type alone.",
    },
  ],
} as const satisfies Module
