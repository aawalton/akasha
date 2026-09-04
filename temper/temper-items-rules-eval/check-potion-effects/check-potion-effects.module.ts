import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkPotionEffects = {
  id: "01a06137-f968-77cc-97d7-6adbf8f9ea1d",
  pageTypeSlug: "module",
  slug: "check-potion-effects",
  definition:
    "the condition check over a rule's required potion effects against the effects an item grants",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The default matching mode asks for one selected effect rather than every selected effect.",
    },
    {
      invariantKind: "departure",
      statement: "Absent potion effect metric ids on the item make the condition indeterminate.",
    },
    {
      invariantKind: "absence",
      statement: "No effect magnitude or duration is compared here.",
    },
  ],
} as const satisfies Module
