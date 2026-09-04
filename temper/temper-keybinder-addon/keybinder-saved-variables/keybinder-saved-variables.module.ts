import type { Module } from "@akasha/code-system/module"

export const keybinderSavedVariables = {
  id: "01a06381-67c1-7efa-89ba-519602e056ec",
  pageTypeSlug: "module",
  slug: "keybinder-saved-variables",
  definition: "what the add-on keeps between sessions, shared by every character on the machine",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bindings are kept per user profile rather than per character.",
    },
    {
      invariantKind: "departure",
      statement: "The add-on is set going once the saved variables are in hand.",
    },
  ],
} as const satisfies Module
