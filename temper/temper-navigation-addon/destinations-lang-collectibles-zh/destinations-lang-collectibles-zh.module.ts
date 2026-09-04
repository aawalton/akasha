import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesZh = {
  id: "01a06269-29f9-7223-a5fa-ad1fd719e4f6",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-zh",
  definition: "the collectible names in Chinese",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
