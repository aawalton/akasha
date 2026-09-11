import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const companionEsoTraitMap = {
  id: "01a06108-0767-7cc4-aa89-8fc44f01c10b",
  type: "module",
  slug: "companion-eso-trait-map",
  definition:
    "which numbered Elder Scrolls Online trait a companion trait answers to, by gear family",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each family of gear numbers the same nine traits differently.",
    },
  ],
} as const satisfies Module
