import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoTraitMap = {
  id: "01a0610f-45ba-79d3-b258-2e9d709283b7",
  pageTypeSlug: "module",
  slug: "eso-trait-map",
  definition: "which numbered Elder Scrolls Online trait a player trait answers to, by gear family",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Weapon armor and jewelry each number their traits differently.",
    },
    {
      invariantKind: "departure",
      statement: "The reverse map is worked out at load rather than written out.",
    },
  ],
} as const satisfies Module
