import type { Module } from "@akasha/code-system/module"

export const hudAddonSavedVariables = {
  id: "01a061c5-18dd-7003-b272-f24014f3e43b",
  pageTypeSlug: "module",
  slug: "hud-addon-saved-variables",
  definition: "the account-wide store the add-on keeps its session and its visibility in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The store is opened once as the game loads the add-on.",
    },
    {
      invariantKind: "departure",
      statement: "Reading the store before the store is opened raises an error.",
    },
    {
      invariantKind: "departure",
      statement: "The store is shared by every character on the account.",
    },
  ],
} as const satisfies Module
