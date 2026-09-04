import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesDe = {
  id: "01a06269-29f0-75f0-885d-214d0a4f8375",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-de",
  definition: "the collectible names in German",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
