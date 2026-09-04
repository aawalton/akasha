import type { Module } from "@akasha/code-system/module"

export const destinationsLangCollectiblesJf = {
  id: "01a06269-29f4-7c37-acc6-fc4631895396",
  pageTypeSlug: "module",
  slug: "destinations-lang-collectibles-jf",
  definition: "the collectible names in Japanese with English fallbacks",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
