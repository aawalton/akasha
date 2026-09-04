import type { Module } from "@akasha/code-system/module"

export const keybinderConstants = {
  id: "01a06381-67c1-7b87-8d5c-6c7b5fcc569f",
  pageTypeSlug: "module",
  slug: "keybinder-constants",
  definition: "the add-on's names and the actions it shares across the account by default",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The saved-variables name is built from the addon name.",
    },
    {
      invariantKind: "departure",
      statement: "An action in the default list is shared the first time the add-on runs.",
    },
  ],
} as const satisfies Module
