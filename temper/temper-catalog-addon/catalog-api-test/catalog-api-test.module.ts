import type { Module } from "@akasha/code-system/module"

export const catalogApiTest = {
  id: "01a063ba-94e5-7e5c-ad37-4144ed456b26",
  pageTypeSlug: "module",
  slug: "catalog-api-test",
  definition: "the one call per catalog that says whether the game answers it at all",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A game call is made inside a protected call so a missing name is caught.",
    },
    {
      invariantKind: "departure",
      statement: "An answer of zero is a failure.",
    },
    {
      invariantKind: "departure",
      statement: "Every group is tried before anything is printed.",
    },
  ],
} as const satisfies Module
