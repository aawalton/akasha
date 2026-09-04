import type { Module } from "@akasha/code-system/module"

export const companionsDisplayNames = {
  id: "01a0611d-84d3-7cf4-b385-a77f80d02765",
  pageTypeSlug: "module",
  slug: "companions-display-names",
  definition: "the words a player reads for each armor weight, trait, quality and gear slot",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is held by codec index rather than by game constant.",
    },
  ],
} as const satisfies Module
