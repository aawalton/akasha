import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderConstants = {
  id: "01a06381-67c1-7b87-8d5c-6c7b5fcc569f",
  type: "module",
  slug: "keybinder-constants",
  definition: "the add-on's names and the actions it shares across the account by default",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The saved-variables name is built from the addon name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An action in the default list is shared the first time the add-on runs.",
    },
  ],
} as const satisfies Module
