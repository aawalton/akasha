import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const minting = {
  id: "01a04e33-9351-7e79-8041-89abfa036830",
  pageTypeSlug: "module",
  type: "module",
  slug: "minting",
  definition: "the pages a test sets up in a root of its own, and the ids it mints them under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check a test mints states each phase the check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "One place mints the checks.",
    },
    {
      invariantKind: "departure",
      statement: "The index names a check a test mints.",
    },
    {
      invariantKind: "departure",
      statement: "A check a test mints has the same value in the index and in its own body.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a minted check is of is filed under a path the minted root has.",
    },
    {
      invariantKind: "departure",
      statement: "A minted id is worked out from the slug the id is minted for.",
    },
    {
      invariantKind: "departure",
      statement: "Two slugs minted into one root are two ids.",
    },
    {
      invariantKind: "departure",
      statement: "One slug minted twice is one id.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a fixture beside another module.",
    },
  ],
} as const satisfies Module
