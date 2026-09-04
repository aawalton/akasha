import type { Module } from "@akasha/code-system/module"

export const pinTypes = {
  id: "01a06062-57df-78e5-8d6b-f75d65630a1b",
  pageTypeSlug: "module",
  slug: "pin-types",
  definition: "how a custom pin type is registered, laid out and refreshed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Registering a pin type whose name is taken raises an error.",
    },
    {
      invariantKind: "departure",
      statement: "A pin type with no layout given gets a default level and texture.",
    },
    {
      invariantKind: "departure",
      statement: "A tooltip given as a string is wrapped into a tooltip creator.",
    },
    {
      invariantKind: "departure",
      statement: "A newly registered pin type is enabled and refreshed at once.",
    },
  ],
} as const satisfies Module
