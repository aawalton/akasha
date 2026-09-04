import type { Module } from "@akasha/code-system/module"

export const bankProfileReading = {
  id: "01a06864-aa2b-7001-b025-909d59f3ea04",
  pageTypeSlug: "module",
  slug: "bank-profile-reading",
  definition: "the Lua profile the inventory addon records over a visit to a banker",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The profile is ruled on whole, so an unknown field refuses the read.",
    },
    {
      invariantKind: "departure",
      statement: "A bucket the addon left empty is read as an empty list rather than as absent.",
    },
  ],
} as const satisfies Module
