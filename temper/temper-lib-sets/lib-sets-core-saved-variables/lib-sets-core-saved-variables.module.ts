import type { Module } from "@akasha/code-system/module"

export const libSetsCoreSavedVariables = {
  id: "01a061fc-ceea-76dd-8b6b-a1e1f14f9219",
  pageTypeSlug: "module",
  slug: "lib-sets-core-saved-variables",
  definition: "the account-wide settings this library remembers between sessions",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A second load is refused once the saved variables are already in hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A favorite saved under an unknown category is moved to the star category on load.",
    },
  ],
} as const satisfies Module
