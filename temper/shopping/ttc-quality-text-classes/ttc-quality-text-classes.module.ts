import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ttcQualityTextClasses = {
  id: "01a060cf-b0b1-726e-9c87-8a0d3121e120",
  pageTypeSlug: "module",
  slug: "ttc-quality-text-classes",
  definition: "the text class a Tamriel Trade Centre item quality is shown in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quality is keyed by the number Tamriel Trade Centre gives the quality.",
    },
    {
      invariantKind: "absence",
      statement: "No class here is named for the lowest quality.",
    },
  ],
} as const satisfies Module
