import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoQualityTextClasses = {
  id: "01a06333-1bcc-7c92-9074-8986a87d036f",
  pageTypeSlug: "module",
  slug: "eso-quality-text-classes",
  definition: "the text class an in-game item quality is shown in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quality is keyed by the number the game gives the quality.",
    },
    {
      invariantKind: "absence",
      statement: "No class here is named for the lowest quality.",
    },
  ],
} as const satisfies Module
