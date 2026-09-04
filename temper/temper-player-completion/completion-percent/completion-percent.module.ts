import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionPercent = {
  id: "01a06108-2ff5-7b31-8409-2fba1ba0bab8",
  pageTypeSlug: "module",
  slug: "completion-percent",
  definition: "how far along a count is, as a whole number out of a hundred",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A count part way along never reads as zero.",
    },
  ],
} as const satisfies Module
