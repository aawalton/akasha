import type { Module } from "@akasha/code-system/module"

export const minting = {
  id: "01a04e33-9351-7e79-8041-89abfa036830",
  pageTypeSlug: "module",
  slug: "minting",
  definition: "the pages a test stands up in a root of its own, and the ids it mints them under",
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
  ],
} as const satisfies Module
