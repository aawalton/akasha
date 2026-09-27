import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkClassification = {
  id: "01a06137-f962-70e4-b657-15f603e5b645",
  type: "page-type/module",
  slug: "check-classification",
  definition: "the condition check over an item's sellability, name, trait, and set source type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item whose merchant value is zero or absent fails the can-sell condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item is companion equippable when its trait number is a companion trait's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's source type is the category the environment answers for its set id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A set id the environment holds no category for is treated as the no-type source type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An environment that cannot say a set's category leaves the set source check indeterminate.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An item with no set id skips the set source type check entirely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's trait is the temper id the environment answers for its trait number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An environment that cannot say an item's trait leaves the trait check indeterminate.",
    },
  ],
} as const satisfies Module
