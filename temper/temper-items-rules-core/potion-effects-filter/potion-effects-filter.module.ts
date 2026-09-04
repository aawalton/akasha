import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const potionEffectsFilter = {
  id: "01a06100-3bf6-7b0c-9855-00ae35b35c25",
  pageTypeSlug: "module",
  slug: "potion-effects-filter",
  definition: "the Potion Effects condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This filter reads and writes the conditions `potionEffects` and `potionEffectsMode`.",
    },
    {
      invariantKind: "departure",
      statement: "A category outside `potions` is offered no Potion Effects condition.",
    },
  ],
} as const satisfies Module
