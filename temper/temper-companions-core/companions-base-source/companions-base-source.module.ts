import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionsBaseSource = {
  id: "01a06152-c2d1-730e-a4ec-8f2ee2d4c798",
  pageTypeSlug: "module",
  slug: "companions-base-source",
  definition: "gatherer data file of the flat base stats every companion starts with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Base health and weapon damage are literal integers rather than formulas.",
    },
    {
      invariantKind: "constraint",
      statement: "The single entry companion-base-stats carries every base metric effect.",
    },
  ],
} as const satisfies Module
