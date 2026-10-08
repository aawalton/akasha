import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkPotionEffects = {
  id: "01a06137-f968-77cc-97d7-6adbf8f9ea1d",
  type: "page-type/module",
  slug: "check-potion-effects",
  definition:
    "the condition check over a rule's required potion effects against the effects an item grants",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The default matching mode asks for one selected effect rather than every selected effect.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Absent potion effect metric ids on the item make the condition indeterminate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule stating one effect as bare text rather than a list is named rather than tested.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No effect magnitude or duration is compared here.",
    },
  ],
  createdAt: "2026-09-02T08:24:13.416Z",
  updatedAt: "2026-09-21T15:32:06.000Z",
} as const satisfies Module
