import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const potionEffectsFilter = {
  id: "01a06100-3bf6-7b0c-9855-00ae35b35c25",
  type: "page-type/module",
  slug: "potion-effects-filter",
  definition: "the Potion Effects condition a rule may carry, as the rule editor offers it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An effect is offered under its restore page's slug and labelled by that page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This filter reads and writes the conditions `potionEffects` and `potionEffectsMode`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category outside `potions` is offered no Potion Effects condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under the `potionEffects` condition field page's title.",
    },
  ],
} as const satisfies Module
