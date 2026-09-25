import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardCheckers = {
  id: "01a0640c-1e9a-73f9-8755-c19243c58c9d",
  type: "page-type/module",
  slug: "completion-card-checkers",
  definition: "what answers whether a character has finished each completion card",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A card the registry does not name has no checker and reads as unmeasured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card stating no picker is one leaf at the empty path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which achievements a category holds is read from the catalogs handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category path counts each achievement under that category once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is finished once every achievement under that category is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path whose last step is an achievement's number counts that achievement alone.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A branch the picker offers is counted again in the whole card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The zone branch the picker offers is the story zones rather than every zone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming the whole zone-quest branch is still answered.",
    },
  ],
} as const satisfies Module
