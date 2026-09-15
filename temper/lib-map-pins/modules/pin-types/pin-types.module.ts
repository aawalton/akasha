import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pinTypes = {
  id: "01a06062-57df-78e5-8d6b-f75d65630a1b",
  type: "page-type/module",
  slug: "pin-types",
  definition: "how a custom pin type is registered, laid out and refreshed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Registering a pin type whose name is taken raises an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin type with no layout given gets a default level and texture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip given as a string is wrapped into a tooltip creator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A newly registered pin type is enabled and refreshed at once.",
    },
  ],
} as const satisfies Module
